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
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
</div>

<!--
notes: Welcome the class. Ask: "Last week you proved greedy could be wrong. Who remembers the campus-points {1,3,4} example where the greedy answer wasn't the best one?" Let a few students recall it. That is today's hook.
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

<!-- NEW: warm-up, placed right after the roadmap (slot 2) per course design -->

# Before We Start: How Many Ways to Climb?

<div class="thread">A quick warm-up. No code needed yet.</div>

A short staircase has **4 steps**. You can climb **1 or 2 steps** at a
time. By hand, list every distinct order of hops that gets you from
the bottom to the top.

- How many total ways did you find for 4 steps?
- Now try 5 steps. Did you have to start over from scratch - or could
  you reuse counting you already did for the smaller staircases?

<!--
notes: Give students 60 seconds. Expected answer for 4 steps: 5 ways
(1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2). For 5 steps: 8 ways. Push on the
second bullet - someone will notice "5 steps = (do 1 step, then solve
the 4-step problem) or (do 2 steps, then solve the 3-step problem)."
Do not name "dynamic programming" yet.
-->

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

<!-- _class: section -->

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

<!-- NEW: Key Words Today, session 1 (moved after Act 1 / MOTIVATE per SPINE.md's no-definition-before-slot-8 rule) -->

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

<!-- NEW: session-1 close, previews Worksheet Part A -->

# Coming Up: Worksheet Part A

<div class="thread">Next in this class: less listening, more doing.</div>

Later today, you and a partner will fill a small DP table by hand for
a Tour Planner instance of your own - different numbers than the
slides, same idea.

That is **Worksheet Part A**. Keep a pen ready.

---

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: who invented this, and what forced it?</div>

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

<div class="why">
The same reuse-a-solved-subproblem idea now underlies route planners,
compilers, spell-checkers, and DNA sequence alignment - anywhere a big
decision breaks into stages that ask the same small question
repeatedly.
</div>

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

- Optimal substructure *alone* is what already let D&C (Week 9) and
  greedy (Week 10) work directly, with nothing stored.
- The extra ingredient DP adds is **storage**: cache or tabulate each
  distinct subproblem's answer, once.

---

<!-- NEW: Key Words Today, session 2 -->

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

# Condition 1: Optimal Substructure - Shared With Greedy, Except…

<div class="thread">The same property that made greedy work last week. Almost.</div>

- **Definition:** the best overall answer is built from the best
  answers to its own subproblems.
- **Tour Planner has it:** the best 60-minute plan either includes the
  live music or it doesn't - whichever way, the rest of the plan must
  be the *best possible* plan for whatever time and activities remain.
- **The catch:** greedy commits to one locally-best choice and never
  looks back. DP's insight is that when the locally-best choice can be
  *wrong* - no greedy-choice property (Week 10) - you must consider a
  subproblem's answer under *every* relevant scenario, not just the
  one greedy would have picked.

---

# Telling Greedy and DP Problems Apart

<div class="thread">Same optimal substructure. Different test for which technique applies.</div>

**Test:** room-booking (Week 10) has the greedy-choice property, so
greedy alone sufficed. Tour Planner does not (the greedy Tour Planner
attempt earlier this session already showed it) - it needs the full
machinery.

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

<!-- Act 3 / BUILD: quantify the blow-up -->

# Quantifying the Blow-Up

<div class="thread">Not a vague "it's slow." Actual numbers.</div>

| $n$ | Naive recursive calls | Loop iterations (memo/tabulation) |
|---|---|---|
| 10 | 177 | 10 |
| 20 | 21,891 | 20 |
| 30 | 2,692,537 | 30 |

At $n = 30$, the naive approach performs roughly **90,000× more work**
than necessary - to compute the exact same number. This is the same
shape of gap you've seen between a slow growth rate and a fast one all
semester, just far more dramatic: here the bad approach isn't linear,
it's exponential ($O(2^n)$ calls) against a fix that's linear ($O(n)$).

---

<!-- Act 3 / BUILD: misconception correction, memo vs tabulation -->

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

# Same Recurrence, Only the Direction Differs

<div class="thread">Both implementations above solve the identical recurrence.</div>

Same recurrence (`table[i] = table[i-1] + table[i-2]`), same $O(n)$
distinct subproblems solved exactly once, same $O(n)$ time. Only the
**direction** differs: memoization recurses top-down and fills the
cache lazily, as needed; tabulation iterates bottom-up and fills every
entry, in order, up front.

---

<!-- Act 3 / BUILD: Fibonacci table trace -->

# Trace: Filling the Fibonacci Table

<div class="thread">Tabulation, one cell at a time.</div>

`table[i] = table[i-1] + table[i-2]`, built left to right:

<div class="tracetable">
<div class="row"><div class="rowlabel">i</div>
<div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">4</div><div class="cell hl2">5</div><div class="cell hl2">6</div><div class="cell hl">7</div><div class="cell">8</div><div class="cell">9</div><div class="cell">10</div>
</div>
<div class="row"><div class="rowlabel">table[i]</div>
<div class="cell">0</div><div class="cell">1</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell hl2">5</div><div class="cell hl2">8</div><div class="cell hl">13</div><div class="cell">21</div><div class="cell">34</div><div class="cell">55</div>
</div>
</div>

`table[7]` (gold cells) reads two already-solved neighbors - never
recomputes them - and writes `table[7] = 5 + 8 = 13` (blue cell). Every
cell is touched exactly once, in either implementation.

---

<!-- NEW: memoization cache-fill trace, pairs with the tabulation trace above -->

# Trace: FIB_MEMO's Call Tree

<div class="thread">Same fib(5). Top-down this time - watch repeats turn into cache hits.</div>

```text
FIB_MEMO(5)
├─ FIB_MEMO(4)
│   ├─ FIB_MEMO(3)
│   │   ├─ FIB_MEMO(2)
│   │   │   ├─ FIB_MEMO(1)  [base]
│   │   │   └─ FIB_MEMO(0)  [base]
│   │   └─ FIB_MEMO(1)  [base]
│   └─ FIB_MEMO(2)  [cache HIT]
└─ FIB_MEMO(3)  [cache HIT]
```

Compare to Week 4's naive `fib(5)` tree (15 calls, `fib(3)` expanded
twice, `fib(2)` expanded three times): this tree has only **9** calls,
and `fib(3)` and `fib(2)`'s *second* visits are one-line cache hits,
not new subtrees.

