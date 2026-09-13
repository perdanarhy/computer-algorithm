# Week 11 Check - Dynamic Programming I

Computer Algorithms (506994-002). Released Week 11. **Due before
Week 12's class begins** (submit via the course Learning Management
System, LMS). Individual work. A short, teacher-graded check on this
week's two dynamic-programming techniques (1-D counting recurrences,
0/1 knapsack) only.

## Tasks

**1. Tabulate by hand (25 pts).** Using `ways(n) = ways(n-1) +
ways(n-2)`, `ways(0) = 1`, `ways(1) = 1`, fill `ways(2)` through
`ways(10)` one cell at a time, showing each addition. Report
`ways(10)`.

**2. Memoization vs. tabulation (20 pts).** In your own words (3-5
sentences), explain why memoization and tabulation always compute the
same value for a given recurrence, but can differ in the *order* they
compute it in.

**3. A new knapsack table (35 pts).** CampusNav offers a 14-minute
break with three options: Read (10 min, value 12), Walk (4 min, value
5), Call (6 min, value 8). Using `best(i,t) = max(best(i-1,t), value_i
+ best(i-1, t - duration_i))`, fill the DP table for budgets $t =$ 0,
2, 4, 6, 8, 10, 12, 14 (one row per option, in the order given). Report
`best(3,14)` and which option(s) achieve it.

**4. DP or not? (20 pts).** For each of the following, state whether
it has optimal substructure, overlapping subproblems, both, or
neither, and whether dynamic programming is worth using:

- (a) Merge sort's recursive split into left half and right half.
- (b) Counting the number of ways to make change for a target amount
  $T$ from an unlimited supply of given coin denominations.

## Submission format

One PDF or Markdown file containing all four parts, clearly labeled.
Traces may be handwritten-then-scanned, as long as they're legible.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All table fills and counts are correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Trace precision** | Every cell shown with its dependency | Minor omission | Table present but a cell is wrong | No real trace attempted |
| **Conceptual reasoning** | Memo/tabulation and DP-or-not answers are precise and correctly justified | Mostly correct, one gap | Attempted but thin or partly wrong | No real attempt |
| **Clarity of explanation** | Every justification is clear and complete | Mostly clear, one weak spot | Justifications thin or hard to follow | Little to no explanation |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review is
available on request.
