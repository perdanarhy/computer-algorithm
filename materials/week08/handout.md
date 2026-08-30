# Week 8 Handout - Midterm Review

Computer Algorithms (506994-002). Keep this handout. It has the
midterm review deck's six practice questions reproduced in printable
form, a week-by-week study checklist for Weeks 1-7, and the reading
list to review before the exam. This is a review week - like Week 15,
there is no worksheet or quiz for Week 8.

---

## Part 1: The Six Review Questions, Printable

Try each one yourself, on paper, before reading the answer.

**1. Algorithm Concepts.** Consider this instruction for CampusNav:
*"Keep refining the campus map until it looks accurate enough."*
Which of the five required properties of an algorithm does this
violate, and why?

> **Answer.** It violates **definiteness** (and, arguably,
> **finiteness**). "Accurate enough" has no precise stopping test -
> two people (or the same person twice) could run this "procedure"
> and stop at different points, or never stop at all. A real
> algorithm needs an unambiguous step-by-step definition *and* a
> guaranteed end.

**2. Complexity Analysis.** Prove, from the formal definition of
Big-O, that

$$3n^2 + 20n + 100 = O(n^2)$$

> **Answer.** Need constants $c > 0$, $n_0$ such that
> $f(n) \le c \cdot g(n)$ for all $n \ge n_0$. For $n \ge 1$:
> $n \le n^2$ and $1 \le n^2$, so
> $3n^2 + 20n + 100 \le 3n^2 + 20n^2 + 100n^2 = 123n^2$. So $c = 123$,
> $n_0 = 1$ satisfies the definition - hence $f(n) = O(n^2)$.
> $\blacksquare$ Common mistake to flag: Big-O gives a growth-rate
> **bound**, not the exact running time - $c$ and $n_0$ are
> witnesses, not "the" constants.

**3. Recursion & Recurrence.** CampusNav's merge-sort-based directory
sort satisfies

$$T(n) = 2T(n/2) + n$$

Solve it with the recursion-tree method and state the resulting
bound.

> **Answer.** Each level of the recursion tree splits work into 2
> subproblems of half the size, but the combine work at each level
> still totals $n$: level 0 does $n$, level 1 does $2 \cdot (n/2) = n$,
> level 2 does $4 \cdot (n/4) = n$, and so on. The tree has depth
> $\log_2 n$ (halving until size 1), so $T(n) = n + n + \cdots + n$
> ($\log_2 n$ levels) $= n \log_2 n$. **$T(n) = \Theta(n \log n)$.**

**4. Basic Sorting (Trace & Stability).** Two CampusNav directory
entries tie on sort key **2** - call them $2_a$ (entered first) and
$2_b$ (entered second). Trace insertion sort, ascending, on
$[4,\ 2_a,\ 3,\ 2_b]$. Show the array after each pass. Does $2_a$ stay
before $2_b$? Is insertion sort stable in general?

> **Answer.** start: `[4, 2a, 3, 2b]`. insert 2a: `[2a, 4, 3, 2b]`.
> insert 3: `[2a, 3, 4, 2b]`. insert 2b: `[2a, 2b, 3, 4]`. $2_a$ stays
> before $2_b$. Insertion sort only shifts an element when the
> compared value is **strictly greater** than the key being inserted
> - equal keys never swap past each other. So insertion sort is
> stable **in general**, not just in this example.

**5. Advanced Sorting.** CampusNav's directory is already sorted, and
someone re-runs quicksort on it (e.g., after a filter is cleared),
always choosing the **last element** as pivot. What's the running
time on this input, why, and what's one fix?

> **Answer.** **O(n²).** On already-sorted data, the last element is
> always the *largest* remaining element - every partition splits
> into one subproblem of size $n-1$ and one of size $0$. That's $n$
> levels of $O(n)$ partition work, not $\log n$ levels - $O(n^2)$
> total. **Fix:** choose the pivot randomly (or median-of-three) so
> an adversarial or already-sorted input can't force the worst split.
> This is exactly why "quicksort's worst case is rare/ignorable
> regardless of pivot strategy" is a misconception - it's only rare
> with a *good* pivot strategy.

**6. Searching.** State binary search's loop invariant, and use it to
explain why binary search requires the input to already be sorted.

> **Answer.** **Invariant:** if the target is present in the array,
> it lies within the current search window `[lo, hi]`. **Before the
> loop:** the window is the whole array - trivially true.
> **Maintained:** each step discards the half that provably cannot
> contain the target, based on one comparison against the midpoint.
> **At termination:** the window narrows to 0 or 1 elements, giving
> the answer. "Provably cannot contain the target" is exactly where
> **sortedness** is required - discarding a half on one comparison is
> only valid if everything in that half is known to be on the wrong
> side of the target. On unsorted data it might not be, and the
> invariant breaks.

---

## Part 2: Study Checklist, Week by Week

Organize your review by week. Only check a box once you can do it from
scratch, on paper, without looking at the slides.

- [ ] **Week 1 - Introduction.** Explain the difference between
  "looks correct" and "provably correct" in your own words.
- [ ] **Week 2 - Algorithm Concepts.** State all five required
  properties of an algorithm (finite, definite, input, output,
  effective) and check a short piece of pseudocode against each one.
- [ ] **Week 3 - Complexity Analysis.** Prove an $O(g(n))$ bound from
  the formal definition, producing valid constants $c$ and $n_0$.
  Order a list of growth-rate functions from slowest- to
  fastest-growing.
- [ ] **Week 4 - Recursion & Recurrence.** Trace a recursion tree by
  hand, level by level, and solve the recurrence it produces
  (recursion-tree or substitution method).
- [ ] **Week 5 - Basic Sorting.** Trace bubble, selection, and
  insertion sort by hand, pass by pass. Write out insertion sort's
  loop-invariant proof (initialization, maintenance, termination)
  from memory.
- [ ] **Week 6 - Advanced Sorting.** Trace merge sort's `MERGE` step
  and Lomuto partition by hand. Explain what specific input shape
  forces quicksort's $O(n^2)$ worst case with a last-element pivot.
- [ ] **Week 7 - Searching.** Trace binary search's `lo`/`mid`/`hi`
  across an array. Write out its loop-invariant proof from memory,
  and name the two classic off-by-one bugs.

---

## Part 3: Reading, Before the Exam

Review, don't re-read cover to cover - you've seen all of this
already:

- **CLRS**, Chapters 1-4 (algorithm properties, analyzing algorithms,
  growth of functions, recursion and recurrences).
- **CLRS**, Chapters 2 and 7 (insertion sort's proof and analysis;
  merge sort and quicksort).
- No new reading is assigned this week - if any of the six review
  questions in Part 1 felt shaky, that's the exact chapter to
  revisit before the exam.
