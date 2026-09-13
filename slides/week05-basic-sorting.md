---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 5: Basic Sorting

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703
</div>

<!--
notes: Welcome the class. Remind them Assignment 1 (Complexity & Pseudocode, released Week 3) is
due this week - collect it at the start or confirm the submission deadline before diving in. Also
flag the new Week 5 Check assignment, due before Week 6 begins.
-->

---

<!-- SLOT 2: Where we are -->

# Where We Are

<div class="roadmap">
<div class="wk"><div class="n">Wk 1</div><div class="t">Introduction</div></div>
<div class="wk"><div class="n">Wk 2</div><div class="t">Algorithm Concepts</div></div>
<div class="wk"><div class="n">Wk 3</div><div class="t">Complexity Analysis</div></div>
<div class="wk"><div class="n">Wk 4</div><div class="t">Recursion &amp; Recurrence</div></div>
<div class="wk now"><div class="n">Wk 5</div><div class="t">Basic Sorting</div></div>
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

<!-- notes: Point at Week 5. Say: "Five weeks in, CampusNav's directory is still just a pile of
entries. Today we finally organize it - and prove our methods actually work." Also remind: Assignment 1
is due this week. -->

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** a way to trace and bound the cost of
  algorithms that call themselves - recursion trees, recurrence
  relations, and how to solve them.
- **Last week left broken:** all of that machinery measures cost, but
  gives us zero *new tools* for actually organizing data. CampusNav's
  room directory is still exactly what it was in Week 1 - an unsorted
  array - and every operation on it still means brute-force scanning.

---

<!-- NEW: Key Words Today, session 1 -->

# Key Words Today

- **Sorted:** every element in order - for CampusNav, buildings listed
  alphabetically instead of in whatever order they were scraped.
- **In-place:** an algorithm that rearranges the array itself, using
  only a constant amount of extra memory ($O(1)$ space).
- **Stable:** equal-key elements keep their original relative order
  after sorting - matters more than it sounds like it should.
- **Loop invariant:** a statement true before, during, and after every
  pass of a loop - today's tool for *proving* a sort is correct.

<!-- notes: Read each term aloud once. Tell them stability will look like a technicality until the
counterexample lands, a few slides from now. -->

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# The Directory Is Chaos

<div class="pain">

CampusNav's room directory has grown from one building's 40 rooms to
the whole campus's 1,200 - but every entry was added in whatever
order a staff member typed it in, not alphabetically. The team wants
the app to show buildings in a clean A-to-Z list, the way any map or
directory should look. Right now, the only way to get that is for
someone to print the whole list, spread it on a table, and physically
re-order it by hand - and every time one new building signs up, that
person has to do it all over again from scratch.

</div>

<!-- notes: Do not say "sort" or "algorithm" yet. Describe the manual, repeated, error-prone
re-ordering first - that's the setup for the next slide. -->

---

# How Long Does That Actually Take?

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">Staff hand-reordering, 1,200 entries</div>
  <div class="bar-track"><div class="bar-fill long" style="width: 100%"></div></div>
  <div class="bar-value">hours, and error-prone</div>
</div>
<div class="bar-row">
  <div class="bar-label">Any of today's three sorts, run once</div>
  <div class="bar-track"><div class="bar-fill short" style="width: 8%"></div></div>
  <div class="bar-value">well under a second</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: the point is the gap, not the exact numbers.</div>

Even the simplest sorting method a computer runs beats a human doing
it by hand - but "simplest" still has a hidden cost, coming up next.

---

<!-- SLOT 5: Cost of not knowing -->

# What Else This Actually Costs

- A method that "looks sorted" after a few manual passes might still
  have entries out of place - nobody can *prove* a hand-shuffled list
  is actually, fully sorted.
- A method that's fine on 40 rooms can become painfully slow once the
  whole campus (or a whole company's dataset) is involved - some
  "obviously correct" sorting methods scale far worse than others.
- Two sorting methods can look interchangeable on a small example and
  behave very differently once real data (duplicates, near-sorted
  updates, huge size) shows up.

<div class="why">
<strong>In industry:</strong> "implement a sort" and "explain why
insertion sort beats quicksort on nearly-sorted data" are both
extremely common interview questions - not because sorting is exotic,
but because reasoning precisely about a simple algorithm's
correctness and cost is the actual skill being tested.
</div>

---

# It Gets Worse As the Directory Grows

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">One building, ~40 rooms</div>
  <div class="bar-track"><div class="bar-fill risk-low" style="width: 12%"></div></div>
  <div class="bar-value">~1,600 comparisons</div>
</div>
<div class="bar-row">
  <div class="bar-label">Whole campus, ~1,200 rooms</div>
  <div class="bar-track"><div class="bar-fill risk-med" style="width: 60%"></div></div>
  <div class="bar-value">~1,440,000 comparisons</div>
</div>
<div class="bar-row">
  <div class="bar-label">Campus + partner campuses, ~10,000 rooms</div>
  <div class="bar-track"><div class="bar-fill risk-high" style="width: 98%"></div></div>
  <div class="bar-value">~100,000,000 comparisons</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: today's three sorts all grow roughly like n², the point is the trend.</div>

Today's methods will get CampusNav's directory sorted - and, as we'll
see in Week 6, they are **not** the method that scales to a
university-sized directory.

---

<!-- SLOT 6: Driving question -->

# This Week's Question

<div class="driving-q">"How do we turn CampusNav's messy directory into a provably sorted list - and how do we know our method is actually correct, not just usually right?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. Trace bubble sort, selection sort, and insertion sort by hand on a
   small array, one pass at a time.
2. State and compare each sort's worst-, average-, and best-case time
   complexity, and explain why insertion sort's best case differs from
   the other two.
3. **Prove insertion sort correct** using a loop invariant - stated,
   and shown to hold at initialization, maintenance, and termination.
4. Determine whether a sort is stable, explain why it matters, and
   name which of today's three sorts are (and aren't).

