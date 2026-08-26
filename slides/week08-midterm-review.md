---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 8: Midterm Exam

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
</div>

<!--
notes: This is a short review deck, not a lecture. No new material today -
walk the room, answer questions, then hand off to the exam itself.
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
<div class="wk review now"><div class="n">Wk 8</div><div class="t">Midterm Exam</div></div>
<div class="wk"><div class="n">Wk 9</div><div class="t">Divide &amp; Conquer</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">Greedy Algorithms</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">Dynamic Programming I</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">Dynamic Programming II</div></div>
<div class="wk"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Point at Week 8. Say: "Seven weeks of toolkit, checked today. No new material - this is the checkpoint." -->

---

<!-- SLOT 3: Recap (Act 0 / LOCATE) - one line per topic-block, Weeks 1-7. No open-wound sentence: short review variant carries no Pain/Ground act. -->

# Recap: Weeks 1-7

- **Wk 1 - Orientation:** course contract, grading, and policy - plus a first taste of why "looks right" isn't the same as provably correct
- **Wk 2 - Algorithm Concepts:** wrote pseudocode and checked it against five required properties
- **Wk 3 - Complexity Analysis:** measured growth rate with Big-O instead of guessing from one run
- **Wk 4 - Recursion & Recurrence:** traced recursive cost and solved it as a recurrence
- **Wk 5 - Basic Sorting:** traced O(n²) sorts by hand, proved correctness with loop invariants
- **Wk 6 - Advanced Sorting:** replaced O(n²) sorts with O(n log n) merge sort / quicksort
- **Wk 7 - Searching:** turned a sorted directory into ~11-step binary search, not a 1,200-step scan

<div class="thread">Same CampusNav directory, the whole way through - that's the thread the exam checks.</div>

---

<!-- Before the Exam: generic logistics, no invented room/date/time -->

# Before the Exam

- **Materials & format:** whatever the instructor's exam announcement specifies - bring exactly that, nothing assumed beyond it
- **Arrive on time:** the exam starts and ends on schedule; plan to be seated early
- **No makeup exam without prior arrangement** - contact the instructor *before* the exam, not after
- **Accommodation needs** (documented, scheduling conflicts, etc.): arrange with the instructor in advance, not on exam day

---

<!-- _class: section -->
<!-- Act 3 / BUILD, expanded per SPINE's short-review variant: "Check yourself" becomes the whole session -->

# Check Yourself: Full Review

<div class="driving-q">"Can you do, on paper, everything Weeks 1-7 asked you to do?"</div>

---

<!-- Act 3: Coverage - 6 bullets, one per technical topic (Weeks 2-7; Week 1 was orientation, no testable skill), each a skill reminder rather than a fact reminder -->

# Coverage: What You Should Be Able to Do

- **Algorithm Concepts** - check a written procedure against the five required properties (finite, definite, input, output, effective)
- **Complexity Analysis** - prove an O(g(n)) bound from the formal definition (produce valid constants c, n₀)
- **Recursion & Recurrence** - trace a recursion tree and solve the recurrence it produces (substitution, recursion tree, or Master theorem)
- **Basic Sorting** - trace an O(n²) sort by hand and prove it correct with a loop invariant
- **Advanced Sorting** - trace merge sort/quicksort, and explain what makes quicksort's worst case O(n²)
- **Searching** - prove binary search correct with a loop invariant, and state why it requires sorted input

---

<!-- Q1: Algorithm properties (Week 2) -->

# Question 1 - Algorithm Concepts

Consider this instruction for CampusNav: *"Keep refining the campus map
until it looks accurate enough."*

Which of the five required properties of an algorithm does this
violate, and why?

---

# Answer 1

It violates **definiteness** (and, arguably, **finiteness**).
"Accurate enough" has no precise stopping test - two people (or the
same person twice) could run this "procedure" and stop at different
points, or never stop at all. A real algorithm needs an unambiguous
step-by-step definition *and* a guaranteed end.

---

<!-- Q2: Big-O proof (Week 3) -->

# Question 2 - Complexity Analysis

Prove, from the **formal definition** of Big-O, that

$$3n^2 + 20n + 100 = O(n^2)$$

---

# Answer 2

Need constants $c > 0$, $n_0$ such that $f(n) \le c \cdot g(n)$ for
all $n \ge n_0$.

For $n \ge 1$: $n \le n^2$ and $1 \le n^2$, so

$$3n^2 + 20n + 100 \le 3n^2 + 20n^2 + 100n^2 = 123n^2$$

So $c = 123$, $n_0 = 1$ satisfies the definition - hence
$f(n) = O(n^2)$. $\blacksquare$

<div class="why">Common mistake to flag here: Big-O gives a growth-rate <strong>bound</strong>, not the exact running time - <code>c</code> and <code>n₀</code> are witnesses, not "the" constants.</div>

---

<!-- Q3: Recurrence (Week 4) -->

# Question 3 - Recursion & Recurrence

CampusNav's merge-sort-based directory sort satisfies

$$T(n) = 2T(n/2) + n$$