---

# Trace: FIB_MEMO's Cache-Fill Order

<div class="thread">Same tree. Now the cache, filled in the order recursion actually returns.</div>

| Fill # | Cache entry | Computed as | Value |
|---|---|---|---|
| 1 | `cache[2]` | `FIB_MEMO(1) + FIB_MEMO(0)` = 1 + 0 | 1 |
| 2 | `cache[3]` | `cache[2] + FIB_MEMO(1)` = 1 + 1 | 2 |
| 3 | `cache[4]` | `cache[3] + cache[2]` = 2 + 1 | 3 |
| 4 | `cache[5]` | `cache[4] + cache[3]` = 3 + 2 | 5 |

The cache fills in the same ascending order tabulation used
(`2, 3, 4, 5`) - but memoization *reaches* that order by recursing all
the way down to the base cases first, then filling on the way back up,
not by looping forward from the start.

---

<!-- Act 3 / BUILD: worked example 3, climbing stairs fixed -->

# Worked Example: The "20-Step Shortcut," Finally Fixed

<div class="thread">Week 9 sped this up with a numeric trick. Week 4's handout/worksheet showed this same recurrence (Fibonacci) explode. Now, properly.</div>

- Recall CampusNav's shortcut counter: how many distinct ways to climb
  $n$ steps, taking 1 or 2 steps at a time?
- **Recurrence:** `ways(n) = ways(n-1) + ways(n-2)`, `ways(0) = 1`,
  `ways(1) = 1` - Fibonacci's recurrence, wearing a different costume.
- **Optimal substructure:** a way to climb $n$ steps is either [any
  way to climb $n-1$] plus one final 1-step, or [any way to climb
  $n-2$] plus one final 2-step.
