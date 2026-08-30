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
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703<br>
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

<!-- NEW: warm-up, placed right after the roadmap (slot 2) per course design -->

# Before We Start: Sorting a Mountain of Exam Papers

<div class="thread">A quick warm-up. No code needed yet.</div>

Two hundred graded exam papers need alphabetizing by last name before
they're returned. Two TAs propose different methods.

- **Method A:** split the pile in half, hand each half to a partner
  TA, who splits it again, and again, until each pile is tiny and
  trivially ordered by hand - then zip the small ordered piles back
  together, two at a time, largest piles last.
- **Method B:** grab one paper as a landmark. Walk the whole stack
  once, putting every paper that comes "before" it in one hand and
  "after" it in the other. Repeat that same trick separately on each
  smaller pile.

<!--
notes: Give students 30 seconds to think, alone, before asking.
Do not name "merge sort" or "quicksort" yet - let them describe "split and combine" vs "pick a landmark and separate" in their own words.
Plant the seed: ask "what would a *bad* landmark paper look like?" Don't resolve it - this pays off later today.
-->

---

# Before We Start: Two Questions to Hold Onto

<div class="thread">Same warm-up, the question that drives today's deck.</div>

- Which method needs more helpers working at once? Which one risks
  redoing a lot of work if the landmark paper turns out to be a bad
  pick?

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

<!-- NEW: Key Words Today, session 1 -->

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
the whole DEU campus's 1,200 - and new rooms get added most semesters.
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

<!-- _class: section -->

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

<!-- NEW: session-1 close, previews Worksheet Part A -->

# Coming Up: Worksheet Part A

<div class="thread">Later in this class: less listening, more doing.</div>

Once we've covered merge sort, you and a partner will hand-trace a
merge step yourselves, on two small sorted lists.

That is **Worksheet Part A**. Keep a pen ready.

---

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: where did these two strategies come from?</div>

---

<!-- SLOT 8: Origin -->

# This Problem Is Not New

<div class="thread">You just felt the freeze. Now: who solved it first, and how?</div>

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

<!-- NEW: Key Words Today, session 2 -->

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

<div class="thread">The warm-up's two methods, now named precisely.</div>

> A **divide-and-conquer algorithm** solves a problem by (1) dividing
> it into smaller subproblems of the same shape, (2) solving each
> subproblem recursively, and (3) combining the subproblem solutions
> into a solution for the original problem.

- **Merge sort** puts almost all its work in step 3, *combine*:
  dividing is trivial (split at the midpoint), and merging back
  together does the real work.
- **Quicksort** puts almost all its work in step 1, *divide*: the
  partition step does the real work, and once it's done, combining is
  free - the pieces are already assembled, in order, in place.

---

<!-- Act 3 / BUILD: Merge sort mechanics -->

# Merge Sort: Divide, Conquer, Combine

<div class="thread">Method A from the warm-up, made precise.</div>

<div class="pipeline">
<div class="stage"><div class="h">Divide</div><div class="s">Split the array at its midpoint into two halves</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Conquer</div><div class="s">Recursively merge-sort each half (base case: length ≤ 1)</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Combine</div><div class="s">Merge the two now-sorted halves into one sorted array</div></div>
</div>

The recursion bottoms out at single elements - a list of length 1 is,
trivially, already sorted - then every level of recursion merges
sorted pieces back together on the way up.

---

# Pseudocode: MERGE-SORT

```text
MERGE-SORT(A, p, r):
    if p < r:
        q = floor((p + r) / 2)
        MERGE-SORT(A, p, q)
        MERGE-SORT(A, q + 1, r)
        MERGE(A, p, q, r)
```

- **Base case:** `p >= r` means the subarray has 0 or 1 elements -
  already sorted, nothing to do.
- **Initial call:** `MERGE-SORT(A, 1, n)` sorts the whole array.

<div class="pain">
<strong>Index convention switch, starting here:</strong> this slide
through Quicksort, Lomuto, and Hoare below uses CLRS's
<strong>1-based</strong> indexing (`A[1]` is the first element) - not
the 0-based indexing used so far. Back to 0-based next week.
</div>

---

# Pseudocode: MERGE (the combine step)

```text
MERGE(A, p, q, r):
    n1 = q - p + 1
    n2 = r - q
    let L[1..n1+1] and R[1..n2+1] be new arrays
    for i = 1 to n1:  L[i] = A[p + i - 1]
    for j = 1 to n2:  R[j] = A[q + j]
    L[n1 + 1] = infinity
    R[n2 + 1] = infinity
    i = 1
    j = 1
    for k = p to r:
        if L[i] <= R[j]:
            A[k] = L[i];  i = i + 1
        else:
            A[k] = R[j];  j = j + 1
```