---

<!-- SLOT 8: Origin -->

# This Problem Is Not New

<div class="thread">Sorting is old. Here's how old, and why that matters.</div>

- Sorting is one of the oldest problems in computing - punched-card
  tabulating machines were doing mechanical sorting passes in the
  1920s-30s, decades before stored-program computers existed.
- Donald Knuth's *The Art of Computer Programming*, Vol. 3 (1973)
  devotes an entire volume to sorting and searching - precisely
  because "just sort it" hides a surprisingly deep set of
  correctness and efficiency questions.
- **Insertion sort is not a computer's invention at all** - it's
  literally how most people sort a hand of playing cards. Hold that
  image; it returns as today's third algorithm.

---

# Why Learn the "Slow" Sorts First?

<div class="thread">Decades old, provably correct - and still where every course starts.</div>

<div class="why">
Bubble, selection, and insertion sort are all decades old, all
provably correct, and all still taught first - not because they're
the <em>fastest</em> choice, but because they're the simplest place to
practice proving an algorithm correct before tackling faster ones
(Week 6).
</div>

---

<!-- SLOT 9: Core concept -->

# Sorting, Stated Precisely

<div class="thread">Fifty years of study point at one precise problem. Here it is. (CLRS - Cormen/Leiserson/Rivest/Stein's <em>Introduction to Algorithms</em>, 4th ed, §2.1)</div>

> Given an array $A[0..n-1]$, rearrange its elements into a new order
> $A'[0..n-1]$ such that $A'[0] \le A'[1] \le \cdots \le A'[n-1]$, using
> only the elements originally present (no adding, dropping, or
> inventing values).

- **In-place:** rearranges $A$ itself, using $O(1)$ extra space beyond
  the array.
- **Stable:** if two elements have equal keys, the one that appeared
  first in $A$ still appears first in $A'$.

Every sort this week satisfies the first definition. Whether each one
satisfies stability is exactly today's twist.

---

<!-- NEW: Key Words Today, session 2 -->

# Key Words Today

- **Pass:** one full sweep of the algorithm's main loop over the
  (remaining) array.
- **Adaptive:** an algorithm that runs *faster* when the input is
  already partly sorted, instead of doing the same fixed amount of
  work regardless.
- **Comparison / swap / shift:** the three basic operations a sort
  performs - today's three algorithms use different mixes of them.
- **Correctness proof:** an argument that covers *every* valid input,
  not a demonstration on one example - today, a loop invariant.

<!-- notes: Read each term aloud. "Adaptive" is the word that will separate insertion sort from
the other two on CampusNav's real workload - new rooms trickling in, not a full re-shuffle. -->

---

<!-- Act 3 / BUILD: Bubble sort. Idea + pseudocode merged into one slide. -->

# Bubble Sort: Idea and Pseudocode

<div class="thread">First of three. Repeatedly swap neighbors out of order. (CLRS 4th ed, Problem 2-2)</div>

<div class="two-col">
<div>

Walk left to right through the array. Compare each pair of neighbors;
if they're out of order, swap them. The largest unsorted element
"bubbles" all the way to the end of the array by the end of one pass.
Repeat, one fewer element each time, until a pass makes no swaps at
all.

</div>
<div>

```text
BUBBLE-SORT(A):
    n = length(A)
    for i = 0 to n - 2:
        swapped = false
        for j = 0 to n - 2 - i:
            if A[j] > A[j+1]:
                swap A[j] and A[j+1]
                swapped = true
        if not swapped:
            break
```

</div>
</div>

---

<!-- NEW: dense worked example, bubble sort, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Bubble sort · worked example 1 of 3 (simple)</div>

# Three Elements: [3, 1, 2]

<div class="wx-top">
<div class="lead">The smallest case that still shows both a swap and an early exit.</div>
<div class="goalbox"><span class="k">Goal</span>Sort [3, 1, 2] and watch the early-exit flag actually fire.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Pass 1 (2 cmp)</div>
<div class="wx-body">Compare (3,1): swap &rarr; [1,3,2]. Compare (3,2): swap &rarr; [1,2,3]. Two swaps, array already sorted.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Pass 2 (1 cmp)</div>
<div class="wx-body">Compare (1,2): already in order, no swap. <code>swapped</code> stays false.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Result</div>
<div class="wx-body">Loop breaks early. Sorted in 2 passes, 3 comparisons total, done before reaching the worst-case n&minus;1 = 2 passes' full cost.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>[3, 1, 2] &rarr; [1, 2, 3] in 2 passes, 3 comparisons.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Every pass either fixes something or proves nothing's left to fix - that second case is the early exit.</div></div>

---

<!-- NEW: dense worked example, bubble sort, moderate tier (full trace + cost) -->
<!-- _class: dense -->

<div class="eyebrow">Bubble sort · worked example 2 of 3 (moderate)</div>

# Full Trace with Cost: [5, 2, 4, 1, 3]

<div class="wx-top">
<div class="lead">A moderate, unsorted array. No pass exits early until the last one.</div>
<div class="goalbox"><span class="k">Goal</span>Sort in full, and count every comparison pass by pass.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Pass 1 (4 cmp)</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">before</div><div class="cell">5</div><div class="cell">2</div><div class="cell">4</div><div class="cell">1</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">after</div><div class="cell">2</div><div class="cell">4</div><div class="cell">1</div><div class="cell">3</div><div class="cell hl">5</div></div>
</div>
3 swaps, 5 bubbles to the end.
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Pass 2 (3 cmp)</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell">2</div><div class="cell">1</div><div class="cell">3</div><div class="cell hl">4</div><div class="cell empty">5</div></div>
</div>
2 swaps, 4 settles next.
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Pass 3 (2 cmp)</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell">1</div><div class="cell">2</div><div class="cell hl">3</div><div class="cell empty">4</div><div class="cell empty">5</div></div>
</div>
1 swap, 3 settles next.
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Pass 4 (1 cmp)</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell">1</div><div class="cell">2</div><div class="cell empty">3</div><div class="cell empty">4</div><div class="cell empty">5</div></div>
</div>
0 swaps - sorted, but the flag check happens next pass.
</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Sorted after 4 passes, 4+3+2+1 = 10 comparisons total - matches the worst case exactly.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Each pass settles one more maximum into place; the comparison count shrinks by one every pass.</div></div>

---

<!-- NEW: dense worked example, bubble sort, harder tier (adaptive/early-exit, absorbs old Check-Yourself) -->
<!-- _class: dense -->

<div class="eyebrow">Bubble sort · worked example 3 of 3 (harder)</div>

# Nearly-Sorted Input: [1, 2, 3, 5, 4]

<div class="wx-top">
<div class="lead">Only the last two entries are out of order. Does the early-exit flag notice?</div>
<div class="goalbox"><span class="k">Goal</span>Show the early-exit flag turns a nearly-sorted input into far less than the worst-case work.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">[1, 2, 3, 5, 4] - a reverse-sorted input would need n&minus;1 = 4 passes. This one shouldn't.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Pass 1</div>
<div class="wx-body">(1,2) (2,3) (3,5): no swaps. (5,4): swap &rarr; [1,2,3,4,5]. <code>swapped = true</code>.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Pass 2</div>
<div class="wx-body">Every neighbor pair already in order. Zero swaps. <code>swapped</code> stays false &rarr; loop exits.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">What this proves</div>
<div class="wx-body">2 passes total, not the 4 a reverse-sorted input would cost. Nearly-sorted input runs close to <span class="bignotation">O(n)</span>, not O(n&sup2;).</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Bubble sort is adaptive: its actual cost shrinks toward O(n) as the input gets closer to sorted.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>The early-exit flag is what turns "provably O(n&sup2;)" into "close to O(n) in practice" for realistic, mostly-sorted inputs.</div></div>

---

<!-- NEW: dense worked example, bubble sort, the O(n^2) proof (flagship slide) -->
<!-- _class: dense -->

<div class="eyebrow">Bubble sort · proving the bound</div>

# Proving the O(n&sup2;) Bound

<div class="wx-top">
<div class="lead">Every earlier trace counted comparisons on one input. Here's the general argument, in four steps.</div>
<div class="goalbox"><span class="k">Goal</span>Show worst-case comparisons = n(n&minus;1)/2, hence O(n&sup2;).</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Count one input</div>
<div class="wx-body">n = 5, no early exit: pass 1 makes 4 comparisons, pass 2 makes 3, pass 3 makes 2, pass 4 makes 1. Total = 4+3+2+1 = 10.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Generalize</div>
<div class="wx-body">For any n, pass k compares (n&minus;k) pairs. Total comparisons = (n&minus;1) + (n&minus;2) + &hellip; + 1.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Closed form</div>
<div class="wx-body">That sum is n(n&minus;1)/2 (Week 3's arithmetic-series rule). Check: n=5 &rarr; 5&times;4/2 = 10. Matches step 1.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Shortcut</div>
<div class="wx-body">Drop the &minus;n term and the constant &frac12; (Week 3's rules) &rarr; <span class="bignotation">O(n&sup2;)</span> directly from the leading n&sup2;/2 term.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Worst-case comparisons = n(n&minus;1)/2 &rarr; O(n&sup2;) - this derivation backs every O(n&sup2;) claim in Weeks 5-6.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>To prove a bound: count on one concrete input, then generalize the pattern into a closed form.</div></div>

---

# Bubble Sort: Cost and Stability

<div class="thread">Average case: the expected cost over a "typical," randomly-ordered input - not the worst case (an adversarial input) or the best case (already sorted).</div>

| | |
|---|---|
| Worst case | $O(n^2)$ - reverse-sorted input, every pair swaps every pass |
| Average case | $O(n^2)$ |
| Best case | $O(n)$ - **already sorted**, one pass, zero swaps, exit early |
| Space | $O(1)$ - in-place |
| Stable? | **Yes** - swaps only strictly-greater neighbors, so equal keys never cross |
| Adaptive? | Yes, *with* the `swapped` flag; without it, always $O(n^2)$ |

<span class="bignotation">O(n²)</span> comparisons/swaps in the worst
case, but the early-exit flag is what makes bubble sort notice a
sorted (or nearly-sorted) array instead of blindly grinding through it.

---

<!-- Act 3 / BUILD: Selection sort -->

# Selection Sort: Idea and Pseudocode

<div class="thread">Second of three. Repeatedly grab the smallest remaining. (CLRS 4th ed, Exercise 2.2-2)</div>

Scan the unsorted remainder for its minimum, swap it into the next
open position at the front, repeat on the shrinking remainder.

```text
SELECTION-SORT(A):
    n = length(A)
    for i = 0 to n - 2:
        min_idx = i
        for j = i + 1 to n - 1:
            if A[j] < A[min_idx]:
                min_idx = j
        swap A[i] and A[min_idx]
```

Notice: the inner loop always scans the *entire* remainder, no matter
how sorted it already is - there is no early exit here.

---

<!-- NEW: dense worked example, selection sort, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Selection sort · worked example 1 of 3 (simple)</div>

# Three Elements: [3, 1, 2]

<div class="wx-top">
<div class="lead">The smallest case that still needs two full scans.</div>
<div class="goalbox"><span class="k">Goal</span>Sort [3, 1, 2] and notice the scan never shortens.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Pass 1</div>
<div class="wx-body">Scan indices 1-2 for the minimum of the whole array: 1, at index 1. Swap index 0 and 1 &rarr; [1, 3, 2].</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Pass 2</div>
<div class="wx-body">Scan index 2 for the minimum of the remainder: 2, at index 2. Swap index 1 and 2 &rarr; [1, 2, 3].</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Result</div>
<div class="wx-body">Sorted in 2 passes, 1+2 = 3 comparisons - the scan runs full-length every single pass, no shortcuts.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>[3, 1, 2] &rarr; [1, 2, 3] in 2 passes, 3 comparisons, zero early exits.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Selection sort's scan is always full-length - there is no flag to check and no way to stop early.</div></div>

---

<!-- NEW: dense worked example, selection sort, moderate tier -->
<!-- _class: dense -->

<div class="eyebrow">Selection sort · worked example 2 of 3 (moderate)</div>

# Full Trace: [5, 2, 4, 1, 3]

<div class="wx-top">
<div class="lead">Same array as bubble sort's moderate example - same result, different mechanics.</div>
<div class="goalbox"><span class="k">Goal</span>Sort in full, one minimum swapped into place per pass.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Pass 1</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell hl">1</div><div class="cell">2</div><div class="cell">4</div><div class="cell">5</div><div class="cell">3</div></div>
</div>
Min of whole array (1) swaps into index 0.
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Pass 2</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell hl2">1</div><div class="cell hl">2</div><div class="cell">4</div><div class="cell">5</div><div class="cell">3</div></div>
</div>
Min of remainder (2) is already at index 1 - "swaps with itself."
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Pass 3</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell hl2">1</div><div class="cell hl2">2</div><div class="cell hl">3</div><div class="cell">5</div><div class="cell">4</div></div>
</div>
Min of remainder (3) swaps into index 2.
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Pass 4</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell hl2">1</div><div class="cell hl2">2</div><div class="cell hl2">3</div><div class="cell hl">4</div><div class="cell hl2">5</div></div>
</div>
Min of remainder (4) swaps into index 3.
</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Sorted after 4 passes - every pass scanned the full remainder, whether it needed to or not.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Pass 2's minimum was already in place - it still scanned everything and "swapped with itself."</div></div>

---

<!-- NEW: dense worked example, selection sort, harder tier (stability counterexample) -->
<!-- _class: dense -->

<div class="eyebrow">Selection sort · worked example 3 of 3 (harder)</div>

# Stability Breaks: [4a, 4b, 1c]

<div class="wx-top">
<div class="lead">Tag two equal-key elements so we can track them (subscripts are labels, not values).</div>
<div class="goalbox"><span class="k">Goal</span>Find one input where selection sort scrambles equal-key order.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Scan</div>
<div class="wx-body">A = [4a, 4b, 1c]. Minimum of the whole array is 1c, at index 2.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Swap</div>
<div class="wx-body">Swap index 0 and index 2 &rarr; A = [1c, 4b, 4a].</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Compare orders</div>
<div class="wx-body">4a was before 4b originally. After one swap, 4b comes before 4a - their relative order flipped.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Not a fluke</div>
<div class="wx-body">A different array, e.g. [3a, 1b, 3c], happens to stay stable after its own swap - but "sometimes stable" is not the same claim as "stable."</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>One 3-element counterexample proves naive selection sort is NOT stable.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>One counterexample disqualifies a general claim - even if other inputs happen to behave.</div></div>

---

<!-- NEW: dense worked example, selection sort cost on every input (merges old check-yourself content) -->
<!-- _class: dense -->

<div class="eyebrow">Selection sort · proving the bound</div>

# Cost on Every Input, Not Just the Worst

<div class="wx-top">
<div class="lead">Bubble sort's bound was a worst case. Selection sort's is not - it's every case.</div>
<div class="goalbox"><span class="k">Goal</span>Show selection sort makes exactly n(n&minus;1)/2 comparisons, on every input.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Inner loop for i</div>
<div class="wx-body">For a fixed outer index i, the inner loop always runs (n&minus;1&minus;i) comparisons - the array's contents never change that count.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Sum over i</div>
<div class="wx-body">i = 0 gives n&minus;1, i = 1 gives n&minus;2, &hellip;, i = n&minus;2 gives 1. Same sum as bubble sort &rarr; n(n&minus;1)/2.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Try it sorted</div>
<div class="wx-body">Run it on the already-sorted [1,2,3,4,5]: still 4+3+2+1 = 10 comparisons, even though every "swap" is a no-op.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Contrast with bubble</div>
<div class="wx-body">Identical formula to bubble sort's <em>worst</em> case - but bubble and insertion sort only pay it in the worst case. Selection sort always pays it.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Selection sort's best case is still &Theta;(n&sup2;) - the sorted-input shortcut other sorts get simply doesn't exist here.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>A comparison count that doesn't depend on the data isn't a worst case - it's the only case.</div></div>

---

# Selection Sort: Cost and Stability

| | |
|---|---|
| Worst case | $O(n^2)$ |
| Average case | $O(n^2)$ |
| Best case | $O(n^2)$ - **even on an already-sorted array**, still scans everything |
| Space | $O(1)$ - in-place |
| Stable? | **No** (naive form) - see the `[4a, 4b, 1c]` counterexample |
| Adaptive? | **No** - the inner scan never shortens or exits early |

The one thing selection sort *does* guarantee: exactly $n-1$ swaps,
total, regardless of input. If writes are expensive (e.g. writing to
flash memory) and comparisons are cheap, that can matter - but it
never adapts to a nearly-sorted array the way bubble or insertion sort do.

---

<!-- Act 3 / BUILD: Insertion sort -->

# Insertion Sort: Idea and Pseudocode

<div class="thread">Third of three. This is how most people actually sort a hand of cards. (CLRS 4th ed, §2.1)</div>

Grow a sorted prefix one element at a time: take the next element
(`key`) and slide it left past every sorted element greater than it,
until it lands in its correct spot.

```text
INSERTION-SORT(A):
    n = length(A)
    for i = 1 to n - 1:
        key = A[i]
        j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]
            j = j - 1
        A[j+1] = key
```

---

<!-- NEW: dense worked example, insertion sort, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Insertion sort · worked example 1 of 3 (simple)</div>

# Three Elements: [2, 3, 1]

<div class="wx-top">
<div class="lead">The smallest case that shows both "no shift needed" and "shift past everything."</div>
<div class="goalbox"><span class="k">Goal</span>Sort [2, 3, 1] and see cost track distance-to-travel.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">i=1, key=3</div>
<div class="wx-body">A[0]=2 is not &gt; 3, so the while loop never runs. key drops back in place: [2, 3, 1]. Zero shifts.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">i=2, key=1</div>
<div class="wx-body">A[1]=3 &gt; 1: shift. A[0]=2 &gt; 1: shift. j = -1: stop. Place key at index 0 &rarr; [1, 2, 3]. Two shifts.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Result</div>
<div class="wx-body">Sorted in 2 passes, 2 shifts total - all the cost came from the one key that had to travel the whole way.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>[2, 3, 1] &rarr; [1, 2, 3] in 2 passes, 2 shifts.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Cost equals how far each key must travel to reach its correct spot - not how many elements exist.</div></div>

---

<!-- NEW: dense worked example, insertion sort, moderate tier (pass trace + microscope on one pass) -->
<!-- _class: dense -->

<div class="eyebrow">Insertion sort · worked example 2 of 3 (moderate)</div>

# Full Trace, Zoomed Into One Pass: [5, 2, 4, 1, 3]

<div class="wx-top">
<div class="lead">Pass by pass, then one pass under the microscope, shift by shift.</div>
<div class="goalbox"><span class="k">Goal</span>Sort in full, and see exactly what one pass costs, comparison by comparison.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">i=1, key=2</div>
<div class="wx-body">A[0]=5 &gt; 2: shift. j=-1: stop. Place at 0 &rarr; [2,5,4,1,3]. One shift.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">i=2, key=4</div>
<div class="wx-body">A[1]=5 &gt; 4: shift. A[0]=2 not &gt; 4: stop. Place at 1 &rarr; [2,4,5,1,3]. One shift.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">i=3, key=1</div>
<div class="wx-body">A[2]=5, A[1]=4, A[0]=2 all &gt; 1: three shifts. Place at 0 &rarr; [1,2,4,5,3].</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Zoom: inside i=3</div>
<div class="wx-body">j=2: 5&gt;1 shift, j=1: 4&gt;1 shift, j=0: 2&gt;1 shift, j=-1 stop, place 1 at index 0. Three comparisons, three shifts, one placement.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>One more pass, i=4 (key=3, two shifts), finishes the sort: [1,2,3,4,5].</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Every iteration ends with A[0..i] sorted - that sentence is about to become a formal proof.</div></div>

---

<!-- NEW: dense worked example, insertion sort, harder tier (best vs worst) -->
<!-- _class: dense -->

<div class="eyebrow">Insertion sort · worked example 3 of 3 (harder)</div>

# Best Case vs. Worst Case

<div class="wx-top">
<div class="lead">Same algorithm, two inputs at opposite extremes.</div>
<div class="goalbox"><span class="k">Goal</span>Show why insertion sort's best case is O(n) when selection sort's isn't.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Worst: [5,4,3,2,1]</div>
<div class="wx-body">Every key must jump past every earlier element. Shifts: 1+2+3+4 = 10, matching n(n&minus;1)/2.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Count</div>
<div class="wx-body">Same closed form as bubble and selection sort's worst case &rarr; <span class="bignotation">O(n²)</span>.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Best: [1,2,3,4,5]</div>
<div class="wx-body">The <code>while</code> condition fails immediately, every time. Zero shifts, n&minus;1 = 4 comparisons total &rarr; O(n).</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why selection can't do this</div>
<div class="wx-body">Selection sort's inner scan never shortens, so it can't reach O(n) even on a fully-sorted array.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Insertion sort adapts to how sorted the input already is; selection sort never does.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>A best case isn't automatic - it depends on whether the algorithm's structure can detect and exploit an easy input.</div></div>

---

# Proving Insertion Sort Correct: The Invariant

<div class="thread">"It matched my trace" is not a proof. Here's the real one.</div>

> **Loop invariant:** at the start of each iteration of the outer
> `for` loop (indexed by `i`), the subarray `A[0..i-1]` consists of
> exactly the elements that originally occupied `A[0..i-1]`, but in
> sorted order.

A correctness proof using a loop invariant has three parts, mirroring
mathematical induction from Week 4.

---

# The Three Parts of the Proof

<div class="thread">Same shape as the induction proofs from Week 4.</div>

- **Initialization** - it holds before the first iteration.
- **Maintenance** - if it holds before an iteration, it still holds
  before the next one.
- **Termination** - when the loop ends, the invariant gives the claim
  we wanted to prove.

---

<!-- NEW: dense worked example, insertion sort correctness proof (flagship slide) -->
<!-- _class: dense -->

<div class="eyebrow">Insertion sort · proving correctness</div>

# The Proof, All Three Parts

<div class="wx-top">
<div class="lead">Every trace above matched the invariant. Here's why it holds on every input, not just the ones we traced.</div>
<div class="goalbox"><span class="k">Goal</span>Prove: after the loop, A[0..n&minus;1] holds the original elements, sorted - for every input.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Initialization</div>
<div class="wx-body">Before the first iteration, i=1: the claim is about A[0..0], a single element. Trivially sorted - no pair to be out of order.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Maintenance</div>
<div class="wx-body">Assuming A[0..i-1] is sorted: shifting moves only elements strictly greater than key; key drops into the gap. A[0..i] is sorted - invariant now one wider.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Termination</div>
<div class="wx-body">The loop stops when i=n. The invariant at i=n says A[0..n&minus;1] is sorted - that subarray is the entire array.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why all three parts</div>
<div class="wx-body">Initialization + maintenance alone only show the invariant holds at the start of every iteration. Termination is what connects that to a claim about the finished array.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Correct on every valid input - not just the traces we drew.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>A strict comparison (<code>&gt;</code>, not <code>&gt;=</code>) is what keeps the maintenance step - and stability - intact.</div></div>

---

# Insertion Sort: Cost and Stability

| | |
|---|---|
| Worst case | $O(n^2)$ - reverse-sorted input, every key shifts all the way left |
| Average case | $O(n^2)$ |
| Best case | $O(n)$ - **already sorted**, the `while` condition fails immediately every time |
| Space | $O(1)$ - in-place |
| Stable? | **Yes** - the `while` only shifts elements *strictly greater* than `key`, so equal keys are never jumped |
| Adaptive? | **Yes** - cost scales with how far out of place each element already is |

This is *why* insertion sort mirrors sorting a hand of cards: cards
you draw that are already close to correctly placed cost almost
nothing to insert.

---

# All Three, Side by Side

| | Bubble | Selection | Insertion |
|---|---|---|---|
| Worst | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ |
| Average | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ |
| Best | $O(n)$ | $O(n^2)$ | $O(n)$ |
| Space | $O(1)$ | $O(1)$ | $O(1)$ |
| Stable? | Yes | **No** | Yes |
| Adaptive? | Yes (w/ flag) | No | Yes |

Same worst-case row, three very different real-world personalities -
and that gap is exactly next week's setup: even the *best* of these
three is still $O(n^2)$ worst case.

---

<!-- SLOT N-2: Worked example, CampusNav Ex 1 (insertion sort) -->
<!-- _class: dense -->

<div class="eyebrow">CampusNav · worked example 1 of 3</div>

# Sorting the Room Directory, by Insertion

<div class="wx-top">
<div class="lead">Everything above, applied to the actual pain from the start of this deck.</div>
<div class="goalbox"><span class="k">Goal</span>A 5-entry sample, scraped in signage order, sorted alphabetically.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">i=1: Arts</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell hl">Arts</div><div class="cell hl2">Music</div><div class="cell">Science</div><div class="cell">Gym</div><div class="cell">Library</div></div>
</div>
Shifts past Music.
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">i=2: Science</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell hl2">Arts</div><div class="cell hl2">Music</div><div class="cell hl">Science</div><div class="cell">Gym</div><div class="cell">Library</div></div>
</div>
Already greater than Music - zero shifts.
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">i=3: Gym</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell hl2">Arts</div><div class="cell hl">Gym</div><div class="cell hl2">Music</div><div class="cell hl2">Science</div><div class="cell">Library</div></div>
</div>
Shifts past Science and Music.
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">i=4: Library</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell hl2">Arts</div><div class="cell hl2">Gym</div><div class="cell hl">Library</div><div class="cell hl2">Music</div><div class="cell hl2">Science</div></div>
</div>
Shifts past Science and Music.
</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Four passes, done - and, unlike a staff member reordering by hand, we can now prove the result is sorted, on any input.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Five entries, four passes - the same proof that covered every array covers this one too.</div></div>

---

<!-- NEW: worked example, CampusNav Ex 2 (selection sort, contrast) -->
<!-- _class: dense -->

<div class="eyebrow">CampusNav · worked example 2 of 3</div>

# The Same Directory, by Selection

<div class="wx-top">
<div class="lead">Same 5 entries, same final order - a very different amount of work along the way.</div>
<div class="goalbox"><span class="k">Goal</span>Sort the same directory with selection sort, and watch the scans.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Pass 1</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell hl">Arts</div><div class="cell">Music</div><div class="cell">Science</div><div class="cell">Gym</div><div class="cell">Library</div></div>
</div>
Min of all 5 (Arts) swaps to index 0.
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Pass 2</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell hl2">Arts</div><div class="cell hl">Gym</div><div class="cell">Science</div><div class="cell">Music</div><div class="cell">Library</div></div>
</div>
Min of remainder (Gym) swaps to index 1.
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Pass 3</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell hl2">Arts</div><div class="cell hl2">Gym</div><div class="cell hl">Library</div><div class="cell">Music</div><div class="cell">Science</div></div>
</div>
Min of remainder (Library) swaps to index 2.
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Pass 4</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">after</div><div class="cell hl2">Arts</div><div class="cell hl2">Gym</div><div class="cell hl2">Library</div><div class="cell hl">Music</div><div class="cell hl2">Science</div></div>
</div>
Music was already correct - still scanned to confirm it.
</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Same final order as the insertion-sort trace above.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>This is the "no early exit" row from the cost table, made concrete: selection sort pays full price even when nothing needs to move.</div></div>

---

<!-- NEW: worked example, CampusNav Ex 3 (harder, stability payoff on real multi-key data) -->
<!-- _class: dense -->

<div class="eyebrow">CampusNav · worked example 3 of 3 (harder)</div>

# Re-Sorting by Floor: Stable vs. Unstable

<div class="wx-top">
<div class="lead">The directory is already alphabetical. Now the team wants it grouped by floor instead.</div>
<div class="goalbox"><span class="k">Goal</span>Re-sort [Arts(F2), Music(F2), Gym(F1)] by floor, two ways.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">Already A-to-Z: Arts (Floor 2), Music (Floor 2), Gym (Floor 1). Re-sort by floor, ascending.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Stable (insertion)</div>
<div class="wx-body">Groups Floor 1 first, Floor 2 after, in original order &rarr; [Gym, Arts, Music]. Arts still before Music.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Unstable (naive selection)</div>
<div class="wx-body">Min-scan finds Gym (Floor 1) at index 2, swaps it to the front &rarr; [Gym, Music, Arts]. Arts and Music flipped!</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why</div>
<div class="wx-body">The swap that brought Gym to the front happened to relocate Arts past Music - the exact [4a,4b,1c] mechanism, now with real room names.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Same input, same sort key, two different orders - only the stable sort preserves the alphabetical work already done.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>This is exactly why `ORDER BY floor, name` needs a stable sort underneath it.</div></div>

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **"All three $O(n^2)$ sorts behave identically."** They don't:
  bubble and insertion sort are *adaptive* (fast on nearly-sorted
  input), selection sort is not; selection sort makes exactly $n-1$
  swaps no matter what, the others don't; only bubble and insertion
  sort are stable.
- **"Stability is just a technicality."** It breaks multi-key sorting:
  the floor-then-name example above shows a real, working directory
  coming back with rooms out of alphabetical order on the same floor -
  the earlier sort's work gets silently undone.
- **"A loop invariant is just restating the loop."** It must hold at a
  *specific point every iteration* and be strong enough that,
  combined with termination, it proves the exact claim you need - "the
  array looks more sorted each time" is not precise enough to prove
  anything.

---

<!-- NEW: Key Words Today, session 3 -->

# Key Words Today

- **Multi-key sort:** sorting by more than one field (e.g. floor,
  then building name) - where stability determines whether earlier
  sorts survive later ones.
- **Nearly-sorted input:** an array only a few positions away from
  fully sorted - the case where adaptive sorts shine.
- **Counterexample:** a single concrete input that disproves a general
  claim (e.g. `[4a, 4b, 1c]` disproving "selection sort is stable").
- **Collapse (at scale):** when a technique that works fine on small
  input becomes impractically slow as input size grows - today's
  sorts, once the directory is campus-sized.

<!-- notes: Read each term aloud. "Collapse at scale" is deliberately the same idea from
Week 3's Big-O discussion - it's about to become this week's Limits slide, word for word. -->

---

# CampusNav: The Directory, Now Provably Sorted

<div class="thread">Zooming back out to the running case study.</div>

<div class="pipeline">
<div class="stage"><div class="h">Wks 1-4</div><div class="s">Unsorted directory, brute-force scan and recursion only</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Wk 5 (today)</div><div class="s">Small samples, sorted by hand-traced, provably correct methods</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Wk 6</div><div class="s">Full 1,200-entry directory, sorted fast enough to feel instant</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Wk 7</div><div class="s">Sorted directory enables binary search - "jump to room"</div></div>
</div>

Today's three sorts are correct on the full directory too - they're
just not the ones CampusNav will actually ship with once it's
campus-sized.

---

# Why Stability Shows Up in Real Products

<div class="thread">This isn't only about CampusNav.</div>

Spreadsheet "sort by column A, then column B" and SQL's `ORDER BY
col_a, col_b` both rely on the *first* sort's order surviving the
*second* sort - that only works if the sorting method is stable.
Getting this wrong produces a list that "looks sorted" at a glance but
silently scrambles ties.

<div class="why">
Every major standard library's default sort (Python's <code>sorted</code>,
Java's <code>Collections.sort</code>) is guaranteed stable for exactly
this reason - it's a documented correctness contract, not an
implementation detail.
</div>

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 6 slot 4 -->

# What Today's Three Sorts Cannot Do

<div class="limits">
These sorts are provably correct - we proved insertion sort correct
on every input, not just the ones we traced. But all three are O(n^2)
in the worst and average case. CampusNav's 40-room sample sorts
instantly; its real 1,200-room directory noticeably lags; and the
moment CampusNav adds partner campuses, at ~10,000 rooms, any of these
three collapses. Correctness alone was never the whole goal - this
was true from Week 1.
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 5 leaves **basic sorts collapsing at scale** unsolved. **Week 6,
Advanced Sorting**, addresses it: merge sort and quicksort, both
$O(n \log n)$ on average, applied to CampusNav's full 1,200-entry
directory - the same jump from linear to logarithmic thinking you'll
soon recognize everywhere in this course.

---

<!-- NEW: CLRS reference slide, immediately before Summary -->

# Where This Week Lives in CLRS

<div class="thread">A map, for anyone reading alongside the lectures.</div>

| Topic | CLRS 4th ed |
|---|---|
| Insertion sort | §2.1 |
| Analyzing algorithms (worst/avg/best case, loop invariants) | §2.2 |
| Bubble sort | Problem 2-2 |
| Selection sort | Exercise 2.2-2 |

- **If you want to go deeper:** CLRS §2.3 previews divide-and-conquer
  and merge sort - one section ahead of where we are today, and
  exactly what Week 6 covers.

---

# Where This Week Lives in CLRS, Continued

The loop-invariant proof style used on insertion sort today
(initialization / maintenance / termination) is the same shape CLRS
uses for correctness arguments throughout the book - Week 7 reuses
it, almost unchanged, for binary search.

---

<!-- SLOT N+3: Summary -->

# Summary

- Bubble, selection, insertion sort: all $O(n^2)$ worst-case, but
  **not** interchangeable - only bubble and insertion are adaptive
  and stable; selection is neither.
- Insertion sort is correct on **every** input, proven by a loop
  invariant with three parts (initialization, maintenance,
  termination) that will reappear all course.
- Stability isn't cosmetic - it's what makes multi-key sorting (and
  every `ORDER BY`) work correctly.
- **Reminder:** Assignment 1 due this week - submit before Week 6.
- **New: Week 5 Check** - a short graded exercise on today's three
  sorts, released now, due before Week 6 begins (see
  `materials/assignments/week05-check.html`).

---

# Summary, Continued

- **Reading:** CLRS 4th ed, §2.1 (Insertion Sort) and §2.2 (Analyzing
  Algorithms); bubble sort is Problem 2-2, selection sort is Exercise
  2.2-2 - see the CLRS map above.
- **Prepare:** think about why comparing *neighbors* (today) might be
  slower than *splitting the array in half* - guess for Week 6.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
