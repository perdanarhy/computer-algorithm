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
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
</div>

<!--
notes: Open by asking: "Last week we sorted CampusNav's entire room directory. Show of hands - did sorting it make the app any faster to *search*?" Let them realize: not yet, because nothing in the app actually uses the fact that it's sorted.
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

<!-- NEW: warm-up, placed right after the roadmap (slot 2) -->

# Before We Start: Guess the Number

<div class="thread">A quick warm-up. No code needed yet.</div>

I'm thinking of a whole number between 1 and 100. Guess it. After
each guess, I'll only tell you "higher" or "lower."

- If you guess $1, 2, 3, 4, \dots$ in order, how many guesses might
  you need, worst case?
- If you guess the **middle** of what's still possible each time (50,
  then 25 or 75, then...), how many guesses do you need, worst case?

<!--
notes: Actually play this with the class for one round if time allows. Ask aloud: "How many guesses did the halving strategy take?" (at most 7, since 2^7 = 128 > 100). Do not name "binary search" yet - it's about to get a name and a proof.
-->

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

<!-- NEW: Key Words Today, session 1 -->

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
anything, because nothing in the app actually *uses* the fact that
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

<!-- _class: section -->

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

<!-- NEW: session-1 close -->

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: where did binary search come from, and who got it wrong?</div>

---

<!-- SLOT 8: Origin -->

# A Simple Idea, Surprisingly Hard to Get Right

<div class="thread">You just felt the halving trick yourself. Now: its real history.</div>

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

**Linear search** - no sorting required, checks one entry at a time:

```text
LINEAR-SEARCH(A, target):
    for i = 0 to length(A) - 1:
        if A[i] == target:
            return i
    return NOT-FOUND
```

Worst case (target absent, or the very last element): every one of
the $n$ entries is checked. <span class="bignotation">O(n)</span>

---

<!-- NEW: Key Words Today, session 2 -->

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

# Binary Search: The Idea

<div class="thread">Back to "Guess the Number" - same idea, now on a sorted array.</div>

If $A$ is **sorted**, you don't need to check every entry: check the
**middle** one.