---

# Reading MERGE's Pseudocode

<div class="thread">Two details worth naming before tracing it by hand.</div>

- The **sentinel** $\infty$ values - placeholder values chosen so they
  never win a comparison - mean we never need a separate check for
  "one side ran out"; it just always loses every comparison.
- `L` and `R` are **brand-new arrays**, copied out of `A` - this is
  exactly where merge sort's extra memory cost comes from.

---

# Tracing MERGE, Step by Step

<div class="thread">Two already-sorted halves, mid-merge.</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">L</div><div class="cell">1</div><div class="cell hl">2</div><div class="cell">5</div><div class="cell">8</div></div>
<div class="row"><div class="rowlabel">R</div><div class="cell">1</div><div class="cell hl2">3</div><div class="cell">9</div></div>
<div class="row"><div class="rowlabel">Merged so far</div><div class="cell">1</div><div class="cell">2</div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div></div>
</div>

Snapshot: `L = [2,5,8]`, `R = [1,3,9]`, three elements already placed.
Comparing `L[i]=2` (blue) against `R[j]=3` (gold) - 2 is smaller, so
it's taken next.

---

# The Full Merge, All Six Comparisons

<div class="thread">Same two halves. Every step, start to finish.</div>

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">L[1]=2 vs R[1]=1 &rarr; 1 is smaller, take 1</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">L[1]=2 vs R[2]=3 &rarr; 2 is smaller, take 2</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">L[2]=5 vs R[2]=3 &rarr; 3 is smaller, take 3</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">L[2]=5 vs R[3]=9 &rarr; 5 is smaller, take 5</div></div>
<div class="step-row"><div class="step-num">5</div><div class="step-text">L[3]=8 vs R[3]=9 &rarr; 8 is smaller, take 8</div></div>
<div class="step-row"><div class="step-num">6</div><div class="step-text">Only R[3]=9 remains &rarr; take 9</div></div>
</div>

---

# MERGE Result

<div class="tracetable">
<div class="row"><div class="rowlabel">L</div><div class="cell">2</div><div class="cell">5</div><div class="cell">8</div></div>
<div class="row"><div class="rowlabel">R</div><div class="cell">1</div><div class="cell">3</div><div class="cell">9</div></div>
<div class="row"><div class="rowlabel">Merged</div><div class="cell hl">1</div><div class="cell hl">2</div><div class="cell hl">3</div><div class="cell hl">5</div><div class="cell hl">8</div><div class="cell hl">9</div></div>
</div>

Every comparison only ever looks at the **next unused element** of
`L` and `R` - each of the 6 elements is placed exactly once. That's
what makes `MERGE` run in $O(n_1 + n_2) = O(n)$ time.

---

<!-- NEW: full merge-sort trace, part 1 - the split -->

# Merge Sort, Full Trace: The Split

<div class="thread">One MERGE call, traced. Now the whole sort, start to finish - splitting first.</div>

Six elements, `[5, 2, 4, 7, 1, 3]`, split at the midpoint recursively
until every piece is a single element (trivially sorted):

```text
[5,2,4,7,1,3]
├─ [5,2,4]
│   ├─ [5]         [base]
│   └─ [2,4]
│       ├─ [2]     [base]
│       └─ [4]     [base]
└─ [7,1,3]
    ├─ [7]         [base]
    └─ [1,3]
        ├─ [1]     [base]
        └─ [3]     [base]
```

Splitting does no comparisons at all - the real work is next slide.

---

<!-- NEW: full merge-sort trace, part 2 - the merge back up -->

# Merge Sort, Full Trace: The Merge Back Up

<div class="thread">Same split tree, now combined bottom-up, one level at a time.</div>

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">Level 3, singletons: 5, 2, 4, 7, 1, 3 - each trivially sorted</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">Level 2: MERGE(2,4) &rarr; [2,4]; MERGE(1,3) &rarr; [1,3]; 5 and 7 have no sibling yet</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">Level 1: MERGE([5],[2,4]) &rarr; [2,4,5]; MERGE([7],[1,3]) &rarr; [1,3,7]</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">Level 0: MERGE([2,4,5],[1,3,7]) &rarr; [1,2,3,4,5,7] - fully sorted</div></div>
</div>

