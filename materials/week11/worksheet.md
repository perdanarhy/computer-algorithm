# Week 11 Worksheet - Dynamic Programming I

Computer Algorithms (506994-002). Work with your neighbor (pair work).
Write your names here:

Name 1: _______________________  Name 2: _______________________

---

## Worksheet Part A (~15 minutes)

CampusNav is testing a **"study break" planner**: a 50-minute free
block, and four nearby options, each usable at most once:

| Activity | Duration (min) | Enjoyment |
|---|---|---|
| Nap | 20 | 18 |
| Snack | 10 | 9 |
| Trivia game | 30 | 28 |
| Chat with a friend | 10 | 7 |

**A1. Build the table.** Using the same recurrence from class -
`best(i, t) = max( best(i-1, t), value_i + best(i-1, t - duration_i) )`
(second term only when `duration_i <= t`) - fill in every blank cell
below by hand, one row at a time, in the order the activities are
listed above.

| | 0 | 10 | 20 | 30 | 40 | 50 |
|---|---|---|---|---|---|---|
| 0 items | 0 | 0 | 0 | 0 | 0 | 0 |
| +Nap | 0 | ___ | ___ | ___ | ___ | ___ |
| +Snack | 0 | ___ | ___ | ___ | ___ | ___ |
| +Trivia game | 0 | ___ | ___ | ___ | ___ | ___ |
| +Chat | 0 | ___ | ___ | ___ | ___ | ___ |

**A2. Read off the answer.** What is the maximum total enjoyment
achievable within 50 minutes? Which activities achieve it?

Max enjoyment: _______   Activities used: _______________________

**A3. Unused options.** At least one activity from the list is *not*
part of the best plan. Which one(s), and why didn't a "cheap, decent
value" option make it in anyway?

_____________________________________________________________
_____________________________________________________________

**A4. Compare to greedy.** If you instead always picked whichever
remaining activity had the best enjoyment-per-minute, would you land
on the same plan as A2? Trace it and check.

_____________________________________________________________
_____________________________________________________________

---

## Worksheet Part B - Does This Need DP? (~15 minutes, pairs)

For each mini-problem below, decide **(a)** does it have optimal
substructure, **(b)** does it have overlapping subproblems, and
**(c)** write its recurrence (or explain why a clean one doesn't
apply). One of these three does **not** actually need dynamic
programming - figure out which, and why.

**B1. Tiling a hallway.** A $2 \times n$ hallway must be fully covered
with $1 \times 2$ tiles (each tile placed either lying flat across two
columns, or standing upright in one column). How many distinct ways
are there to tile it?

(a) Optimal substructure? _______   (b) Overlapping subproblems? _______

(c) Recurrence: _____________________________________________________

**B2. Merge sort's divide step.** Sorting an array of size $n$ by
splitting it into two halves, recursively sorting each half, then
merging the two sorted halves.

(a) Optimal substructure? _______   (b) Overlapping subproblems? _______

(c) Recurrence (or explain why none is needed here): _______________
_____________________________________________________________

**B3. No-two-consecutive-1s counter.** How many binary strings of
length $n$ contain no two consecutive `1`s (e.g. for $n=3$: `000,
001, 010, 100, 101` - five valid strings)?

(a) Optimal substructure? _______   (b) Overlapping subproblems? _______

(c) Recurrence: _____________________________________________________

**B4. The odd one out.** Which of B1-B3 does *not* need dynamic
programming, and what should be used instead?

_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Instructor Answer Key - do not hand out this section -->
<!-- ============================================================ -->

## Instructor Answer Key - do not hand out this section

### Part A

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

### Part B

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