Solve it with the Master theorem and state the resulting bound.

---

# Answer 3

$a = 2$, $b = 2$, $f(n) = n$.

$n^{\log_b a} = n^{\log_2 2} = n^1 = n$

Since $f(n) = \Theta(n^{\log_b a})$, this is **Master theorem Case
2**, so:

<div class="bignotation">T(n) = Θ(n log n)</div>

---

<!-- Q4: Sorting trace/stability (Weeks 5-6) -->

# Question 4 - Basic Sorting (Trace & Stability)

Two CampusNav directory entries tie on sort key **2** - call them
$2_a$ (entered first) and $2_b$ (entered second). Trace **insertion
sort**, ascending, on:

$$[\,4,\ 2_a,\ 3,\ 2_b\,]$$

Show the array after each pass. Does $2_a$ stay before $2_b$? Is
insertion sort stable in general?

---

# Answer 4

<div class="tracetable">
<div class="row"><div class="rowlabel">start</div><div class="cell">4</div><div class="cell hl">2a</div><div class="cell">3</div><div class="cell">2b</div></div>
<div class="row"><div class="rowlabel">insert 2a</div><div class="cell hl">2a</div><div class="cell">4</div><div class="cell">3</div><div class="cell">2b</div></div>
<div class="row"><div class="rowlabel">insert 3</div><div class="cell">2a</div><div class="cell hl">3</div><div class="cell">4</div><div class="cell">2b</div></div>
<div class="row"><div class="rowlabel">insert 2b</div><div class="cell">2a</div><div class="cell hl2">2b</div><div class="cell">3</div><div class="cell">4</div></div>
</div>

$2_a$ stays before $2_b$. Insertion sort only shifts an element when
the compared value is **strictly greater** than the key being
inserted - equal keys never swap past each other. So insertion sort
is stable **in general**, not just in this example.

---

<!-- Q5: Advanced sorting / quicksort worst case (Week 6) -->

# Question 5 - Advanced Sorting

CampusNav's directory is already sorted, and someone re-runs
quicksort on it (e.g., after a filter is cleared), always choosing
the **first element** as pivot.

What's the running time on this input, why, and what's one fix?

---

# Answer 5

**O(n²).** On already-sorted data, the first element is always the
*smallest* remaining element - every partition splits into one
subproblem of size $n-1$ and one of size $0$. That's $n$ levels of
$O(n)$ partition work, not $\log n$ levels - $O(n^2)$ total.

**Fix:** choose the pivot randomly (or median-of-three) so an
adversarial or already-sorted input can't force the worst split. This
is exactly why *"quicksort's worst case is rare/ignorable regardless
of pivot strategy"* is a misconception - it's only rare with a *good*
pivot strategy.

---

<!-- Q6: Searching / loop invariant (Week 7) -->

# Question 6 - Searching

State binary search's loop invariant, and use it to explain why
binary search requires the input to already be sorted.

---

# Answer 6

**Invariant:** *if the target is present in the array, it lies within
the current search window* `[lo, hi]`.

- **Before the loop:** the window is the whole array - trivially true.
- **Maintained:** each step discards the half that provably cannot
  contain the target, based on one comparison against the midpoint.
- **At termination:** the window narrows to 0 or 1 elements, giving
  the answer.

"Provably cannot contain the target" is exactly where **sortedness**
is required - discarding a half on one comparison is only valid if
everything in that half is known to be on the wrong side of the
target. On unsorted data it might not be, and the invariant breaks.

---

<!-- SLOT N+1: replaces "Limits" per SPINE's short-review variant - forward-looking, not a technical limitation -->

# What to Focus On Next

Weeks 1-7 gave you a toolkit: correctness, complexity, recursion,
sorting, searching. Weeks 9-14 don't add more of the same kind - they
teach **four general strategies for inventing new algorithms**, plus
how to represent networks at all.

<div class="pipeline">
<div class="stage"><div class="h">Wk 9</div><div class="s">Divide &amp; Conquer</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Wk 10</div><div class="s">Greedy Algorithms</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Wks 11-12</div><div class="s">Dynamic Programming I &amp; II</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Wks 13-14</div><div class="s">Graphs &amp; Shortest Path</div></div>
</div>

Nothing here is graded today - just orient yourself for what's next.

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 8 is the checkpoint. **Week 9 begins Divide and Conquer** - the
first of four general strategies for *inventing* new algorithms.

---

<!-- SLOT N+3: Summary -->

# Summary

- Weeks 1-7 built one connected toolkit, not seven separate topics:
  correctness/complexity vocabulary, recursion, and the two classic
  building blocks - sorting and searching - all examined through
  CampusNav's directory/lookup features.
- Today was a checkpoint, not new material: use the Coverage list and
  the six review questions above to find your own gaps before the
  exam.
- **Reading:** review CLRS Chapters 1-7-ish material (skim what you've
  already read) - no new reading assigned.
- **Prepare:** Assignment 2 (Sorting) is due before the exam per the
  syllabus; bring only what the instructor's exam announcement
  permits.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