- Target equals the middle entry → done.
- Target is *less than* the middle entry → it can only be in the left
  half (if it's anywhere) - discard the right half.
- Target is *greater than* the middle entry → it can only be in the
  right half - discard the left half.
- Repeat on whatever half remains.

This reasoning is only valid because $A$ is sorted - more on that
later this week.

---

# Binary Search: Pseudocode

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

Three pointers: `lo` and `hi` bound the current search range
(inclusive on both ends); `mid` is always recomputed as its midpoint.

---

# Why Binary Search Is O(log n)

Every comparison discards **half** of what's left. Starting from $n$
elements:

$$
n \to \frac{n}{2} \to \frac{n}{4} \to \cdots \to 1
$$

This is the recurrence $T(n) = T(n/2) + O(1)$ - constant work per
step, then recurse on half - which Week 4 already showed solves to
<span class="bignotation">O(log n)</span>.

For CampusNav's 1,200-room directory: $\log_2(1200) \approx 11$.
Eleven comparisons, worst case, no matter where in the directory the
target sits - versus up to 1,200 for linear search.

---

# What We're Going to Prove

<div class="thread">Not "it worked on the examples I tried." An actual proof.</div>

**Claim:** `BINARY-SEARCH` above always returns the correct index if
`target` is in `A`, and correctly reports `NOT-FOUND` otherwise -
*provided `A` is sorted*.

**Loop invariant:**

> If `target` is present anywhere in `A`, then it is present within
> the subarray `A[lo..hi]`.

We prove this in three parts, exactly as Week 5 did for insertion
sort: **initialization** (true before the first pass), **maintenance**
(stays true across every pass), **termination** (what it tells us
when the loop stops).

---

# Proof, Part 1: Initialization

**Claim:** the invariant holds before the first iteration.

- Before the loop runs: `lo = 0` and `hi = length(A) - 1`.
- So `A[lo..hi]` is `A[0..length(A)-1]` - the **entire array**.
- If `target` is present in `A` at all, it is trivially present
  somewhere within the entire array.

The invariant holds vacuously true at the start. ∎

---

# Proof, Part 2: Maintenance

**Claim:** if the invariant holds at the start of an iteration, it
still holds at the start of the next one.

Assume `target`, if present, is in `A[lo..hi]`. Since the loop
condition `lo <= hi` held, `mid` is a valid index inside `[lo, hi]`.
Three cases:

- **`A[mid] == target`:** we return `mid` immediately - correct, and
  the loop ends.
- **`A[mid] < target`:** because `A` is sorted ascending, every index
  `<= mid` holds a value `<= A[mid] < target`. So `target`, if
  present, cannot be at any index `<= mid` - it must be in
  `A[mid+1..hi]`. Setting `lo = mid + 1` keeps the invariant true.
- **`A[mid] > target`:** symmetric - `target`, if present, must be in
  `A[lo..mid-1]`. Setting `hi = mid - 1` keeps the invariant true.

In every case, the new `[lo, hi]` still contains `target` if `A` does. ∎

---

# Proof, Part 3: Termination → Correctness

- Each iteration either **returns** (found), or shrinks the range:
  the new range is `A[lo..mid-1]` or `A[mid+1..hi]`, both strictly
  smaller than `A[lo..hi]` since `mid` sits inside `[lo, hi]`. The
  range roughly halves every iteration, so the loop must eventually
  either return or reach `lo > hi`.
- **If the loop returns `mid`:** line 5 only returns when
  `A[mid] == target`, so the answer is correct by construction.
- **If the loop exits with `lo > hi`:** the range `A[lo..hi]` is now
  *empty*. By the invariant, if `target` were present in `A`, it
  would have to be inside that (empty) range - a contradiction. So
  `target` is not in `A`, and returning `NOT-FOUND` is correct.

Both exits are correct, and the loop always reaches one of them. **∎
Binary search is correct**, not just observed to work.

---

# Off-by-One Pitfall #1: The Bound Convention

`hi = length(A) - 1` and `hi = length(A)` are **both** valid starting
points - but only if the *rest* of the algorithm matches:

| Convention | `hi` starts at | Range meaning | "greater" branch |
|---|---|---|---|
| Closed `[lo, hi]` | `length(A) - 1` | `hi` is a valid index | `hi = mid - 1` |
| Half-open `[lo, hi)` | `length(A)` | `hi` is one *past* the last index | `hi = mid` |

The bug is **mixing them**: initializing `hi = length(A)` (half-open)
but keeping `hi = mid - 1` and `while lo <= hi` (closed-style). When
the target is greater than every element, `lo` and `hi` both climb to
`length(A)`, `mid` becomes `length(A)`, and `A[mid]` reads **out of
bounds**.

---

# Off-by-One Pitfall #2: The Infinite Loop

The "greater than" branch must set `lo = mid + 1`, **not** `lo = mid`.

Suppose `lo = 4`, `hi = 5`. Then `mid = floor((4+5)/2) = 4` - note
`mid == lo`. If `A[mid] < target` and the buggy code sets `lo = mid`
instead of `lo = mid + 1`:

```text
lo = 4, hi = 5, mid = 4   # A[4] < target
lo = mid = 4              # BUG: lo did not move
lo = 4, hi = 5, mid = 4   # identical state - forever
```

`lo` and `hi` never change again. The range never shrinks, the
termination argument from Part 3 breaks, and the loop **never ends**.
The fix is always `lo = mid + 1` on this branch (its mirror,
`hi = mid - 1`, is already safe since `mid` can equal `hi` too).

---

# The Sorted-Input Precondition

<div class="thread">Not a performance caveat - a correctness one.</div>

Run `BINARY-SEARCH` on the **unsorted** array `[50, 10, 30, 90, 5]`,
looking for `10` (which *is* present, at index 1):

```text
lo=0, hi=4, mid=2   A[2]=30 > 10  →  hi = 1
lo=0, hi=1, mid=0   A[0]=50 > 10  →  hi = -1
lo=0, hi=-1: loop ends → returns NOT-FOUND
```

`10` is sitting right there at index 1 - and the algorithm reports it
missing. This is not slower; it is **wrong**. The maintenance proof
(Part 2) explicitly relied on "everything `<= mid` is `<= A[mid]`,"
which is only true when `A` is sorted. Break that assumption, and the
whole proof - not just the speed - falls apart.

---

<!-- SLOT N-2: Worked example -->

# CampusNav: "Jump to Room," Traced

<div class="thread">Everything above, on real (sample) directory data.</div>

A 16-entry sample of CampusNav's sorted room-code directory
(index 0-15), searching for room code **703** (성파703):

<div class="tracetable">
<div class="row"><div class="rowlabel">A</div><div class="cell">101</div><div class="cell">206</div><div class="cell">302</div><div class="cell">415</div><div class="cell">512</div><div class="cell">615</div><div class="cell hl2">703</div><div class="cell">802</div><div class="cell">910</div><div class="cell">1005</div><div class="cell">1108</div><div class="cell">1220</div><div class="cell">1301</div><div class="cell">1405</div><div class="cell">1502</div><div class="cell">1600</div></div>
<div class="row"><div class="rowlabel">Step 1</div><div class="cell hl2">101</div><div class="cell">206</div><div class="cell">302</div><div class="cell">415</div><div class="cell">512</div><div class="cell">615</div><div class="cell">703</div><div class="cell hl">802</div><div class="cell">910</div><div class="cell">1005</div><div class="cell">1108</div><div class="cell">1220</div><div class="cell">1301</div><div class="cell">1405</div><div class="cell">1502</div><div class="cell hl2">1600</div></div>
<div class="row"><div class="rowlabel">Step 2</div><div class="cell hl2">101</div><div class="cell">206</div><div class="cell">302</div><div class="cell hl">415</div><div class="cell">512</div><div class="cell">615</div><div class="cell hl2">703</div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div></div>
<div class="row"><div class="rowlabel">Step 3</div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell hl2">512</div><div class="cell hl">615</div><div class="cell hl2">703</div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div></div>
<div class="row"><div class="rowlabel">Step 4</div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell hl">703</div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div></div>
</div>

- Step 1: `lo=0,hi=15,mid=7` → `A[7]=802 > 703` → search left, `hi=6`
- Step 2: `lo=0,hi=6,mid=3` → `A[3]=415 < 703` → search right, `lo=4`
- Step 3: `lo=4,hi=6,mid=5` → `A[5]=615 < 703` → search right, `lo=6`
- Step 4: `lo=6,hi=6,mid=6` → `A[6]=703 = target` → **found, index 6**

Four comparisons. At the real 1,200-room scale, this is ~11 steps -
never up to 1,200.

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

<!-- SLOT N: Check yourself -->

# Check Yourself

1. State the loop invariant binary search maintains, in your own words.
2. A binary search implementation sets `lo = mid` on the "target is
   greater" branch. What goes wrong, and when does it show up?
3. Why is "binary search works on any sorted-*looking* array" not
   good enough - what specifically must be true?

---

# Answers

1. If the target is present in `A` at all, it is present within the
   current `A[lo..hi]` range - true before, during, and after every
   iteration.
2. It causes an infinite loop whenever `lo` and `hi` are adjacent
   (e.g. `hi = lo + 1`), because `mid` can equal `lo`, and `lo = mid`
   then leaves `lo` unchanged forever. It only shows up on inputs that
   narrow the range down to exactly two elements with the target in
   the second - easy to miss in casual testing.
3. `A` must be genuinely, fully sorted (ascending, by whatever key is
   compared) - not "mostly sorted" or "sorted in the part I checked."
   The maintenance proof needs *every* index `<= mid` to be `<=
   A[mid]`, which a single out-of-order pair anywhere can violate.

---

<!-- NEW: Try-It hand-off -->

# Now: Worksheet Part A

<div class="thread">Time to practice. Trace it yourself, by hand.</div>

Work with your neighbor. Open **[Worksheet Part
A](materials/week07/worksheet.html)**. Trace binary search's `lo`,
`mid`, `hi` across a 15-element array, then hunt down an off-by-one
bug in Part B.

**~15 minutes.** Raise your hand if you get stuck.

<!--
notes: Hand out or project Worksheet Part A. Walk the room while pairs work.
After 15 minutes, ask a pair to read out their lo/mid/hi trace, and another to explain the Part B bug.
-->

---

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: the midterm - what's on it, and a full practice set.</div>

---

<!-- NEW: Key Words Today, session 3 -->

# Key Words Today

- **Midterm scope:** Weeks 1-7 - algorithm properties, complexity
  analysis, recursion/recurrences, basic and advanced sorting, and
  today's searching content.
- **Recurrence:** an equation defining a recursive algorithm's cost in
  terms of smaller instances of itself (Week 4) - you'll solve one today.
- **Growth-rate ordering:** ranking functions by how fast they grow as
  $n \to \infty$ (Week 3) - also on today's practice set.

<!-- notes: Read each term aloud. Say: "Today's second half is entirely midterm prep - the same rigor, applied to everything so far." -->

---

<!-- Midterm Review mini-block: extra Act-3 content, pre-midterm week -->
<!-- _class: section -->

# Midterm Review: Weeks 1-7

<div class="driving-q">Same driving question, one level up: what does this course need you to prove, trace, and analyze so far?</div>

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
- **What follows now:** six practice questions, one per slide, each
  with its full worked answer on the very next slide. Try each one
  yourself, on paper, before revealing the answer.

---

# Practice Q1 - Big-O Proof

Prove, using the formal definition of Big-O, that

$$3n^2 + 5n + 2 = O(n^2)$$

That is: find constants $c > 0$ and $n_0 \ge 1$ such that
$3n^2 + 5n + 2 \le c \cdot n^2$ for all $n \ge n_0$.

---

# Answer Q1

Choose $n_0 = 1$. For all $n \ge 1$: $n \le n^2$, so $5n \le 5n^2$;
and $1 \le n^2$, so $2 \le 2n^2$. Adding these facts to $3n^2 \le
3n^2$:

$$
3n^2 + 5n + 2 \;\le\; 3n^2 + 5n^2 + 2n^2 \;=\; 10n^2 \quad \text{for all } n \ge 1
$$

So $c = 10$, $n_0 = 1$ satisfies the definition. **$3n^2 + 5n + 2 =
O(n^2)$.** (Any larger valid $c$ also works - the proof only needs
*some* constants, not the tightest ones.)

---

# Practice Q2 - Sorting Trace

Trace **insertion sort** on the array `[5, 2, 8, 1, 4]`. Show the
array's contents after each pass of the outer loop (inserting each
element into the sorted prefix). What is insertion sort's worst-case
Big-O?

