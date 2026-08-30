# Week 5 Handout - Basic Sorting

Computer Algorithms (506994-002). Keep this handout. It has the full
glossary, the insertion-sort loop-invariant proof spelled out in full,
a complexity/stability comparison of all three sorts, extra reading,
and practice problems with answers.

---

## Part 1: Glossary (all key terms, in plain words)

| Term | Plain definition |
|---|---|
| **Sorted** | Elements arranged so each is $\le$ the one after it, from first to last. |
| **In-place** | An algorithm that rearranges the array itself, using only $O(1)$ extra memory. |
| **Stable** | Elements with equal keys keep their original relative order after sorting. |
| **Adaptive** | An algorithm that runs faster on input that is already partly sorted, instead of doing the same fixed amount of work regardless. |
| **Pass** | One full sweep of a sorting algorithm's main loop. |
| **Comparison / swap / shift** | The three basic operations a sort performs: comparing two elements, exchanging two elements' positions, or moving one element over by one slot. |
| **Loop invariant** | A statement that is true before, during, and after every pass of a loop - used to *prove* an algorithm correct on every input, not just tested ones. |
| **Average case** | The expected running time over a "typical," randomly-ordered input - distinct from the worst case (an adversarial input built to be as bad as possible) and the best case (already sorted). |
| **Bubble sort** | Repeatedly swap out-of-order neighbors; the largest unsorted element "bubbles" to the end each pass. |
| **Selection sort** | Repeatedly find the minimum of the unsorted remainder and swap it into place at the front. |
| **Insertion sort** | Repeatedly take the next element and slide it left into its correct spot among the already-sorted prefix - how most people sort a hand of cards. |
| **Counterexample** | A single concrete input that disproves a general claim (e.g. one array that shows a sort is not stable). |
| **Multi-key sort** | Sorting by more than one field (e.g. floor, then building name) - relies on the first sort's order surviving the second, which requires stability. |

---

## Part 2: The Loop Invariant Proof, Fully Spelled Out

This is the exact proof from the slides, written out in complete
detail: **insertion sort is correct on every input.**

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

**The invariant, stated precisely:**

> At the start of each iteration of the outer `for` loop (indexed by
> `i`), the subarray `A[0..i-1]` consists of exactly the elements
> that originally occupied `A[0..i-1]`, but rearranged into sorted
> order.

A loop-invariant proof always has the same three parts, and each one
answers a different question:

### Initialization - does it hold before the loop starts?

Before the first iteration, `i = 1`. The invariant's claim is about
`A[0..0]` - a single element. A one-element subarray has no pair of
elements that could be out of order, so it is sorted *by definition*.
The invariant holds trivially at the start.

### Maintenance - does one true iteration guarantee the next is true too?

Assume the invariant holds going into iteration `i`: `A[0..i-1]` is
sorted. We must show it still holds going into iteration `i+1`, i.e.
that `A[0..i]` ends the iteration sorted.

The loop body does exactly three things:

1. Saves `A[i]` into `key`. This is the one new element being
   inserted; nothing about the sorted prefix has changed yet.
2. The `while` loop scans right-to-left through `A[0..i-1]`, and for
   every element strictly greater than `key`, shifts it one position
   to the right. Because `A[0..i-1]` was sorted (by the assumption),
   these greater elements form a contiguous block at the *end* of the
   sorted prefix - the scan shifts exactly that block, and only that
   block, one slot right. It never touches or reorders elements
   smaller than or equal to `key`.
3. `key` is placed into the gap left behind - immediately after the
   last element that is $\le$ `key`, and immediately before the block
   that was just shifted right.

The result is `A[0..i]`: the same multiset of elements as
`A[0..i-1]` plus `key`, arranged so every element is still $\le$ the
one after it. That is exactly "sorted." When `i` increments for the
next iteration, the invariant's claim (now about `A[0..i]`, i.e.
`A[0..(i+1)-1]`) holds. Maintenance is proven.

### Termination - does the invariant, once the loop ends, prove what we wanted?

The outer loop's counter `i` increases by exactly 1 each iteration and
the loop stops as soon as `i` would exceed `n - 1`, i.e. when `i = n`.

Substituting `i = n` into the invariant's statement: `A[0..n-1]`
consists of the original elements, in sorted order. Since a
zero-indexed array of length `n` has valid indices `0` through
`n - 1`, `A[0..n-1]` **is the entire array**. So when the loop
terminates, the whole array is sorted.

$$
\text{Initialization} \;\land\; \text{Maintenance} \;\land\; \text{Termination} \implies \text{INSERTION-SORT is correct on every input}
$$

