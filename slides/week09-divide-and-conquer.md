---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 9: Divide and Conquer

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703
</div>

<!--
notes: Welcome the class back from the midterm. Say: "You now know how to sort, search,
and analyze recursion. Today we ask a bigger question: is there a general strategy for
*inventing* a new algorithm, instead of starting from zero every time?"
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
<div class="wk now"><div class="n">Wk 9</div><div class="t">Divide &amp; Conquer</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">Greedy Algorithms</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">Dynamic Programming I</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">Dynamic Programming II</div></div>
<div class="wk"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Say: "The midterm covered Weeks 1-7. Weeks 9-14 are the second half: four general
design paradigms, plus graphs. Today starts paradigm number one." -->

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** the midterm (Week 8) confirmed you can correctly
  execute and analyze every tool from Weeks 1-7 - Big-O, recursion, basic
  and advanced sorting, and binary search.
- **Last week left broken:** every one of those tools was invented, and
  taught, one problem at a time - Big-O, recursion, sorting, and searching
  are all in place, but there is still no general strategy for building a
  *new* algorithm from scratch when CampusNav hits a problem none of them
  directly solves.

---

<!-- Key Words Today, session 1 -->

# Key Words Today

- **Divide:** break a problem into smaller pieces of the same kind.
- **Conquer:** solve each piece, recursively, until it's small enough to
  solve directly.
- **Combine:** stitch the pieces' answers back into an answer for the
  whole problem.
- **Paradigm:** a general strategy for *inventing* algorithms, reusable
  across totally different problems - not one fixed algorithm.

<!-- notes: Read each term aloud once. Say these four words are today's whole shape, formalized one slide at a time. -->

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# A New Kind of Problem

<div class="pain">

The CampusNav team wants to add a "best energy window" feature: look at
a student's whole day and tell them the single longest, most valuable
stretch where their logged energy stays net-positive. One developer just starts writing
code - checking every possible starting point, then every possible
ending point after it, adding everything in between up each time. It
works on the small example she tried. But on a busy day with hundreds of
small time slots, it crawls, and nobody on the team has any general way
to think about making it faster. They know how to sort a list and search
a sorted one. Neither one applies here. They are inventing from zero,
again.

</div>

<!-- notes: Do not say "divide and conquer," "recursion," or "Big-O" here. Let the class feel that this problem is genuinely new. -->

---

<!-- SLOT 5: Cost of not knowing -->

# What Else This Actually Costs

- Sorting and searching solved *one shape* of problem - "put things in
  order" and "find a match." "Best energy window" is a different shape
  entirely, and CampusNav will keep meeting new shapes for the rest of
  the semester.
- Without a general strategy, every new feature means starting design
  from a blank page - with no way to predict, before writing code,
  whether the result will even be fast.

<div class="why">
<strong>In industry:</strong> this is exactly why "algorithm design
paradigms" (divide-and-conquer, greedy, dynamic programming) are their
own interview and job-requirement category, separate from "know these
ten algorithms by name." Employers are testing whether you can invent a
correct, fast approach to a problem you've never seen before.
</div>

---

<!-- SLOT 6: Driving question -->

# This Week's Question

<div class="driving-q">"When a problem is genuinely new, is there a general recipe for turning it into a fast algorithm?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. State the divide-and-conquer paradigm as three general stages, and
   explain what "independent subproblems" and "a combine step" mean.
2. State and apply the Master theorem to classify a recurrence of the
   form $T(n) = aT(n/b) + f(n)$ into one of its three cases.
3. Trace the maximum-subarray divide-and-conquer algorithm by hand,
   including its linear-time crossing step.
4. Explain why a recursive algorithm is not automatically
   divide-and-conquer, and identify the difference on sight.

---

<!-- SLOT 8: Origin -->

# This Strategy Is Not New - Naming It Was the Breakthrough

<div class="thread">Two TAs (teaching assistants) splitting a stack of exam papers already showed you this shape. Today it gets a name and a history.</div>

- **1945:** John von Neumann describes merge sort - split the list in
  half, sort each half, merge the results (Week 6). At the time, it's
  just "a clever sorting trick."
- **1969:** Volker Strassen publishes a way to multiply two matrices
  faster than the "obvious" method, by splitting each matrix into
  quarters and combining the results in an unexpected way. A completely
  different problem, the *same* divide/solve/combine shape.
