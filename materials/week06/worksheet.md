# Week 6 Worksheet - Advanced Sorting

Computer Algorithms (506994-002). Work with your neighbor (pair work).
Write your names here:

Name 1: _______________________  Name 2: _______________________

---

## Worksheet Part A (~15 minutes) - Tracing MERGE

**A1. Full trace - MERGE.** Trace `MERGE` by hand on two already-sorted
lists, `L = [4, 6, 9]` and `R = [1, 5, 8]`. For each step, write which
value gets placed next into the merged array.

```text
MERGE(A, p, q, r):
    ...
    i = 1
    j = 1
    for k = p to r:
        if L[i] <= R[j]:
            A[k] = L[i];  i = i + 1
        else:
            A[k] = R[j];  j = j + 1
```

| Step (k) | L[i] | R[j] | Comparison result | Placed into A[k] |
|---|---|---|---|---|
| 1 | 4 | 1 | _____________ | _____ |
| 2 | _____ | _____ | _____________ | _____ |
| 3 | _____ | _____ | _____________ | _____ |
| 4 | _____ | _____ | _____________ | _____ |
| 5 | _____ | _____ | _____________ | _____ |
| 6 | _____ | _____ | _____________ | _____ |

Final merged array: _______________________________

**A2. Count the work.** How many total comparisons did your trace use?
In general, if `L` has $n_1$ elements and `R` has $n_2$ elements, what
is the *maximum* possible number of comparisons `MERGE` could make?
What is the *minimum* (hint: what has to be true about one array for
this to happen)?

Maximum: _______   Minimum: _______

_____________________________________________________________

**A3. Stability, by hand.** Suppose `L = [5]` and `R = [5]` (tag them
`5a` and `5b` - labels only, both keys are `5`). Using the rule
`L[i] <= R[j]` exactly as written above, which `5` gets placed first
into the merged array? What would change if the rule were the strict
`L[i] < R[j]` instead?

_____________________________________________________________
_____________________________________________________________

---

## Worksheet Part B (~15 minutes) - Breaking Quicksort on Purpose

Below, you'll trace Lomuto partition on an **already-sorted** array,
using a fixed **last-element pivot** - the exact adversarial scenario
from the slides - across the *entire* recursion, not just one call.

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

Starting array: **1, 2, 3, 4, 5, 6**

**B1. Trace the first call.** `LOMUTO-PARTITION` on the full array
(`low=1, high=6`, pivot `= A[6] = 6`). How many elements are $\le 6$?
Where does the pivot end up, and what are the two resulting subarray
sizes?

Pivot's final index: _______   Left subarray size: _______   Right
subarray size: _______

**B2. Trace the whole recursion.** Fill in one row per recursive call.
Each call partitions a sorted subarray of decreasing size, and the
pivot (always the *last* element of the current subarray) is always
already the largest value in it.

| Call # | Subarray size | Comparisons made this call | Next subarray size |
|---|---|---|---|
| 1 | 6 | _____ | _____ |
| 2 | 5 | _____ | _____ |
| 3 | 4 | _____ | _____ |
| 4 | 3 | _____ | _____ |
| 5 | 2 | _____ | _____ |
| 6 | 1 | _____ (base case, stop) | - |

**B3. Total it up.** Sum the "Comparisons made this call" column.
What is the total? Which formula from Week 5 (or high school algebra)
does this total match - and what does that tell you about this
run's overall growth rate?

Total comparisons: _______

_____________________________________________________________

**B4. Change one thing.** If pivot choice were **random** instead of
always the last element, would this exact array (`1,2,3,4,5,6`) still
be guaranteed to trigger the worst case on every run? Why or why not?

_____________________________________________________________
_____________________________________________________________

**B5. Connect it to Assignment 2.** Assignment 2 asks you to time your
own Lomuto-partition quicksort on an already-sorted array of size
5,000. Based on B1-B3, would you expect that run to *finish quickly*
or *visibly hang* compared to a random array of the same size? Explain
in one sentence using the word "adversarial."

_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Instructor Answer Key - do not hand out this section -->
<!-- ============================================================ -->

## Instructor Answer Key - do not hand out this section

### Part A

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

### Part B

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
