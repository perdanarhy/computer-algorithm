---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 11: Dynamic Programming I

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703
</div>

<!--
notes: Welcome the class. Remind them: "Last week you proved greedy could be wrong - the campus-points {1,3,4} example where the greedy answer wasn't the best one." That is today's hook.
-->

---

<!-- SLOT 2: Where we are -->

# Where We Are

<div class="roadmap">
<div class="wk"><div class="n">Wk 1</div><div class="t">Introduction</div></div>
<div class="wk"><div class="n">Wk 2</div><div class="t">Algorithm Concepts</div></div>
<div class="wk"><div class="n">Wk 3</div><div class="t">Complexity Analysis</div></div>
<div class="wk"><div class="n">Wk 4</div><div class="t">Recursion &amp; Recurrence</div></div>
<div class="wk"><div class="n">Wk 5</div><div class="t">Basic Sorting</div></div>
<div class="wk"><div class="n">Wk 6</div><div class="t">Advanced Sorting</div></div>
<div class="wk"><div class="n">Wk 7</div><div class="t">Searching</div></div>
<div class="wk review"><div class="n">Wk 8</div><div class="t">Midterm Exam</div></div>
<div class="wk"><div class="n">Wk 9</div><div class="t">Divide &amp; Conquer</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">Greedy Algorithms</div></div>
<div class="wk now"><div class="n">Wk 11</div><div class="t">Dynamic Programming I</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">Dynamic Programming II</div></div>
<div class="wk"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Point at the row. Say: "Eleven weeks of CampusNav so far. Today its Tour Planner feature finally gets solved properly." -->

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** a greedy, one-pass rule - always grant the
  room request that frees up soonest - that we *proved* optimal for
  CampusNav's room-booking scheduler.
- **Last week left broken:** that exact same "always take the
  locally best next step" rule provably fails on other problems (the
  {1,3,4}-point campus-points counterexample) - and we still have no
  principled way to explore a full space of combinations without
  brute-forcing every single one of them by hand.

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# The Tour Planner Picks Badly

<div class="pain">

A student has exactly one free hour between classes (CampusNav found
this block back in Week 9). Nearby, four things are on offer: grab
coffee (20 minutes, pretty enjoyable), see the gallery (30 minutes,
quite enjoyable), say hi to a friend (10 minutes, mildly enjoyable),
or catch live music at the quad (40 minutes, the most enjoyable single
thing on the list). The team's first attempt at a Tour Planner just
keeps grabbing whichever remaining thing packs the most enjoyment per
minute until the clock runs out: it grabs the live music first, using
40 of the 60 minutes, then only has room left for saying hi to a
friend. Ten minutes sit completely unused, and a classmate who instead
picked coffee <em>and</em> the gallery - or some other combination - walks
away happier, using every one of the 60 minutes.

</div>

<!-- notes: Do not say "greedy," "optimal," or "algorithm" as the point of failure yet - let the class feel that the one-rule pick left something on the table. -->

---

# How Much Enjoyment Got Left on the Table?

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">Team's one-rule pick (best-per-minute first)</div>
  <div class="bar-track"><div class="bar-fill long" style="width: 87%"></div></div>
  <div class="bar-value">48 enjoyment, 10 min unused</div>
</div>
<div class="bar-row">
  <div class="bar-label">Best possible combination</div>
  <div class="bar-track"><div class="bar-fill short" style="width: 100%"></div></div>
  <div class="bar-value">55 enjoyment, 0 min unused</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: the point is the gap, not the exact numbers.</div>

Same four activities, same 60 minutes - a **7-point gap**, just from
picking choices in the wrong order.

<!-- notes: Pause after showing the second bar. Ask: "Is this a bug in the code, or a bug in the plan?" -->

---

<!-- SLOT 5: Cost of not knowing -->

# What Else This Actually Costs

- CampusNav quietly recommends a worse tour than it could - and
  nobody on the team can *prove*, for any future activity list,
  whether the one-rule shortcut is safe or is silently leaving value
  on the table every single time.
- Checking every possible combination by hand (or by brute-force
  code) doesn't scale - the same combinatorial explosion Week 4's
  `fib(5)` call tree slide showed, and Week 4's
  `allOrders` (counting tour orders) showed again.

<div class="why">
<strong>In industry:</strong> "Knapsack," "Coin Change," and "House
Robber"-style problems are among the most frequently asked dynamic
programming interview questions at every major tech company - and in
production, routing, scheduling, and resource-allocation systems all
depend on exactly this kind of reused-subproblem trick to stay fast.
</div>