- **1974:** Aho, Hopcroft, and Ullman's *The Design and Analysis of
  Computer Algorithms* is the first major textbook to pull this
  recurring shape out of individual algorithms and teach it as its own
  reusable strategy - one of a small handful of general **paradigms**.

---

# Why Naming the Pattern Mattered

<div class="thread">Merge sort, Strassen's algorithm, and the textbook that connected them.</div>

<div class="why">
Once the pattern had a name, computer scientists could point it at new
problems on purpose, instead of stumbling onto it by luck.
</div>

- Before 1974, "divide, solve the pieces, combine" was a coincidence
  two different algorithms happened to share - nobody had a name to
  search for, teach, or reuse on purpose.
- Naming a pattern is itself a kind of invention: it turns a one-off
  trick into a checklist you can apply to a problem you've never seen,
  which is exactly the shortcut this week's driving question asks for.

---

<!-- Key Words Today, session 2 -->

# Key Words Today

- **Recurrence:** an equation that defines a function's cost in terms of
  its own cost on smaller inputs - what Week 4 taught you to trace.
- **Master theorem:** a direct formula for solving recurrences of the
  shape $T(n) = aT(n/b) + f(n)$, without tracing the whole recursion tree.
- **Crossing subarray:** in the maximum-subarray problem, a candidate
  answer that starts in the left half and ends in the right half.
- **Watershed function:** shorthand for $n^{\log_b a}$, the quantity the
  Master theorem compares $f(n)$ against.

<!-- notes: Read each term aloud. Say the recurrence toolkit from Week 4 is about to get its missing piece. -->

---

<!-- SLOT 9: Core concept -->

# Divide and Conquer: Definition

<div class="thread">Picture two TAs splitting 200 exam papers, each counting a subtotal, then adding the two together - that shape, precisely.</div>

> A **divide-and-conquer** algorithm solves a problem of size $n$ by:
> **(1) Divide** the problem into $a$ **independent** subproblems of
> roughly size $n/b$; **(2) Conquer** each subproblem recursively, solving
> it directly once it's small enough (the base case); **(3) Combine** the
> subproblems' solutions into a solution for the original problem.

- **Independent** is doing real work in that definition: the subproblems
  must not overlap or depend on each other's answers.
- Skip the combine step, or let the subproblems overlap, and it is
  recursion - just not *this* paradigm. More on that later.

<div class="graphviz-note">CLRS (Cormen/Leiserson/Rivest/Stein's <em>Introduction to Algorithms</em>) 4th ed - Ch 4, Sections 4.1 (Multiplying square matrices), 4.2 (Strassen's algorithm), 4.5 (the master method); CLRS Section 31.6 for fast exponentiation.</div>

---

# The General Template

<div class="pipeline">
<div class="stage"><div class="h">1. Divide</div><div class="s">Split the problem into smaller pieces of the same kind</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">2. Conquer</div><div class="s">Solve each piece recursively - directly, if small enough</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">3. Combine</div><div class="s">Merge the pieces' answers into one answer for the whole</div></div>
</div>

Picture grading exams: **divide** the pile in two, **conquer** by
having each TA count their own stack, **combine** by adding the two
subtotals. Merge sort (Week 6) is exactly this shape, applied to sorting.

---

# Measuring the Cost: Recurrences, Revisited

<div class="thread">Week 4 taught you to trace these by hand. Today you get a shortcut.</div>

Every divide-and-conquer algorithm's running time has the shape:

$$
T(n) = a \cdot T(n/b) + f(n)
$$

- $a$ - how many subproblems each call makes
- $n/b$ - the size of each subproblem ($b$ is the shrink factor)
- $f(n)$ - the cost of the divide and combine steps themselves,
  *outside* the recursive calls

Merge sort: $a=2$ subproblems, $b=2$ (each half the size), and merging
two sorted halves costs $f(n) = \Theta(n)$. So $T(n) = 2T(n/2) + \Theta(n)$.

---

# The Master Theorem: Setup

<div class="thread">Week 4 only previewed this intuitively. Here it is, formalized.</div>

Given $T(n) = aT(n/b) + f(n)$, with $a \geq 1$ and $b > 1$, compare
$f(n)$ against the **watershed function** $n^{\log_b a}$ - the cost the
recursive calls alone would produce if the divide/combine steps were
free.

