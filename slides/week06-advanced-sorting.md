---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 6: Advanced Sorting

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703<br>
<strong>Assignment 2 (Sorting) released today</strong> - due Week 8, before the midterm exam
</div>

<!--
notes: Welcome the class. Remind them Assignment 2 is now posted to the LMS (materials/assignments/assignment2.md), due Week 8 before the midterm begins. Say today's job is fixing the exact wall Week 5's sorts hit.
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
<div class="wk now"><div class="n">Wk 6</div><div class="t">Advanced Sorting</div></div>
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

<!-- notes: Point at the row. Say: "Last week we proved our sorts correct. This week we make them fast enough to survive contact with the real campus." -->

---

<!-- SLOT 3: Recap + open wound (Act 0 / LOCATE) -->

# Last Week, This Week

- **Last week delivered:** Week 5 proved insertion sort correct with a
  loop invariant - not just traced correct, *proven* correct on every
  input.
- **Last week left broken:** correctness alone was never the whole
  goal. All three sorts are $O(n^2)$ in the worst and average case:
  fine on a 40-room sample, noticeably lagging on the real 1,200-room
  campus directory, and headed for collapse the moment CampusNav adds
  partner campuses at ~10,000 rooms.

---

<!-- Key Words Today, session 1 -->

# Key Words Today

- **Divide-and-conquer:** break a big problem into smaller pieces of
  the same shape, solve each piece, then combine the results.
- **Partition:** rearrange a list, in place, into "smaller than some
  reference value" and "bigger than it."
- **Stable sort:** items with equal keys keep their original relative
  order after sorting.
- **In-place:** uses only a small amount of extra memory beyond the
  input array itself, no second full copy.

<!-- notes: Read each term aloud once. Say these four words are today's whole vocabulary - formalized properly as the lecture goes. -->

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# The App Just... Pauses

<div class="pain">

CampusNav's room directory has grown from one building's 40 rooms to
the whole Dong-Eui University (DEU) campus's 1,200 - and new rooms get added most semesters.
Every time a room is added, the app re-alphabetizes the whole
directory before showing the building list. For the first time,
students actually notice: the screen visibly freezes for a couple of
seconds. It never used to do that back when the directory only
covered one building - and the team has just heard that two partner
campuses, adding thousands more rooms, are joining CampusNav next
year.

</div>

<!-- notes: Do not say "merge sort," "quicksort," or any Big-O notation yet. Let the class feel the freeze first. -->

---

# How Long Does That Actually Take?

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">One building's directory, Week 5's sort</div>
  <div class="bar-track"><div class="bar-fill short" style="width: 5%"></div></div>
  <div class="bar-value">instant, unnoticed</div>
</div>
<div class="bar-row">
  <div class="bar-label">Whole campus, same Week 5 sort</div>
  <div class="bar-track"><div class="bar-fill long" style="width: 100%"></div></div>
  <div class="bar-value">a visible, multi-second pause</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: the point is the gap, not the exact seconds.</div>

Nothing about the sort changed. Only the size of the directory did.

<!-- notes: Pause after showing the second bar. Let the silence make the point. -->

---

<!-- SLOT 5: Cost of not knowing -->

# What Else This Actually Costs

- A sort that feels instant on the 40-room test building can still be
  the single biggest bottleneck on the real, full-size dataset -
  passing a small test hides a growth-rate problem, it doesn't fix one.
- Every building CampusNav adds (a new dorm, a satellite campus)
  makes the freeze *longer*, not shorter - the problem gets worse
  exactly when the app is succeeding and growing.
- Nobody can just "add a faster computer" their way out of a bad
  growth rate forever - the same gap reappears at the next size jump.

<div class="why">
<strong>In industry:</strong> "sorting algorithms and their trade-offs"
is one of the most common technical-interview categories at every
major tech company, and a production slowdown caused by an operation
that was fine in a small staging environment but not at real scale is
a well-known, recurring class of incident.
</div>

---

# The Gap Widens As CampusNav Grows

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">One building, ~40 rooms</div>
  <div class="bar-track"><div class="bar-fill risk-low" style="width: 12%"></div></div>
  <div class="bar-value">unnoticeable</div>
</div>
<div class="bar-row">
  <div class="bar-label">Whole campus, ~1,200 rooms</div>
  <div class="bar-track"><div class="bar-fill risk-med" style="width: 55%"></div></div>
  <div class="bar-value">a visible freeze, every re-sort</div>
