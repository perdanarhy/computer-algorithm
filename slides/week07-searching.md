---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 7: Searching Algorithms

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703
</div>

<!--
notes: Open by noting: last week we sorted CampusNav's entire room directory. Sorting it did not, by itself, make the app any faster to *search* - nothing in the app yet uses the fact that it's sorted.
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
<div class="wk now"><div class="n">Wk 7</div><div class="t">Searching</div></div>
<div class="wk review"><div class="n">Wk 8</div><div class="t">Midterm Exam</div></div>
<div class="wk"><div class="n">Wk 9</div><div class="t">Divide &amp; Conquer</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">Greedy Algorithms</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">Dynamic Programming I</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">Dynamic Programming II</div></div>
<div class="wk"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Point at Wk 7, then at Wk 8. Say: "This is also the last new material before the midterm - everything from here connects back to Weeks 1 through 6." -->

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** CampusNav's full 1,200-room directory can
  now be sorted efficiently - merge sort and quicksort replaced the
  O(n²) sorts that couldn't keep up at campus scale.
- **Last week left broken:** sorting the directory didn't make
  *finding* a room in it any faster. Nothing in CampusNav's "jump to
  room" feature actually takes advantage of the fact that the list is
  now sorted.

---

<!-- Key Words Today, session 1 -->

# Key Words Today

- **Search:** given a target value and a collection, decide whether
  it's present and, if so, where.
- **Linear search:** check items one at a time, in order, until found
  or exhausted.
- **Binary search:** repeatedly halve the remaining search space -
  requires the data to be sorted first.
- **Loop invariant:** a statement true before, during, and after every
  pass of a loop - today it's how we *prove* binary search correct,
  not just watch it work on examples.

<!-- notes: Read each term aloud. Say: "By the end of today, 'binary search' stops being a trick and becomes something we can prove." -->

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# "Jump to Room" Is Still Slow

<div class="pain">

CampusNav's directory is finally sorted alphabetically by building -
last week's work. But the "jump to room" button still does exactly
what it always did: it starts at the very top of the list and checks
every single entry, one after another, until it finds the room you
typed in. A student looking up a room near the end of the alphabet
still watches the app crawl through hundreds of entries it could,
in principle, skip straight past - the sorting didn't buy them
anything, because nothing in the app actually <em>uses</em> the fact that
the list is now in order.

</div>

<!-- notes: Do not say "binary search" or "O(log n)" yet. Let the class notice the sorted-but-still-slow gap themselves. -->

---

# The Gap the Sort Left Behind

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">"Jump to room," today (still scans top-down)</div>
  <div class="bar-track"><div class="bar-fill long" style="width: 100%"></div></div>
  <div class="bar-value">up to 1,200 checks</div>
</div>
<div class="bar-row">
  <div class="bar-label">"Jump to room," if it used the sort order</div>
  <div class="bar-track"><div class="bar-fill short" style="width: 3%"></div></div>
  <div class="bar-value">about 11 checks</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: the point is the gap, not the exact numbers.</div>

The directory is sorted. The app just doesn't know how to *use* that yet.

<!-- notes: Pause on the second bar. This is the whole week's payoff, shown before any code. -->

---

<!-- SLOT 5: Cost of not knowing -->

# What Else This Actually Costs

- Every feature that looks something up - room lookup, a course-code
  check, a schedule query - inherits this same slow, top-down scan
  unless it's rebuilt to exploit sorted order.
- Worse: a *badly* implemented "fast" search can look like it works
  in testing and still be wrong on real input - see the off-by-one
  pitfalls later today.
- A search that silently gives the wrong answer is more dangerous
  than a slow one - a slow search is annoying, a wrong search is a bug
  no one notices until it's live.

---

# The Same Bug, in Production

<div class="thread">Not a hypothetical - this happened, to one of the most-used codebases on Earth.</div>