- $f(n)$ **smaller** than the watershed → the recursive calls dominate.
- $f(n)$ **equal** to the watershed → both contribute equally.
- $f(n)$ **larger** than the watershed → the divide/combine step dominates.

Three cases, one for each possibility. No tracing the whole tree required.

---

# The Master Theorem: Three Cases

| Case | Condition on $f(n)$ | Result |
|---|---|---|
| **1** | $f(n) = O(n^{\log_b a - \varepsilon})$ for some $\varepsilon>0$ (grows *polynomially slower*) | $T(n) = \Theta(n^{\log_b a})$ |
| **2** | $f(n) = \Theta(n^{\log_b a})$ (grows at the *same rate*) | $T(n) = \Theta(n^{\log_b a}\log n)$ |
| **3** | $f(n) = \Omega(n^{\log_b a + \varepsilon})$ for some $\varepsilon>0$ (grows *polynomially faster*), **and** the regularity condition $a\,f(n/b) \le c\,f(n)$ holds for some constant $c<1$ and all large $n$ | $T(n) = \Theta(f(n))$ |

---

# When the Master Theorem Doesn't Apply

<div class="thread">Three cases, but they don't cover every recurrence - and this shortcut is not a universal solver.</div>

<div class="why">
Not every recurrence fits one of these three cases cleanly - if f(n)
falls in the gap between cases, or case 3's regularity condition fails,
the Master theorem simply doesn't apply, and you're back to tracing the
tree by hand (Week 4), which always works even when this shortcut doesn't.
</div>

- **Gap example:** $f(n) = n / \log n$ against watershed $n$ - this is
  smaller than $n$, but not *polynomially* smaller by any fixed
  $\varepsilon > 0$, so it fits neither Case 1 nor Case 2.
- **Regularity failure example:** $f(n)$ that oscillates wildly between
  very small and very large values as $n$ grows can satisfy Case 3's
  growth condition while still failing the regularity condition
  $a f(n/b) \le c f(n)$.

---

<!-- Dense worked example, master theorem, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Master theorem · worked example 1 of 3 (simple)</div>

# Classifying Binary Search's Recurrence

