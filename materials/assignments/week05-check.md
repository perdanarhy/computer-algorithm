# Week 5 Check - Basic Sorting

Computer Algorithms (506994-002). Released Week 5. **Due before Week 6's
class begins** (submit via the course Learning Management System, LMS).
Individual work. A short, teacher-graded check on this week's three
sorts only - separate from Assignment 1 (also due this week) and
Assignment 2 (released Week 6).

## Tasks

**1. Hand traces (35 pts).** Trace bubble sort (with the `swapped`
flag), selection sort, and insertion sort on `[6, 2, 5, 1, 4]`, one
pass per row, in the lecture's trace-table format. For bubble sort,
state exactly which pass triggers the early exit.

**2. Stability (25 pts).** Tag the array `[5a, 3b, 5c, 1d]` and run
naive selection sort on it by hand. Report whether `5a` and `5c` keep
their original relative order. Then, in 2-3 sentences, explain what
goes wrong for CampusNav if a directory that's already sorted
alphabetically is re-sorted by floor using an unstable sort.

**3. Counting (25 pts).** State the exact total number of comparisons
selection sort makes on an array of size $n$, with a one-line
derivation from the sum, and evaluate it at $n = 6$. Then explain why
insertion sort on an already-sorted array of size 6 makes only 5
comparisons total.

**4. Loop invariant (15 pts).** State insertion sort's loop invariant
from memory. Then say which of the three proof parts (initialization,
maintenance, termination) would break - and why - if the `while`
condition used `A[j] >= key` instead of `A[j] > key`.

## Submission format

One PDF or Markdown file containing all four parts, clearly labeled.
Traces may be handwritten-then-scanned, as long as they're legible.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All traces, counts, and explanations are correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Trace precision** | Every pass shown exactly, early exit correctly identified | Minor omission or off-by-one | Traces present but a pass is wrong | No real trace attempted |
| **Rigor of counting** | Comparison counts derived, not just stated, and match the formula | Formula correct, derivation thin | Count stated with no derivation | No attempt |
| **Clarity of explanation** | Every justification is clear and complete | Mostly clear, one weak spot | Justifications thin or hard to follow | Little to no explanation |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review is
available on request.
