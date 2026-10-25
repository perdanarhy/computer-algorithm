---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 4: Recursion & Recurrence

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703
</div>

<!--
notes: Open with an everyday example of explaining a rule by using the rule itself (e.g. "ask your older sibling, and if they don't know, ask THEIR older sibling"). That self-reference is today's whole topic, long before we call it "recursion."
-->

---

<!-- SLOT 2: Where we are -->

# Where We Are

<div class="roadmap">
<div class="wk"><div class="n">Wk 1</div><div class="t">Introduction</div></div>
<div class="wk"><div class="n">Wk 2</div><div class="t">Algorithm Concepts</div></div>
<div class="wk"><div class="n">Wk 3</div><div class="t">Complexity Analysis</div></div>
<div class="wk now"><div class="n">Wk 4</div><div class="t">Recursion &amp; Recurrence</div></div>
<div class="wk"><div class="n">Wk 5</div><div class="t">Basic Sorting</div></div>
<div class="wk"><div class="n">Wk 6</div><div class="t">Advanced Sorting</div></div>
<div class="wk"><div class="n">Wk 7</div><div class="t">Searching</div></div>
<div class="wk review"><div class="n">Wk 8</div><div class="t">Midterm Exam</div></div>
<div class="wk"><div class="n">Wk 9</div><div class="t">Divide &amp; Conquer</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">Greedy Algorithms</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">Dynamic Programming I</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">Dynamic Programming II</div></div>
<div class="wk"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Point at Week 4. Say: "Last week gave us a ruler for growth rates. This week, we point that ruler at algorithms that call themselves." -->

---

<!-- REWRITTEN: was a discussion warm-up; now teacher-delivered narration that resolves directly -->

# Describe It Using Itself

<div class="thread">A quick warm-up, resolved directly. No code needed yet.</div>

How would you tell a friend to count down out loud from 5 to 1?

- **Method A:** "Start at 5. Say it. Subtract 1. Say that. Keep going until you say 1."
- **Method B:** "To count down from any number N: say N, then count down from N minus 1. To count down from 1: just say '1' and stop."

Only **Method B** describes itself, using itself - "count down from N"
is defined partly in terms of "count down from N minus 1." Method A
never refers back to its own instruction. Notice the one number where
Method B's self-reference stops: **1**, the case answered directly, no
further self-call. That stopping point is today's whole topic, long
before we have a name for it.

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** a precise, provable vocabulary (Big-O) for comparing how algorithms' costs grow - no more guessing whether one method is "better."
- **Last week left broken:** some of CampusNav's algorithms are about to call *themselves*. Big-O tells us how to compare two growth rates once we have them - it does not tell us how to find the growth rate of a formula that refers to itself.

---

<!-- NEW: Key Words Today, session 1 -->

# Key Words Today

- **Recursion:** solving a problem by solving a smaller version of the *same* problem.
- **Base case:** the smallest input a recursive method answers directly, no further self-call.
- **Recursive case:** the step where the method calls itself on something smaller.
- **Call stack:** where the computer keeps track of every call that's still "waiting" for a smaller one to finish.

<!-- notes: Read each term aloud once. Say these four words are today's whole vocabulary, formalized properly in a few minutes. -->

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# The Demo That Never Finished

<div class="pain">

An intern is building CampusNav's new <strong>multi-stop tour</strong> feature:
"take me to the library, then the gym, then my friend's dorm." Timing
it is easy - the total walking time is just the first leg, plus
whatever the rest of the trip takes. Feeling confident, the intern
adds one more button for a class demo: "show me every possible order
to visit these stops, so I can pick the shortest by eye." It works
fine on the 3-stop example. During the live demo, someone picks 10
stops. The laptop fan spins up, the screen freezes, and class ends
before it produces a single order. Nobody in the room can explain
why - it's the exact same idea that worked a minute ago, just with a
few more stops.

</div>

<!-- notes: Do not say "recursion," "recurrence," or "exponential" yet. Let the class feel the freeze first. -->

---

