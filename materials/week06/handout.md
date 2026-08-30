# Week 6 Handout - Advanced Sorting

Computer Algorithms (506994-002). Keep this handout. It has the full
glossary, the merge trace and the Lomuto partition trace both spelled
out in complete detail, the merge-sort-vs-quicksort comparison table,
extra reading, and practice problems with answers.

---

## Part 1: Glossary (all key terms, in plain words)

| Term | Plain definition |
|---|---|
| **Divide-and-conquer** | Solve a problem by dividing it into smaller subproblems of the same shape, solving each recursively, then combining the results. |
| **Merge** | Combine two already-sorted lists into one sorted list, in a single left-to-right pass. |
| **Merge sort** | A divide-and-conquer sort that splits the array in half, recursively sorts each half, then merges the two sorted halves back together. |
| **Partition** | Rearrange an array, in place, into "$\le$ some reference value" and "$>$ that value." |
| **Quicksort** | A divide-and-conquer sort that partitions the array around a pivot, then recursively sorts each side. No merge step is needed. |
| **Pivot** | The reference value quicksort partitions the array around. |
| **Lomuto partition** | The partition scheme that fixes the pivot as the last element and tracks a single boundary index `i` as `j` scans left to right. |
| **Hoare partition** | The original (1961) partition scheme: pivot fixed as the first element, two indices scan inward from both ends. |
| **In-place** | Uses only a small (constant or logarithmic) amount of extra memory beyond the input array itself. |
| **Stable** | Elements with equal keys keep their original relative order after sorting. |
| **Auxiliary space** | Extra memory an algorithm needs beyond the original input array. |
| **Recurrence** | An equation defining a recursive algorithm's cost in terms of itself on smaller input (Week 4) - merge sort's entire cost is one of these. |
| **Adversarial input** | An input specifically shaped to trigger an algorithm's worst-case behavior - for Lomuto quicksort, an already-sorted array. |
| **Expected case** | An algorithm's typical running time, averaged over random inputs or random pivot choices - a statement about the *average*, not a guarantee for every run. |

---

## Part 2: The Merge Step, Fully Traced

This is the exact `MERGE` pseudocode from the slides, with every
comparison of the trace written out.

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

Merging `L = [2, 5, 8]` with `R = [1, 3, 9]` (both already sorted,
sentinels omitted from the table for readability):

| Step (k) | L[i] | R[j] | Comparison | Placed into A[k] | i after | j after |
|---|---|---|---|---|---|---|
| 1 | 2 | 1 | $2 \le 1$? No | 1 | 1 | 2 |
| 2 | 2 | 3 | $2 \le 3$? Yes | 2 | 2 | 2 |
| 3 | 5 | 3 | $5 \le 3$? No | 3 | 2 | 3 |
| 4 | 5 | 9 | $5 \le 9$? Yes | 5 | 3 | 3 |
| 5 | 8 | 9 | $8 \le 9$? Yes | 8 | 4 | 3 |
| 6 | $\infty$ | 9 | $\infty \le 9$? No | 9 | 4 | 4 |

Result: `A = [1, 2, 3, 5, 8, 9]`. Exactly 6 comparisons for 6
elements - every step of `MERGE` places exactly one element and never
revisits an already-placed one, which is why `MERGE` runs in
$O(n_1 + n_2) = O(n)$ time. Note step 2: the rule is `L[i] <= R[j]`,
not strict `<` - on a tie, the **left** side always wins, which is
exactly what makes merge sort stable.

---

## Part 3: The Lomuto Partition, Fully Traced

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

Partitioning `A = [8, 3, 5, 1, 9, 2]` (1-indexed, `low = 1`,
`high = 6`, pivot `= A[6] = 2`):

