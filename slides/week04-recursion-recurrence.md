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
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
</div>

<!--
notes: Open with a show of hands: "Who has ever explained a rule by using the rule itself?" (e.g. "ask your older sibling, and if they don't know, ask THEIR older sibling"). That self-reference is today's whole topic, long before we call it "recursion."
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

<!-- NEW: warm-up, placed right after the roadmap (slot 2) per course design -->

# Before We Start: Describe It Using Itself

<div class="thread">A quick warm-up. No code needed yet.</div>

How would you tell a friend to count down out loud from 5 to 1?

- **Method A:** "Start at 5. Say it. Subtract 1. Say that. Keep going until you say 1."
- **Method B:** "To count down from any number N: say N, then count down from N minus 1. To count down from 1: just say '1' and stop."

- Which of these two instructions describes itself, using itself?

<!--
notes: Give students 30 seconds to think, alone, before asking.
Ask aloud: "In Method B, what's the one number where the instruction stops referring to itself?" (1)
Do not name "recursion" yet - let them notice the self-reference in their own words.
-->

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

An intern is building CampusNav's new **multi-stop tour** feature:
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

<!-- notes: Pause after the third bar. Ask: "Does this feel like a bug, or something structural?" -->

---

<!-- SLOT 5: Cost of not knowing -->

# What This Actually Costs

- A recursive method with no clear stopping point - or one that branches too eagerly - can freeze or crash an app (a **stack overflow**) with zero warning until someone finally hits the input that triggers it.
- Without a way to predict a recursive method's cost *before* running it, "it worked in the demo" tells you nothing about what happens with 10 stops instead of 3, or 1,200 rooms instead of 12.

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

<!-- _class: section -->

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

<!-- NEW: session-1 close, previews Worksheet -->

# Coming Up: The Worksheet

<div class="thread">Next in this class: less listening, more tracing.</div>

Later today, you and a partner will hand-trace a recursion tree and
solve a recurrence yourselves - the same two skills the frozen demo
was missing.

That is the **Worksheet, Parts A and B**. Keep a pen ready.

---

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: who thought of calling a procedure itself?</div>

---

<!-- SLOT 8: Origin -->

# This Problem Is Not New

<div class="thread">You just felt the pain. Now: who else felt it, and what did they do?</div>

- Self-reference is far older than computers: "$n! = n \times (n-1)!$" and the Fibonacci sequence are centuries-old mathematical definitions written *in terms of themselves*. Mathematical induction - proving a statement for all $n$ by showing it for a base case and then for "$n$ given $n-1$" - is the same idea, formalized for proofs.
- Early programming languages didn't automatically support it: **FORTRAN (1957)** explicitly forbade a procedure from calling itself, because nobody had yet built a runtime mechanism to keep track of many "waiting" calls at once.

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
- $4! = 4 \times 3! = 4 \times 3 \times 2! = 4 \times 3 \times 2 \times 1! = 4 \times 3 \times 2 \times 1 \times 0!$

Notice the shape: one case that answers directly, one case that
answers in terms of a smaller version of the same question. That shape
is what today formalizes.

---

<!-- SLOT 9: Core concept -->

# Recursion: Definition

<div class="thread">A mathematical habit centuries old, a warm-up you just ran by hand, and a frozen demo all point at one idea. Here it is, precisely.</div>

> A **recursive algorithm** solves a problem by solving one or more
> smaller instances of the *same* problem (the **recursive case**),
> until it reaches an instance small enough to answer directly (the
> **base case**).

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

<!-- Act 3 / BUILD: call stack trace, going down -->

# Tracing the Call Stack: factorial(4), Going Down

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">Call <code>factorial(4)</code> - needs <code>factorial(3)</code> before it can finish.</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">Call <code>factorial(3)</code> - needs <code>factorial(2)</code> before it can finish.</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">Call <code>factorial(2)</code> - needs <code>factorial(1)</code> before it can finish.</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">Call <code>factorial(1)</code> - needs <code>factorial(0)</code> before it can finish.</div></div>
<div class="step-row"><div class="step-num">5</div><div class="step-text">Call <code>factorial(0)</code> - <strong>base case</strong>. Returns <code>1</code> immediately, no further call.</div></div>
</div>

Five frames are now stacked up, each one waiting on the next, before a single multiplication happens.

---

<!-- Act 3 / BUILD: call stack trace, coming back up -->

# Tracing the Call Stack: factorial(4), Coming Back Up

