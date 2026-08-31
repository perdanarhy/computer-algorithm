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
