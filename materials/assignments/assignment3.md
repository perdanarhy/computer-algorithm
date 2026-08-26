# Assignment 3 - Greedy & Divide-and-Conquer

Computer Algorithms (506994-002). Released Week 10. **Due Week 12,
23:59** (submit via the course LMS). Individual work.

## Tasks

**1. Greedy scheduling with proof sketch (40 pts).** CampusNav's
room-booking assistant receives $n$ requests for the same seminar
room, each with a start and end time. Design a greedy algorithm that
selects the maximum number of non-overlapping bookings.

- (a) State your greedy rule precisely (e.g. "always pick the request
  with the earliest finish time among those that don't conflict with
  what's already chosen").
- (b) Give pseudocode.
- (c) Prove your greedy choice is safe using an **exchange argument**:
  assume an optimal solution $O$ that differs from your greedy choice
  on the first pick, and show you can exchange $O$'s first pick for
  the greedy choice without decreasing the number of bookings.
- (d) Run your algorithm by hand on the 8-request instance provided
  in `materials/week10/worksheet.md`'s Part B, and report the
  bookings chosen.

**2. Divide-and-conquer analysis (35 pts).** Given an array
representing a student's day as +1 (free, 10-minute slot) / −1
(busy), CampusNav needs the **maximum-sum contiguous subarray**
(the best free-time block).

- (a) Give a full divide-and-conquer algorithm: divide the array in
  half, recursively solve each half, and solve the "crossing" case in
  O(n).
- (b) State and solve the recurrence for your algorithm's running
  time using the Master Theorem (state $a$, $b$, $f(n)$, and which
  case applies).
- (c) Trace your algorithm by hand on the array
  `[4, -3, 5, -2, -1, 6, -3, 4, -8, 5]` and report the maximum-sum
  subarray and its value.

**3. Short written question (25 pts).** Explain, in your own words
(4-6 sentences), why the coin-change problem with denominations
`{1, 3, 4}` and target `6` is a counterexample to "greedy always finds
the optimal solution" - give the greedy answer, the optimal answer,
and identify exactly which step in the greedy choice goes wrong.

## Submission format

One PDF or Markdown file with pseudocode, proofs, traces, and written
answers clearly labeled by task number.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | Greedy rule, D&C algorithm, and trace are all correct | One minor error | Core idea right, one real bug | Fundamentally incorrect |
| **Proof rigor** | Exchange argument and Master theorem application are both complete and valid | One has a gap | Both attempted, one is largely wrong | No real proof attempted |
| **Recurrence analysis** | Correct recurrence, correct Master theorem case, correct conclusion | Minor error in constants/case | Recurrence right, conclusion wrong | Recurrence not derived |
| **Explanation** | Counterexample explanation is precise and correctly locates the failure | Mostly correct, one vague point | Identifies failure but not precisely | Missing or incorrect |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review
is available on request.
