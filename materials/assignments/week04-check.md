# Week 4 Check - Recursion & Recurrence

Computer Algorithms (506994-002). Released Week 4. **Due before Week
5's class begins** (submit via the course Learning Management System,
LMS). Individual work. A short, teacher-graded check on this week's
call-stack tracing, recurrence relations, and the substitution and
recursion-tree methods only - no other assignment overlaps this week.

## Tasks

**1. Call-stack trace (25 pts).** Trace the call stack for `SUM(5)`
(the recursive version from lecture: `SUM(n) = n + SUM(n-1)`,
`SUM(0) = 0`), frame by frame, going down to the base case and back
up. State the final answer and how many frames were "waiting" at the
moment the base case returned.

**2. Write the recurrence (20 pts).** A recursive algorithm does
$O(1)$ work of its own and calls itself twice, each time on an input
half the size. Write its recurrence relation, in the same form as the
lecture's `T(n) = 2T(n/2) + O(n)` example.

**3. Substitution method (25 pts).** For $T(n) = T(n-1) + 5$,
$T(0) = 2$, guess $T(n) = O(n)$ (i.e. $T(n) \le cn$ for $n \ge n_0$).
Find a constant $c$ that makes the inductive step hold, and verify the
base case.

**4. Recursion tree (15 pts).** Draw (or describe, level by level) the
recursion tree for $T(n) = 4T(n/2) + n$, and state the cost at each of
the first three levels (level 0, level 1, level 2).

**5. Master Theorem classification (15 pts).** For the recurrence in
Task 4, compare $f(n) = n$ against $n^{\log_2 4}$, state which of the
three Master Theorem cases applies, and give the resulting closed-form
bound.

## Submission format

One PDF or Markdown file containing all five parts, clearly labeled.
Traces and trees may be handwritten-then-scanned, as long as they're
legible.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All traces, recurrences, and classifications are correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Trace precision** | Call-stack trace shown exactly, frame count correct | Minor omission or off-by-one | Trace present but a step is wrong | No real trace attempted |
| **Rigor of proof** | Substitution step shows a valid $c$ with full algebra | Constant found, algebra thin | Guess stated but proof incomplete | No attempt |
| **Clarity of explanation** | Every justification is clear and complete | Mostly clear, one weak spot | Justifications thin or hard to follow | Little to no explanation |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review is
available on request.