---

# Answer Q2

| Pass | Key inserted | Array after this pass |
|---|---|---|
| start | - | `[5, 2, 8, 1, 4]` |
| 1 | 2 | `[2, 5, 8, 1, 4]` |
| 2 | 8 | `[2, 5, 8, 1, 4]` (already in place, no shift) |
| 3 | 1 | `[1, 2, 5, 8, 4]` |
| 4 | 4 | `[1, 2, 4, 5, 8]` |

Worst case (input in reverse sorted order - every insertion shifts
the entire sorted prefix): <span class="bignotation">O(n²)</span>.

---

# Practice Q3 - Solve a Recurrence

Merge sort's cost obeys

$$T(n) = 2T(n/2) + n, \qquad T(1) = 1$$

Using the recursion-tree method, find $T(n)$ in Big-O terms.

---

# Answer Q3

Each level of the recursion tree splits work into 2 subproblems of
half the size, but the **combine work at each level still totals
$n$**: level 0 does $n$, level 1 does $2 \cdot (n/2) = n$, level 2
does $4 \cdot (n/4) = n$, and so on. The tree has depth $\log_2 n$
(halving until size 1), so:

$$
T(n) = \underbrace{n + n + \cdots + n}_{\log_2 n \text{ levels}} = n \log_2 n
$$