**Why go through all three parts, when the trace "obviously" works?**
A hand-trace (like `[5, 2, 4, 1, 3]` from the slides) only confirms
the algorithm works on *that one input*. The invariant argument is a
proof by induction on `i` - initialization is the base case,
maintenance is the inductive step - and it covers every array of every
length and every content, all at once. This is precisely the
"testing is not proof" lesson from Week 2's `MAX` bug, now with a
concrete tool for producing an actual proof instead of just more tests.

---

## Part 3: Complexity and Stability, All Three Sorts

| | Bubble sort | Selection sort | Insertion sort |
|---|---|---|---|
| Worst case | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ |
| Average case | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ |
| Best case | $O(n)$ (already sorted, zero swaps, early exit) | $O(n^2)$ (always scans the full remainder) | $O(n)$ (already sorted, inner `while` exits immediately) |
| Space | $O(1)$, in-place | $O(1)$, in-place | $O(1)$, in-place |
| Stable? | Yes | **No** (naive form) | Yes |
| Adaptive? | Yes, with a `swapped` flag | No | Yes |
| Exchanges | Up to $O(n^2)$ swaps | Exactly $n - 1$ swaps, always | Up to $O(n^2)$ shifts |

**Why the worst-case row looks identical but the algorithms don't
behave identically:**

- **Adaptiveness** separates them sharply on real, mostly-sorted data.
  If CampusNav's directory is already sorted and one new room is
  appended, insertion sort costs roughly $O(n)$ to re-sort - it
  notices almost everything is already in place. Selection sort would
  still cost $O(n^2)$, because its inner scan for the minimum never
  shortens based on how sorted the array already is.
- **Stability** is not about speed at all - it is about whether
  equal-key elements keep their relative order. Naive selection sort
  can break it with a single swap (see the counterexample below);
  bubble and insertion sort never can, because they only ever move an
  element past another element that is *strictly* different (greater,
  for insertion sort's shifts; out of order, for bubble sort's swaps).
- **Exchange count** matters when writes are expensive relative to
  comparisons (e.g. writing to flash storage, or moving large
  records instead of small keys). Selection sort's fixed $n-1$ swaps
  can be an advantage there - but that is a narrow, specific
  advantage, not a reason to treat the three sorts as interchangeable.

**The stability counterexample, restated.** Tag two equal-key
elements so their identities are trackable: `A = [4a, 4b, 1c]`. Naive
selection sort finds the minimum (`1c`, at index 2) and swaps it with
index 0: `A = [1c, 4b, 4a]`. `4a` was originally before `4b`; after
one swap, `4b` is before `4a`. Their relative order flipped - one
counterexample is enough to disqualify stability, even though many
*other* inputs would happen to stay stable by luck.

---

## Part 3b: Where "O(n²)" Actually Comes From

Bubble sort on `[5, 2, 4, 1, 3]`, worst case (no early exit): pass 1
makes 4 comparisons, pass 2 makes 3, pass 3 makes 2, pass 4 makes 1 -
one fewer each time, because the previous pass's largest element is
now settled and never needs re-checking.

$$
4 + 3 + 2 + 1 = 10, \qquad \text{and in general: } (n-1) + (n-2) +
\cdots + 1 = \sum_{k=1}^{n-1} k = \frac{n(n-1)}{2}
$$

For $n = 5$: $\frac{5 \cdot 4}{2} = 10$ - matches the count above.
$\frac{n(n-1)}{2} = \frac{n^2-n}{2}$; dropping the slower-growing term
and the constant factor leaves the dominant term, $O(n^2)$. This
counted derivation - not just the label - is what backs every
"$O(n^2)$" claim made for bubble, selection, and insertion sort.

---

## Part 4: Optional Reading - Why Stability Isn't Just a Technicality

Every mainstream standard-library sort is a documented example of why
stability matters in practice, not just in a classroom counterexample:

- **Multi-key sorting.** Suppose CampusNav wants its directory sorted
  by floor, and within each floor, alphabetically by building name.
  The simplest correct approach is: sort by building name first, then
  sort by floor *using a stable algorithm*. Because the second sort is
  stable, rooms that land on the same floor keep the alphabetical
  order the first sort already established. Use an unstable sort for
  the second pass, and that alphabetical sub-order can scramble
  silently - the output still "looks sorted" by floor, but is wrong
  within each floor, and nothing crashes to tell you so.
- **Spreadsheets and databases.** "Sort by column A, then column B" in
  a spreadsheet, and SQL's `ORDER BY col_a, col_b`, both rely on
  exactly this multi-pass-stable-sort idea (or an equivalent
  multi-key comparison) to behave the way users expect.