<div class="wx-top">
<div class="lead">The smallest case: one recursive call, no combine step at all.</div>
<div class="goalbox"><span class="k">Goal</span>Classify T(n) = T(n/2) + O(1) and confirm it matches Week 7's own bound.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Read off a, b, f(n)</div>
<div class="wx-body">a=1 (one recursive call), b=2 (half the size), f(n)=O(1) (one comparison per call).</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Watershed</div>
<div class="wx-body">n^(log&#8322;a) = n^(log&#8322;1) = n^0 = 1.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Match a case</div>
<div class="wx-body">f(n)=O(1)=&Theta;(n^0) - exactly matches the watershed. That's **Case 2**.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>T(n) = &Theta;(n^0 &middot; log n) = &Theta;(log n) - exactly what Week 7 established by direct reasoning about halving the search space.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Even a recurrence with only one recursive call and no combine step still fits the same three-case framework.</div></div>

---

<!-- Dense worked example, master theorem, moderate tier -->
<!-- _class: dense -->

<div class="eyebrow">Master theorem · worked example 2 of 3 (moderate)</div>

# Classifying Merge Sort's Recurrence

<div class="wx-top">
<div class="lead">The anchor example - the same recurrence you traced informally in Week 4 and Week 6.</div>
<div class="goalbox"><span class="k">Goal</span>Classify T(n) = 2T(n/2) + &Theta;(n) with the three-line shortcut.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Read off a, b, f(n)</div>
<div class="wx-body">a=2, b=2, f(n)=&Theta;(n) (the linear MERGE step).</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Watershed</div>
<div class="wx-body">n^(log&#8322;a) = n^(log&#8322;2) = n^1 = n.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Match a case</div>
<div class="wx-body">f(n)=&Theta;(n) exactly matches the watershed n. That's **Case 2** again.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Three lines, not a whole tree</div>
<div class="wx-body">T(n) = &Theta;(n^1 &middot; log n) = &Theta;(n log n) - exactly the bound Week 6 established by tracing the recursion tree by hand, now in three lines.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>&Theta;(n log n) - confirmed by the Master theorem instead of a full tree diagram.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Whenever f(n) exactly matches the watershed, the recursive calls and the combine step contribute equally - that's Case 2, every time.</div></div>

---

<!-- Dense worked example, master theorem, harder tier -->
<!-- _class: dense -->

<div class="eyebrow">Master theorem · worked example 3 of 3 (harder)</div>

# A Case 1 Recurrence: T(n) = 4T(n/2) + n

<div class="wx-top">
<div class="lead">Same recurrence shape as the two above - a=2 doubled to a=4 changes everything.</div>
<div class="goalbox"><span class="k">Goal</span>Classify T(n) = 4T(n/2) + n, and see why the outcome differs from merge sort's.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Read off a, b, f(n)</div>
<div class="wx-body">a=4, b=2, f(n)=n.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Watershed</div>
<div class="wx-body">n^(log&#8322;a) = n^(log&#8322;4) = n^2.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Match a case</div>
<div class="wx-body">f(n)=n=O(n^(2&minus;1)) - polynomially *slower* than the watershed n^2 (&epsilon;=1). That's **Case 1**.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why this differs from merge sort</div>
<div class="wx-body">Same shrink factor b=2 and same f(n)=n as merge sort's recurrence - but a=4 instead of a=2 raises the watershed above f(n), flipping the case from 2 to 1.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>T(n) = &Theta;(n^(log&#8322;a)) = &Theta;(n^2) - the recursive calls dominate, not the combine step.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Two recurrences that look almost identical can land in different Master theorem cases - always recompute the watershed, never guess from the shape alone.</div></div>

---

# You've Already Done Half of This

<div class="thread">Nothing here is new - it's what you already know, now with a name and a shortcut.</div>

- **Week 4** taught you to trace a recursive algorithm's cost by hand,
  one level of the tree at a time.
- **Week 6** built merge sort - divide the list in half, recursively sort
  each half, merge the sorted halves back together - without ever
  calling it "divide-and-conquer."
- Today: the same shape, given a name, a formal definition, and a direct
  formula (the Master theorem) so you don't have to draw the tree by
  hand every time.

---

<!-- CampusNav worked example intro -->

# CampusNav: The Best Energy Window Feature

<div class="thread">Back to today's pain - now with a plan.</div>

A student's day is logged in 10-minute slots, each scored **+1
energizing** or **−1 draining** (a break or a class you enjoy scores
positive; a stressful meeting or a rough exam block scores negative).
CampusNav wants the single longest, most valuable contiguous stretch of
the day - the run of slots whose values sum to the largest number - even
if a draining patch sits in the middle, as long as it's outweighed by
strong enough stretches on either side.

For today's trace, consecutive same-type slots are already merged into
one block: a `+4` means four energizing slots in a row; a `−3` means
three draining slots in a row. This is the **maximum subarray problem**:
find the contiguous run with the largest sum.

---

# Max Subarray: Idea and Pseudocode

<div class="thread">Split at the midpoint - the tricky part is the case that straddles it.</div>

<div class="two-col">
<div>

The best contiguous run is in exactly one of three places: **entirely
in the left half** (recurse left), **entirely in the right half**
(recurse right), or **crossing the midpoint** - starting in the left
half, ending in the right half. Neither recursive call alone can find
this last case; it needs its own linear-time scan.

</div>
<div>

```text
FIND-CROSSING(A, low, mid, high):
    best-left = -infinity, sum = 0
    for i = mid downto low:
        sum += A[i]
        track best-left, its start index
    best-right = -infinity, sum = 0
    for j = mid+1 to high:
        sum += A[j]
        track best-right, its end index
    return (start, end, best-left + best-right)
```

</div>
</div>

<div class="thread"><code>downto</code> counts a <code>for</code> loop down instead of up (Week 2's reference card). The <code>return (...)</code> hands back three values in one tuple, unpacked the same way a caller would write <code>(a, b, c) = FIND-CROSSING(...)</code>.</div>

---

# Why the Crossing Step Must Be Linear

<div class="thread">The one design choice that keeps this algorithm fast.</div>

Trying every straddling (start, end) pair directly would itself cost
O(n²) work at the crossing step alone - defeating the whole point of
splitting the problem in the first place. That is exactly why
`FIND-CROSSING` instead runs outward from the midpoint exactly once in
each direction: one linear-time scan left, one linear-time scan right,
never re-checking a pair.

---

<!-- Dense worked example, max subarray, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Max subarray · worked example 1 of 3 (simple)</div>

# Three Elements: [2, -1, 3]

<div class="wx-top">
<div class="lead">The smallest case that still has a genuine crossing candidate.</div>
<div class="goalbox"><span class="k">Goal</span>Find the best contiguous run in [2, -1, 3] and see whether crossing wins.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Split and recurse</div>
<div class="wx-body">low=0, high=2, mid=1. Left half [2,-1]: best is [2]=2. Right half [3]: best is 3 (base case).</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Crossing scan</div>
<div class="wx-body">Left from mid=1: i=1, sum=-1; i=0, sum=2-1=1 &rarr; best-left=1. Right from mid+1=2: j=2, sum=3 &rarr; best-right=3.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Compare all three</div>
<div class="wx-body">Left-best=2, right-best=3, crossing=1+3=4 (the whole array). Crossing wins.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Best run is the whole array, [2, -1, 3], summing to 4 - exactly 2 + (-1) + 3.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Even with just one negative element in the middle, the crossing case can still beat both halves alone.</div></div>

---

<!-- Dense worked example, max subarray, moderate tier -->
<!-- _class: dense -->

<div class="eyebrow">Max subarray · worked example 2 of 3 (moderate)</div>

# The Full Day: [4,-3,5,-2,-1,6,-3,4,-8,5]

<div class="wx-top">
<div class="lead">CampusNav's actual ten-block trace, at the top level of the recursion.</div>
<div class="goalbox"><span class="k">Goal</span>Find the best energy window across the full array.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Split</div>
<div class="wx-body">low=0, high=9, mid=4. Left half (indices 0-4): recursive best is [4,-3,5] = 6. Right half (indices 5-9): recursive best is [6,-3,4] = 7.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Crossing, left scan</div>
<div class="wx-body">From mid=4 back to 0: sums are -1, -3, 2, -1, **3** (best, at i=0) - best-left=3.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Crossing, right scan</div>
<div class="wx-body">From mid+1=5 to 9: sums are 6, 3, **7** (best, at j=7), -1, 4 - best-right=7.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Compare all three</div>
<div class="wx-body">Left-best=6 [0,2]. Right-best=7 [5,7]. Crossing=3+7=10 [0,7]. Crossing wins by a wide margin.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>CampusNav's best energy window runs [0,7], worth 10 - straight through a draining dip and out the other side.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>The winning window wasn't visible in either half alone - only the crossing scan could find it.</div></div>

---

<!-- Dense worked example, max subarray, harder tier -->
<!-- _class: dense -->

<div class="eyebrow">Max subarray · worked example 3 of 3 (harder)</div>

# What "Recursively" Actually Means Here

<div class="wx-top">
<div class="lead">The moderate trace's "left half's best is 6" wasn't inspection - it's itself a full recursive call.</div>
<div class="goalbox"><span class="k">Goal</span>Show every level does the same three things, then confirm the resulting recurrence.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">One level down</div>
<div class="wx-body">[4,-3,5,-2,-1] (the left half above) splits again at its own midpoint, checks its own left/right/crossing cases, and so on down to single-element base cases.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Every level, same three steps</div>
<div class="wx-body">Split (free), recurse twice, run one linear crossing scan - repeated at every level until the base case (a single element, trivially its own best subarray).</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">The recurrence</div>
<div class="wx-body">Two recursive calls on halves, plus one linear crossing scan: T(n) = 2T(n/2) + &Theta;(n).</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Not a coincidence</div>
<div class="wx-body">a=2, b=2, watershed=n, f(n)=&Theta;(n) matches it exactly &rarr; Case 2, same as merge sort &rarr; &Theta;(n log n). Both algorithms halve the data and do linear work to combine.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>T(n) = 2T(n/2) + &Theta;(n) = &Theta;(n log n) - a genuinely faster algorithm than checking every start/end pair, discovered by applying the paradigm, not by luck.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Every level of a divide-and-conquer recursion repeats the exact same three steps - that repetition is what a recurrence is counting.</div></div>

---

<!-- Key Words Today, session 3 -->

# Key Words Today

- **Fast exponentiation:** computing $a^n$ in $O(\log n)$ multiplications
  by repeated squaring, instead of $n-1$ multiplications one at a time.
- **Overlapping subproblems:** when recursive calls solve the *same*
  smaller subproblem more than once - the opposite of "independent,"
  and the signal for dynamic programming (Week 11), not D&C.
- **Regularity condition:** the extra requirement Master theorem Case 3
  needs before it's safe to apply.

<!-- notes: Read each term aloud. Say Week 11 gives overlapping subproblems their own paradigm. -->

---

# A Second D&C Technique: Fast Exponentiation

<div class="thread">Divide-and-conquer isn't only for arrays and matrices. It also speeds up arithmetic. (CLRS 4th ed, Section 31.6)</div>

Computing $a^n$ the obvious way takes $n-1$ multiplications: $a \times a
\times a \times \dots$, one at a time. Divide-and-conquer does better,
by splitting the *exponent* in half instead of the data:

$$
a^n =
\begin{cases}
(a^{n/2})^2 & n \text{ even} \\
a \cdot (a^{(n-1)/2})^2 & n \text{ odd}
\end{cases}
$$

Each step does $O(1)$ work (one squaring, and one extra multiply if $n$
is odd) on a problem half the size: $T(n) = T(n/2) + O(1) =
\Theta(\log n)$.

---

<!-- Dense worked example, fast exponentiation, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Fast exponentiation · worked example 1 of 3 (simple)</div>

# Computing a&#8309; by Repeated Squaring

<div class="wx-top">
<div class="lead">The smallest exponent that still shows both a squaring and an extra multiply.</div>
<div class="goalbox"><span class="k">Goal</span>Count real multiplications for a^5, and compare to the naive approach.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Halving sequence</div>
<div class="wx-body">5 (odd) &rarr; 2 (even) &rarr; 1 (odd) &rarr; 0 (base). Three halvings.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Build back up</div>
<div class="wx-body">a^0=1 &rarr; a^1=a&middot;1^2=a (free, no real arithmetic) &rarr; a^2=(a^1)^2 (1 real squaring) &rarr; a^5=a&middot;(a^2)^2 (1 real squaring + 1 real extra multiply).</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Count</div>
<div class="wx-body">2 squarings + 1 extra multiply = **3 multiplications**, versus 4 for the naive a&middot;a&middot;a&middot;a&middot;a.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>a&#8309;: 3 multiplications by repeated squaring vs. 4 naively - a modest saving, but the same mechanism that pays off far more at larger n.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Even at n=5, halving the exponent already beats counting by ones - the gap only widens from here.</div></div>

---

<!-- Dense worked example, fast exponentiation, moderate tier -->
<!-- _class: dense -->

<div class="eyebrow">Fast exponentiation · worked example 2 of 3 (moderate)</div>

# Computing a&#185;&#179; by Repeated Squaring

<div class="wx-top">
<div class="lead">13 in binary is 1101 - watch the exponent halve each step.</div>
<div class="goalbox"><span class="k">Goal</span>Count real multiplications for a^13, and see the gap widen.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Halving sequence</div>
<div class="wx-body">13 &rarr; 6 &rarr; 3 &rarr; 1 &rarr; 0. Four halvings - &Theta;(log&#8322;13) &approx; 3.7, rounded up.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Build back up</div>
<div class="wx-body">a^0=1 &rarr; a^1=a (free) &rarr; a^3=a&middot;(a^1)^2 (1 square + 1 extra) &rarr; a^6=(a^3)^2 (1 square) &rarr; a^13=a&middot;(a^6)^2 (1 square + 1 extra).</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Count</div>
<div class="wx-body">3 real squarings + 2 extra multiplies = **5 multiplications**, versus 12 for the naive approach.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The gap widens</div>
<div class="wx-body">a^1000 needs 999 naive multiplications, but only about 10-15 with repeated squaring - <span class="bignotation">&Theta;(log n)</span> vs. <span class="bignotation">&Theta;(n)</span>.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>a&#185;&#179;: 5 multiplications by repeated squaring vs. 12 naively.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>The saving isn't fixed - it grows without bound as n grows, which is exactly what &Theta;(log n) vs. &Theta;(n) means.</div></div>

---

<!-- Dense worked example, fast exponentiation, harder tier -->
<!-- _class: dense -->

<div class="eyebrow">Fast exponentiation · worked example 3 of 3 (harder)</div>

# Computing a&#178;&#185; by Repeated Squaring

<div class="wx-top">
<div class="lead">A different exponent, the same halving pattern - proof the trick isn't tuned to one lucky number.</div>
<div class="goalbox"><span class="k">Goal</span>Count real multiplications for a^21, and confirm the pattern generalizes.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Halving sequence</div>
<div class="wx-body">21 &rarr; 10 &rarr; 5 &rarr; 2 &rarr; 1 &rarr; 0. Five halvings.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Build back up</div>
<div class="wx-body">a^21=a&middot;(a^10)^2 (square+extra); a^10=(a^5)^2 (square); a^5=a&middot;(a^2)^2 (square+extra); a^2=(a^1)^2 (square); a^1=a&middot;(a^0)^2 (free).</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Count</div>
<div class="wx-body">4 real squarings + 2 extra multiplies = **6 multiplications**, versus 20 for the naive approach.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Two exponents, one bound</div>
<div class="wx-body">13 and 21 have completely different binary patterns (1101 vs. 10101), yet both hit &Theta;(log n) - the bound holds regardless of which bits happen to be set in n.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>a&#178;&#185;: 6 multiplications by repeated squaring vs. 20 naively.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>The halving argument never depended on which specific exponent we picked - that's what makes it a genuine &Theta;(log n) bound, not a lucky count.</div></div>

---

# A Second D&C Trick: Halving the Shortcut Counter

<div class="thread">Brief - this problem gets solved properly in Week 11.</div>

CampusNav also has a 20-step shortcut you can take 1 or 2 steps at a
time. "How many distinct ways?" was Week 4's runaway recursion-tree
example: $\text{ways}(n) = \text{ways}(n-1) + \text{ways}(n-2)$, traced
by brute force, blowing up exponentially. That recursion is **not**
divide-and-conquer - its two calls touch overlapping smaller
subproblems, not independent ones. But there's a genuine D&C trick
available: halve the *step number itself*, the same idea fast
exponentiation uses to compute $a^n$ by squaring. A pair of doubling
identities jumps from $\text{ways}(k), \text{ways}(k-1)$ straight to
$\text{ways}(2k), \text{ways}(2k+1)$:

$$
\text{ways}(2k) = \text{ways}(k)^2 + \text{ways}(k-1)^2 \qquad
\text{ways}(2k+1) = \text{ways}(k)^2 + 2 \cdot \text{ways}(k) \cdot \text{ways}(k-1)
$$

---

# A Second D&C Trick, Continued

<div class="thread">What the two identities buy us.</div>

Each identity does $O(1)$ arithmetic on two already-known values, so
halving $k$ each time gives $T(n) = T(n/2) + O(1) = \Theta(\log n)$.

---

<!-- Dense worked example, verifying the doubling identities -->
<!-- _class: dense -->

<div class="eyebrow">Shortcut counter · verifying the shortcut</div>

# Checking the Doubling Identities

<div class="wx-top">
<div class="lead">Directly: ways(0)=1, ways(1)=1, ways(2)=2, ways(3)=3, ways(4)=5, ways(5)=8, ways(6)=13, ways(7)=21.</div>
<div class="goalbox"><span class="k">Goal</span>Confirm the identities reproduce the directly-computed values, at two different k.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">k = 2</div>
<div class="wx-body">ways(k)=2, ways(k&minus;1)=1. ways(4)=ways(2k)=2&sup2;+1&sup2;=4+1=**5** - matches. ways(5)=ways(2k+1)=2&sup2;+2&middot;2&middot;1=4+4=**8** - matches.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">k = 3</div>
<div class="wx-body">ways(k)=3, ways(k&minus;1)=2. ways(6)=ways(2k)=3&sup2;+2&sup2;=9+4=**13** - matches. ways(7)=ways(2k+1)=3&sup2;+2&middot;3&middot;2=9+12=**21** - matches.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Both checks match the direct values - the doubling identities behave exactly as claimed.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Two matches are strong evidence, not a proof for every k - but they show the identities jump straight to ways(2k) and ways(2k+1) without computing every value in between.</div></div>

---

# Why This Trick Is Special-Cased

<div class="thread">A preview, not the real fix.</div>

Halving the step number is elegant, but it only works because this
particular counting recurrence has a known closed identity to
exploit - it doesn't generalize to arbitrary overlapping-subproblem
recursions.

<div class="why">
Week 11 solves this exact 20-step counter - and the whole family of
problems shaped like it - properly, with <strong>dynamic
programming</strong>: the same numbers, a general technique instead of a
one-off trick, and Week 4's exploding recursion tree finally fixed for good.
</div>

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **"It's recursive, so it's divide-and-conquer."** D&C requires
  *independent* subproblems plus an explicit *combine* step. The
  shortcut-counter recursion from Week 4 is recursive but not D&C - its
  two calls overlap the same smaller subproblems, which is exactly what
  dynamic programming (Week 11) is built to handle differently. A quick
  test: does the recursion re-derive the *same* smaller answer more than
  once anywhere in its call tree? If yes, it's overlapping subproblems,
  not independent ones.
- **"The Master theorem always applies."** It only classifies
  recurrences shaped like $T(n)=aT(n/b)+f(n)$ where $f(n)$ fits cleanly
  into one of the three cases. If $f(n)$ falls in the gap between cases,
  or Case 3's regularity condition fails, you're back to tracing the
  tree (Week 4) or need a different tool entirely - this table looks
  exhaustive, but it only covers recurrences of this exact shape.

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 10 slot 3's "left broken" and feeds Week 10 slot 4 -->

# What Divide-and-Conquer Cannot Do

<div class="limits">
Divide-and-conquer works when a problem's subproblems are genuinely
independent and a combine step can stitch their answers back together -
CampusNav's energy-window finder and shortcut counter both prove it. But
divide-and-conquer assumes a problem splits cleanly into independent
left/right halves that can be solved separately and then merged - not
every problem is shaped like that. Some reward one purely local choice,
made once, instead of a full recursive split.
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 9 leaves **what to do when recursion is overkill, and a single
local choice might already be optimal** unsolved. **Week 10, Greedy
Algorithms**, addresses it: CampusNav's room-booking assistant, built by
always granting the request that frees up a room soonest - no recursion,
no combine step, just one correct local choice repeated.

---

<!-- CLRS reference slide, placed immediately before Summary -->

# Where This Week Lives in CLRS

| This week's topic | CLRS 4th ed section |
|---|---|
| Matrix multiplication (the historical D&C example) | 4.1 |
| Strassen's algorithm | 4.2 |
| The Master method / Master theorem | 4.5 |
| Fast exponentiation (repeated squaring) | 31.6 |

<div class="why">
<strong>If you want to go deeper (not required this week):</strong>
CLRS Sections 4.6-4.7 prove the continuous version of the Master
theorem and cover Akra-Bazzi recurrences - a more general tool for
recurrences whose subproblems aren't all the same size, which this
week's Master theorem assumes.
</div>

---

<!-- SLOT N+3: Summary -->

# Summary

- **Divide-and-conquer** is a paradigm - divide into independent
  subproblems, conquer recursively, combine - not one fixed algorithm.
- The **Master theorem** classifies $T(n) = aT(n/b) + f(n)$ into one of
  three cases by comparing $f(n)$ to $n^{\log_b a}$, without tracing the
  whole recursion tree.
- The **maximum-subarray** problem needs a linear-time crossing step in
  addition to the two recursive halves - the combine step is where the
  real design work happens.
- **Fast exponentiation** (CLRS 31.6) is a second D&C technique this
  week - splitting the exponent, not the data, for $\Theta(\log n)$
  instead of $\Theta(n)$ multiplications.
- **Not every recursive algorithm is D&C** - overlapping subproblems
  (Week 4's shortcut counter) need a different paradigm (dynamic
  programming, Week 11).

---

# Summary, Continued

- **Reading:** CLRS, Chapter 4 (Divide-and-Conquer: 4.1 Matrix
  Multiplication and 4.2 Strassen's Algorithm, as another
  divide-and-conquer example; 4.3-4.5 the Master theorem and its
  proof) and Section 31.6 (fast exponentiation). The maximum-subarray
  problem used in this week's worked example is a classic
  divide-and-conquer teaching example (covered in earlier CLRS
  editions); its recurrence and crossing-step argument are exactly the
  pattern CLRS 4.1-4.2 formalize.
- **Prepare:** think of one everyday scheduling decision where making
  the locally best choice, once, feels obviously right. Bring it to Week 10.
- **New: Week 9 Check** - a short graded exercise on the Master
  theorem, maximum subarray, and fast exponentiation, released now,
  due before Week 10 begins (see
  `materials/assignments/week09-check.html`).

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