- **Overlapping subproblems:** `ways(18)` is needed by both
  `ways(19)` and `ways(20)` - and by every larger step count above it.

---

# Tabulating It: 20 Additions, Not Millions

<div class="thread">Same recurrence Week 4's handout/worksheet traced exploding, as Fibonacci. This time, filled bottom-up.</div>

Tabulate it: $O(n)$ time. For the real 20-step shortcut,
**ways(20) = 10,946** distinct routes - 20 additions, not the
millions of calls that same naive tree implied at that depth.

<div class="tracetable">
<div class="row"><div class="rowlabel">n</div>
<div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">4</div><div class="cell">5</div><div class="cell">6</div><div class="cell">7</div><div class="cell">8</div>
</div>
<div class="row"><div class="rowlabel">ways(n)</div>
<div class="cell">1</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">5</div><div class="cell">8</div><div class="cell">13</div><div class="cell">21</div><div class="cell">34</div>
</div>
</div>

---

<!-- Act 3 / BUILD: worked example 2, Tour Planner setup -->

# Worked Example: The Tour Planner, Solved Properly

<div class="thread">Back to the greedy Tour Planner's failure. Let's test the two conditions and fix it for real.</div>

Free block: **60 minutes**. Activities: Coffee (20 min, enjoyment 15),
Gallery (30 min, enjoyment 25), Friend (10 min, enjoyment 8), Music
(40 min, enjoyment 40). Do each at most once; maximize total
enjoyment without exceeding 60 minutes.

- **Optimal substructure?** Yes - the best plan either includes Music
  or it doesn't; either way, the rest must be the best possible plan
  for whatever time and activities remain.
- **Overlapping subproblems?** Yes - "best plan for 20 minutes using
  {Coffee, Gallery, Friend}" gets asked whether or not Music is
  chosen, and other branches ask it too.

---

# The Tour Planner's Recurrence

<div class="thread">Both conditions hold - here's the recurrence that follows from them.</div>

**Recurrence** (`best(i, t)` = best value using the first $i$
activities within $t$ minutes):

$$
best(i,t) = \max\big(\, best(i{-}1,t),\ \ value_i + best(i{-}1,\ t - duration_i)\, \big)
$$