**$T(n) = O(n \log n)$** - the same bound this recurrence gets every
time it shows up (merge sort, and later, several divide-and-conquer
algorithms in Week 9).

---

# Practice Q4 - Loop Invariant

State the loop invariant maintained by **insertion sort**'s outer
loop (indexed by $i$, inserting `A[i]` into the sorted prefix
`A[0..i-1]`). Briefly justify initialization and what the invariant
tells you at termination.

---

# Answer Q4

**Invariant:** at the start of each outer-loop iteration `i`, the
subarray `A[0..i-1]` consists of exactly the elements originally
there, now in sorted order.

- **Initialization:** at `i = 1`, `A[0..0]` is a single element - a
  one-element array is trivially sorted.
- **Maintenance:** each iteration inserts `A[i]` into its correct
  position within the already-sorted `A[0..i-1]`, extending the
  sorted region to `A[0..i]`.
- **Termination:** the loop ends when `i = n`, so the invariant now
  says `A[0..n-1]` - the **whole array** - is sorted. That is exactly
  the correctness claim.

---

# Practice Q5 - Growth-Rate Ordering

Order the following functions from **slowest**-growing to
**fastest**-growing, as $n \to \infty$:

$$
n!,\quad n\log n,\quad 2^n,\quad \log n,\quad n,\quad n^2
$$