---

# It Gets Worse As the Choices Grow

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">4 nearby activities</div>
  <div class="bar-track"><div class="bar-fill risk-low" style="width: 15%"></div></div>
  <div class="bar-value">16 combinations - checkable by hand</div>
</div>
<div class="bar-row">
  <div class="bar-label">10 nearby activities</div>
  <div class="bar-track"><div class="bar-fill risk-med" style="width: 55%"></div></div>
  <div class="bar-value">1,024 combinations - tedious, barely possible</div>
</div>
<div class="bar-row">
  <div class="bar-label">20 nearby activities</div>
  <div class="bar-track"><div class="bar-fill risk-high" style="width: 92%"></div></div>
  <div class="bar-value">over 1,000,000 combinations - impossible by hand</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: the point is the trend.</div>

Every extra nearby activity **doubles** the number of combinations to
check. A real campus has a lot more than 20 nearby things to do.

---

<!-- SLOT 6: Driving question -->

# This Week's Question

<div class="driving-q">"How do we find the mathematically best combination of choices, without checking every possible combination by hand?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. State the two necessary conditions for dynamic programming
   (optimal substructure, overlapping subproblems) and test whether a
   new problem has them.
2. Explain memoization and tabulation as two implementations of the
   *same* recurrence, not two different algorithms.
