# Week 6 Worksheet - Answer Key (Instructor Only)

Computer Algorithms (506994-002). Do not hand out this page - it is
never built into the deployed course site.

## Part A

- **A1.**

  | Step (k) | L[i] | R[j] | Comparison result | Placed into A[k] |
  |---|---|---|---|---|
  | 1 | 4 | 1 | $4 \le 1$? No | 1 |
  | 2 | 4 | 5 | $4 \le 5$? Yes | 4 |
  | 3 | 6 | 5 | $6 \le 5$? No | 5 |
  | 4 | 6 | 8 | $6 \le 8$? Yes | 6 |
  | 5 | 9 | 8 | $9 \le 8$? No | 8 |
  | 6 | 9 | $\infty$ | $9 \le \infty$? Yes | 9 |

  Final merged array: `[1, 4, 5, 6, 8, 9]`.

- **A2.** 6 comparisons in this trace. Maximum possible in general:
  $n_1 + n_2 - 1$ (every element compared except the very last one
  placed, which wins "by default" once the other side is exhausted).
  Minimum possible: $\min(n_1, n_2)$ - happens when one entire array's
  elements are all smaller (or all larger) than every element of the
  other, so one side empties out with the fewest possible comparisons
  before the rest of the larger side just gets copied over.
- **A3.** `5a` (from `L`) is placed first, because the rule is
  `L[i] <= R[j]` - a non-strict comparison that favors the left side
  on a tie. With strict `<` instead, the condition `5 < 5` would be
  false, so `5b` (from `R`) would be placed first instead - flipping
  the two equal-key elements' relative order. This is precisely why
  the non-strict `<=` is what makes merge sort stable.

## Part B

- **B1.** All 5 elements before the pivot (`1,2,3,4,5`) are $\le 6$,
  so `i` ends at 5 and the final swap is `A[6]` with itself. Pivot's
  final index: **6**. Left subarray size: **5** (`1,2,3,4,5`). Right
  subarray size: **0**.
- **B2.**

  | Call # | Subarray size | Comparisons made this call | Next subarray size |
  |---|---|---|---|
  | 1 | 6 | 5 | 5 |
  | 2 | 5 | 4 | 4 |
  | 3 | 4 | 3 | 3 |
  | 4 | 3 | 2 | 2 |
  | 5 | 2 | 1 | 1 |
  | 6 | 1 | 0 (base case, stop) | - |

  Each call on a sorted subarray of size $s$ makes exactly $s-1$
  comparisons (every element before the pivot gets compared, and all
  of them are $\le$ pivot), then recurses on a subarray of size $s-1$
  with nothing peeled off the front.
- **B3.** Total: $5+4+3+2+1+0 = 15$. This matches
  $\frac{n(n-1)}{2}$ for $n=6$ (here $\frac{6 \times 5}{2}=15$) - the
  same triangular-number shape behind $O(n^2)$ that Week 5's basic
  sorts hit in their worst case. Quicksort, with this pivot choice, on
  this input, is exactly as slow as the sorts this week set out to
  replace.
- **B4.** No. A random pivot means the split point on this array
  would typically land somewhere in the middle instead of always at
  the end - no single fixed input can be *guaranteed* to trigger the
  worst case against a random strategy, because the adversary doesn't
  know which element will be picked. (The worst case is still
  *possible* with random pivots, just not reliably triggered by any
  one fixed input.)
- **B5.** Expected answer: it would visibly hang - an already-sorted
  array of size 5,000 with a fixed last-element pivot is exactly the
  adversarial case from B1-B3, scaled up, and Lomuto quicksort would
  take roughly $\frac{5000 \times 4999}{2} \approx 12.5$ million
  comparisons instead of the ~5,000 $\times \log_2 5000 \approx
  61{,}000$ comparisons a balanced run would take.
