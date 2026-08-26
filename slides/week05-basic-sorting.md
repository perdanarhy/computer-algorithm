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
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
</div>

<!--
notes: Welcome the class. Remind them Assignment 1 (Complexity & Pseudocode, released Week 3) is
due this week - collect it at the start or confirm the submission deadline before diving in.
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

<!-- NEW: warm-up, placed right after the roadmap (slot 2) per course design -->

# Before We Start: Sort a Hand of Cards

<div class="thread">A quick warm-up. No pseudocode yet.</div>

You're dealt five playing cards, face up, in a random order: **7 3 9 1
5**. You want them left-to-right in ascending order before your next
turn.

- **Method A:** repeatedly find the smallest card remaining and place
  it in the next open slot.
- **Method B:** pick up cards one at a time and slide each new card
  into its correct spot among the cards you're already holding sorted.

- Try both by hand. Which one feels more like how *you* actually sort
  a hand of cards?

<!--
notes: Give students 30 seconds to physically (or mentally) try both. Most people intuitively use
Method B - do not name "selection sort" or "insertion sort" yet, let them describe it in their own words.
-->

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

<!-- notes: Read each term aloud once. Say stability will look like a technicality until the
counterexample lands - ask them to hold that thought. -->

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

<!-- notes: Do not say "sort" or "algorithm" yet. Let them feel the manual, repeated, error-prone
re-ordering first - someone will say "just sort it," which is your cue for the next slide. -->

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

<!-- notes: Pause after the second bar. Say: "So why not just always use the simplest one? That's
exactly the question this week answers - and the next slide shows where it starts to hurt." -->

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

<!-- _class: section -->

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

<!-- NEW: session-1 close, previews Worksheet Part A -->

# Coming Up: Worksheet Part A

<div class="thread">Next in this class: less listening, more tracing.</div>

Later today, you and a partner will hand-trace one of today's sorts,
pass by pass, on a small array - exactly like the warm-up, but written
down precisely.

That is **Worksheet Part A**. Keep a pen ready.

---

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: where did these sorting methods come from?</div>

---

<!-- SLOT 8: Origin -->

# This Problem Is Not New

<div class="thread">You just felt the pain. Now: who else felt it, and what did they do?</div>

- Sorting is one of the oldest problems in computing - punched-card
  tabulating machines were doing mechanical sorting passes in the
  1920s-30s, decades before stored-program computers existed.
- Donald Knuth's *The Art of Computer Programming*, Vol. 3 (1973)
  devotes an entire volume to sorting and searching - precisely
  because "just sort it" hides a surprisingly deep set of
  correctness and efficiency questions.
- **Insertion sort is not a computer's invention at all** - it's
  literally how most people sort a hand of playing cards, which is
  exactly what you did in the warm-up without a name for it yet.

<div class="why">
Bubble, selection, and insertion sort are all decades old, all
provably correct, and all still taught first - not because they're
the *fastest* choice, but because they're the simplest place to
practice proving an algorithm correct before tackling faster ones
(Week 6).
</div>

---

<!-- SLOT 9: Core concept -->

# Sorting, Stated Precisely

<div class="thread">Fifty years of study, and a card game you just played, point at one precise problem. Here it is.</div>

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

<!-- notes: Read each term aloud. Say "adaptive" is the word that will separate insertion sort from
the other two on CampusNav's real workload - new rooms trickling in, not a full re-shuffle. -->

---

<!-- Act 3 / BUILD: Bubble sort -->

# Bubble Sort: The Idea

<div class="thread">First of three. Repeatedly swap neighbors out of order.</div>

Walk left to right through the array. Compare each pair of neighbors;
if they're out of order, swap them. The largest unsorted element
"bubbles" all the way to the end of the array by the end of one pass.
Repeat, one fewer element each time, until a pass makes no swaps at
all.

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

---

# Bubble Sort: Trace on [5, 2, 4, 1, 3]