3. Trace a DP table by hand to solve a small knapsack-shaped
   optimization problem (CampusNav's Tour Planner).
4. Explain why last week's greedy rule fails on Tour Planner-shaped
   problems, and connect DP's fix to Week 4's exponential recursion
   blow-up.

---

<!-- Key Words Today, session 1 (kept after Act 1 / MOTIVATE per SPINE.md's no-definition-before-slot-8 rule) -->

# Key Words Today

- **Dynamic programming:** solving a big problem by solving each
  distinct smaller version of it exactly once, and reusing that
  answer every time it's needed again.
- **Optimal substructure:** the best overall answer is built from the
  best answers to its own smaller pieces (shared with greedy, Week 10).
- **Overlapping subproblems:** the same smaller sub-question shows up
  over and over again inside the bigger one (formalized today).
- **Memoization / tabulation:** two different bookkeeping styles for
  never solving the same sub-question twice (formalized today).

<!-- notes: Read each term aloud once. Say these four words are today's whole vocabulary, formalized one at a time. -->

---

<!-- SLOT 8: Origin -->

# This Problem Is Not New

<div class="thread">You just felt the pain. Now: who else felt it, and what did they do?</div>

- **Richard Bellman**, working at the RAND Corporation in the 1950s,
  needed a systematic way to solve multi-stage decision problems -
  break a big decision process into stages, and reuse the solved
  answer to each stage instead of re-deriving it.
- The name itself is a famous accident: Bellman later admitted
  "dynamic programming" was chosen partly because it sounded
  impressive and politically safe to a research-funding sponsor who
  distrusted the words "research" and "mathematical." "Programming"
  here means *planning/scheduling*, nothing to do with writing code.

---

# Where That Idea Went Next

<div class="thread">One insight, decades of reuse - the same shape, over and over.</div>

<div class="why">
The same reuse-a-solved-subproblem idea now underlies route planners,
compilers, spell-checkers, and DNA sequence alignment - anywhere a big
decision breaks into stages that ask the same small question
repeatedly.
</div>

- A route planner never re-solves "shortest path from this
  intersection to downtown" twice - it caches that stage's answer.
- A compiler never re-optimizes the identical sub-expression twice
  inside one function.
- A spell-checker's "closest known word" comparison and a DNA
  aligner's "best match so far" both cache the same kind of
  overlapping subproblem this week formalizes.

---

# A Motivating Example: The Same Question, Asked Millions of Times

<div class="thread">Back to Week 4's `fib(5)` call tree slide. Let's actually measure what that recursion tree cost.</div>

Recall the naive recursive Fibonacci from Week 4's call tree slide:
`fib(n) = fib(n-1) + fib(n-2)`. Its call tree past $n = 5$
has the same smaller calls - `fib(3)`, `fib(2)`, `fib(1)` - reappearing
over and over, deeper and deeper in the tree.

At $n = 30$, that naive tree makes **2,692,537** recursive calls to
compute a single number that an ordinary loop reaches in **30**
additions. Nothing about the *answer* changed - only how many times
we re-asked the same small question.

---

<!-- SLOT 9: Core concept -->

# Dynamic Programming: Definition

<div class="thread">Fifty years of work, and a warm-up you just ran by hand, point at one idea. Here it is, precisely.</div>

> **Dynamic programming** is a technique for solving optimization (or
> counting) problems by breaking them into subproblems, solving each
> *distinct* subproblem exactly once, storing its answer, and
> combining stored answers - applicable exactly when a problem has
> both **optimal substructure** and **overlapping subproblems**.

<div class="graphviz-note">CLRS (Cormen/Leiserson/Rivest/Stein's <em>Introduction to Algorithms</em>) 4th ed - Ch 14, Sections 14.1 (rod cutting) and 14.3 (elements of dynamic programming).</div>

- Optimal substructure *alone* is what already let D&C (Week 9) and
  greedy (Week 10) work directly, with nothing stored.
- The extra ingredient DP adds is **storage**: cache or tabulate each
  distinct subproblem's answer, once.

---

<!-- Key Words Today, session 2 -->

# Key Words Today

- **Recurrence relation:** an equation defining a problem's answer in
  terms of the answers to its own smaller subproblems.
- **Base case:** the smallest subproblem(s), answered directly, with
  no further recursion - where the recurrence bottoms out.
- **DP table / state:** the structure (often an array or grid) that
  holds one stored answer per distinct subproblem.
- **Knapsack problem:** choosing a subset of items, each with a cost
  and a value, to maximize total value under a shared budget - the
  Tour Planner's actual shape.

<!-- notes: Read each term aloud. These pair directly with today's two worked examples. -->

---

<!-- Act 3 / BUILD: Condition 1 -->

# Condition 1: Optimal Substructure - Shared With Greedy, Except...

<div class="thread">The same property that made greedy work last week. Almost.</div>

- **Definition:** the best overall answer is built from the best
  answers to its own subproblems.
- **Tour Planner has it:** the best 60-minute plan either includes the
  live music or it doesn't - whichever way, the rest of the plan must
  be the *best possible* plan for whatever time and activities remain.

---

# The Catch: What DP Adds That Greedy Doesn't

<div class="thread">Same optimal substructure. A different response to it.</div>

- Greedy commits to one locally-best choice and never looks back - it
  bets that today's best-looking option can't hurt the final answer.
- DP's insight is that when the locally-best choice can be *wrong* -
  no greedy-choice property (Week 10) - you must consider a
  subproblem's answer under *every* relevant scenario, not just the
  one greedy would have picked.
- Concretely: greedy Tour Planner asks "what's best right now?" once,
  per step. DP asks "what's the best plan for *every* remaining
  time budget?" and keeps all of those answers around, in case a
  later choice needs one it hasn't picked yet.
- **Test:** room-booking (Week 10) has the greedy-choice property, so
  greedy alone sufficed. Tour Planner does not (the greedy attempt on
  the pain slide already showed it) - it needs the full machinery.

---

<!-- Act 3 / BUILD: Condition 2 -->

# Condition 2: Overlapping Subproblems - Where Have We Seen This?

<div class="thread">Week 4's `fib(5)` call tree slide, revisited.</div>

- **Definition:** the same smaller subproblem recurs many times while
  solving the bigger one.
- Naive recursive `fib(n) = fib(n-1) + fib(n-2)`: the call tree
  re-derives `fib(3)` twice, `fib(2)` three times, and so on -
  exponentially many repeats as $n$ grows. That is overlapping
  subproblems, exactly.
- **Contrast with divide-and-conquer (Week 9):** merge sort's
  subproblems are each *half* of the array - they never repeat. That
  is exactly why D&C never needed to cache anything.

---

# Why You Need Both Conditions, Not Just One

<div class="thread">Overlap alone isn't enough. Optimal substructure alone isn't enough either.</div>

A problem needs **both** conditions before caching is worth doing.
Optimal substructure with no overlap is just recursion (or greedy);
overlap with no optimal substructure isn't an optimization problem
at all.

---

<!-- Rod-cutting comparison, CLRS's classic version of this same idea -->

# CLRS's Classic Version: Rod Cutting

<div class="thread">Same idea, a different costume - the textbook's own worked example.</div>

CLRS Section 14.1 develops this exact recurrence on a different
problem, **rod cutting**: given a rod of length $n$ and a price for
each possible cut length, choose a set of cuts that maximizes total
revenue.

| Rod cutting (CLRS 14.1) | Tour Planner (this deck) |
|---|---|
| A rod of length $n$ | A 60-minute free block |
| Each possible cut length, with its own price | Each activity, with its own duration and enjoyment |
| Choose cuts to maximize total revenue under length $n$ | Choose activities to maximize enjoyment under 60 minutes |

---

# Rod Cutting: The Same Optimal Substructure

<div class="thread">Not just a similar-looking table - the identical argument.</div>

CLRS's rod-cutting recurrence says: the best revenue for a rod of
length $n$ either leaves the rod uncut, or makes one cut and adds the
best revenue for whatever length remains. That is the *same* choice
structure as `best(i,t)` (introduced shortly) - "include this option
or don't, then solve optimally for what's left" - applied to a length
budget instead of a time budget.

<div class="why">
This is why the paradigm, not the problem, is what transfers: once you
can write "include this option or don't, then recurse on the
remainder," you can solve rod cutting, the Tour Planner, or any other
0/1-choice-under-a-budget problem with the same recurrence shape.
</div>

---

<!-- Act 3 / BUILD: quantify the blow-up -->

# Quantifying the Blow-Up

<div class="thread">Not a vague "it's slow." Actual numbers.</div>

| $n$ | Naive recursive calls | Loop iterations (memo/tabulation) |
|---|---|---|
| 10 | 177 | 10 |
| 20 | 21,891 | 20 |
| 30 | 2,692,537 | 30 |

---

# What 90,000x More Work Actually Means

<div class="thread">Same table. Now: why the gap gets worse, not better, as n grows.</div>

At $n = 30$, the naive approach performs roughly **90,000× more work**
than necessary - to compute the exact same number. This is the same
shape of gap you've seen between a slow growth rate and a fast one all
semester, just far more dramatic: here the bad approach isn't linear,
it's exponential ($O(2^n)$ calls) against a fix that's linear ($O(n)$).

- The naive tree's redundant work **doubles**, roughly, with every
  added step - the fix's loop only adds one more addition.
- This is exactly why "it worked on my small test case" is not
  evidence a recursive solution scales: the naive version is fine at
  $n=10$ and catastrophic by $n=30$.

---

<!-- Idea + pseudocode: the two DP implementations, technique 1 (Fibonacci-shaped) -->

# Two Implementations, One Recurrence

<div class="thread">The single most common DP misconception: these are NOT two different algorithms.</div>

<div class="two-col">
<div>

**Memoization (top-down)**
```text
FIB_MEMO(n, cache):
    if n <= 1:
        return n
    if cache[n] is set:
        return cache[n]
    cache[n] = FIB_MEMO(n-1, cache)
             + FIB_MEMO(n-2, cache)
    return cache[n]
```

</div>
<div>

**Tabulation (bottom-up)**
```text
FIB_TAB(n):
    table[0] = 0
    table[1] = 1
    for i = 2 to n:
        table[i] = table[i-1]
                 + table[i-2]
    return table[n]
```

</div>
</div>

---

# Two Implementations, Continued: Only Direction Differs

<div class="thread">Same recurrence as the code on the previous slide.</div>

Same recurrence, same $O(n)$ distinct subproblems solved exactly once,
same $O(n)$ time. Only the **direction** differs: memoization recurses
top-down and fills the cache lazily; tabulation iterates bottom-up and
fills every entry, in order, up front.

---

<!-- Dense worked example, Fibonacci-shaped DP, simple tier (absorbs cut Check-Yourself) -->
<!-- _class: dense -->

<div class="eyebrow">Fibonacci-shaped DP · worked example 1 of 3 (simple)</div>

# Fill the Table by Hand: table[0..6]

<div class="wx-top">
<div class="lead">Two seed values, then the recurrence, one cell at a time.</div>
<div class="goalbox"><span class="k">Goal</span>Using table[i] = table[i-1] + table[i-2], fill table[0] through table[6].</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Seeds</div>
<div class="wx-body">table[0] = 0, table[1] = 1 - the two base cases, given directly, no recursion needed.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">table[2..4]</div>
<div class="wx-body">table[2]=0+1=1. table[3]=1+1=2. table[4]=1+2=3.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">table[5..6]</div>
<div class="wx-body">table[5]=2+3=5. table[6]=3+5=8.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>table[6] = 8 - each cell only ever reads the two cells directly before it.</div>
<div class="takeaway"><span class="k">Key takeaway</span>Nothing here is ever recomputed or re-derived from scratch - that's the entire payoff, visible even on 7 cells.</div>

---

<!-- Dense worked example, Fibonacci-shaped DP, moderate tier -->
<!-- _class: dense -->

<div class="eyebrow">Fibonacci-shaped DP · worked example 2 of 3 (moderate)</div>

# Tabulation, Memoization, and the Cache Fill

<div class="wx-top">
<div class="lead">Same recurrence, two directions - watch memoization's repeats turn into cache hits.</div>
<div class="goalbox"><span class="k">Goal</span>Compare tabulation's table trace to memoization's call tree, on fib(5) through fib(7).</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Tabulation trace</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">i</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">4</div><div class="cell hl2">5</div><div class="cell hl2">6</div><div class="cell hl">7</div></div>
<div class="row"><div class="rowlabel">table[i]</div><div class="cell">0</div><div class="cell">1</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell hl2">5</div><div class="cell hl2">8</div><div class="cell hl">13</div></div>
</div>
table[7] reads two solved neighbors, writes 5+8=13.
</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Memo call tree</div>
<div class="wx-body">FIB_MEMO(5) makes 9 calls total, not 15: FIB_MEMO(4) and FIB_MEMO(3)'s second visits are cache HITs, not new subtrees.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Cache-fill order</div>
<div class="wx-body">cache[2]=1+0=1, cache[3]=1+1=2, cache[4]=2+1=3, cache[5]=3+2=5 - filled in the same ascending order as tabulation.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Only direction differs</div>
<div class="wx-body">Tabulation reaches 2,3,4,5 by looping forward. Memoization reaches the same order by recursing all the way down to the base cases first, then filling on the way back up.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>Both implementations solve the identical recurrence, same cells, same values - only the fill order's direction differs.</div>
<div class="takeaway"><span class="k">Key takeaway</span>"Which one is faster" is the wrong question - they do the same O(n) work. "Which order do I need results in" is the right one.</div>

---

<!-- Dense worked example, Fibonacci-shaped DP, harder tier (real feature + greedy-check, absorbs cut Check-Yourself) -->
<!-- _class: dense -->

<div class="eyebrow">Fibonacci-shaped DP · worked example 3 of 3 (harder)</div>

# The Real Feature: The 20-Step Shortcut Counter

<div class="wx-top">
<div class="lead">Week 9 sped this up numerically. Week 4's handout showed its naive recursion explode. Now, properly.</div>
<div class="goalbox"><span class="k">Goal</span>Count distinct ways to climb 20 steps, 1 or 2 at a time - correctly and fast.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Recurrence</div>
<div class="wx-body">ways(n) = ways(n-1) + ways(n-2), ways(0)=1, ways(1)=1 - Fibonacci's recurrence, wearing a different costume. Optimal substructure: a way to climb n steps is [any way to climb n-1] + a final 1-step, or [any way to climb n-2] + a final 2-step.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Overlap</div>
<div class="wx-body">ways(18) is needed by both ways(19) and ways(20), and by every larger step count above it - overlapping subproblems, exactly.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Tabulate</div>
<div class="wx-body">n=0..8: 1,1,2,3,5,8,13,21,34. Continuing the same loop to n=20 gives <strong>ways(20) = 10,946</strong> - 20 additions, not the millions the naive tree implied at that depth.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Could greedy solve this?</div>
<div class="wx-body">No greedy-choice property exists here: a 1-step hop isn't "better" than a 2-step hop in isolation, since the final count needs BOTH branches counted, not one picked and the other discarded - exactly DP's combination, not greedy's.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>ways(20) = 10,946 distinct routes, computed with 20 additions - not the millions the naive recursive tree implied at that depth.</div>
<div class="takeaway"><span class="k">Key takeaway</span>No locally-best hop exists here - both branches must be counted, not compared and discarded, which is exactly why this needs DP, not greedy. It also shares Fibonacci's exact recurrence shape, just a different story.</div>

---

<!-- Second technique: 0/1 knapsack (Tour Planner). Idea + recurrence merged. -->

# Tour Planner: Conditions and Recurrence

<div class="thread">Back to the greedy Tour Planner's failure. Let's test the two conditions and fix it for real.</div>

Free block: 60 minutes. Activities: Coffee (20 min, enjoyment 15),
Gallery (30 min, enjoyment 25), Friend (10 min, enjoyment 8), Music
(40 min, enjoyment 40). Do each at most once; maximize total enjoyment
without exceeding 60 minutes.

- **Optimal substructure?** Yes - the best plan either includes Music
  or it doesn't; either way, the rest must be the best possible plan
  for whatever time and activities remain.
- **Overlapping subproblems?** Yes - "best plan for 20 minutes using
  {Coffee, Gallery, Friend}" gets asked whether or not Music is
  chosen, and other branches ask it too.

---

# The Tour Planner's Recurrence

<div class="thread">Both conditions hold - here's the recurrence that follows from them.</div>

**Recurrence** (`best(i,t)` = best value using the first $i$
activities within $t$ minutes):

$$
best(i,t) = \max\big(\, best(i{-}1,t),\ \ value_i + best(i{-}1,\ t - duration_i)\, \big)
$$

(the second term only applies **if** $duration_i \le t$ - you can't
spend time you don't have.)

---

<!-- Dense worked example, knapsack-shaped DP, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Tour Planner (0/1 knapsack) · worked example 1 of 3 (simple)</div>

# Two Options, 10 Minutes: Snack or Nap

<div class="wx-top">
<div class="lead">The smallest case that still shows a real include-or-not decision.</div>
<div class="goalbox"><span class="k">Goal</span>Budget 10 minutes. Snack (5 min, value 6) or Nap (8 min, value 10).</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">Two options, one 10-minute budget - only one substantial item fits, plus scraps of time.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Best with just Snack</div>
<div class="wx-body">best(1,10) = 6 (fits, 5 of 10 minutes used).</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Best with Snack or Nap</div>
<div class="wx-body">best(2,10) = max(6, 10 + best(1, 10&minus;8=2)) = max(6, 10+0) = 10. Nap alone wins outright.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>best(2,10) = 10: skipping Snack entirely and taking only Nap beats every combination that includes Snack.</div>
<div class="takeaway"><span class="k">Key takeaway</span>Even with 2 minutes left unused, Nap alone still wins - "don't waste time" isn't the same goal as "maximize value."</div>

---

<!-- Dense worked example, knapsack-shaped DP, moderate tier (full DP table, too large for a card - shown full-width) -->
<!-- _class: dense -->

<div class="eyebrow">Tour Planner (0/1 knapsack) · worked example 2 of 3 (moderate)</div>

# Full Trace: All Four Activities, 60 Minutes

<div class="wx-top">
<div class="lead">Coffee (20min/15), Gallery (30min/25), Friend (10min/8), Music (40min/40).</div>
<div class="goalbox"><span class="k">Goal</span>Fill the DP table row by row, one activity added per row.</div>
</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">min &rarr;</div><div class="cell">0</div><div class="cell">10</div><div class="cell">20</div><div class="cell">30</div><div class="cell">40</div><div class="cell">50</div><div class="cell">60</div></div>
<div class="row"><div class="rowlabel">0 items</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div></div>
<div class="row"><div class="rowlabel">+Coffee</div><div class="cell">0</div><div class="cell">0</div><div class="cell">15</div><div class="cell">15</div><div class="cell">15</div><div class="cell">15</div><div class="cell">15</div></div>
<div class="row"><div class="rowlabel">+Gallery</div><div class="cell">0</div><div class="cell">0</div><div class="cell">15</div><div class="cell">25</div><div class="cell">25</div><div class="cell">40</div><div class="cell">40</div></div>
<div class="row"><div class="rowlabel">+Friend</div><div class="cell">0</div><div class="cell">8</div><div class="cell">15</div><div class="cell">25</div><div class="cell hl2">33</div><div class="cell">40</div><div class="cell">48</div></div>
<div class="row"><div class="rowlabel">+Music</div><div class="cell">0</div><div class="cell">8</div><div class="cell">15</div><div class="cell">25</div><div class="cell">40</div><div class="cell">48</div><div class="cell hl">55</div></div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>best(4,60) = 55 beats greedy's 48 - the optimal plan is Coffee + Music, using every one of the 60 minutes.</div>
<div class="takeaway"><span class="k">Key takeaway</span>Every cell only reads already-filled neighbors - by the time the last cell is reached, its answer is already proven, not guessed.</div>

---

<!-- Dense worked example, knapsack-shaped DP, moderate tier, continued: how the table was actually filled -->
<!-- _class: dense -->

<div class="eyebrow">Tour Planner (0/1 knapsack) · worked example 2 of 3 (moderate), continued</div>

# Full Trace, Continued: Reading Two Key Cells

<div class="wx-top">
<div class="lead">Same table as the previous slide. Here's exactly how two of its cells were filled.</div>
<div class="goalbox"><span class="k">Goal</span>Show the recurrence's two cases at work on real cells from the table.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Filling row by row</div>
<div class="wx-body">Each row adds one more activity to what's allowed; each column is a time budget. The base row (0 items) is all zero.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Where a real choice happens</div>
<div class="wx-body">Row +Friend, column 40: max(best(2,40)=25, 8+best(2,30)=8+25=33) = 33 - including Friend strictly wins here.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Final cell</div>
<div class="wx-body">best(4,60) = max(48, 40+best(3,20)=40+15=55) = 55. Optimal plan: Coffee + Music, exactly 60 minutes, 0 wasted.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>Every row-column combination in the table follows the same two-case recurrence, whether the choice is close (row +Friend) or lopsided (the final cell).</div>
<div class="takeaway"><span class="k">Key takeaway</span>Reading a filled table backward, cell by cell, is exactly how you'd check a claimed answer's work.</div>

---

<!-- Dense worked example, knapsack-shaped DP, harder tier (inside one cell + greedy contrast) -->
<!-- _class: dense -->

<div class="eyebrow">Tour Planner (0/1 knapsack) · worked example 3 of 3 (harder)</div>

# Inside the Cell Where Greedy Went Wrong

<div class="wx-top">
<div class="lead">Ratio-based greedy committed to Music immediately. Here's the table cell that proves it right anyway - for the wrong reason.</div>
<div class="goalbox"><span class="k">Goal</span>Show exactly which comparison DP makes that greedy's ratio rule never does.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Where greedy went wrong</div>
<div class="wx-body">Ratios: Coffee 15/20=0.75, Gallery 25/30&asymp;0.83, Friend 8/10=0.80, Music 40/40=1.00. Best ratio (Music) taken first, 40 of 60 min used; then Friend fits (10 more); Coffee (20 min) no longer fits in the remaining 10. Result: 48 enjoyment, 10 min unused.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">The cell that disagrees: best(4,40)</div>
<div class="wx-body">Exclude Music: best(3,40) = 33 (row +Friend, column 40). Include Music: duration 40 uses the whole budget - 40 + best(3,0) = 40 + 0 = 40.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">max(33, 40) = 40</div>
<div class="wx-body">Including Music wins this sub-decision too - matching DP's eventual full-budget answer of 55 (Coffee+Music), not greedy's 48.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why greedy misses this</div>
<div class="wx-body">Ratio-based greedy commits to Music immediately, without ever checking whether pairing something else with Coffee's leftover budget could beat it. DP keeps every remaining-budget scenario alive - all 7 columns, every row - until the comparison in step 3 actually gets made.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>best(4,40) = 40 - DP proves including Music is right here, but only by comparing against every alternative, not by trusting a ratio.</div>

---

# Inside the Cell, Continued: The Real Payoff

<div class="thread">One cell's comparison, and what it says about the whole technique.</div>

<div class="takeaway">
<span class="k">Key takeaway</span>Greedy asks "what looks best right now?" once. DP asks it for every possible remaining budget, then lets the table itself decide.
</div>

---

<!-- SLOT N-2: Worked example -->

# CampusNav: Tour Planner + Shortcut Counter, Both Solved

<div class="thread">Two features, one technique, both provably correct now.</div>

- The **Tour Planner** now recommends the actual best combination of
  nearby activities for any free block - not a locally-greedy guess -
  using the 0/1 knapsack recurrence above, in $O(\text{activities}
  \times \text{minutes})$ time via tabulation.
- The **20-step shortcut counter**, first attempted recursively back
  in Week 4's handout/worksheet (where its call tree was shown to blow
  up) and sped up numerically in Week 9, is now solved the "right"
  way: a genuine
  $O(n)$ DP that both counts routes *and* explains why it's fast
  (overlapping subproblems, cached).
- Both features ship as the same shape of code: a small table, filled
  once, in one pass.

---

# CampusNav's Real Scale, Compared

<div class="thread">The 4-activity, 20-step examples above were hand-traceable. The real feature is bigger.</div>

At CampusNav's real scale (30 nearby activities, a 120-minute budget),
the Tour Planner's table needs roughly $30 \times 12 = 360$ cells -
versus $2^{30}$ (over a billion) possible activity subsets to
brute-force. Polynomial cells instead of exponential combinations is
DP's entire payoff, at a scale no hand trace could ever reach.

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **"Memoization and tabulation are different algorithms."** No -
  they implement the exact same recurrence. Only the *direction* of
  computation differs (top-down + cache vs. bottom-up + table); the
  code shapes look different, which is exactly why this is tempting.
- **"If a problem is solved recursively, it automatically needs DP."**
  Not true - merge sort (Week 9) is recursive, but its subproblems
  (each half of the array) never repeat. No overlap means caching buys
  nothing but bookkeeping overhead.
- **"Optimal substructure alone is enough to justify DP."** Optimal
  substructure alone is what greedy and D&C already exploit, with
  nothing stored. DP earns its keep only when overlap is *also*
  present.

---

<!-- Key Words Today, session 3 -->

# Key Words Today

- **State:** the specific subproblem a DP table cell represents - e.g.
  "best value using the first $i$ activities within $t$ minutes."
- **State space:** the full set of distinct states a DP table must
  cover - its size determines the table's dimensions and runtime.
- **0/1 knapsack:** the specific knapsack variant where each item is
  either fully taken or fully left out (no splitting) - exactly the
  Tour Planner's shape.
- **Bottom-up order:** the requirement that, by the time tabulation
  computes a cell, every cell it depends on must already be filled.

<!-- notes: Read each term aloud. Say: "state" and "state space" return constantly for the rest of the semester, including graphs in Weeks 13-14. -->

---

# Why This Shows Up in Interviews, Too

<div class="thread">This isn't only about CampusNav.</div>

Search "dynamic programming," "knapsack," or "memoization" in any
technical interview question bank and you'll find hundreds of
problems - Fibonacci variants, coin change, longest paths, edit
distance. Interviewers test exactly this recognition skill: can you
tell, on sight, whether a new problem has *both* required conditions,
and can you write down its recurrence before writing a single line of
code?

<div class="why">
Real systems lean on the same trick constantly: compilers reuse
optimized sub-expressions, spell-checkers reuse edit-distance
subcomputations, and route planners reuse the best-known cost to
intermediate stops - all dynamic programming, under different names.
</div>

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 12 slot 4 -->

# What Today's Dynamic Programming Cannot Do

<div class="limits">
DP now conquers 1-D optimization: a single sequence of choices,
indexed by one running quantity (time, position, or step count). But
many real problems compare or align <em>two</em> separate sequences at
once - two students' course schedules, two DNA-like strings, two
playlists - and a 1-D recurrence like today's has no second dimension
to index the second sequence against.
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 11 leaves **comparing or aligning two separate sequences at
once** unsolved. **Week 12, Dynamic Programming II**, addresses it:
CampusNav's "find a study buddy" feature - comparing two students'
weekly course-code sequences - via the Longest Common Subsequence, a
genuinely 2-D DP recurrence.

---

<!-- CLRS reference slide, Act 4 slot N+3 minus one -->

# Where This Week Lives in CLRS

<div class="thread">Everything above, mapped to the textbook.</div>

| Topic this week | CLRS 4th ed |
|---|---|
| Rod cutting (structural twin of the Tour Planner) | §14.1 |
| Optimal substructure + overlapping subproblems, memoization vs. tabulation | §14.3 |

<div class="why">
<strong>If you want to go deeper</strong> (not required this week):
CLRS §14.2, matrix-chain multiplication - a harder 2-D DP problem
where the choice is *where* to place parentheses, not *whether* to
include an item. Week 12 starts down that same 2-D road with a
different problem (longest common subsequence).
</div>

---

<!-- SLOT N+3: Summary -->

# Summary

- Two necessary conditions - optimal substructure *and* overlapping
  subproblems - decide whether a problem is worth tabulating at all.
- Memoization and tabulation are two implementations of the *same*
  recurrence, not two different algorithms.
- The Tour Planner (0/1 knapsack) and the 20-step shortcut counter
  (climbing stairs) are both solved, provably optimally, with the
  exact same DP machinery Fibonacci taught us.
- **New: Week 11 Check** - a short graded exercise on today's two DP
  techniques, released now, due before Week 12 begins (see
  `materials/assignments/week11-check.html`).

---

# Summary, Continued

- **Reminder:** Assignment 2 (Sorting) results are being returned and
  discussed this week.
- **Reading:** CLRS, Chapter 14 (Dynamic Programming), Sections 14.1
  (rod cutting) and 14.3 (elements of dynamic programming).
- **Prepare:** think of two sequences you'd want to compare (two class
  schedules, two playlists, two strings) - bring one to Week 12.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