Every level's total work is one full pass over however many elements
exist at that level - exactly the $O(n)$-per-level the recurrence on
the next slide counts.

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

# Merge Sort: Stability & Space

<div class="two-col">
<div>

**Stable**

`MERGE`'s tie-breaking rule is `L[i] <= R[j]`, never strict `<`. On a
tie, the left half's element always wins - so two equal-keyed
elements never swap relative order.

</div>
<div>

**Space: O(n) auxiliary**

Week 5's sorts rearranged `A` in place, using only $O(1)$ extra
memory. Merge sort trades that away: `MERGE` allocates new `L`/`R`
arrays every call, for a guaranteed $O(n \log n)$ in return.

</div>
</div>

---

<!-- NEW: Try-It hand-off, session 2 -->

# Now: Worksheet Part A

<div class="thread">Time to practice. Trace a merge yourself.</div>

Work with your neighbor. Open **[Worksheet Part
A](materials/week06/worksheet.html)**. Hand-trace `MERGE` on two small
sorted lists, then fill in the recurrence's step count for a few
values of $n$.

**~15 minutes.** Raise your hand if you get stuck.

<!--
notes: Hand out or project Worksheet Part A. Walk the room while pairs work.
After 15 minutes, ask 1-2 pairs to share their traces.
-->

---

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: sorting in place, no extra memory required.</div>

---

<!-- NEW: Key Words Today, session 3 -->

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
<!-- _class: section -->

# Now: A Different Strategy

<div class="driving-q">"How do we sort a large, growing list fast enough that this gap never comes back - no matter how big CampusNav gets?"</div>

Merge sort guarantees $O(n \log n)$ by paying $O(n)$ extra space.
What if we sort **in place** instead?

---

# Quicksort: The Partition Idea

<div class="thread">Method B from the warm-up - the "landmark paper" - made precise.</div>

- Pick one element as the **pivot**.
- **Partition:** rearrange the array so everything $\le$ pivot ends up
  to its left, everything $>$ pivot ends up to its right, and the
  pivot lands in its own final sorted position.
- Recursively quicksort the left part and the right part - **no
  merge step needed.** The pieces are already assembled, in order, in
  place.

---

# Pseudocode: Lomuto Partition

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

QUICKSORT(A, low, high):
    if low < high:
        p = LOMUTO-PARTITION(A, low, high)
        QUICKSORT(A, low, p - 1)
        QUICKSORT(A, p + 1, high)
```

---

# Reading Lomuto's Loop

<div class="thread">What `i` and `j` are each tracking as the loop runs.</div>

- The pivot is always the **last** element.
- `i` tracks the boundary of the "$\le$ pivot" region as `j` scans
  left to right.

---

# Pseudocode: Hoare Partition

<div class="thread"><code>repeat ... until</code>: runs the body at least once, then repeats until the condition is finally true (checked after the body, not before) - previewed in Week 2's reference card.</div>

```text
HOARE-PARTITION(A, low, high):
    pivot = A[low]
    i = low - 1
    j = high + 1
    while true:
        repeat j = j - 1 until A[j] <= pivot
        repeat i = i + 1 until A[i] >= pivot
        if i < j:
            swap A[i], A[j]
        else:
            return j