| j | A[j] | $A[j] \le 2$? | Action | i after | Array state |
|---|---|---|---|---|---|
| - | - | - | pivot = 2, i = 0 | 0 | 8, 3, 5, 1, 9, 2 |
| 1 | 8 | No | nothing | 0 | 8, 3, 5, 1, 9, 2 |
| 2 | 3 | No | nothing | 0 | 8, 3, 5, 1, 9, 2 |
| 3 | 5 | No | nothing | 0 | 8, 3, 5, 1, 9, 2 |
| 4 | 1 | Yes | i=1, swap A[1],A[4] | 1 | 1, 3, 5, 8, 9, 2 |
| 5 | 9 | No | nothing | 1 | 1, 3, 5, 8, 9, 2 |

Loop ends. Final step: swap `A[i+1] = A[2]` with `A[6]` &rarr;
`[1, 2, 5, 8, 9, 3]`. Return `i + 1 = 2`.

Pivot `2` now sits at index 2, its final sorted position. Left of it,
`[1]`, is entirely $\le 2$. Right of it, `[5, 8, 9, 3]`, is entirely
$> 2$ - a correct partition in exactly 5 comparisons.

**A note on Hoare's partition, same array, different pivot.** Hoare
fixes the pivot as the *first* element instead. Running
`HOARE-PARTITION` on the original `[8, 3, 5, 1, 9, 2]` (pivot `= 8`)
ends with `[2, 3, 5, 1, 9, 8]` and a returned split index of 4 - note
that, unlike Lomuto, **the pivot does not land at its final sorted
index**. Hoare's partition only guarantees that everything in
`A[low..j]` is $\le$ pivot and everything in `A[j+1..high]` is $\ge$
pivot; the recursive calls must be `QUICKSORT(A, low, p)` and
`QUICKSORT(A, p+1, high)` (using `p`, not `p-1`/`p+1` like Lomuto) to
account for this.

---

## Part 4: Merge Sort vs. Quicksort

| | Merge Sort | Quicksort |
|---|---|---|
| Best case | $O(n \log n)$ | $O(n \log n)$ |
| Average case | $O(n \log n)$ | $O(n \log n)$ |
| Worst case | $O(n \log n)$ | $O(n^2)$ |
| Space | $O(n)$ auxiliary | $O(\log n)$ auxiliary (call stack) |
| Stable? | Yes | No |
| In-place? | No | Yes |
| Typical use | Guaranteed performance needed, external sorts, linked lists, stability required | Fastest in practice on arrays, when a safe pivot strategy is used |

---

## Part 5: Optional Reading - Why Pivot Choice Is the Whole Story

Quicksort's partition *scheme* (Lomuto or Hoare) decides how the
array and pivot interact mechanically. Quicksort's *pivot-choice
strategy* decides which value becomes the pivot, and it alone
determines whether a given run hits the best case or the worst case.