<div class="steps">
<div class="step-row"><div class="step-num">6</div><div class="step-text"><code>factorial(0)</code> returns <code>1</code> to the frame waiting on it.</div></div>
<div class="step-row"><div class="step-num">7</div><div class="step-text"><code>factorial(1)</code> = 1 × 1 = <code>1</code>, returns to <code>factorial(2)</code>.</div></div>
<div class="step-row"><div class="step-num">8</div><div class="step-text"><code>factorial(2)</code> = 2 × 1 = <code>2</code>, returns to <code>factorial(3)</code>.</div></div>
<div class="step-row"><div class="step-num">9</div><div class="step-text"><code>factorial(3)</code> = 3 × 2 = <code>6</code>, returns to <code>factorial(4)</code>.</div></div>
<div class="step-row"><div class="step-num">10</div><div class="step-text"><code>factorial(4)</code> = 4 × 6 = <code>24</code>, final answer.</div></div>
</div>

The base case is what the whole unwind is built from - it is not just "where you happen to stop," it is what bounds how deep the stack could ever grow.

---

<!-- Act 3 / BUILD: recurrence relations -->

# Recurrence Relations: Writing Cost as a Formula

<div class="thread">Now let's measure the trace we just watched, not just narrate it.</div>

- Each call to `factorial(n)` does $O(1)$ work of its own (one comparison, one multiply) plus whatever `factorial(n-1)` costs.

$$
T(n) = T(n-1) + O(1), \qquad T(0) = O(1)
$$

- This **is** the "self-referential formula" that stumped us at the end of last week - a cost defined in terms of itself, on smaller input.
- Not every recursive algorithm shrinks by 1 each call. Algorithms that split their input in half give a different shape:

$$
T(n) = 2T(n/2) + O(n)
$$

- We'll meet this exact recurrence again in **Week 6** - it is merge sort's cost.

---

<!-- Act 3 / BUILD: substitution method -->

# Solving Recurrences: Substitution Method

<div class="thread">Guess the answer, then prove the guess by induction.</div>

**Guess:** $T(n) = O(n)$ for $T(n) = T(n-1) + d$ (some constant $d$). Formally: $T(n) \le cn$ for a constant $c$ and all $n \ge n_0$.

- **Base case:** true for small $n$ once $c$ is chosen large enough to cover $T(n_0)$.
- **Inductive step:** assume $T(n-1) \le c(n-1)$. Then

$$
T(n) = T(n-1) + d \le c(n-1) + d = cn - c + d \le cn \quad \text{whenever } c \ge d
$$

- Choosing $c = d$ makes the last step hold. **QED** - $T(n) = O(n)$, matching the 4-frame trace we hand-counted for `factorial(4)` above.

---

<!-- Act 3 / BUILD: recursion-tree method -->

# Solving Recurrences: Recursion-Tree Method

<div class="thread">Instead of guessing, draw every call and sum the work level by level.</div>

Take the divide-and-conquer shape from two slides ago: $T(n) = 2T(n/2) + O(n)$.

| Level | Subproblems | Size each | Cost at this level |
|---|---|---|---|
| 0 | 1 | $n$ | $n$ |
| 1 | 2 | $n/2$ | $2 \cdot (n/2) = n$ |
| 2 | 4 | $n/4$ | $4 \cdot (n/4) = n$ |
| $\vdots$ | $\vdots$ | $\vdots$ | $n$ |
| $\log_2 n$ | $n$ | $1$ | $n$ |

Every level costs about $n$, and there are $\log_2 n + 1$ levels:
$T(n) = n(\log_2 n + 1) = O(n \log n)$ - the result we'll reuse, unpreviewed, starting Week 6.

---

<!-- Act 3 / BUILD: Master Theorem preview -->

# A First Look: the Master Theorem

<div class="thread">Intuition only today - the real conditions and proof wait for Week 9.</div>

For $T(n) = aT(n/b) + f(n)$, compare $f(n)$ against $n^{\log_b a}$:

| Case | When | Intuition | Result |
|---|---|---|---|
| 1 | $f(n)$ grows slower | the many small subproblems (leaves) dominate | $T(n) = \Theta(n^{\log_b a})$ |
| 2 | $f(n)$ grows about the same | every level costs about the same | $T(n) = \Theta(n^{\log_b a}\log n)$ |
| 3 | $f(n)$ grows faster | the split itself dominates | $T(n) = \Theta(f(n))$ |

Merge sort ($a{=}2, b{=}2, f(n){=}n$) lands in **Case 2** - matching the recursion-tree result exactly.

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

