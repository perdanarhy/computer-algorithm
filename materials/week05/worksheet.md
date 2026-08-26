# Week 5 Worksheet - Basic Sorting

Computer Algorithms (506994-002). Work with your neighbor (pair work).
Write your names here:

Name 1: _______________________  Name 2: _______________________

---

## Worksheet Part A (~15 minutes)

**A1. Full trace - insertion sort.** Trace `INSERTION-SORT` by hand,
pass by pass, on the array below. For each pass, write the `key`
being inserted and the full array **after** that pass.

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

Starting array: **6, 3, 8, 1, 5, 2**

| Pass (i) | key | Array after this pass |
|---|---|---|
| Start | - | 6, 3, 8, 1, 5, 2 |
| 1 | _____ | _______________________ |
| 2 | _____ | _______________________ |
| 3 | _____ | _______________________ |
| 4 | _____ | _______________________ |
| 5 | _____ | _______________________ |

**A2. Count the work.** How many times did the inner `while` loop
shift an element during pass 3? During pass 4? Which pass shifted the
most, and why does that make sense given how out-of-place that pass's
key started?

Pass 3 shifts: _______   Pass 4 shifts: _______

_____________________________________________________________

**A3. Best case, by hand.** Suppose the array had instead started
**already sorted**: `1, 2, 3, 5, 6, 8`. Without fully tracing it,
state how many times the inner `while` loop's condition would be
checked-and-fail (not shift) across the *entire* sort, and why that
makes insertion sort's best case $O(n)$ instead of $O(n^2)$.

_____________________________________________________________
_____________________________________________________________

---

## Worksheet Part B (~15 minutes) - Stability with Duplicate Keys

Below, subscript letters (`5a`, `5b`, ...) are **labels only** - they
mark which original element is which. The number is the actual sort
key.

Starting array: **5a, 5b, 5c, 1d, 5e**

**B1. Run naive selection sort by hand**, one pass at a time (find the
minimum of the unsorted remainder, swap it to the front). Write the
full array after each pass, keeping the letters attached to their
numbers.

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

| Pass | Array after this pass |
|---|---|
| Start | 5a, 5b, 5c, 1d, 5e |
| 1 | _______________________ |
| 2 | _______________________ |
| 3 | _______________________ |
| 4 | _______________________ |

In the **original** array, what order were `5a`, `5b`, `5c`, `5e` in
(left to right)? _______________________

In your **final sorted** array above, what order are they in now?
_______________________

Is the relative order the same? _______  If not, which single pass
caused the change, and what specifically happened during it?

_____________________________________________________________

**B2. Run insertion sort by hand** on the **same starting array**
(`5a, 5b, 5c, 1d, 5e`), and write the final sorted array.

Final array: _______________________

Is the relative order of `5a`, `5b`, `5c`, `5e` preserved this time?
_______  Point to the exact line in `INSERTION-SORT`'s pseudocode
(A1's code block) that guarantees this - what comparison, specifically,
stops the `while` loop from ever shifting one equal-key element past
another?

_____________________________________________________________
_____________________________________________________________

**B3. Connect it back.** CampusNav wants its directory sorted by
floor, and within each floor, alphabetically by building name. If the
alphabetical sort runs first and the floor sort runs second, which
property must the *floor* sort have for the alphabetical order to
survive within each floor? Name it, and say which of today's three
sorts you'd pick for that second pass.

_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Instructor Answer Key - do not hand out this section -->
<!-- ============================================================ -->

## Instructor Answer Key - do not hand out this section

### Part A

- **A1.**

  | Pass (i) | key | Array after this pass |
  |---|---|---|
  | 1 | 3 | 3, 6, 8, 1, 5, 2 |
  | 2 | 8 | 3, 6, 8, 1, 5, 2 (no shift - 8 already in place) |
  | 3 | 1 | 1, 3, 6, 8, 5, 2 |
  | 4 | 5 | 1, 3, 5, 6, 8, 2 |
  | 5 | 2 | 1, 2, 3, 5, 6, 8 |

- **A2.** Pass 3 (key = 1) shifts **3** times (past 8, 6, 3 - the
  entire sorted prefix so far). Pass 4 (key = 5) shifts **2** times
  (past 8, 6, stopping at 3). Pass 3 shifts the most because `1` is
  the smallest remaining value and must travel all the way to the
  front, past every element currently in the sorted prefix.
- **A3.** Zero shifts, but the `while` condition is still checked once
  per pass (and immediately fails) - so it's checked $n - 1$ times
  total across the whole sort, each check doing $O(1)$ work. No
  element ever needs to move, because each new key is already $\ge$
  everything before it. That's exactly $O(n)$ total work, not
  $O(n^2)$ - the best case only happens because the array started
  nearly (here, fully) sorted.

### Part B

- **B1.**

  | Pass | Array after this pass |
  |---|---|
  | 1 | 1d, 5b, 5c, 5a, 5e |
  | 2 | 1d, 5b, 5c, 5a, 5e (min of remainder is 5b, already in place) |
  | 3 | 1d, 5b, 5c, 5a, 5e (min of remainder is 5c, already in place) |
  | 4 | 1d, 5b, 5c, 5a, 5e (min of remainder is 5a, already in place) |

  Original order of the 5's: **a, b, c, e**. Final order: **b, c, a,
  e**. **Not the same** - `5a` moved from first to third among the
  5's. The change happens entirely in **pass 1**: the minimum of the
  whole array is `1d` at index 3; swapping index 0 (`5a`) with index 3
  (`1d`) yanks `5a` out of the front and drops it in the middle of the
  other equal-key elements, breaking its original relative position.
  Every pass after that is a "self-swap" (the minimum of the remainder
  is already at the front) and changes nothing further.
- **B2.** Final array: **1d, 5a, 5b, 5c, 5e**. Relative order of
  `5a, 5b, 5c, 5e` is **preserved** - still a, b, c, e, exactly as in
  the original. The guarantee comes from the `while` loop's condition,
  `A[j] > key` - it is a **strict** greater-than. When `key` is equal
  to an element already in the sorted prefix, the condition is false,
  the loop stops immediately, and `key` is placed *after* that equal
  element rather than shifting past it. This is why insertion sort
  never lets one equal-key element jump another.
- **B3.** The floor sort (the second pass) must be **stable**. Any of
  bubble sort or insertion sort works (both stable); naive selection
  sort must not be used for the second pass, since it can scramble the
  alphabetical order already established within a floor, exactly as
  demonstrated in B1.