```

---

# Reading Hoare's Loop

<div class="thread">A different pivot choice, a different return value, a real history.</div>

- The pivot is the **first** element this time; `i` and `j` scan
  inward from both ends.
- Returns a split point `j`, not the pivot's final index - the
  recursive calls become `QUICKSORT(A, low, p)` and
  `QUICKSORT(A, p + 1, high)`.
- Hoare designed this version first, in 1961; it does about 3x fewer
  swaps on average than Lomuto's - Lomuto's simpler-to-explain version
  came later and is the one most textbooks trace by hand.

---

<!-- NEW: compact Hoare partition trace (full step-by-step lives in the handout) -->

# Tracing Hoare Partition

<div class="thread">A = [5, 3, 8, 4, 2, 7], pivot = first element = 5.</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">Before</div><div class="cell hl">5</div><div class="cell">3</div><div class="cell">8</div><div class="cell">4</div><div class="cell">2</div><div class="cell">7</div></div>
</div>

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">j scans down to 5 (A[5]=2 &le; 5), i scans up to 1 (A[1]=5 &ge; 5); i&lt;j &rarr; swap A[1],A[5] &rarr; [2,3,8,4,5,7]</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">j scans down to 4 (A[4]=4 &le; 5), i scans up to 3 (A[3]=8 &ge; 5); i&lt;j &rarr; swap A[3],A[4] &rarr; [2,3,4,8,5,7]</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">j scans down to 3 (A[3]=4 &le; 5), i scans up to 4 (A[4]=8 &ge; 5); i&ge;j &rarr; return j=3</div></div>
</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">After</div><div class="cell hl2">2</div><div class="cell hl2">3</div><div class="cell hl2">4</div><div class="cell">8</div><div class="cell">5</div><div class="cell">7</div></div>
</div>

Split at `j=3`: `A[1..3]=[2,3,4]` all $\le 5$; `A[4..6]=[8,5,7]` all
$\ge 5$. Unlike Lomuto, the pivot value `5` does **not** land at its
own final sorted index - it's just sitting inside the right partition.
Full step-by-step (every individual `repeat` move) is in the handout.

---

# Tracing Lomuto Partition

<div class="thread">A = [8, 3, 5, 1, 9, 2], pivot = last element = 2.</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">Before</div><div class="cell">8</div><div class="cell">3</div><div class="cell">5</div><div class="cell">1</div><div class="cell">9</div><div class="cell hl">2</div></div>
</div>

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">pivot = A[6] = 2, i = 0</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">j=1..3: A[1]=8, A[2]=3, A[3]=5, all &gt; 2 &rarr; nothing happens</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">j=4: A[4]=1 &le; 2 &rarr; i=1, swap A[1],A[4] &rarr; [1,3,5,8,9,2]</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">j=5: A[5]=9 &gt; 2 &rarr; nothing happens</div></div>
<div class="step-row"><div class="step-num">5</div><div class="step-text">Loop ends. Swap A[i+1]=A[2] with A[6] &rarr; [1,2,5,8,9,3]. Return 2.</div></div>
</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">After</div><div class="cell hl2">1</div><div class="cell hl">2</div><div class="cell">5</div><div class="cell">8</div><div class="cell">9</div><div class="cell">3</div></div>
</div>

Pivot `2` sits at its final sorted index. Left of it: `[1]`, all
$\le 2$. Right of it: `[5,8,9,3]`, all $> 2$.

---

<!-- NEW: normal-case quicksort trace, converging across levels -->

# Quicksort, Normal Case: Three Levels Down

<div class="thread">One partition call converges eventually. Here's what happens across several, on an ordinary input.</div>

`A = [6, 3, 8, 1, 9, 2, 7]`. Lomuto partition, last-element pivot,
called recursively:

<div class="tracetable">
<div class="row"><div class="rowlabel">Start</div><div class="cell">6</div><div class="cell">3</div><div class="cell">8</div><div class="cell">1</div><div class="cell">9</div><div class="cell">2</div><div class="cell hl">7</div></div>
<div class="row"><div class="rowlabel">Lvl 1: pivot 7</div><div class="cell">6</div><div class="cell">3</div><div class="cell">1</div><div class="cell">2</div><div class="cell hl2">7</div><div class="cell">8</div><div class="cell">9</div></div>
<div class="row"><div class="rowlabel">Lvl 2: pivot 2</div><div class="cell">1</div><div class="cell hl">2</div><div class="cell">6</div><div class="cell">3</div><div class="cell hl2">7</div><div class="cell">8</div><div class="cell">9</div></div>
<div class="row"><div class="rowlabel">Lvl 3: pivot 3</div><div class="cell">1</div><div class="cell hl2">2</div><div class="cell hl">3</div><div class="cell">6</div><div class="cell hl2">7</div><div class="cell">8</div><div class="cell">9</div></div>
</div>

Three levels, three partition calls, and the array is already fully
sorted - a very different shape from the adversarial case coming up
next.

---

# Quicksort, Normal Case: Step by Step

<div class="thread">Reading the trace, one partition call at a time.</div>

- **Level 1**, `low=1, high=7`, pivot `A[7]=7`: partitions to
  `[6,3,1,2,7,8,9]`. Pivot lands at index 5. Left `[6,3,1,2]` (indices
  1-4) still needs work; right `[8,9]` (indices 6-7) resolves in one
  trivial call.
- **Level 2**, `low=1, high=4` on the left piece, pivot `A[4]=2`:
  partitions to `[1,2,6,3]`. Pivot lands at index 2. Left `[1]` is
  already a base case (size 1); right `[6,3]` (indices 3-4) still
  needs one more call.
- **Level 3**, `low=3, high=4`, pivot `A[4]=3`: partitions to `[3,6]`.
  Pivot lands at index 3. Both remaining pieces are size $\le 1$ -
  recursion bottoms out, and the full array `[1,2,3,6,7,8,9]` is sorted.

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

# Why Pivot Choice Matters: The Adversarial Case

<div class="thread">The exact scenario Assignment 2 asks you to measure yourself.</div>

CampusNav's directory often arrives **already alphabetized** - most
re-sorts happen after just one new room is added near the end. Lomuto
partition, with a fixed last-element pivot, meets this input at its
worst:

- On an already-sorted array, the last element is always the
  **largest** value remaining.
- Partition splits it into $(n-1)$ elements on one side and **0** on
  the other - every single time.
- Recursion depth becomes $n$, not $\log n$: $T(n) = T(n-1) + O(n)$.

<div class="why">
That recurrence resolves to <strong>O(n²)</strong> - the exact growth
rate this week set out to escape. The input wasn't unusual. The pivot
strategy was.
</div>

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

<!-- SLOT N-2: Worked example -->

# CampusNav: Sorting the Full Campus Directory

<div class="thread">Same directory, same freeze from slot 4 - now solved.</div>

CampusNav's directory has grown to **1,200+ rooms**, added
continuously as new buildings and events register. Week 5's sorts
re-alphabetize it from scratch on every addition - the freeze from
earlier is that $n^2$ cost showing up in real time: roughly
**1.44 million** comparisons, worst case.

Swapping in merge sort, or quicksort with a random or median-of-three
pivot, brings that same re-sort down to roughly $n \log n$ comparisons.
Since $\log_2(1{,}200) \approx 11$, that's about $1{,}200 \times 11 \approx
13{,}000$ comparisons - **about 100x fewer**. The freeze disappears,
and it *stays* gone once the two partner campuses join and the
directory heads toward 10,000 rooms, because the growth rate itself
changed, not just today's directory size.

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

<!-- SLOT N: Check yourself -->

# Check Yourself

1. Why does merge sort's recurrence resolve to $O(n \log n)$
   regardless of the input, while quicksort's does not?
2. If Lomuto partition always picks the last element as pivot, what
   specific shape of input array forces the worst case, and why?
3. Give one situation where you'd choose merge sort over quicksort,
   despite quicksort usually being faster in practice.

---

# Answers

1. Merge sort's divide step always splits exactly in half, no matter
   what the data looks like - its recurrence $T(n) = 2T(n/2) + O(n)$
   doesn't depend on input order, so every case is $O(n \log n)$.
   Quicksort's partition size depends entirely on how the pivot
   compares to the rest of the data, so a bad pivot can make one side
   empty - its worst case departs sharply from its average case.
2. An already-sorted (or reverse-sorted) array: the last element is
   always the extreme (max or min) of what remains, so partition
   always produces a 0/$(n-1)$ split - $O(n^2)$.
3. Whenever a guaranteed worst-case bound or stability is required -
   e.g. a real-time system that can't tolerate an occasional slow
   sort, or sorting records where equal-keyed entries must keep their
   original relative order.

---

<!-- NEW: Try-It hand-off, session 3 -->

# Now: Worksheet Part B

<div class="thread">Same pair, same worksheet. This time: break quicksort on purpose.</div>

Open **[Worksheet Part B](materials/week06/worksheet.html)**. Trace
Lomuto partition on an already-sorted array with a fixed last-element
pivot, and watch the worst case happen by hand.

**~15 minutes.** Raise your hand if you get stuck.

<!--
notes: Hand out or project Worksheet Part B. After 15 minutes, ask a pair to report how many comparisons their trace used and whether it matched the O(n^2) prediction.
-->

---

<!-- NEW: quiz hand-off -->

# Now: Quick Self-Check Quiz

<div class="thread">Ungraded. Just for you, to see what stuck.</div>

Open the **[Week 6 Quiz](materials/week06/quiz.html)**. Answer on your
own, about 10 minutes. Check your own answers at the end. Ask if
anything surprises you.

<!--
notes: Distribute or project the quiz. After about 10 minutes, reveal the
answer key and discuss as a group any question most of the class missed.
-->

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
- **Reading:** CLRS, Chapter 2.3 (Merge Sort) and Chapter 7
  (Quicksort) - read before Week 7.
- **Prepare:** think about how you'd search a *sorted* list without
  checking every entry. Bring your idea to Week 7.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