<div class="thread">hl = the value that just bubbled into place this pass · hl2 = already settled</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">Start</div><div class="cell">5</div><div class="cell">2</div><div class="cell">4</div><div class="cell">1</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">After pass 1</div><div class="cell">2</div><div class="cell">4</div><div class="cell">1</div><div class="cell">3</div><div class="cell hl">5</div></div>
<div class="row"><div class="rowlabel">After pass 2</div><div class="cell">2</div><div class="cell">1</div><div class="cell">3</div><div class="cell hl">4</div><div class="cell hl2">5</div></div>
<div class="row"><div class="rowlabel">After pass 3</div><div class="cell">1</div><div class="cell">2</div><div class="cell hl">3</div><div class="cell hl2">4</div><div class="cell hl2">5</div></div>
<div class="row"><div class="rowlabel">After pass 4</div><div class="cell hl2">1</div><div class="cell hl2">2</div><div class="cell hl2">3</div><div class="cell hl2">4</div><div class="cell hl2">5</div></div>
</div>

Pass 4 makes **zero swaps** - `swapped` stays false, the loop breaks
early, and we know the array is sorted without checking further.

---

# Bubble Sort: Cost and Stability

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

# Selection Sort: The Idea

<div class="thread">Second of three. Repeatedly grab the smallest remaining.</div>

Scan the unsorted remainder of the array to find its minimum. Swap
that minimum into the next open position at the front. Repeat on the
shrinking remainder. This is Method A from the warm-up.

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

# Selection Sort: Trace on [5, 2, 4, 1, 3]

<div class="thread">hl = the minimum just swapped into place · hl2 = settled prefix</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">Start</div><div class="cell">5</div><div class="cell">2</div><div class="cell">4</div><div class="cell">1</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">After pass 1</div><div class="cell hl">1</div><div class="cell">2</div><div class="cell">4</div><div class="cell">5</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">After pass 2</div><div class="cell hl2">1</div><div class="cell hl">2</div><div class="cell">4</div><div class="cell">5</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">After pass 3</div><div class="cell hl2">1</div><div class="cell hl2">2</div><div class="cell hl">3</div><div class="cell">5</div><div class="cell">4</div></div>
<div class="row"><div class="rowlabel">After pass 4</div><div class="cell hl2">1</div><div class="cell hl2">2</div><div class="cell hl2">3</div><div class="cell hl">4</div><div class="cell hl2">5</div></div>
</div>

Pass 1: minimum of the whole array (1) swaps with index 0. Pass 2: the
minimum (2) is *already* at index 1 - it "swaps with itself."

---

# Selection Sort: A Stability Counterexample

<div class="thread">This is the misconception this week is built around. Watch closely.</div>

Tag two equal-key elements so we can track them: `A = [4a, 4b, 1c]`
(subscripts are labels, not part of the value).

1. Scan for the minimum: it's `1c` at index 2.
2. **Swap** index 0 and index 2: `A = [1c, 4b, 4a]`.

`4a` started **before** `4b` in the original array. After one swap,
`4b` comes before `4a`. Their relative order flipped - naive
selection sort is **not stable**, and it took only three elements to
show it.

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

# Insertion Sort: The Idea

<div class="thread">Third of three. This is Method B from the warm-up - sorting a hand of cards.</div>

Grow a sorted prefix one element at a time. Take the next element
(`key`), and slide it left past every already-sorted element that is
greater than it, until it lands in its correct spot.

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

Every iteration ends with `A[0..i]` sorted - that sentence is about to
become a formal proof.

---

# Insertion Sort: Trace on [5, 2, 4, 1, 3]

<div class="thread">hl = the key just inserted this pass · hl2 = the rest of the sorted prefix</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">Start (i=0)</div><div class="cell hl2">5</div><div class="cell">2</div><div class="cell">4</div><div class="cell">1</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">i=1, key=2</div><div class="cell hl">2</div><div class="cell hl2">5</div><div class="cell">4</div><div class="cell">1</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">i=2, key=4</div><div class="cell hl2">2</div><div class="cell hl">4</div><div class="cell hl2">5</div><div class="cell">1</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">i=3, key=1</div><div class="cell hl">1</div><div class="cell hl2">2</div><div class="cell hl2">4</div><div class="cell hl2">5</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">i=4, key=3</div><div class="cell hl2">1</div><div class="cell hl2">2</div><div class="cell hl">3</div><div class="cell hl2">4</div><div class="cell hl2">5</div></div>
</div>

Notice the sorted region (everything left of, and including, the key)
only ever *grows* - that observation is the loop invariant.

---