- **First or last element:** trivial to implement, but any
  already-sorted or reverse-sorted input is an *adversarial* input for
  it - a completely ordinary shape for real-world, mostly-maintained
  data (like CampusNav's directory, re-sorted after one new room).
- **Random:** pick a uniformly random index as pivot (typically by
  swapping it into the last position first, then running Lomuto as
  normal). No input can be fixed in advance to trigger the worst case,
  because the pivot itself is unpredictable. Expected $O(n \log n)$.
- **Median-of-three:** pivot = the median of `A[low]`, `A[mid]`, and
  `A[high]`. Cheap to compute (2-3 comparisons) and empirically avoids
  most bad splits real data produces, though a determined adversary
  who knows the exact strategy can still construct a bad input for it.

**Why this matters for Assignment 2.** Task 3 asks you to time your
Lomuto-partition quicksort on an *already-sorted* array of size 5,000
with a fixed last-element pivot, specifically to reproduce this
$O(n^2)$ collapse yourself, empirically - not just read about it.

**Where this course is headed:**

| Weeks | What gets formalized |
|---|---|
| 5 | Basic $O(n^2)$ sorts, correctness by loop invariant |
| 6 | Merge sort and quicksort, $O(n \log n)$ on average - the recurrence $T(n) = 2T(n/2) + O(n)$ previewed in Week 4 (this week) |
| 7 | Binary search, now that the directory is actually sorted |
| 9 | Divide-and-conquer as a general design paradigm, with a full Master Theorem proof |

---

## Part 6: Practice Problems (with answers)

Try each problem yourself before checking the answer.

**1.** Trace `MERGE` by hand on `L = [3, 6, 7]` and `R = [2, 4, 8]`.
Write the final merged array and the number of comparisons used.

> **Answer:** Compare 3 vs 2 &rarr; take 2. Compare 3 vs 4 &rarr; take
> 3. Compare 6 vs 4 &rarr; take 4. Compare 6 vs 8 &rarr; take 6.
> Compare 7 vs 8 &rarr; take 7. Only 8 remains &rarr; take 8. Final:
> `[2, 3, 4, 6, 7, 8]`, using 6 comparisons for 6 elements.

**2.** Trace Lomuto partition on `A = [5, 9, 2, 7, 3]` (pivot = last
element, `3`). Report the final array and the returned index.

> **Answer:** pivot = 3, i = 0. j=1: 5&le;3? No. j=2: 9&le;3? No.
> j=3: 2&le;3? Yes &rarr; i=1, swap A[1],A[3] &rarr; `[2,9,5,7,3]`.
> j=4: 7&le;3? No. Final swap: A[i+1]=A[2] with A[5] &rarr;
> `[2,3,5,7,9]`. Returned index: 2. (Coincidentally the fully sorted
> array here, since only one element was $\le$ the pivot.)

**3.** Explain, in your own words, why merge sort's recurrence
$T(n) = 2T(n/2) + O(n)$ resolving to $O(n \log n)$ means doubling $n$
roughly *doubles* the total work - not squares it, the way an
$O(n^2)$ algorithm would.

> **Answer:** $O(n \log n)$ grows almost, but not quite, linearly:
> doubling $n$ doubles the $n$ factor and only adds 1 to the $\log n$
> factor (since $\log_2(2n) = \log_2 n + 1$). An $O(n^2)$ algorithm's
> cost would instead multiply by 4 when $n$ doubles. The gap between
> "roughly doubles" and "quadruples" is exactly the gap this week
> closes.

**4.** Given the already-sorted array `[10, 20, 30, 40, 50]` and
Lomuto partition with a last-element pivot, how many levels deep does
the recursion go, and roughly how many total comparisons does the
whole sort make?

> **Answer:** The recursion goes **5 levels deep** (one element peels
> off the end each time: sizes 5, 4, 3, 2, 1), because every partition
> puts the pivot (always the current maximum) at the very end with
> nothing to its right. Total comparisons: $4 + 3 + 2 + 1 = 10$, which
> matches $\frac{n(n-1)}{2}$ for $n=5$ - the same $O(n^2)$ shape as
> Week 5's basic sorts.

**5.** CampusNav's engineering team is considering sorting a directory
file too large to fit in memory at once (an *external sort*, merging
sorted chunks read from disk). Would you recommend merge sort or
quicksort for this, and why?

> **Answer:** Merge sort. Its `MERGE` step only ever needs to look at
> the *next* unread element of each of the two sorted chunks - it
> never needs random access back into a chunk, so chunks can be
> streamed from disk with modest memory. Quicksort's partition step
> needs to compare and swap elements across the whole current
> subarray, which does not translate cleanly to sequential disk access
> the same way.

**6.** True or false: choosing a median-of-three pivot makes
quicksort's $O(n^2)$ worst case *impossible*, not just unlikely.

> **Answer:** False. Median-of-three makes the worst case require a
> much more deliberately constructed input than "already sorted," and
> makes it far less likely on ordinary or even adversarial-looking
> real data - but a sufficiently determined adversary who knows the
> exact strategy can still construct an input that defeats it. Only
> the *randomized* pivot strategy removes any input an adversary can
> fix in advance, and even then the bound is on the *expected* time,
> not a hard worst-case guarantee.