<div class="why">
<strong>In industry:</strong> binary search is one of the most common
technical-interview questions of all time - and also one of the most
commonly gotten wrong. A widely cited 2006 study of Java's own
standard-library implementation found it had shipped a real
off-by-one/overflow bug for roughly nine years before anyone caught
it. "It's just halving a list" is deceptively easy to get subtly wrong.
</div>

---

<!-- SLOT 6: Driving question -->

# This Week's Question

<div class="driving-q">"Now that the directory is sorted, how do we search it fast - and how do we *prove*, not just observe, that it always finds the right answer?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. Write linear search and binary search as precise pseudocode and
   state each one's Big-O.
2. Prove binary search correct with a loop invariant: initialization,
   maintenance, and termination.
3. Identify and fix the classic off-by-one bugs that break binary
   search implementations.
4. Explain why binary search requires sorted input as a matter of
   *correctness*, not just speed.
5. Apply Weeks 1-7 material - Big-O, recursion, sorting, searching -
   to midterm-style practice questions.

---

<!-- SLOT 8: Origin -->

# A Simple Idea, Surprisingly Hard to Get Right

<div class="thread">Halving a sorted range to guess a hidden number is old. Getting the code right took decades.</div>

- The idea of halving a sorted search space dates back to at least
  1946 (John Mauchly, one of ENIAC's designers) - but the *first
  published, fully correct* version didn't appear until 1962. For 16
  years, working implementations existed alongside broken ones, and
  almost no one could tell the difference just by testing them.
- Jon Bentley's *Programming Pearls* (1986) had professional
  programmers implement binary search; roughly 90% of their
  submissions contained a bug.
- Even Java's own standard library shipped a subtle
  overflow bug in its binary search (`mid = (lo + hi) / 2` can
  overflow for huge arrays) for about nine years before it was fixed
  in 2006.

---

# What Sixteen Years of Bugs Actually Teach

<div class="thread">Same history. The lesson it leaves behind.</div>

<div class="why">
The lesson isn't "binary search is hard." It's that <strong>an idea
this simple still needs a real proof</strong> - "I tested it and it
worked" was never enough, for anyone, including professionals.
</div>

---

<!-- SLOT 9: Core concept -->

# The Search Problem, and Linear Search

<div class="thread">Two searches to compare all week: the slow one you already know, and the fast one we're about to prove.</div>

> Given an array $A$ of $n$ elements and a target value, a **search**
> algorithm decides whether the target occurs in $A$ and, if so,
> returns its index.

**Linear search** - no sorting required, checks one entry at a time
*(0-based indexing resumes here, after last week's 1-based exception)*:

```text
LINEAR-SEARCH(A, target):
    for i = 0 to length(A) - 1:
        if A[i] == target:
            return i
    return NOT-FOUND
```

---

<!-- Key Words Today, session 2 -->

# Key Words Today

- **Precondition:** something that must be true of the *input* for an
  algorithm to be correct - not a performance nicety, a requirement.
- **`lo`, `hi`, `mid`:** the three index pointers that track binary
  search's current search range and its midpoint.
- **Off-by-one error:** a bug caused by an index boundary being one
  position too high or too low - often invisible until a specific
  edge-case input triggers it.
- **Correctness proof:** a demonstration that an algorithm produces
  the right answer on *every* valid input, not a sample of inputs.

<!-- notes: Read each term aloud. Say: "Today's proof puts a precise meaning behind every one of these words." -->

---

<!-- Act 3 / BUILD -->

# Linear Search: Best, Average, Worst

- **Best case:** the target is the very first entry - 1 comparison.
- **Worst case:** the target is the last entry, or absent entirely -
  $n$ comparisons.
- **Average case:** roughly $n/2$ comparisons if the target is equally
  likely to be anywhere.

None of these cases care whether $A$ is sorted - linear search works
(slowly) on any array, sorted or not. That flexibility is exactly what
we trade away to go faster.

---

# Binary Search: Idea and Pseudocode

<div class="thread">Guessing a hidden number 1-100 by always checking the middle of what's left - now on a sorted array. (CLRS - Cormen/Leiserson/Rivest/Stein's <em>Introduction to Algorithms</em>, 4th ed, Exercise 2.3-6)</div>

<div class="two-col">
<div>

If $A$ is **sorted**, you don't need to check every entry: check the
**middle** one. Equal to target &rarr; done. Less than target &rarr;
it can only be in the left half - discard the right half. Greater
&rarr; discard the left half. Repeat on whatever half remains. This
reasoning is only valid because $A$ is sorted.

</div>
<div>

```text
BINARY-SEARCH(A, target):
    lo = 0
    hi = length(A) - 1
    while lo <= hi:
        mid = floor((lo + hi) / 2)
        if A[mid] == target:
            return mid
        elif A[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return NOT-FOUND
```

</div>
</div>

---

# Why Binary Search Is O(log n)

Every comparison discards **half** of what's left. Starting from $n$
elements:

$$
n \to \frac{n}{2} \to \frac{n}{4} \to \cdots \to 1
$$

This is the recurrence $T(n) = T(n/2) + O(1)$ - constant work per
step, then recurse on half - the same halving pattern as Week 4's
recursion tree, just one subproblem per level instead of two.

---

# Why Binary Search Is O(log n), the Levels

<div class="thread">One subproblem per level, not two - so this table is shorter than Week 4's.</div>

| Level | Size | Cost at this level |
|---|---|---|
| 0 | $n$ | $O(1)$ |
| 1 | $n/2$ | $O(1)$ |
| 2 | $n/4$ | $O(1)$ |
| $\vdots$ | $\vdots$ | $O(1)$ |
| $\log_2 n$ | $1$ | $O(1)$ |

---

<!-- binary search cost, continued - CampusNav example -->

# Why Binary Search Is O(log n), Continued

<div class="thread">The bound in numbers, for CampusNav's actual directory.</div>

There are $\log_2 n + 1$ levels, each doing $O(1)$ work, so
$T(n) = O(1) \cdot (\log_2 n + 1) =$ <span class="bignotation">O(log n)</span>.

For CampusNav's 1,200-room directory: $\log_2(1200) \approx 11$.
Eleven comparisons, worst case, no matter where in the directory the
target sits - versus up to 1,200 for linear search.

---

# A Quick Primer: Proof by Contradiction

<div class="thread">One of today's proof's own moves, named before we lean on it.</div>

A second proof technique, alongside loop invariants, shows up in a
moment - it has a simple, three-line shape:

1. **Assume the opposite** of what you want to prove is true.
2. **Show that assumption leads to something impossible** - a
   contradiction with a fact you already know.
3. **Conclude** the original statement must be true after all, since
   its opposite is impossible.

Tiny non-algorithmic example: *there is no largest integer.* Assume
there is one, call it $N$. But $N + 1$ is also an integer, and
$N + 1 > N$ - contradicting "$N$ is the largest." So no largest
integer exists.

---

# What We're Going to Prove

<div class="thread">Not "it worked on the examples I tried." An actual proof.</div>

**Claim:** `BINARY-SEARCH` above always returns the correct index if
`target` is in `A`, and correctly reports `NOT-FOUND` otherwise -
*provided `A` is sorted*.

---

# The Loop Invariant

<div class="thread">The one sentence the whole proof leans on. (Loop-invariant style per CLRS 4th ed, §2.1)</div>

**Loop invariant:**

> If `target` is present anywhere in `A`, then it is present within
> the subarray `A[lo..hi]`.

We prove this in three parts, exactly as Week 5 did for insertion
sort: **initialization** (true before the first pass), **maintenance**
(stays true across every pass), **termination** (what it tells us
when the loop stops).

---

<!-- Dense flagship: binary search correctness, all three parts -->
<!-- _class: dense -->

<div class="eyebrow">Binary search · proving correctness</div>

# The Proof, All Three Parts

<div class="wx-top">
<div class="lead">The invariant above holds on every trace we run today. Here is why it holds on every input, not just the ones we try.</div>
<div class="goalbox"><span class="k">Goal</span>Prove: BINARY-SEARCH is correct on every sorted input, not just the traces we draw.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Initialization</div>
<div class="wx-body">Before the loop: lo=0, hi=length(A)&minus;1, so A[lo..hi] is the entire array. If target is present at all, it's trivially present somewhere in the whole array.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Maintenance</div>
<div class="wx-body">If A[mid]==target, return - correct. If A[mid]&lt;target, sortedness means every index &le; mid is &le; A[mid]&lt;target, so target (if present) is in A[mid+1..hi]: set lo=mid+1. Symmetric if A[mid]&gt;target.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Termination</div>
<div class="wx-body">Either the loop returns mid with A[mid]==target (correct by construction), or lo&gt;hi and A[lo..hi] is empty - so target cannot be present, and NOT-FOUND is correct.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why all three parts</div>
<div class="wx-body">Initialization plus maintenance only show the invariant holds at the start of every iteration. Termination is what turns that into a claim about the finished search.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Correct on every sorted input - not just the traces we draw below.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Sortedness is used explicitly in the maintenance step - break it, and the whole proof (not just the speed) collapses.</div></div>

---

<!-- Dense worked example, binary search, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Binary search · worked example 1 of 3 (simple)</div>

# Seven Elements: Find 60

<div class="wx-top">
<div class="lead">The smallest case that still needs more than one round.</div>
<div class="goalbox"><span class="k">Goal</span>Find 60 in [10, 20, 30, 40, 50, 60, 70] and count the rounds.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Round 1</div>
<div class="wx-body">lo=0, hi=6, mid=3. A[3]=40 &lt; 60 &rarr; search right, lo=4.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Round 2</div>
<div class="wx-body">lo=4, hi=6, mid=5. A[5]=60 = target &rarr; found at index 5.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Result</div>
<div class="wx-body">2 rounds to search 7 elements - matches &lceil;log&#8322;7&rceil; = 3 as an upper bound, and beats it here because the target sat exactly on the second midpoint.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Found at index 5 in 2 rounds - linear search would have needed 6 comparisons for the same target.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Every round halves the range regardless of where the target sits - the worst case, not the lucky case, is what the O(log n) bound guarantees.</div></div>

---

<!-- Dense worked example, binary search, moderate tier (off-by-one pitfalls) -->
<!-- _class: dense -->

<div class="eyebrow">Binary search · worked example 2 of 3 (moderate)</div>

# Two Off-by-One Bugs, Traced

<div class="wx-top">
<div class="lead">Two of the most common ways a correct-looking implementation breaks.</div>
<div class="goalbox"><span class="k">Goal</span>Trace both classic off-by-one bugs and see exactly where each one fails.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Bug #1: setup</div>
<div class="wx-body">Array length 4. `hi` initialized to `length(A)`=4 (half-open convention) but the "greater" branch keeps `hi=mid-1` and `while lo<=hi` (closed-style). Target is larger than every element.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Bug #1: trace</div>
<div class="wx-body">lo=0,hi=4,mid=2&rarr;lo=3. lo=3,hi=4,mid=3&rarr;lo=4. lo=4,hi=4: `lo&le;hi` still true &rarr; mid=4 &rarr; A[4] is read **out of bounds** (valid indices are 0-3).</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Bug #2: setup and trace</div>
<div class="wx-body">The "greater" branch sets `lo=mid` instead of `lo=mid+1`. Suppose lo=4,hi=5,mid=4 and A[mid]&lt;target: buggy code sets lo=mid=4 - unchanged. lo,hi never change again.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The fix</div>
<div class="wx-body">Bug #1: initialize `hi=length(A)-1` to match the closed convention used everywhere else. Bug #2: always `lo=mid+1` on this branch (its mirror, `hi=mid-1`, is already safe).</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Bug #1 reads out of bounds; Bug #2 loops forever - both come from one index boundary being one position off.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Always trace a 2-element range by hand to check your convention is self-consistent before trusting an implementation.</div></div>

---

<!-- Dense worked example, binary search, harder tier (sortedness precondition) -->
<!-- _class: dense -->

<div class="eyebrow">Binary search · worked example 3 of 3 (harder)</div>

# Unsorted Input: Silently Wrong, Not Just Slow

<div class="wx-top">
<div class="lead">Not a performance caveat - a correctness one.</div>
<div class="goalbox"><span class="k">Goal</span>Run BINARY-SEARCH on unsorted data and see it report a present element as missing.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">A = [50, 10, 30, 90, 5] - unsorted. Target = 10, which *is* present, at index 1.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Trace</div>
<div class="wx-body">lo=0,hi=4,mid=2: A[2]=30&gt;10 &rarr; hi=1. lo=0,hi=1,mid=0: A[0]=50&gt;10 &rarr; hi=&minus;1. lo=0,hi=&minus;1: loop ends &rarr; returns NOT-FOUND.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">But it's right there</div>
<div class="wx-body">10 sits at index 1 the entire time. The maintenance proof relied on "everything &le; mid is &le; A[mid]" - true only when A is sorted, and false here.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why this matters more than speed</div>
<div class="wx-body">This isn't a slow answer - it's a wrong one, with no crash or error to flag it. Sortedness is part of the correctness proof itself, not a performance footnote.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Binary search on unsorted data can silently report a present element as missing.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>"Sorted-looking" is not good enough - the proof needs every index &le; mid to be &le; A[mid], which one out-of-order pair anywhere can break.</div></div>

---

<!-- SLOT N-2: Worked example -->
<!-- _class: dense -->

<div class="eyebrow">CampusNav worked example 1 of 2</div>

# "Jump to Room": Target Found

<div class="wx-top">
<div class="lead">Everything above, on real (sample) directory data.</div>
<div class="goalbox"><span class="k">Goal</span>A 16-entry sorted sample of CampusNav's directory, searching for room code 703.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Round 1</div>
<div class="wx-body">lo=0, hi=15, mid=7. A[7]=802 &gt; 703 &rarr; search left, hi=6.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Round 2</div>
<div class="wx-body">lo=0, hi=6, mid=3. A[3]=415 &lt; 703 &rarr; search right, lo=4.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Round 3</div>
<div class="wx-body">lo=4, hi=6, mid=5. A[5]=615 &lt; 703 &rarr; search right, lo=6.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Round 4</div>
<div class="wx-body">lo=6, hi=6, mid=6. A[6]=703 = target &rarr; **found, index 6**.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Found in 4 rounds. At the real 1,200-room scale, this is ~11 rounds - never up to 1,200.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Every round is one A[mid] comparison and one range-halving - exactly the loop invariant, executed.</div></div>

---

<!-- _class: dense -->

<div class="eyebrow">CampusNav worked example 2 of 2</div>

# "Jump to Room": Target Absent

<div class="wx-top">
<div class="lead">Same 16-entry array. This time, room code 550 doesn't exist.</div>
<div class="goalbox"><span class="k">Goal</span>Watch the range shrink to empty instead of to a match.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Rounds 1-2</div>
<div class="wx-body">lo=0,hi=15,mid=7: A[7]=802&gt;550 &rarr; hi=6. lo=0,hi=6,mid=3: A[3]=415&lt;550 &rarr; lo=4.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Round 3</div>
<div class="wx-body">lo=4, hi=6, mid=5. A[5]=615 &gt; 550 &rarr; search left, hi=4.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Round 4</div>
<div class="wx-body">lo=4, hi=4, mid=4. A[4]=512 &lt; 550 &rarr; search right, lo=5.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Termination</div>
<div class="wx-body">Now lo=5, hi=4: lo&gt;hi, the loop condition fails &rarr; **returns NOT-FOUND**. Same 4 rounds as finding 703 - just ending in the other exit.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>The range shrank to empty without ever matching - by the invariant, 550 provably isn't in A.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>This is the termination proof's second case, made concrete: an empty range is itself the proof of absence.</div></div>

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **Off-by-one bound updates:** using `hi = mid` instead of
  `hi = mid - 1` (or the reverse mix), or `lo = mid` instead of
  `lo = mid + 1` - each either skips a valid index or loops forever.
  See the two pitfalls above; always trace a 2-element range by hand
  to check your convention is self-consistent.
- **Assuming it works on unsorted data:** binary search's entire
  maintenance argument depends on sortedness. Running it on unsorted
  input doesn't just risk being slow - it can silently report a
  present element as missing, with no error or crash.

---

<!-- Key Words Today, session 3 -->

# Key Words Today

- **Midterm scope:** Weeks 1-7 - algorithm properties, complexity
  analysis, recursion/recurrences, basic and advanced sorting, and
  today's searching content.
- **Recurrence:** an equation defining a recursive algorithm's cost in
  terms of smaller instances of itself (Week 4) - part of today's
  practice set.
- **Growth-rate ordering:** ranking functions by how fast they grow as
  $n \to \infty$ (Week 3) - also on today's practice set.

<!-- notes: Read each term aloud. Say: "What's left today is entirely midterm prep - the same rigor, applied to everything so far." -->

---

<!-- Midterm Review mini-block: extra Act-3 content, pre-midterm week -->

# Midterm Review: Weeks 1-7

This block reviews everything Weeks 1-7 established, worked directly
rather than left as a question - the same driving question, one level
up: what does this course need you to prove, trace, and analyze so far?

---

# What's In Scope

| Wk | Topic | What you should be able to do |
|---|---|---|
| 1 | Introduction | Explain correct vs. efficient as separate, provable claims |
| 2 | Algorithm Concepts | Check pseudocode against the five required properties |
| 3 | Complexity Analysis | Prove a Big-O bound formally; order growth rates |
| 4 | Recursion & Recurrence | Write and *solve* a recurrence (recursion tree / substitution) |
| 5 | Basic Sorting | Trace insertion/selection/bubble sort; write a loop-invariant proof |
| 6 | Advanced Sorting | Trace merge sort/quicksort; state best/avg/worst case and why |
| 7 | Searching | Trace binary search; write its loop-invariant proof; spot off-by-ones |

Nothing on the midterm is new - every question below reuses a
technique from a week you've already sat through.

---

# What to Expect

- **Format:** a mix of short written proofs, hand traces, and a few
  multiple-choice / short-answer items - no live coding.
- **Weight:** 25% of the final grade (see Week 1's grading table).
- **The single best predictor of doing well:** being able to *redo*,
  from scratch, every worked example and proof already shown in
  Weeks 1-7 - not just recognize them.
- **What follows now:** one worked practice set, covering formal
  reasoning skills from Weeks 3-4 that this week's own content didn't
  otherwise exercise - a full week-by-week review lives in Week 8.

---

<!-- Dense worked example: midterm practice, Big-O / growth rate / recurrence -->
<!-- _class: dense -->

<div class="eyebrow">Midterm practice</div>

# Big-O, Growth Rate, and Recurrences

<div class="wx-top">
<div class="lead">Three formal-reasoning skills from Weeks 3-4, worked directly.</div>
<div class="goalbox"><span class="k">Goal</span>Prove a Big-O bound, order growth rates, and solve a recurrence - all three, correctly.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Big-O proof</div>
<div class="wx-body">Show 3n&sup2; + 5n + 2 = O(n&sup2;): for n &ge; 1, n &le; n&sup2; and 1 &le; n&sup2;, so 3n&sup2;+5n+2 &le; 3n&sup2;+5n&sup2;+2n&sup2; = 10n&sup2;. Constants c=10, n0=1 satisfy the definition.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Growth-rate order</div>
<div class="wx-body">Slowest to fastest, as n&rarr;&infin;: log n &lt; n &lt; n log n &lt; n^2 &lt; 2^n &lt; n!. Each grows strictly faster than every function before it, eventually.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Solve a recurrence</div>
<div class="wx-body">Merge sort's T(n) = 2T(n/2) + n: recursion-tree method gives log&#8322;n levels, each totaling n work &rarr; n log&#8322;n, i.e. O(n log n).</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why all three together</div>
<div class="wx-body">Bounding, ordering, and solving are the three formal-reasoning skills the midterm tests beyond hand-tracing - each reused, unchanged, from Weeks 3 and 4.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Every one of these three techniques reappears, unchanged, on the midterm - practice them exactly as shown here.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>A full per-week recap, with practice problems for Weeks 1-7 individually, is Week 8's entire session.</div></div>

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 9's slot 4 (Week 8 is review-only) -->

# What Weeks 1-7 Still Cannot Do

<div class="limits">
Big-O, recursion, sorting, and searching are all in place - CampusNav
can now sort and search its directory correctly and efficiently. But
every technique so far has been <strong>ad hoc per problem</strong>: a different
trick for sorting, a different trick for searching, each invented and
proved one at a time. There is still no <em>general strategy</em> for
inventing a new algorithm when CampusNav's next feature doesn't
already have a known technique to reach for.
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

**Week 8 is the Midterm Exam**, covering everything in Weeks 1-7 -
review using the practice set above and your Week 1-7 handouts.
**Week 9 begins Divide and Conquer**, the first of this course's
general problem-solving paradigms: it addresses exactly what Week 7
leaves unsolved - a repeatable strategy for building a new efficient
algorithm, not just applying ones we already have.

---

<!-- CLRS reference slide, immediately before Summary -->

# Where This Week Lives in CLRS

<div class="thread">A map, for anyone reading alongside the lectures.</div>

| Topic | CLRS 4th ed |
|---|---|
| Loop-invariant proof style (used for binary search today) | §2.1 |
| Binary search | Exercise 2.3-6 |

- **If you want to go deeper:** CLRS Ch 12 (Binary Search Trees) is
  the natural next structure once linear search of a sorted array
  feels limiting - a data structure built so that "search," "insert,"
  and "delete" are all fast, not just search. Not required for this
  course, but a preview of where sorted-order search ideas go next.
- Also worth a look: CLRS §2.3 (merge sort) and Ch 7 (quicksort) from
  Week 6 are the two techniques that got CampusNav's directory sorted
  in the first place - this week's binary search only works because
  of that earlier work.

---

<!-- SLOT N+3: Summary -->

# Summary

- Binary search is fast (O(log n)) but only correct when its
  precondition - sorted input - actually holds; violating it isn't
  slower, it's wrong.
- A loop invariant (init / maintenance / termination) is how we prove
  an algorithm correct on *every* input, not just the ones we tried -
  the same pattern Week 5 used for insertion sort.
- Off-by-one bugs in bound updates (`hi = mid` vs. `mid - 1`, `lo =
  mid` vs. `mid + 1`) are the single most common way binary search
  breaks - trace a 2-element range by hand to check your convention.
- **New: Week 7 Check** - a short graded exercise on linear search,
  binary search, and its correctness proof, released now, due before
  Week 8 begins (see `materials/assignments/week07-check.html`).

---

# Summary, Continued

- **Reading:** CLRS 4th ed, review §2.1 (loop-invariant style) and
  Exercise 2.3-6 (binary search) - see the CLRS map above; Sedgewick,
  *Algorithms*, §1.1 has a full correctness discussion if you want a
  second treatment.
- **Prepare for Week 8:** rework every proof and trace from Weeks 1-7
  from scratch, on paper, without looking at the slides first.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