</div>
<div class="bar-row">
  <div class="bar-label">Campus + partner campuses, ~10,000 rooms</div>
  <div class="bar-track"><div class="bar-fill risk-high" style="width: 92%"></div></div>
  <div class="bar-value">collapses - seconds become minutes</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: the point is the trend.</div>

A sort with the wrong growth rate doesn't get "a little worse" as
CampusNav grows. It gets categorically worse.

---

<!-- SLOT 6: Driving question -->

# This Week's Question

<div class="driving-q">"How do we sort a large, growing list fast enough that this gap never comes back - no matter how big CampusNav gets?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. Trace merge sort's divide/conquer/combine structure and explain
   why its recurrence resolves to $O(n \log n)$ no matter the input.
2. Hand-trace both the Lomuto and Hoare partition schemes on a small
   array.
3. Explain why pivot choice - not quicksort itself - determines
   whether it runs in $O(n \log n)$ or collapses to $O(n^2)$, and
   construct the **adversarial input** (an input specifically built to
   trigger an algorithm's worst case) that triggers the worst case.
4. Compare merge sort and quicksort on time, space, stability, and
   in-place-ness, and justify which one fits a given constraint.

---

<!-- SLOT 8: Origin -->

# This Problem Is Not New

<div class="thread">Two TAs (teaching assistants) split a pile of exam papers to grade faster. Today's two techniques do exactly that to a sort - here's who solved it first.</div>

- **Merge sort** was invented by **John von Neumann in 1945**,
  described in a report for the EDVAC - one of the very first
  algorithms ever designed specifically for a stored-program computer,
  not worked out by hand.
- **Quicksort** was invented by **Tony Hoare in 1959-60**, then a
  20-something student in Moscow, trying to speed up word lookups for
  a Russian-to-English machine-translation project - he needed
  something faster than merge sort's guaranteed extra memory, on a
  machine that barely had any memory to spare.

<div class="why">
Both were solving the exact shape of problem CampusNav has right now:
sort a big list, fast, with the hardware you actually have - not the
hardware you wish you had.
</div>

---

<!-- Key Words Today, session 2 -->

# Key Words Today

- **Merge:** combine two already-sorted lists into one sorted list, in
  a single pass.
- **Auxiliary space:** extra memory an algorithm needs beyond the
  original input array.
- **Recurrence:** an equation defining a function's cost in terms of
  itself on a smaller input (Week 4) - merge sort's entire cost is one
  of these.
- **Pivot:** the reference value quicksort partitions the array around.

<!-- notes: Read each term aloud. Say the recurrence idea returns from Week 4, now applied to a real algorithm instead of a toy tour-time example. -->

---

<!-- SLOT 9: Core concept -->

# Divide-and-Conquer Sorting

<div class="thread">Splitting a pile of exam papers between two TAs to grade faster - the same shape, named precisely. (CLRS - Cormen/Leiserson/Rivest/Stein's <em>Introduction to Algorithms</em>, 4th ed, §2.3)</div>

> A **divide-and-conquer algorithm** solves a problem by (1) dividing
> it into smaller subproblems of the same shape, (2) solving each
> subproblem recursively, and (3) combining the subproblem solutions
> into a solution for the original problem.

- **Merge sort** puts almost all its work in step 3, *combine*:
  dividing is trivial (split at the midpoint), and merging back
  together does the real work - at the cost of needing helpers (extra
  memory) to hold the pieces while they merge.

---

# Divide-and-Conquer Sorting, Continued

- **Quicksort** puts almost all its work in step 1, *divide*: the
  partition step does the real work, and once it's done, combining is
  free. No helpers needed - but a bad "landmark" (pivot) choice can
  cost it dearly, as the second half of today's deck shows.

---

<!-- Act 3 / BUILD: Merge sort mechanics -->

# Merge Sort: Idea and Pseudocode

<div class="thread">Split, recursively sort each half, merge them back. (CLRS 4th ed, §2.3)</div>

<div class="two-col">
<div>

Split the array at its midpoint into two halves. Recursively
merge-sort each half (base case: a subarray of length &le; 1 is
trivially sorted). Merge the two now-sorted halves back into one
sorted array - almost all the real work happens in this last step.

</div>
<div>

```text
MERGE-SORT(A, p, r):
    if p < r:
        q = floor((p + r) / 2)
        MERGE-SORT(A, p, q)
        MERGE-SORT(A, q + 1, r)
        MERGE(A, p, q, r)
```

</div>
</div>

<div class="pain">
<strong>Index convention switch, starting here:</strong> this slide
through Quicksort, Lomuto, and Hoare below uses CLRS's
<strong>1-based</strong> indexing (`A[1]` is the first element) - not
the 0-based indexing used so far. Back to 0-based next week.
</div>

---

# Merge Sort: The Combine Step, MERGE

<div class="thread">Two already-sorted halves in, one sorted array out.</div>

<div class="two-col">
<div>

Copy the two halves into fresh arrays `L` and `R`, each capped with a
**sentinel** $\infty$ value - a placeholder chosen so it never wins a
comparison, so we never need a separate check for "one side ran out."
Then repeatedly take whichever of `L[i]`, `R[j]` is smaller.

</div>
<div>

```text
MERGE(A, p, q, r):
    n1 = q - p + 1
    n2 = r - q
    let L[1..n1+1], R[1..n2+1] be new arrays
    for i=1 to n1: L[i] = A[p+i-1]
    for j=1 to n2: R[j] = A[q+j]
    L[n1+1] = infinity
    R[n2+1] = infinity
    i = 1; j = 1
    for k = p to r:
        if L[i] <= R[j]:
            A[k]=L[i]; i=i+1
        else:
            A[k]=R[j]; j=j+1
```

</div>
</div>

`L` and `R` are brand-new arrays, copied out of `A` - exactly where
merge sort's extra memory cost comes from.

---

<!-- Dense worked example, merge, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">MERGE · worked example 1 of 3 (simple)</div>

# Uneven Halves: L = [3, 6], R = [1, 2]

<div class="wx-top">
<div class="lead">The smallest case that still shows one side running out before the other.</div>
<div class="goalbox"><span class="k">Goal</span>Merge two tiny sorted lists and see what happens when one empties first.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Compare 3 vs 1</div>
<div class="wx-body">L[1]=3, R[1]=1. R is smaller &rarr; take 1. Merged so far: [1].</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Compare 3 vs 2</div>
<div class="wx-body">L[1]=3, R[2]=2. R is smaller &rarr; take 2. Merged so far: [1, 2]. R is now exhausted.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">R's sentinel fires</div>
<div class="wx-body">R[3] is the &infin; sentinel - it can never win, so every remaining comparison takes from L automatically: 3, then 6.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>Merged result: [1, 2, 3, 6] - 2 real comparisons, then the sentinel drains the rest with no special-case code.</div>
<div class="takeaway"><span class="k">Key takeaway</span>The &infin; sentinel is what lets one `for` loop handle "a side ran out" without a separate check.</div>

---

<!-- Dense worked example, merge, moderate tier -->
<!-- _class: dense -->

<div class="eyebrow">MERGE · worked example 2 of 3 (moderate)</div>

# Full Merge: L = [2, 5, 8], R = [1, 3, 9]

<div class="wx-top">
<div class="lead">Six elements, six comparisons - every one placed exactly once.</div>
<div class="goalbox"><span class="k">Goal</span>Merge two equal-length sorted lists, tracking every comparison.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Steps 1-2</div>
<div class="wx-body">L[1]=2 vs R[1]=1 &rarr; take 1. L[1]=2 vs R[2]=3 &rarr; take 2. Merged: [1, 2].</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Steps 3-4</div>
<div class="wx-body">L[2]=5 vs R[2]=3 &rarr; take 3. L[2]=5 vs R[3]=9 &rarr; take 5. Merged: [1, 2, 3, 5].</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Steps 5-6</div>
<div class="wx-body">L[3]=8 vs R[3]=9 &rarr; take 8. Only R[3]=9 remains &rarr; take 9. Merged: [1, 2, 3, 5, 8, 9].</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why O(n)</div>
<div class="wx-body">Every comparison only looks at the next unused element of L and R - each of the 6 elements is placed exactly once.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>Result: [1, 2, 3, 5, 8, 9] - 6 comparisons for 6 elements, so MERGE runs in O(n1 + n2) = O(n).</div>
<div class="takeaway"><span class="k">Key takeaway</span>MERGE never looks backward or re-checks an element - that single-pass property is what makes it linear.</div>

---

<!-- Dense worked example, merge sort, harder tier -->
<!-- _class: dense -->

<div class="eyebrow">Merge sort · worked example 3 of 3 (harder)</div>

# The Full Sort, Every Level: [5, 2, 4, 7, 1, 3]

<div class="wx-top">
<div class="lead">One MERGE call was traced above. Here is the whole recursion, split then merged back up.</div>
<div class="goalbox"><span class="k">Goal</span>Sort all six elements and count the levels of recursion it takes.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Split (no comparisons)</div>
<div class="wx-body">Recursively halve until every piece is a single element: 5, 2, 4, 7, 1, 3 - each trivially sorted.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Merge level 2</div>
<div class="wx-body">MERGE(2,4) &rarr; [2,4]. MERGE(1,3) &rarr; [1,3]. 5 and 7 have no sibling yet.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Merge levels 1 &amp; 0</div>
<div class="wx-body">MERGE([5],[2,4]) &rarr; [2,4,5]. MERGE([7],[1,3]) &rarr; [1,3,7]. MERGE([2,4,5],[1,3,7]) &rarr; [1,2,3,4,5,7].</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Levels vs. work</div>
<div class="wx-body">3 levels of merging for n=6 elements (log&#8322;6 &approx; 2.6, rounded up to 3) - each level's merges together touch all 6 elements once, i.e. O(n) per level.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>Fully sorted in 3 merge levels: the six inputs 5, 2, 4, 7, 1, 3 become [1, 2, 3, 4, 5, 7].</div>
<div class="takeaway"><span class="k">Key takeaway</span>&Theta;(log n) levels, each doing &Theta;(n) total work - that product is exactly next slide's recurrence.</div>

---

# Merge Sort's Cost: The Recurrence

<div class="thread">Week 4 previewed solving recurrences by hand. Here's a real one.</div>

$$
T(n) = 2T(n/2) + O(n)
$$

Two half-size recursive calls, plus one $O(n)$ `MERGE` at the top.

- The recursion tree has $\log n$ levels.
- Every level's total merge work, summed across all its nodes, is
  $O(n)$ - the halves get smaller, but there are more of them.
- Total cost: $O(n)$ work $\times$ $\log n$ levels $= O(n \log n)$.
  (Generalized as the Master Theorem in Week 9 - for now, the
  recursion-tree method from Week 4 is all we need.)

<span class="bignotation">O(n log n)</span> - best, average, **and**
worst case. Merge sort's divide step always splits exactly in half,
so there's no unlucky input that makes it worse.

---

# Merge Sort: Stability

`MERGE`'s tie-breaking rule is `L[i] <= R[j]`, never strict `<`. On a
tie, the left half's element always wins. Proof by counterexample of
what breaks without it: with `L = [2, 5]`, `R = [2, 9]` (the left `2`
originally earlier in the array), the `<=` rule takes the left `2`
first, preserving its original order. Change the rule to strict `<`
and `L[1]=2 < R[1]=2` is false, so the *right* `2` is taken first
instead - the two equal keys swap places. One character (`<=` vs `<`)
is the entire difference between a stable merge and an unstable one.

---

# Merge Sort: Space

Week 5's sorts rearranged `A` in place, using only $O(1)$ extra
memory. Merge sort trades that away: `MERGE` allocates new `L`/`R`
arrays every call, for a guaranteed $O(n \log n)$ in return.

---

<!-- Key Words Today, session 3 -->

# Key Words Today

- **Lomuto partition:** the simpler-to-trace partition scheme, pivot
  fixed as the last element.
- **Hoare partition:** the original 1961 scheme, scanning from both
  ends toward the middle, fewer swaps on average.
- **Worst case (revisited):** for quicksort, the input that makes the
  pivot choice as bad as possible, every single time.
- **Expected case:** quicksort's typical running time, averaged over
  random inputs or random pivot choices - not a guarantee.

<!-- notes: Read each term aloud. Say today's second half is entirely about the gap between "expected" and "worst case." -->

---

<!-- Act 3 / BUILD: Quicksort mechanics -->

# Now: A Different Strategy

<div class="driving-q">"How do we sort a large, growing list fast enough that this gap never comes back - no matter how big CampusNav gets?"</div>

Merge sort guarantees $O(n \log n)$ by paying $O(n)$ extra space.
What if we sort **in place** instead?

---

# Quicksort: Idea and Pseudocode

<div class="thread">Pick a landmark, separate everything around it, recurse. (CLRS 4th ed, Ch 7, §7.1)</div>

<div class="two-col">
<div>

Pick one element as the **pivot**. **Partition:** rearrange the array
so everything $\le$ pivot ends up to its left, everything $>$ pivot
ends up to its right, and the pivot lands in its own final sorted
position. Recursively quicksort the left part and the right part - **no
merge step needed.** The pieces are already assembled, in order, in
place.

</div>
<div>

```text
QUICKSORT(A, low, high):
    if low < high:
        p = PARTITION(A, low, high)
        QUICKSORT(A, low, p - 1)
        QUICKSORT(A, p + 1, high)
```

`PARTITION` is either scheme on the
next two slides - the driver above
is identical either way.

</div>
</div>

---

# Lomuto Partition: Pseudocode

<div class="thread">The pivot is always the last element; `i` tracks the boundary of the "&le; pivot" region.</div>

<div class="two-col">
<div>

As `j` scans left to right, `i` marks the last position known to hold
a value $\le$ pivot. Every time `A[j] \le$ pivot, `i` advances and
swaps `A[j]` into the "$\le$ pivot" region. The pivot itself is swapped
into place as the very last step, guaranteeing it lands at its final
sorted index.

</div>
<div>

```text
LOMUTO-PARTITION(A, low, high):
    pivot = A[high]
    i = low - 1
    for j = low to high - 1:
        if A[j] <= pivot:
            i = i + 1
            swap A[i], A[j]
    swap A[i + 1], A[high]
    return i + 1
```

</div>
</div>

---

# Hoare Partition: Pseudocode

<div class="thread"><code>repeat ... until</code>: runs the body at least once, then repeats until the condition is finally true (checked after the body, not before) - previewed in Week 2's reference card.</div>

<div class="two-col">
<div>

The pivot is the **first** element this time; `i` and `j` scan inward
from both ends. It returns a split point `j`, not the pivot's final
index, so the recursive calls above become `QUICKSORT(A, low, p)` and
`QUICKSORT(A, p + 1, high)`. Hoare designed this version first, in
1961; it does about 3x fewer swaps on average than Lomuto's, which
came later and is the one most textbooks trace by hand.

</div>
<div>

```text
HOARE-PARTITION(A, low, high):
    pivot = A[low]
    i = low - 1
    j = high + 1
    while true:
        repeat j=j-1 until A[j]<=pivot
        repeat i=i+1 until A[i]>=pivot
        if i < j:
            swap A[i], A[j]
        else:
            return j
```

</div>
</div>

---

<!-- Dense worked example, partition, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Lomuto partition · worked example 1 of 3 (simple)</div>

# Three Elements: [3, 1, 2], Pivot = 2

<div class="wx-top">
<div class="lead">The smallest case that still needs one swap and one final placement.</div>
<div class="goalbox"><span class="k">Goal</span>Partition [3, 1, 2] around the last element and watch `i` track the boundary.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">pivot = A[3] = 2. i = 0 (no elements confirmed &le; 2 yet).</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">j = 1: A[1]=3</div>
<div class="wx-body">3 &gt; 2, not &le; pivot &rarr; nothing happens. i stays 0.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">j = 2: A[2]=1</div>
<div class="wx-body">1 &le; 2 &rarr; i becomes 1, swap A[1], A[2] &rarr; [1, 3, 2].</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Final swap</div>
<div class="wx-body">Loop ends (j only reaches high&minus;1=2). Swap A[i+1]=A[2] with A[3] &rarr; [1, 2, 3]. Pivot 2 lands at index 2.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>[3, 1, 2] &rarr; [1, 2, 3] after 2 comparisons and 2 swaps - pivot 2 is at its final sorted index.</div>
<div class="takeaway"><span class="k">Key takeaway</span>The final swap is not optional cleanup - it is the one step that guarantees the pivot reaches its correct position.</div>

---

<!-- Dense worked example, partition, moderate tier -->
<!-- _class: dense -->

<div class="eyebrow">Lomuto partition · worked example 2 of 3 (moderate)</div>

# Full Trace: [8, 3, 5, 1, 9, 2], Pivot = 2

<div class="wx-top">
<div class="lead">A six-element array, pivot fixed as the last (and smallest) element.</div>
<div class="goalbox"><span class="k">Goal</span>Partition the array and confirm the pivot lands at its correct index.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">pivot = A[6] = 2. i = 0.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">j = 1..3</div>
<div class="wx-body">A[1]=8, A[2]=3, A[3]=5 - all &gt; 2 &rarr; nothing happens each time.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">j = 4, 5</div>
<div class="wx-body">A[4]=1 &le; 2 &rarr; i=1, swap A[1],A[4] &rarr; [1,3,5,8,9,2]. A[5]=9 &gt; 2 &rarr; nothing.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Final swap</div>
<div class="wx-body">Swap A[i+1]=A[2] with A[6] &rarr; [1, 2, 5, 8, 9, 3]. Pivot 2 at index 2. Left [1] all &le; 2; right [5,8,9,3] all &gt; 2.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>Result: [1, 2, 5, 8, 9, 3] - 5 comparisons, 2 swaps, pivot correctly placed.</div>
<div class="takeaway"><span class="k">Key takeaway</span>Lomuto's `i` boundary only moves on a real "&le; pivot" hit - most of the array (8, 5, 9) never triggers it at all.</div>

---

<!-- Dense worked example, partition, harder tier -->
<!-- _class: dense -->

<div class="eyebrow">Hoare partition · worked example 3 of 3 (harder)</div>

# Full Trace: [5, 3, 8, 4, 2, 7], Pivot = 5 (First Element)

<div class="wx-top">
<div class="lead">Same idea, a scheme that scans from both ends - and a pivot that does NOT land at its own index.</div>
<div class="goalbox"><span class="k">Goal</span>Partition with Hoare's scheme and see exactly how it differs from Lomuto's.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Round 1</div>
<div class="wx-body">j scans down to index 5 (A[5]=2 &le; 5); i scans up to index 1 (A[1]=5 &ge; 5). i&lt;j &rarr; swap A[1],A[5] &rarr; [2,3,8,4,5,7].</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Round 2</div>
<div class="wx-body">j scans down to index 4 (A[4]=4 &le; 5); i scans up to index 3 (A[3]=8 &ge; 5). i&lt;j &rarr; swap A[3],A[4] &rarr; [2,3,4,8,5,7].</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Round 3</div>
<div class="wx-body">j scans down to index 3 (A[3]=4 &le; 5); i scans up to index 4 (A[4]=8 &ge; 5). i&ge;j &rarr; return j=3. Result: [2,3,4,8,5,7].</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Contrast with Lomuto</div>
<div class="wx-body">Pivot value 5 is now sitting inside the *right* partition (A[5]), not at index 3. Hoare only guarantees "&le; pivot on the left of j, &ge; pivot on the right" - never a dedicated final swap. That's why its recursive calls split at [low,p]/[p+1,high], not Lomuto's [low,p-1]/[p+1,high].</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>Split at j=3: A[1..3]=[2,3,4] all &le; 5; A[4..6]=[8,5,7] all &ge; 5 - correct, even though the pivot itself isn't at index 3.</div>
<div class="takeaway"><span class="k">Key takeaway</span>Two partition schemes, two different contracts - always check which one a piece of pseudocode promises before trusting where the pivot ends up.</div>

---

# Pivot-Choice Strategies

| Strategy | Rule | Worst-case trigger | Typical behavior |
|---|---|---|---|
| First element | pivot = A[low] | Already-sorted or reverse-sorted input | $O(n^2)$ on sorted data - common in practice! |
| Last element | pivot = A[high] | Same risk, mirrored | $O(n^2)$ on sorted/reverse-sorted data |
| Random | pivot = random index | No input an adversary can fix in advance | Expected $O(n \log n)$ |
| Median-of-three | pivot = median(A[low], A[mid], A[high]) | Requires a deliberately contrived input | Expected $O(n \log n)$, fewer bad splits than pure random |

The **partition scheme** (Lomuto/Hoare) decides *how* pivot and array
interact. The **pivot-choice strategy** decides *which value* becomes
the pivot. Both matter, but only pivot choice decides worst case.

---

<!-- Dense flagship: proving quicksort's worst case -->
<!-- _class: dense -->

<div class="eyebrow">Quicksort · proving the worst case</div>

# Why an Ordinary Input Triggers O(n&sup2;)

<div class="wx-top">
<div class="lead">The moderate-tier trace above converged in a few levels. This is the opposite: the input Assignment 2 asks you to measure yourself.</div>
<div class="goalbox"><span class="k">Goal</span>Show that Lomuto with a fixed last-element pivot hits &Theta;(n&sup2;) on already-sorted data.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">The setup</div>
<div class="wx-body">CampusNav's directory often arrives already alphabetized - most re-sorts happen after just one new room is added near the end.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Every split is 0/(n&minus;1)</div>
<div class="wx-body">On sorted input, the last element is always the largest remaining value. Partition puts all n&minus;1 others on one side, 0 on the other - every single call.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Recurrence</div>
<div class="wx-body">Recursion depth becomes n, not log n: T(n) = T(n&minus;1) + O(n), which resolves to <span class="bignotation">O(n&sup2;)</span> - the same closed form as Week 5's bubble sort worst case.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The fix isn't luck</div>
<div class="wx-body">The input wasn't unusual - the pivot strategy was. A random or median-of-three pivot removes the adversary's ability to predict the split in advance.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>Fixed first/last-element pivots hit O(n&sup2;) on any already- or reverse-sorted input - not a rare edge case, a predictable one.</div>
<div class="takeaway"><span class="k">Key takeaway</span>"Quicksort's worst case is rare" is only true once the pivot strategy stops being predictable.</div>

---

# Outlook: Randomized Quicksort

<div class="thread">Not required for this course - CLRS §7.3, the standard fix for the case above.</div>

CLRS's `RANDOMIZED-PARTITION` makes the "random pivot" row precise:
before partitioning, swap `A[high]` with a uniformly random element,
then run ordinary `LOMUTO-PARTITION` as before.

```text
RANDOMIZED-PARTITION(A, low, high):
    i = random integer in [low, high]
    swap A[i], A[high]
    return LOMUTO-PARTITION(A, low, high)
```

On the same already-sorted array from the proof above, no fixed input
can force a bad split *every* time, because the algorithm's own
randomness - not the data - decides the pivot. CLRS §7.3 proves this
gives **expected** $O(n \log n)$ on *any* input, including the one
that just defeated every fixed pivot rule.

---

# Quicksort's Properties: In-Place & Not Stable

<div class="two-col">
<div>

**In-place**

Partition rearranges `A` itself - no second full-size array like
`MERGE`'s `L`/`R`. Only $O(\log n)$ extra space for the recursion call
stack (up to $O(n)$ if the recursion is badly unbalanced).

</div>
<div>

**Not stable**

Partition swaps elements past each other to build the two sides. Two
equal-keyed elements can end up in a different relative order than
they started - e.g. sorting `[(3,x), (1,y), (3,z)]` by key can leave
`z` before `x` in the result.

</div>
</div>

---

# Merge Sort vs. Quicksort

| | Merge Sort | Quicksort |
|---|---|---|
| Best case | $O(n \log n)$ | $O(n \log n)$ |
| Average case | $O(n \log n)$ | $O(n \log n)$ |
| Worst case | $O(n \log n)$ | $O(n^2)$ |
| Space | $O(n)$ auxiliary | $O(\log n)$ auxiliary (call stack) |
| Stable? | Yes | No |
| In-place? | No | Yes |
| Typical use | Guaranteed performance needed, external/linked-list sorts, stability required | Fastest in practice on arrays, when a good pivot strategy is used |

---

# Merge Sort vs. Quicksort, Continued

Choose merge sort whenever a hard worst-case guarantee or preserved
duplicate-key order is required; choose quicksort, with a safe pivot
strategy, whenever raw in-place speed matters more.

---

<!-- SLOT N-2: Worked example -->
<!-- _class: dense -->

<div class="eyebrow">CampusNav worked example</div>

# Sorting the Full Campus Directory

<div class="wx-top">
<div class="lead">Same directory, same freeze from the pain slide - now solved.</div>
<div class="goalbox"><span class="k">Goal</span>Compare Week 5's O(n&sup2;) cost against today's O(n log n), at real scale.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">The old cost</div>
<div class="wx-body">1,200 rooms, Week 5's sorts: roughly n&sup2;/2 &approx; 1.44 million comparisons, worst case - the freeze from the pain slide, made concrete.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">The new cost</div>
<div class="wx-body">Merge sort, or quicksort with a random/median-of-three pivot: roughly n log&#8322;n. Since log&#8322;(1,200) &approx; 11, that's about 1,200 &times; 11 &approx; 13,000 comparisons.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">The gap</div>
<div class="wx-body">1,440,000 vs. 13,000 - about 100x fewer comparisons for the exact same directory.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>The freeze disappears, and it stays gone once the partner campuses join and the directory heads toward 10,000 rooms - because the growth rate itself changed, not just today's size.</div>
<div class="takeaway"><span class="k">Key takeaway</span>A ~100x win at 1,200 rooms is not the ceiling - the gap between O(n&sup2;) and O(n log n) only widens as n grows.</div>

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **"Quicksort's $O(n^2)$ worst case is rare enough to ignore."** It
  isn't rare by construction - a first- or last-element pivot hits it
  on any already-sorted or reverse-sorted input, which is an entirely
  ordinary shape for real data (like re-sorting an already-mostly-sorted
  directory). The fix is the pivot *strategy*, not hoping the input
  stays random.
- **"In-place means quicksort uses no extra memory at all."** It still
  needs $O(\log n)$ space for the recursion call stack (up to $O(n)$ if
  unbalanced) - "in-place" means no second copy of the array, not zero
  memory.
- **"Whichever sort is faster on average is just the better sort."**
  Merge sort's guaranteed worst case and stability can matter more than
  quicksort's faster typical case - e.g. wherever a hard performance
  guarantee or preserved original order is required.

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 7 slot 4 -->

# What Advanced Sorting Cannot Do

<div class="limits">
Sorting is now solved efficiently: merge sort's guaranteed O(n log
n), or quicksort in place with a safe pivot strategy, both beat
Week 5's O(n^2) wall by roughly 100x on CampusNav's real directory.
But CampusNav's directory being sorted, by itself, helps nobody yet -
the "jump to room" button still starts at the top of the list and
checks every entry one by one, same as always. Nothing in the app
actually <em>uses</em> the fact that the list is now in order. We still have
no formal, proven-correct way to search a sorted list.
Being sorted is necessary. It is not yet useful.
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 6 leaves **searching a sorted list quickly and correctly**
unsolved. **Week 7, Searching**, addresses it: binary search,
formalized and proven correct, turning CampusNav's now-sorted
directory into a "jump to room" feature that takes about 11
comparisons (since $\log_2(1{,}200) \approx 11$) instead of scanning
up to 1,200 entries.

---

<!-- CLRS reference slide, immediately before Summary -->

# Where This Week Lives in CLRS

<div class="thread">A map, for anyone reading alongside the lectures.</div>

| Topic | CLRS 4th ed |
|---|---|
| Divide-and-conquer, merge sort | §2.3 (in the Ch 2 "Getting Started" chapter) |
| Quicksort description | Ch 7, §7.1 |
| Quicksort performance (worst/average case) | §7.2 |
| Randomized quicksort | §7.3 |
| Quicksort analysis | §7.4 |

- **If you want to go deeper:** §7.3's `RANDOMIZED-PARTITION` (the
  outlook slide above) is the standard fix for the adversarial-input
  problem this week's "Common Mistakes" slot warns about. Also worth a
  look: CLRS §9.2 (the SELECT algorithm) reuses quicksort's own
  partition step to find a median in linear time.

---

<!-- SLOT N+3: Summary -->

# Summary

- Merge sort divides trivially and does its real work in the
  *combine* step - always $O(n \log n)$, stable, but $O(n)$ auxiliary
  space.
- Quicksort partitions in place and does its real work in the
  *divide* step - in-place, not stable, and its running time lives or
  dies on pivot choice: $O(n \log n)$ expected with a safe strategy,
  $O(n^2)$ worst case with a naive one on sorted-ish data.
- **Assignment 2 (Sorting)** is released - see
  `materials/assignments/assignment2.md`, due **Week 8**, before the
  midterm exam begins.
- **New: Week 6 Check** - a short graded exercise on merge sort and
  quicksort, separate from Assignment 2, released now, due before
  Week 7 begins (see `materials/assignments/week06-check.html`).

---

# Summary, Continued

- **Reading:** CLRS 4th ed, §2.3 (Merge Sort, in Ch 2) and Ch 7
  (Quicksort: §7.1 Description, §7.2 Performance, §7.3 Randomized
  version, §7.4 Analysis) - see the CLRS map above; read before Week 7.
- **Prepare:** think about how you'd search a *sorted* list without
  checking every entry. Bring your idea to Week 7.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
