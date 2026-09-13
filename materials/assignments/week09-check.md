# Week 9 Check - Divide and Conquer

Computer Algorithms (506994-002). Released Week 9. **Due before Week 10's
class begins** (submit via the course Learning Management System, LMS).
Individual work. A short, teacher-graded check on this week's
divide-and-conquer paradigm, Master theorem, maximum-subarray algorithm,
and fast exponentiation.

## Tasks

**1. Master theorem (30 pts).** Classify each recurrence below: state
$a$, $b$, $f(n)$, the watershed function $n^{\log_b a}$, which of the
three cases applies, and the resulting $T(n)$.

- (a) $T(n) = 8T(n/2) + n^2$
- (b) $T(n) = 3T(n/3) + n$

**2. Maximum subarray (25 pts).** Trace the divide-and-conquer
maximum-subarray algorithm on `[3, -2, -1, 4, -3, 5, -2, 2]`. Show the
split, the recursive best of each half, the crossing-step scan in both
directions, and the final winning range and sum.

**3. Fast exponentiation (25 pts).** Compute $a^{25}$ by repeated
squaring: write out the halving sequence of exponents, count the real
squarings and extra multiplies, and compare the total to the naive
$n-1$-multiplication approach.

**4. Divide-and-conquer or not? (20 pts).** A recursive procedure
computes the number of ways to tile a $2 \times n$ board with $1
\times 2$ dominoes: `tile(n) = tile(n-1) + tile(n-2)`. Using the two
requirements in this week's definition (independent subproblems, an
explicit combine step), determine whether this is divide-and-conquer.
Justify your answer.

## Submission format

One PDF or Markdown file containing all four parts, clearly labeled.
Traces may be handwritten-then-scanned, as long as they're legible.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All classifications, traces, and counts are correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Master theorem rigor** | a, b, f(n), and the watershed are all correctly derived, not just the final case | Case correct, derivation thin | Case stated with no derivation | No attempt |
| **Trace precision** | Every scan direction and comparison shown exactly | Minor omission or off-by-one | Trace present but a step is wrong | No real trace attempted |
| **Clarity of explanation** | The D&C justification correctly applies both requirements | Mostly clear, one weak spot | Justification thin or hard to follow | Little to no explanation |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review is
available on request.