# This Explodes As Stops Grow

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">3 stops (the demo that worked)</div>
  <div class="bar-track"><div class="bar-fill risk-low" style="width: 6%"></div></div>
  <div class="bar-value">6 possible orders</div>
</div>
<div class="bar-row">
  <div class="bar-label">6 stops</div>
  <div class="bar-track"><div class="bar-fill risk-med" style="width: 45%"></div></div>
  <div class="bar-value">720 possible orders</div>
</div>
<div class="bar-row">
  <div class="bar-label">10 stops (what froze the laptop)</div>
  <div class="bar-track"><div class="bar-fill risk-high" style="width: 95%"></div></div>
  <div class="bar-value">3,628,800 possible orders</div>
</div>
</div>
<div class="bar-note">Illustrative widths; the order counts themselves are exact.</div>

Seven more stops turned "instant" into "did not finish before class ended."

<!-- notes: Pause after the third bar. Say: "This is not a bug - it is structural." -->

---

<!-- SLOT 5: Cost of not knowing, split: the app-level cost here, the industry angle next -->

# What This Actually Costs

- A recursive method with no clear stopping point - or one that branches too eagerly - can freeze or crash an app (a **stack overflow**) with zero warning until someone finally hits the input that triggers it.
- Without a way to predict a recursive method's cost *before* running it, "it worked in the demo" tells you nothing about what happens with 10 stops instead of 3, or 1,200 rooms instead of 12.

---

<!-- NEW: continuation - the industry angle, split out of the same slide -->

# What This Actually Costs, In Industry

<div class="why">
<strong>In industry:</strong> tracing a call stack and writing down a
recurrence are two of the most common whiteboard-interview questions
(factorial, Fibonacci, tree traversal) - precisely because they
separate candidates who understand what the machine is actually doing
from those who memorized syntax. Uncontrolled recursion is also a real
production bug: deeply nested or attacker-crafted input has crashed
real parsers and services with stack-overflow errors.
</div>

---

<!-- SLOT 6: Driving question -->

# This Week's Question

<div class="driving-q">"How do we trace, bound, and predict the cost of an algorithm that calls itself?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. Trace a recursive algorithm's call stack by hand, frame by frame, down to the base case and back.
2. Convert a simple recursive algorithm into an equivalent iterative one, and vice versa.
3. Write the recurrence relation that describes a recursive algorithm's cost.
4. Solve a simple recurrence with substitution or a recursion tree, and read the Master Theorem's three cases intuitively.

---

<!-- SLOT 8: Origin, split into two -->

# This Problem Is Not New (1)

<div class="thread">You just felt the pain. Now: who else felt it, and what did they do?</div>

- Self-reference is far older than computers: "$n! = n \times (n-1)!$" and the Fibonacci sequence are centuries-old mathematical definitions written *in terms of themselves*. Mathematical induction - proving a statement for all $n$ by showing it for a base case and then for "$n$ given $n-1$" - is the same idea, formalized for proofs.
- Early programming languages didn't automatically support it: **FORTRAN (1957)** explicitly forbade a procedure from calling itself, because nobody had yet built a runtime mechanism to keep track of many "waiting" calls at once.

---

<!-- NEW: continuation of Origin -->

# This Problem Is Not New (2)

<div class="thread">The mechanism that finally made recursion practical.</div>

<div class="why">
That mechanism is the <strong>call stack</strong>. Once <strong>LISP
(John McCarthy, 1958)</strong> and <strong>ALGOL 60</strong> built it
in, recursive procedures went from mathematical curiosity to a normal
tool - because so many real problems are naturally defined in terms of
smaller versions of themselves.
</div>

---

# A Motivating Example: Defining $n!$ By Itself

<div class="thread">The oldest recursive idea in this course, written out plainly.</div>

$$
n! = \begin{cases} 1 & n = 0 \\ n \times (n-1)! & n > 0 \end{cases}
$$

- $0! = 1$ - an answer given directly, no further self-reference.

---

<!-- NEW: continuation - the expansion trace, split out of the same slide -->

# Unwinding $4!$

<div class="thread">The same definition, expanded one step at a time.</div>