---

# Answer Q5

$$
\log n \;<\; n \;<\; n \log n \;<\; n^2 \;<\; 2^n \;<\; n!
$$

- $\log n$ grows slower than any positive power of $n$.
- $n \log n$ sits strictly between linear and quadratic.
- $2^n$ (exponential) eventually outgrows any polynomial, including $n^2$.
- $n!$ (factorial) outgrows even $2^n$ once $n$ is large enough - the
  fastest-growing function on this list, by a wide margin.

---

# Practice Q6 - Off-by-One Bug Hunt

A binary search implementation initializes `hi = length(A)` (not
`length(A) - 1`), but keeps `hi = mid - 1` on the "too high" branch
and `while lo <= hi` as the loop condition. On an array of length 4,
searching for a target **larger than every element**, identify the
bug this causes and state the fix.

---

# Answer Q6

Trace it: `lo=0, hi=4`. `mid=2`, `A[2] < target` → `lo=3`. `lo=3,
hi=4`, `mid=3`, `A[3] < target` → `lo=4`. Now `lo=4, hi=4` - the loop
condition `lo <= hi` is still true (`4 <= 4`), so it runs again:
`mid=4`, and **`A[4]` is read out of bounds** (valid indices are only
`0..3`).

**Bug:** `hi` was initialized to `length(A)` (a half-open convention)
but the rest of the algorithm uses the closed `[lo, hi]` convention
(`hi = mid - 1`), so `hi` starts one index too high and the range
never correctly excludes index `length(A)`.

**Fix:** initialize `hi = length(A) - 1`, matching the closed
convention used everywhere else in the function.

---

<!-- NEW: quiz hand-off -->

# Now: Quick Self-Check Quiz

<div class="thread">Ungraded. Just for you, to see what stuck.</div>

Open the **[Week 7 Quiz](materials/week07/quiz.html)**. Answer on your
own, about 10 minutes. Check your own answers at the end. This quiz
covers today's searching content - the full midterm practice set
above is in your handout for deeper review.

<!--
notes: Distribute or project the quiz. After about 10 minutes, reveal the
answer key and discuss as a group any question most of the class missed.
-->

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 9's slot 4 (Week 8 is review-only) -->

# What Weeks 1-7 Still Cannot Do

<div class="limits">
Big-O, recursion, sorting, and searching are all in place - CampusNav
can now sort and search its directory correctly and efficiently. But
every technique so far has been **ad hoc per problem**: a different
trick for sorting, a different trick for searching, each invented and
proved one at a time. There is still no *general strategy* for
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
- **Reading:** CLRS, review Chapter 2 (loop invariants) and Exercise
  2.3-5 (binary search); Sedgewick, *Algorithms*, §1.1 has a full
  correctness discussion if you want a second treatment.
- **Prepare for Week 8:** rework every proof and trace from Weeks 1-7
  from scratch, on paper, without looking at the slides first.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
