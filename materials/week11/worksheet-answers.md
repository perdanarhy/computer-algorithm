# Week 11 Worksheet - Answer Key (Instructor Only)

Computer Algorithms (506994-002). Do not hand out this page - it is
never built into the deployed course site.

## Part A

- **A1.** Full table:

  | | 0 | 10 | 20 | 30 | 40 | 50 |
  |---|---|---|---|---|---|---|
  | 0 items | 0 | 0 | 0 | 0 | 0 | 0 |
  | +Nap | 0 | 0 | 18 | 18 | 18 | 18 |
  | +Snack | 0 | 9 | 18 | 27 | 27 | 27 |
  | +Trivia game | 0 | 9 | 18 | 28 | 37 | 46 |
  | +Chat | 0 | 9 | 18 | 28 | 37 | 46 |

- **A2.** Max enjoyment = **46**. Achieved by **Nap (20 min, 18) +
  Trivia game (30 min, 28)** = exactly 50 minutes, 46 enjoyment.
- **A3.** Both **Snack** and **Chat** are unused. Each is individually
  cheap and decent-value, but neither leaves enough remaining budget
  to fit Trivia game (the highest single-item value) alongside it as
  well as Nap does - accept any answer that correctly notes "cheap"
  isn't the same as "helps the best combination."
- **A4.** Enjoyment-per-minute: Trivia game 0.93, Nap 0.9, Snack 0.9,
  Chat 0.7. Greedy picks Trivia game first (30 min, remaining 20),
  then the best remaining option that still fits is Nap (exactly 20
  min) - landing on **Trivia game + Nap = 46**, the *same* plan and
  value as A2. Use this to make the point explicit: greedy isn't
  *always* wrong (this instance happens to match), which is exactly
  why you can't trust it without a proof - you only find out it fails
  on instances like the in-class Tour Planner example, not
  by testing one case that happens to work.

## Part B

- **B1.** (a) Yes - a valid tiling of $n$ columns is built from a
  valid tiling of $n-1$ columns (add one vertical tile) or $n-2$
  columns (add two horizontal tiles). (b) Yes - tiling-count for
  $n-2$ is needed by both the $n-1$ and $n$ calculations. (c)
  `T(n) = T(n-1) + T(n-2)`, `T(0) = 1`, `T(1) = 1`.
- **B2.** (a) Yes - the best-sorted array is built from the two
  best-sorted halves. (b) **No** - the two halves are disjoint
  portions of the array and never recur as the same subproblem
  elsewhere in the recursion. (c) No caching recurrence applies; the
  cost recurrence is `T(n) = 2T(n/2) + O(n)` (Week 9's Master theorem
  shape), which is about runtime, not about reusing a repeated
  answer.
- **B3.** (a) Yes - a valid string of length $n$ either ends in `0`
  (preceded by any valid string of length $n-1$) or ends in `1`
  (which forces the previous character to `0`, preceded by any valid
  string of length $n-2$). (b) Yes - the length-$(n-2)$ count is
  needed by both the $n-1$ and $n$ calculations. (c)
  `a(n) = a(n-1) + a(n-2)`, `a(0) = 1`, `a(1) = 2`.
- **B4.** **B2 (merge sort)** is the odd one out - it has optimal
  substructure but no overlapping subproblems, so plain recursion
  (divide-and-conquer, already covered Week 9) is correct and
  sufficient; adding a DP table would only add bookkeeping overhead
  for zero benefit.