$4! = 4 \times 3! = 4 \times 3 \times 2! = 4 \times 3 \times 2 \times 1! = 4 \times 3 \times 2 \times 1 \times 0!$

Notice the shape: one case that answers directly, one case that
answers in terms of a smaller version of the same question. That shape
is what today formalizes.

---

<!-- SLOT 9: Core concept -->

# Recursion: Definition

<div class="thread">A mathematical habit centuries old, a warm-up you just ran by hand, and a frozen demo all point at one idea. Here it is, precisely (CLRS - Cormen/Leiserson/Rivest/Stein's <em>Introduction to Algorithms</em>, 4th ed, §4.3-4.5).</div>

> A **recursive algorithm** solves a problem by solving one or more
> smaller instances of the *same* problem (the **recursive case**),
> until it reaches an instance small enough to answer directly (the
> **base case**).

---

<!-- NEW: continuation of the core concept, split out of the same slide -->

# Recursion: Base Case vs. Recursive Case

<div class="thread">The definition, unpacked into its two working parts.</div>

- **Base case:** the smallest input the algorithm can answer with no further self-call - it is what *stops* the recursion.
- **Recursive case:** expresses the answer for a bigger input in terms of the answer for a smaller one.

Every recursive algorithm needs both. Miss the base case, and the recursion never stops.

---

<!-- NEW: Key Words Today, session 2 -->

# Key Words Today

- **Recurrence relation:** a formula for an algorithm's cost, written in terms of its own cost on smaller input.
- **Substitution method:** guess the closed-form answer to a recurrence, then prove the guess by induction.
- **Recursion tree:** a diagram of every recursive call, used to sum an algorithm's total cost level by level.
- **Master Theorem:** a shortcut for solving the common divide-and-conquer recurrence shape (previewed today, proven Week 9).

<!-- notes: Read each term aloud. Say these four words return, formalized further, later this session and in Week 9. -->

---

<!-- Act 3 / BUILD: recursion vs. iteration -->

# Recursion vs. Iteration: Same Idea, Two Forms

<div class="thread">Same answer, two different ways to describe "what's left to do."</div>

<div class="two-col">
<div>

**Recursive**
```text
FACTORIAL(n):
    if n == 0:
        return 1
    return n * FACTORIAL(n - 1)
```

</div>
<div>

**Iterative**
```text
FACTORIAL(n):
    result = 1
    for i = 1 to n:
        result = result * i
    return result
```

</div>
</div>

Both compute the same answer. The recursive version trades an
explicit loop counter for the call stack keeping track of "what's left."

---

<!-- NEW: dense worked example, factorial(4) call-stack trace. Merges the old "Going Down" + "Going Up" slides, folds the "frames waiting" Check Yourself content. -->
<!-- _class: dense -->

<div class="eyebrow">Call-stack tracing · worked example</div>

# Tracing the Call Stack: factorial(4)

<div class="wx-top">
<div class="lead">Five frames stack up before a single multiplication happens - then everything unwinds.</div>
<div class="goalbox"><span class="k">Goal</span>Trace factorial(4) all the way down to the base case, and all the way back up.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Going down</div>
<div class="wx-body">factorial(4) needs factorial(3), needs factorial(2), needs factorial(1), needs factorial(0) - five frames stacked, waiting.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Base case hits</div>
<div class="wx-body">factorial(0): the base case. Returns 1 immediately, no further call.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Coming back up</div>
<div class="wx-body">factorial(1) = 1&times;1 = 1. factorial(2) = 2&times;1 = 2. factorial(3) = 3&times;2 = 6.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Final unwind</div>
<div class="wx-body">factorial(4) = 4&times;6 = 24, final answer. The base case is what the whole unwind is built from - it bounds how deep the stack could ever grow.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>factorial(4) = 24, traced through 5 stacked frames and back.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>At the moment factorial(0) returns, four frames are still waiting - factorial(1) through factorial(4) - each paused on its own multiplication until the call below it finishes.</div></div>

---

<!-- MERGED: idea+pseudocode and the condensed trace onto one slide -->

# Another Conversion: Summing 1 to $n$

<div class="thread">Same recursive/iterative shape as factorial - a different base operation, traced in one line.</div>

<div class="two-col">
<div>

**Recursive**
```text
SUM(n):
    if n == 0:
        return 0
    return n + SUM(n - 1)
```

</div>
<div>

**Iterative**
```text
SUM(n):
    total = 0
    for i = 1 to n:
        total = total + i
    return total
```

</div>
</div>

$$
SUM(4) = 4 + SUM(3) = 4+3+SUM(2) = 4+3+2+SUM(1) = 4+3+2+1+SUM(0) = 4+3+2+1+0 = 10
$$

Same recurrence shape as `factorial`: $T(n) = T(n-1) + O(1)$. Five
frames deep, same as `factorial(4)` - the base case `SUM(0) = 0` is
what the whole chain unwinds from.

---

<!-- Act 3 / BUILD: recurrence relations -->

# Recurrence Relations: Writing Cost as a Formula

<div class="thread">Now let's measure the trace we just watched, not just narrate it.</div>

- Each call to `factorial(n)` does $O(1)$ work of its own (one comparison, one multiply) plus whatever `factorial(n-1)` costs.

$$
T(n) = T(n-1) + O(1), \qquad T(0) = O(1)
$$

- This **is** the "self-referential formula" that stumped us at the end of last week - a cost defined in terms of itself, on smaller input.

---

<!-- NEW: continuation - the divide-in-half shape, split out of the same slide -->

# Not Every Recursion Shrinks by One

<div class="thread">A second shape, distinct from `factorial`'s.</div>

Not every recursive algorithm shrinks by 1 each call. Algorithms that
split their input in half give a different shape:

$$
T(n) = 2T(n/2) + O(n)
$$

- We'll meet this exact recurrence again in **Week 6** - it is merge sort's cost.

---

<!-- NEW: induction primer, before the substitution method -->

# A Quick Primer: Mathematical Induction

<div class="thread">Dominoes, not magic - and it's about to become this course's main proof tool.</div>

To prove a statement true for **every** whole number $n$, two steps
replace checking each $n$ one at a time:

1. **Base case:** true for the smallest $n$ (the first domino falls).
2. **Inductive step:** if it's true for some $n$, it must also be true
   for $n+1$ (each falling domino knocks over the next one) - like
   climbing a staircase, knowing each step leads to the next.

<div class="why">
This is exactly what the substitution method, next, does: guess the
closed-form answer, then use induction to prove the guess is right.
</div>

---

<!-- NEW: dense worked example, substitution method, moderate tier -->
<!-- _class: dense -->

<div class="eyebrow">Substitution method · worked example 1 of 2 (moderate)</div>

# Solving $T(n) = T(n-1) + d$ by Substitution

<div class="wx-top">
<div class="lead">Guess the answer, then prove the guess by induction.</div>
<div class="goalbox"><span class="k">Goal</span>Prove T(n) = O(n) for T(n) = T(n&minus;1) + d, some constant d.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Guess</div>
<div class="wx-body">Formally: T(n) &le; cn for a constant c and all n &ge; n0.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Base case</div>
<div class="wx-body">True for small n once c is chosen large enough to cover T(n0).</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Inductive step</div>
<div class="wx-body">Assume T(n&minus;1) &le; c(n&minus;1). Then T(n) = T(n&minus;1)+d &le; c(n&minus;1)+d = cn&minus;c+d &le; cn whenever c &ge; d.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Conclusion</div>
<div class="wx-body">Choosing c=d makes the last step hold. T(n)=O(n) - matching the 4-frame trace hand-counted for factorial(4) above.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>T(n) = T(n&minus;1) + d solves to T(n) = O(n).</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Substitution proves a guess by induction - base case, then an inductive step that carries it for every larger n.</div></div>

---

<!-- NEW: dense worked example, substitution method, harder tier. Reuses the deck's exact existing Check-Yourself recurrence. -->
<!-- _class: dense -->

<div class="eyebrow">Substitution method · worked example 2 of 2 (harder)</div>

# A New Recurrence: $T(n) = T(n-1) + 3$, $T(0) = 1$

<div class="wx-top">
<div class="lead">Same method, a concrete constant this time - and a limit on what substitution can actually do for you.</div>
<div class="goalbox"><span class="k">Goal</span>Find a constant c that makes the inductive step hold, then see what substitution cannot supply.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Guess</div>
<div class="wx-body">T(n) = O(n), i.e. T(n) &le; cn for n &ge; n0.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Inductive step</div>
<div class="wx-body">T(n) = T(n&minus;1)+3 &le; c(n&minus;1)+3 = cn&minus;c+3 &le; cn exactly when c &ge; 3. Any c &ge; 3 works - choose c=3.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Base case</div>
<div class="wx-body">T(0)=1 &le; c&middot;n0 for a suitable n0 (e.g. n0=1, c=3: 1 &le; 3, holds).</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">What substitution can't do</div>
<div class="wx-body">The method only verifies a guess - it never tells you what to guess. That's exactly why the recursion-tree method, next, is useful even when substitution is available: it can suggest a guess to check.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>c=3, n0=1 proves T(n) = T(n&minus;1)+3, T(0)=1 solves to T(n) = O(n).</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Substitution proves; it doesn't propose. A recursion tree, next, can propose the guess in the first place.</div></div>

---

<!-- NEW: dense worked example, recursion-tree method, moderate tier (Master Theorem Case 2 shape) -->
<!-- _class: dense -->

<div class="eyebrow">Recursion-tree method · worked example 1 of 2 (moderate)</div>

# Drawing the Tree: $T(n) = 2T(n/2) + O(n)$

<div class="wx-top">
<div class="lead">Instead of guessing, draw every call and sum the work level by level.</div>
<div class="goalbox"><span class="k">Goal</span>Sum this divide-and-conquer recurrence level by level to a closed form.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Level 0</div>
<div class="wx-body">1 subproblem, size n. Cost: n.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Level 1</div>
<div class="wx-body">2 subproblems, size n/2 each. Cost: 2&middot;(n/2) = n.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Level 2 and on</div>
<div class="wx-body">4 subproblems, size n/4: cost 4&middot;(n/4) = n. The pattern holds - every level costs about n.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Total</div>
<div class="wx-body">log&#8322;n + 1 levels, each costing about n: T(n) = n(log&#8322;n + 1) = O(n log n) - reused, unpreviewed, starting Week 6.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>T(n) = 2T(n/2) + O(n) solves to T(n) = O(n log n).</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Every level here costs the same - that flat pattern is the signature of Master Theorem Case 2, next.</div></div>

---

<!-- NEW: dense worked example, recursion-tree method, harder tier (Master Theorem Case 1 shape) -->
<!-- _class: dense -->

<div class="eyebrow">Recursion-tree method · worked example 2 of 2 (harder)</div>

# A Different Split Factor: $T(n) = 3T(n/2) + n$

<div class="wx-top">
<div class="lead">Same method, but the branching factor now outpaces the halving of size.</div>
<div class="goalbox"><span class="k">Goal</span>Show what happens when each level costs <em>more</em> than the last.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Level 0</div>
<div class="wx-body">1 subproblem, size n. Cost: n.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Levels 1-2</div>
<div class="wx-body">Level 1: 3 subproblems, size n/2, cost 3&middot;(n/2) = 1.5n. Level 2: 9 subproblems, size n/4, cost 9&middot;(n/4) = 2.25n. Costs are <em>growing</em>, not flat.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Bottom level</div>
<div class="wx-body">log&#8322;n levels down: 3<sup>log&#8322;n</sup> = n<sup>log&#8322;3</sup> &asymp; n<sup>1.585</sup> leaves, each O(1). The sum is dominated by this bottom level.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Result</div>
<div class="wx-body">T(n) = &Theta;(n<sup>log&#8322;3</sup>) &asymp; &Theta;(n<sup>1.585</sup>) - Master Theorem <strong>Case 1</strong> (many small subproblems dominate), unlike the last example's Case 2.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>T(n) = 3T(n/2) + n solves to T(n) = &Theta;(n<sup>log&#8322;3</sup>).</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>When per-level cost grows instead of staying flat, the leaves - not the top - dominate the sum.</div></div>

---

# A First Look: the Master Theorem

<div class="thread">Intuition only today - the real conditions and proof wait for Week 9.</div>

For $T(n) = aT(n/b) + f(n)$, compare $f(n)$ against $n^{\log_b a}$:

| Case | When | Intuition | Result |
|---|---|---|---|
| 1 | $f(n)$ grows slower | the many small subproblems (leaves) dominate | $T(n) = \Theta(n^{\log_b a})$ |
| 2 | $f(n)$ grows about the same | every level costs about the same | $T(n) = \Theta(n^{\log_b a}\log n)$ |
| 3 | $f(n)$ grows faster | the split itself dominates | $T(n) = \Theta(f(n))$ |

Merge sort ($a{=}2, b{=}2, f(n){=}n$) lands in **Case 2** - matching
the recursion-tree result exactly. $T(n) = 3T(n/2) + n$
($a{=}3,b{=}2,f(n){=}n$) lands in **Case 1**, since $f(n)=n$ grows
slower than $n^{\log_2 3}$ - matching the tree above too.

---

<!-- NEW: dense worked example, applying the Master Theorem. Folds the old Check Yourself pair, reusing its exact recurrences. -->
<!-- _class: dense -->

<div class="eyebrow">Master Theorem · worked example</div>

# Two More Recurrences, Classified

<div class="wx-top">
<div class="lead">Same table as above, applied cold to two new recurrences.</div>
<div class="goalbox"><span class="k">Goal</span>Classify each recurrence's case, then read off its closed form.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">T(n) = 4T(n/2) + n&sup2;</div>
<div class="wx-body">n<sup>log&#8322;4</sup> = n&sup2;. f(n) = n&sup2; grows <strong>about the same</strong> &rarr; Case 2: T(n) = &Theta;(n&sup2; log n).</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">T(n) = T(n/2) + 1</div>
<div class="wx-body">n<sup>log&#8322;1</sup> = n&#8304; = 1. f(n) = 1 grows about the same &rarr; Case 2: T(n) = &Theta;(log n) - binary search's cost, previewed for Week 7.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Same signature as merge sort</div>
<div class="wx-body">Both land in Case 2, the same case as T(n) = 2T(n/2) + O(n) above - every level costing about the same is the recurring signature of Case 2.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Both recurrences classify as Case 2, giving &Theta;(n&sup2; log n) and &Theta;(log n) respectively.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Classifying a recurrence is a three-way comparison: does f(n) grow slower than, the same as, or faster than n<sup>log_b a</sup>?</div></div>

---

<!-- Act 3 / BUILD: CampusNav worked example, part 1 -->

# CampusNav: The Multi-Stop Tour, Recursively

<div class="thread">Back to the intern's feature. Now let's actually measure it.</div>

"Visit the library, then the gym, then a friend's dorm":

$$
\text{tourTime(stops)} = \text{walk(here} \to \text{stops[0])} + \text{tourTime(stops[1:]}), \qquad \text{tourTime([]) = 0}
$$

- Total time = the first leg, plus the recursive time for the rest - a base case (no stops left) and a recursive case, exactly as defined a few slides ago.
- Its recurrence is $T(n) = T(n-1) + O(1)$ - the **exact same shape as `factorial`**. This part of the feature is cheap and well-behaved.

---

<!-- SLOT N-2: Worked example. Dense conversion of the feature that actually froze. -->
<!-- _class: dense -->

<div class="eyebrow">CampusNav · the feature that froze</div>

# Counting All Tour Orders - the Trap

<div class="wx-top">
<div class="lead">"Show me every possible order" branches at every remaining stop.</div>
<div class="goalbox"><span class="k">Goal</span>Show why this feature explodes, when `tourTime` above didn't.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">The formula</div>
<div class="wx-body">allOrders(remaining) = sum, over every next stop in remaining, of allOrders(remaining minus next stop). allOrders(&empty;) = 1.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">3 stops</div>
<div class="wx-body">The recursion tree branches 3 &rarr; 2 &rarr; 1, giving 3! = 6 leaves - the demo's 6 orders.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why it explodes</div>
<div class="wx-body">Each extra stop <em>multiplies</em>, not adds, to the tree. `allOrders` is slow because it genuinely branches into more distinct choices at every level - there is no repeated work to eliminate, only an unavoidably large number of true orderings.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>The recursion itself isn't the problem - `tourTime` above was just as recursive and stayed cheap. `allOrders` explodes because it branches into every remaining stop at every level.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Week 11's Dynamic Programming stops re-deriving the same partial answers - but that fix only helps when answers actually repeat, which is exactly what the next example checks.</div></div>

---

<!-- NEW: naive Fibonacci call tree, makes "re-deriving the same partial answers" concrete -->

# The `fib(5)` Call Tree

<div class="thread">Naive recursive `fib(n) = fib(n-1) + fib(n-2)`, drawn out - a different disease from `allOrders`.</div>

```text
fib(5)
├─ fib(4)
│   ├─ fib(3)
│   │   ├─ fib(2)
│   │   │   ├─ fib(1)  [base]
│   │   │   └─ fib(0)  [base]
│   │   └─ fib(1)  [base]
│   └─ fib(2)
│       ├─ fib(1)  [base]
│       └─ fib(0)  [base]
└─ fib(3)
    ├─ fib(2)
    │   ├─ fib(1)  [base]
    │   └─ fib(0)  [base]
    └─ fib(1)  [base]
```

---

<!-- NEW: dense worked example, the waste counted. Folds the old Check Yourself "Two Different Diseases" pair. -->
<!-- _class: dense -->

<div class="eyebrow">Naive Fibonacci · a different disease</div>

# The Waste, Counted

<div class="wx-top">
<div class="lead">Same tree as the last slide. Now count the repeats, and compare to `allOrders`.</div>
<div class="goalbox"><span class="k">Goal</span>Show that "slow and recursive" is not one disease - and that only one of the two responds to the same cure.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Count the repeats</div>
<div class="wx-body">`fib(3)` computed twice, `fib(2)` three times, `fib(1)` five times - 15 total calls to answer one number a loop reaches in 5 additions.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">A different disease than `allOrders`</div>
<div class="wx-body">Nothing here branches into ever-more choices - the same two smaller subproblems just get asked for, over and over. Week 11 names this <em>overlapping subproblems</em>.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Would an iterative rewrite fix it?</div>
<div class="wx-body"><strong>Yes for `fib`</strong> - storing each `fib(k)` once turns 15 calls into 6, an O(n) pass (exactly Week 11's dynamic programming). <strong>No for `allOrders`</strong> - there is no repeated subproblem to cache; every one of the n! orderings is genuinely distinct, so an iterative rewrite still does n! work.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>`allOrders` and naive `fib` are both exponential-ish, but for structurally different reasons - branching vs. redundant recomputation.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Diagnosing which disease you have determines whether memoization (Week 11) can even help.</div></div>

---

<!-- SLOT N-1: Common mistakes, merged into one slide -->

# Common Mistakes

- **"Recursion is always less efficient than iteration."** Tempting because every recursive call has function-call overhead - but the real cost driver is how *many* calls happen and whether they repeat work. `factorial` and `tourTime` are just as cheap, $O(n)$, as their iterative twins; `allOrders` is expensive because of its branching shape, not because it recurses.
- **"The base case is just where you stop."** Tempting because it feels like a technicality. It is actually what *bounds the entire recursion tree's depth* (and, once a method branches, its size) - miss it, or shrink the wrong thing, and the tree never stops growing.

---

<!-- NEW: Key Words Today, session 3 -->

# Key Words Today

- **Divide-and-conquer:** split a problem in half, solve each half recursively, combine - previewed today, formalized Week 9.
- **Memoization:** storing a recursive call's answer so it's never recomputed - the fix `allOrders` is missing, coming Week 11.
- **Stack overflow:** a crash caused by too many "waiting" call-stack frames at once - recursion's real-world failure mode.
- **Closed-form solution:** a formula for $T(n)$ with no recurrence left in it - what substitution and the recursion tree both produce.

<!-- notes: Read each term aloud. Say: "Memoization is the one word to remember - it's exactly what Week 11 adds to fix today's exploding tree." -->

---

# Recursion Shows Up Everywhere

<div class="thread">CampusNav is one example. This shape is everywhere.</div>

<div class="chip-row">
<div class="chip">File system folders</div>
<div class="chip">Nested JSON / HTML</div>
<div class="chip">Tree &amp; graph traversal</div>
<div class="chip">Divide-and-conquer</div>
<div class="chip">Backtracking search</div>
<div class="chip">Parsing expressions</div>
</div>

Any structure that contains smaller versions of itself - a folder
containing folders, a sentence containing clauses, a tree containing
subtrees - is naturally described recursively.

---

# Why This Also Matters Beyond CampusNav

<div class="why">
<strong>Security-relevant, not just academic:</strong> real parsers
and interpreters have crashed in production from deeply nested or
adversarially crafted input hitting an unbounded recursive case -
attackers have used this deliberately. Knowing that a base case bounds
depth is not a technicality; it's a correctness and safety property.
</div>

Every advanced course after this one - compilers, databases, systems -
assumes you can look at a self-referential structure and reason
about it without flinching.

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 5 slot 4 -->

# What Today's Toolkit Cannot Do

<div class="limits">
We can now trace a recursive call stack frame by frame, write down
the recurrence that describes its cost, and solve that recurrence
with substitution, a recursion tree, or an intuitive read of the
Master Theorem. But none of that gives CampusNav a <em>fast</em>
algorithm - right now, "find a room" and "put the directory in order"
still mean scanning an unsorted list and hoping. We have a real
toolkit for measuring cost, but still just an unsorted array and
brute force for actually reducing it.
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 4 leaves CampusNav with **an unsorted room directory and nothing
but brute-force scans** to search it. **Week 5, Basic Sorting**,
addresses it: the first real algorithms for putting that directory in
order, traced and proven correct by hand.

---

<!-- NEW: "Where This Week Lives in CLRS" reference slide, immediately before Summary -->

# Where This Week Lives in CLRS

<div class="thread">This week's ideas, mapped to the textbook.</div>

| This week's topic | CLRS 4th ed |
|---|---|
| Substitution method | §4.3 |
| Recursion-tree method | §4.4 |
| Master method | §4.5 |

**If you want to go deeper:** §4.6-4.7 cover the continuous Master
theorem and Akra-Bazzi recurrences, for shapes that don't fit the
standard Master method - useful once you meet a recurrence that
doesn't cleanly match one of today's three cases. (§4.1-4.2, matrix
multiplication and Strassen's algorithm, are not this week's
reading - they return in **Week 9**.)

---

<!-- SLOT N+3: Summary -->

# Summary

- A recursive algorithm is defined by a **base case** (where it stops) and a **recursive case** (where it calls itself on something smaller) - miss the base case and the recursion never stops.
- Tracing `factorial(4)`'s call stack shows exactly what's "waiting" at each depth, and why the base case bounds that depth.
- A recursive algorithm's cost is a **recurrence relation**; substitution (guess + prove by induction) and the recursion tree (sum level by level) both solve one, and the Master Theorem previews a shortcut for the divide-and-conquer shape (full rigor Week 9).
- Recursion itself isn't slow - `tourTime` and `factorial` are both $O(n)$; `allOrders` explodes from *branching*, not recursion, and that is exactly what Week 11's DP will fix.

---

<!-- SPLIT for overflow -->

# Summary, Continued

- **New: Week 4 Check** - a short graded exercise on call-stack tracing, recurrences, and the recursion-tree method, released now, due before Week 5 begins (see `materials/assignments/week04-check.html`).
- **Reading:** CLRS 4th ed, §4.3-4.5 - no exercises due.
- **Prepare:** think about how you'd put a shuffled stack of 10 index cards in order by hand. Bring your method to Week 5.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
