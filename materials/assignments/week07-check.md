# Week 7 Check - Searching

Computer Algorithms (506994-002). Released Week 7. **Due before Week 8's
class begins** (submit via the course Learning Management System, LMS).
Individual work. A short, teacher-graded check on this week's linear
search, binary search, and correctness-proof content only.

## Tasks

**1. Hand traces (30 pts).** Trace `BINARY-SEARCH` on the sorted array
`[3, 8, 15, 22, 34, 41, 50, 67]` twice: once searching for `41` (present),
once searching for `45` (absent). Show `lo`, `hi`, `mid`, and the
comparison at every round, in the lecture's format.

**2. Loop invariant (20 pts).** State binary search's loop invariant
from memory. Then explain, in 2-3 sentences, why the invariant still
gives a correct answer when `A` has exactly one element - identify
which of the three proof parts (initialization, maintenance,
termination) does the actual work in that case.

**3. Off-by-one bug hunt (30 pts).** A classmate's implementation sets
`lo = mid` (instead of `lo = mid + 1`) on the "target is greater"
branch. Construct the smallest `(lo, hi)` state you can that triggers
an infinite loop under this bug, trace it to show the loop never
progresses, and state the one-line fix.

**4. The sortedness precondition (20 pts).** Give a concrete array of
at least 5 elements that is **not** sorted, and a target that *is*
present in it, such that a correctly-implemented `BINARY-SEARCH`
returns `NOT-FOUND`. Then explain, referencing the maintenance proof
specifically, why this is a correctness bug and not merely a slowdown.

## Submission format

One PDF or Markdown file containing all four parts, clearly labeled.
Traces may be handwritten-then-scanned, as long as they're legible.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All traces, proofs, and constructed examples are correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Trace precision** | Every round's lo/hi/mid/comparison shown exactly | Minor omission or off-by-one | Traces present but a round is wrong | No real trace attempted |
| **Rigor of the constructed examples** | The infinite-loop and unsorted-array examples genuinely trigger the claimed failure | Example mostly works, minor gap | Example partially relevant | No real attempt |
| **Clarity of explanation** | Every justification is clear and complete | Mostly clear, one weak spot | Justifications thin or hard to follow | Little to no explanation |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review is
available on request.