- **Real guarantees.** Python's `sorted()`/`list.sort()` and Java's
  `Collections.sort()` are both explicitly documented as stable - this
  is a correctness contract library authors commit to, specifically so
  application code can safely chain sorts the way described above.

**A note on selection sort and stability.** It is possible to write a
*stable* variant of selection sort - by shifting elements instead of
swapping, similar to how insertion sort avoids the problem - but it
costs extra shifting work and is rarely how selection sort is taught
or implemented. The "textbook" selection sort, with a single swap per
pass, is the unstable version, and that is the version this course
(and most others) means by the name.

**Where this course is headed:**

| Weeks | What gets formalized |
|---|---|
| 5 | Basic $O(n^2)$ sorts, correctness by loop invariant (this week) |
| 6 | Merge sort and quicksort, both $O(n \log n)$ on average - the recurrence $T(n) = 2T(n/2) + O(n)$ previewed in Week 4 |
| 7 | Binary search, once the directory is actually sorted |
| 9 | Divide-and-conquer as a general design paradigm, with a full Master Theorem proof |

---

## Part 5: Practice Problems (with answers)

Try each problem yourself before checking the answer.

**1.** Trace bubble sort on `[3, 1, 4, 1, 5]` for one full pass only
(left to right, swapping any out-of-order neighbor). Write the array
after that one pass.

> **Answer:** Compare (3,1)→swap: `[1,3,4,1,5]`. Compare (3,4)→no
> swap. Compare (4,1)→swap: `[1,3,1,4,5]`. Compare (4,5)→no swap.
> After one pass: `[1, 3, 1, 4, 5]`.

**2.** Trace selection sort on `[3, 1, 4, 1, 5]` for one full pass
only (find the minimum of the whole array, swap it to index 0). Write
the array after that one pass.

> **Answer:** Minimum of `[3,1,4,1,5]` is `1`, first found at index 1.
> Swap index 0 and index 1: `[1, 3, 4, 1, 5]`.

**3.** Tag the array `A = [5a, 2b, 5c, 2d]` (subscripts are labels
only). Run naive selection sort by hand, one pass at a time, and state
whether the relative order of `2b` and `2d` is preserved in the final
sorted array.

> **Answer:** Pass 1: minimum is `2b` (index 1), swap with index 0:
> `[2b, 5a, 5c, 2d]`. Pass 2: minimum of remainder `[5a, 5c, 2d]` is
> `2d` (index 3), swap with index 1: `[2b, 2d, 5c, 5a]`. Pass 3:
> minimum of `[5c, 5a]` is `5a` (index 3), swap with index 2:
> `[2b, 2d, 5a, 5c]`. Final: `[2b, 2d, 5a, 5c]`. `2b` is still before
> `2d` here - this particular input happens to preserve order, which
> is exactly why a single "it worked" example is not proof of
> stability. (The `[4a, 4b, 1c]` counterexample in Part 3 is what
> actually disqualifies selection sort - one counterexample is enough,
> even if other inputs behave.)

**4.** Which part of the loop-invariant proof (initialization,
maintenance, or termination) would be affected if `INSERTION-SORT`'s
outer loop mistakenly ran `for i = 1 to n - 2` instead of `for i = 1
to n - 1` (i.e. stopped one iteration too early)? What would the final
array look like?

> **Answer:** **Termination.** The invariant would still be correctly
> maintained on every iteration that runs, but the loop would stop
> with `i = n - 1` instead of `i = n`. Substituting `i = n - 1` into
> the invariant only guarantees `A[0..n-2]` is sorted - the *last*
> element, `A[n-1]`, would never be inserted into its correct
> position, and could be left completely out of place.

**5.** A CampusNav directory of 1,200 rooms is already fully sorted.
One new room is added at the end, out of order. Which of today's three
sorts finishes fastest re-sorting it, and roughly what is its cost in
terms of $n$?

> **Answer:** Insertion sort (or bubble sort with the `swapped` flag),
> at roughly $O(n)$ - nearly every element is already $\le$ the one
> before it, so the shifting/swapping work is proportional to how far
> out of place the one new room is, not to the size of the whole
> directory. Selection sort would still cost $O(n^2)$, since its inner
> scan for the minimum always examines the entire unsorted remainder
> regardless of how sorted it already is.

**6.** True or false: if a sorting algorithm is $O(n^2)$ in the worst
case, it must also be $O(n^2)$ in the best case.

> **Answer:** False. Worst-case and best-case complexity are separate
> claims about separate inputs. Bubble sort and insertion sort are
> both $O(n^2)$ worst case (e.g. reverse-sorted input) but $O(n)$ best
> case (already-sorted input) - the two bounds describe different
> ends of the same algorithm's behavior, not a single fixed number.