(the second term only applies **if** $duration_i \le t$ - you can't
spend time you don't have.)

---

<!-- Act 3 / BUILD: Tour Planner table trace -->

# Trace: Filling the Tour Planner Table

<div class="thread">This table proves the best answer - it isn't just a lucky guess.</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">min →</div>
<div class="cell">0</div><div class="cell">10</div><div class="cell">20</div><div class="cell">30</div><div class="cell">40</div><div class="cell">50</div><div class="cell">60</div>
</div>
<div class="row"><div class="rowlabel">0 items</div>
<div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div>
</div>
<div class="row"><div class="rowlabel">+Coffee</div>
<div class="cell">0</div><div class="cell">0</div><div class="cell">15</div><div class="cell">15</div><div class="cell">15</div><div class="cell">15</div><div class="cell">15</div>
</div>
<div class="row"><div class="rowlabel">+Gallery</div>
<div class="cell">0</div><div class="cell">0</div><div class="cell">15</div><div class="cell">25</div><div class="cell">25</div><div class="cell">40</div><div class="cell">40</div>
</div>
<div class="row"><div class="rowlabel">+Friend</div>
<div class="cell">0</div><div class="cell">8</div><div class="cell hl2">15</div><div class="cell">25</div><div class="cell">33</div><div class="cell">40</div><div class="cell">48</div>
</div>
<div class="row"><div class="rowlabel">+Music</div>
<div class="cell">0</div><div class="cell">8</div><div class="cell">15</div><div class="cell">25</div><div class="cell">40</div><div class="cell">48</div><div class="cell hl">55</div>
</div>
</div>

The final cell (blue) reads `best(3, 20) = 15` (gold) and adds Music's
40 → **55**, beating the 48 that "best-per-minute first" found
earlier. The optimal plan: **Coffee + Music**, exactly 60 minutes, 0
minutes wasted.

---

<!-- NEW: interior-cell trace, where max() genuinely has to choose -->

# Inside One Cell: best(Music, 40)

<div class="thread">The final cell adds Music. Here's the earlier cell where that decision actually gets made.</div>

`best(4, 40)`: best value using all four activities, 40 minutes
available. `max()` compares two real options:

| Option | Value |
|---|---|
| **Exclude Music:** `best(3, 40)` (the "+Friend" row, column 40) | 33 |
| **Include Music:** duration 40 uses the whole budget - `40 + best(3, 40-40)` = `40 + best(3, 0)` = `40 + 0` | 40 |

$\max(33, 40) = 40$ - **including Music wins**, because Music's own
value (40) alone already beats the best 40-minute plan without it
(33). This is the exact cell that later combines with Coffee's
leftover 20 minutes to produce the final 55.

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

<!-- SLOT N: Check yourself -->

# Check Yourself

1. A friend claims "climbing stairs and Fibonacci are basically the
   same problem." Are they right? Why?
2. CampusNav's real activity list has 30 nearby activities and a free
   block up to 120 minutes. Roughly how many DP table cells get
   filled - and is that more or less than trying every possible
   subset of 30 activities by hand?
3. Give one reason a recursive solution to a problem might **not**
   benefit from memoization.

---

# Answers

1. Yes - both follow the exact same recurrence shape (each answer is
   the sum of the previous two), just different starting values and a
   different story. That's precisely why "two implementations of one
   recurrence" and "two problems sharing one recurrence" are both real,
   common patterns.
2. Roughly $30 \times 12 = 360$ table cells (in 10-minute units) -
   utterly manageable, versus $2^{30}$ (over a billion) possible
   activity subsets to brute-force. Polynomial cells instead of
   exponential combinations is DP's entire payoff.
3. If its subproblems never repeat (e.g. merge sort's halves), caching
   never gets a hit - memoization adds overhead with zero benefit. The
   problem lacks overlapping subproblems.

---

<!-- NEW: Worksheet Parts A & B hand-off -->

# Now: Worksheet Parts A & B

<div class="thread">Time to practice. Fill a table, then spot the pattern.</div>

Work with your neighbor. Open **[Worksheet Part A & B](materials/week11/worksheet.html)**.
Part A: fill a small Tour Planner-style DP table by hand. Part B, in
pairs: for three new mini-problems, decide **(a)** does it have
optimal substructure, **(b)** does it have overlapping subproblems,
and **(c)** write its recurrence - including one problem that turns
out *not* to need DP at all.

**~20 minutes.** Raise your hand if you get stuck.

<!--
notes: Hand out or project the worksheet. Walk the room while pairs
work. After ~20 minutes, ask 2 pairs to share their Part B answer for
the "trap" problem (merge sort) and discuss why it doesn't need DP.
-->

---

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: where this technique shows up beyond CampusNav.</div>

---

<!-- NEW: Key Words Today, session 3 -->

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

<!-- NEW: quiz hand-off -->

# Now: Quick Self-Check Quiz

<div class="thread">Ungraded. Just for you, to see what stuck.</div>

Open the **[Week 11 Quiz](materials/week11/quiz.html)**. Answer on
your own, about 10 minutes. Check your own answers at the end. Ask if
anything surprises you.

<!--
notes: Distribute or project the quiz. After about 10 minutes, reveal
the answer key and discuss as a group any question most of the class
missed.
-->

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

<!-- SLOT N+3: Summary -->

# Summary

- Two necessary conditions - optimal substructure *and* overlapping
  subproblems - decide whether a problem is worth tabulating at all.
- Memoization and tabulation are two implementations of the *same*
  recurrence, not two different algorithms.
- The Tour Planner (0/1 knapsack) and the 20-step shortcut counter
  (climbing stairs) are both solved, provably optimally, with the
  exact same DP machinery Fibonacci taught us.
- **Reminder:** Assignment 2 (Sorting) results are being returned and
  discussed this week.
- **Reading:** CLRS, Dynamic Programming chapter (Ch. 14) - focus on
  the rod-cutting and elements-of-DP sections.
- **Prepare:** think of two sequences you'd want to compare (two class
  schedules, two playlists, two strings) - bring one to Week 12.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
