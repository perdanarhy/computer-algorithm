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