<!-- Act 3 / BUILD: loop invariant proof -->

# Proving Insertion Sort Correct: The Invariant

<div class="thread">"It matched my trace" is not a proof. Here's the real one.</div>

> **Loop invariant:** at the start of each iteration of the outer
> `for` loop (indexed by `i`), the subarray `A[0..i-1]` consists of
> exactly the elements that originally occupied `A[0..i-1]`, but in
> sorted order.

A correctness proof using a loop invariant has exactly three parts,
mirroring mathematical induction:

- **Initialization** - it holds before the first iteration.
- **Maintenance** - if it holds before an iteration, it still holds
  before the next one.
- **Termination** - when the loop ends, the invariant gives us exactly
  the claim we wanted to prove.

---

# Initialization

<div class="thread">Base case.</div>

Before the first iteration, `i = 1`, so the claim is about the
subarray `A[0..0]` - a single element.

A one-element array is trivially sorted: there is no pair to be out of
order. The invariant holds before the loop ever runs.

---

# Maintenance

<div class="thread">Inductive step.</div>

Assume `A[0..i-1]` is sorted (the invariant, going into iteration
`i`). The loop body:

1. Saves `A[i]` as `key`.
2. Shifts every element of `A[0..i-1]` that is greater than `key` one
   slot to the right - this only ever moves *larger* elements, never
   reorders the sorted elements among themselves.
3. Places `key` into the resulting gap - the first position (from the
   right) whose element is not greater than `key`.

The result, `A[0..i]`, contains exactly the same elements as
`A[0..i-1]` plus `key`, now in sorted order. When `i` increments for
the next iteration, the invariant holds again - now one element wider.

---

# Termination

<div class="thread">Closing the proof.</div>

The outer loop's counter `i` increases by 1 each iteration and stops
when `i = n` (past the last valid index, `n - 1`).

At that point, the invariant - stated for `i = n` - says: `A[0..n-1]`
consists of the original elements, in sorted order. That subarray
**is** the entire array.

$$
\text{Invariant holds at } i = n \implies A \text{ is fully sorted}
$$

Initialization + maintenance + termination together prove insertion
sort correct on **every** valid input - not just the one we traced.

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

<!-- SLOT N-2: Worked example -->

# CampusNav: Sorting the Room Directory

<div class="thread">Everything above, applied to the actual pain from slot 4.</div>

A 5-entry sample, scraped in signage order: `[성파, 가야, 인당, 공학,
노트르담]`. Insertion sort, alphabetically:

<div class="tracetable">
<div class="row"><div class="rowlabel">Start</div><div class="cell">성파</div><div class="cell">가야</div><div class="cell">인당</div><div class="cell">공학</div><div class="cell">노트르담</div></div>
<div class="row"><div class="rowlabel">i=1: 가야</div><div class="cell hl">가야</div><div class="cell hl2">성파</div><div class="cell">인당</div><div class="cell">공학</div><div class="cell">노트르담</div></div>
<div class="row"><div class="rowlabel">i=2: 인당</div><div class="cell hl2">가야</div><div class="cell hl2">성파</div><div class="cell hl">인당</div><div class="cell">공학</div><div class="cell">노트르담</div></div>
<div class="row"><div class="rowlabel">i=3: 공학</div><div class="cell hl2">가야</div><div class="cell hl">공학</div><div class="cell hl2">성파</div><div class="cell hl2">인당</div><div class="cell">노트르담</div></div>
<div class="row"><div class="rowlabel">i=4: 노트르담</div><div class="cell hl2">가야</div><div class="cell hl2">공학</div><div class="cell hl">노트르담</div><div class="cell hl2">성파</div><div class="cell hl2">인당</div></div>
</div>

Five entries, four passes, done - and, unlike the staff member from
slot 4, we can now *prove* the result is sorted, on any input.

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **"All three $O(n^2)$ sorts behave identically."** They don't:
  bubble and insertion sort are *adaptive* (fast on nearly-sorted
  input), selection sort is not; selection sort makes exactly $n-1$
  swaps no matter what, the others don't; only bubble and insertion
  sort are stable.
- **"Stability is just a technicality."** It breaks multi-key sorting:
  sort CampusNav's directory by *floor* using an unstable sort after
  it's already sorted alphabetically, and rooms on the same floor can
  come back out of alphabetical order - the earlier sort's work gets
  silently undone.