<!-- SLOT N-2: Worked example -->

# CampusNav: Counting All Tour Orders - the Trap

<div class="thread">Everything above, applied to the feature that actually froze.</div>

"Show me every possible order" branches at every remaining stop:

$$
\text{allOrders(remaining)} = \sum_{\text{next stop} \in \text{remaining}} \text{allOrders(remaining} - \text{next stop}), \quad \text{allOrders}(\varnothing) = 1
$$

For 3 stops the recursion tree branches $3 \to 2 \to 1$, giving $3! = 6$ leaves - the demo's 6 orders. Each extra stop multiplies, not adds, to the tree.

The recursion itself isn't the problem - `tourTime` above was just
as recursive and stayed cheap. **`allOrders` explodes because it
branches into every remaining stop at every level, not because it
recurses.** Week 11's Dynamic Programming shows how to stop
re-deriving the same partial answers - the exact fix for this exact explosion.

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **"Recursion is always less efficient than iteration."** Tempting because every recursive call has function-call overhead - but the real cost driver is how *many* calls happen and whether they repeat work. `factorial` and `tourTime` are just as cheap, $O(n)$, as their iterative twins; `allOrders` is expensive because of its branching shape, not because it recurses.
- **"The base case is just where you stop."** Tempting because it feels like a technicality. It is actually what *bounds the entire recursion tree's depth* (and, once a method branches, its size) - miss it, or shrink the wrong thing, and the tree never stops growing.

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. Write the recurrence for a recursive method that does $O(1)$ work per call and always calls itself on an input one smaller. What is its closed-form cost?
2. CampusNav's `allOrders` for 4 stops makes how many leaf-level calls? Is that growth closer to linear, quadratic, or factorial/exponential as stops increase?
3. True or false: rewriting a slow recursive algorithm iteratively always makes it asymptotically faster.

---

# Answers

1. $T(n) = T(n-1) + O(1)$, $T(0) = O(1)$, which solves (by substitution) to $T(n) = O(n)$.
2. $4! = 24$ leaf calls. The growth is factorial - far faster than quadratic, and faster even than plain exponential - exactly the misconception slide's point.
3. **False.** Cost is determined by how much redundant or branching work the algorithm does, not by whether it's written with a loop or a call stack. An iterative rewrite of `allOrders` would still do $n!$ work unless the underlying algorithm itself changes.

---

<!-- NEW: worksheet hand-off, session 2 -->

# Now: Worksheet, Parts A and B

<div class="thread">Time to practice. Trace it and solve it yourselves.</div>

Work with your neighbor. Open the **[Week 4
Worksheet](materials/week04/worksheet.html)**. Part A hand-traces a
recursion tree; Part B solves a recurrence.

**~20 minutes.** Raise your hand if you get stuck.

<!--
notes: Hand out or project the Worksheet. Walk the room while pairs work.
After 20 minutes, ask 2 pairs to share their Part B answers.
-->

---

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: where recursion shows up beyond CampusNav.</div>

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

<!-- NEW: quiz hand-off -->

# Now: Quick Self-Check Quiz

<div class="thread">Ungraded. Just for you, to see what stuck.</div>

Open the **[Week 4 Quiz](materials/week04/quiz.html)**. Answer on your
own, about 10 minutes. Check your own answers at the end. Ask if
anything surprises you.

<!--
notes: Distribute or project the quiz. After about 10 minutes, reveal the
answer key and discuss as a group any question most of the class missed.
-->

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

<!-- SLOT N+3: Summary -->

# Summary

- A recursive algorithm is defined by a **base case** (where it stops) and a **recursive case** (where it calls itself on something smaller) - miss the base case and the recursion never stops.
- Tracing `factorial(4)`'s call stack shows exactly what's "waiting" at each depth, and why the base case bounds that depth.
- A recursive algorithm's cost is a **recurrence relation**; substitution (guess + prove by induction) and the recursion tree (sum level by level) both solve one, and the Master Theorem previews a shortcut for the divide-and-conquer shape (full rigor Week 9).
- Recursion itself isn't slow - `tourTime` and `factorial` are both $O(n)$; `allOrders` explodes from *branching*, not recursion, and that is exactly what Week 11's DP will fix.
- **Reading:** CLRS Chapter 4 (skim §4.3-4.4, recurrences) - no exercises due.
- **Prepare:** think about how you'd put a shuffled stack of 10 index cards in order by hand. Bring your method to Week 5.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
