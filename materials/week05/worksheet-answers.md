# Week 5 Worksheet - Answer Key (Instructor Only)

Computer Algorithms (506994-002). Do not hand out this page - it is
never built into the deployed course site.

## Part A

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

## Part B

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