- **"A loop invariant is just restating the loop."** It must hold at a
  *specific point every iteration* and be strong enough that,
  combined with termination, it proves the exact claim you need - "the
  array looks more sorted each time" is not precise enough to prove
  anything.

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. Why is selection sort's best case still $O(n^2)$, when bubble
   sort's and insertion sort's best case is $O(n)$?
2. Tag the array `A = [3a, 1b, 3c]` and run naive selection sort by
   hand. Does the relative order of `3a` and `3c` survive?
3. In the loop invariant proof, which single part of the proof would
   fail if the shifting step in insertion sort accidentally moved
   elements *equal to* `key` as well as elements greater than it?

---

# Answers

1. Selection sort's inner loop always scans the *entire* unsorted
   remainder to find the minimum, regardless of whether the array is
   already sorted - there's no comparison whose result lets it skip
   work or exit early, unlike bubble sort's `swapped` flag or
   insertion sort's `while` condition failing immediately.
2. Minimum of `[3a, 1b, 3c]` is `1b` at index 1; swap index 0 and 1:
   `[1b, 3a, 3c]`. Relative order of `3a` and `3c` is preserved here -
   but as the earlier `[4a, 4b, 1c]` example showed, it is *not*
   guaranteed in general, which is exactly why selection sort is
   classified as unstable (one counterexample is enough to disqualify
   stability, even if some inputs happen to stay stable).
3. **Maintenance.** Shifting elements equal to `key` would move an
   equal-key element that was already correctly placed, potentially
   past another equal-key element - the resulting `A[0..i]` would
   still contain the same *values* in sorted order (maintenance's
   literal claim), but stability would be lost, showing why the strict
   `>` comparison in the pseudocode is not an arbitrary choice.

---

<!-- NEW: Try-It hand-off, session 2 -->

# Now: Worksheet Part A

<div class="thread">Time to practice. Trace it yourself, precisely.</div>

Work with your neighbor. Open **[Worksheet Part
A](materials/week05/worksheet.html)**. Fully hand-trace one sort,
pass by pass, on a small array.

**~15 minutes.** Raise your hand if you get stuck.

<!--
notes: Hand out or project Worksheet Part A. Walk the room while pairs work.
After 15 minutes, ask 2 pairs to compare which sort they were assigned and how many passes it took.
-->

---

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: what these sorts leave unsolved.</div>

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

<!-- notes: Read each term aloud. Say: "Collapse at scale" is deliberately the same idea from
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

<!-- NEW: quiz hand-off -->

# Now: Quick Self-Check Quiz

<div class="thread">Ungraded. Just for you, to see what stuck.</div>

Open the **[Week 5 Quiz](materials/week05/quiz.html)**. Answer on your
own, about 10 minutes. Check your own answers at the end. Ask if
anything surprises you.

<!--
notes: Distribute or project the quiz. After about 10 minutes, reveal the
answer key and discuss as a group any question most of the class missed.
-->

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 6 slot 4 -->

# What Today's Three Sorts Cannot Do

<div class="limits">
These sorts are provably correct - we proved insertion sort correct
on every input, not just the ones we traced. But all three are $O(n^2)$
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

<!-- SLOT N+3: Summary -->

# Summary

- Bubble, selection, and insertion sort are all $O(n^2)$ worst-case -
  but they are **not** interchangeable: only bubble and insertion sort
  are adaptive and stable; selection sort is neither.
- Insertion sort is correct on **every** input, proven by a loop
  invariant with three parts: initialization, maintenance, termination
  - the same three-part structure will reappear anywhere this course
  asks you to prove an algorithm correct.
- Stability isn't cosmetic - it's the property that makes multi-key
  sorting (and every spreadsheet/database `ORDER BY`) work correctly.
- **Reminder:** Assignment 1 (Complexity & Pseudocode) is due this
  week - submit before Week 6.
- **Reading:** CLRS, Chapter 2 (Insertion Sort, Analyzing Algorithms).
- **Prepare:** think about why repeatedly comparing *neighbors*
  (today's approach) might be a slower way to sort than repeatedly
  *splitting the array in half* - bring your guess to Week 6.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
