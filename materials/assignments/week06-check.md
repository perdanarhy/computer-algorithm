# Week 6 Check - Advanced Sorting

Computer Algorithms (506994-002). Released Week 6. **Due before Week 7's
class begins** (submit via the course Learning Management System, LMS).
Individual work. A short, teacher-graded check on this week's merge sort
and quicksort content only - **separate from Assignment 2** (Sorting,
also released this week, due Week 8 before the midterm exam). Assignment
2 asks you to implement and empirically measure all four sorts; this
check asks you to hand-trace and reason about two of them.

## Tasks

**1. Hand traces (30 pts).** Trace `MERGE` on `L = [2, 5, 9]` and
`R = [1, 4, 6]`, recording every comparison in the lecture's format.
Then trace merge sort's full divide-and-combine on `[4, 1, 6, 3, 5, 2]`,
showing the array's state produced by each level of merging.

**2. Partition and the adversarial case (30 pts).** Trace Lomuto
partition (last-element pivot) on `[7, 2, 9, 4, 1, 8]`. Then trace
Lomuto partition, still with a last-element pivot, on the
already-sorted array `[1, 2, 3, 4, 5, 6]`. State the recurrence this
second trace produces and the resulting Big-O, and connect it to this
week's proof of quicksort's worst case.

**3. Stability (20 pts).** Using key/original-index pairs
`[(3,a), (1,b), (3,c)]`, trace both merge sort and Lomuto-partition
quicksort (last-element pivot) by hand. State which one preserves the
original relative order of the two `3`s and which does not, and name
the specific line of pseudocode responsible in each case.

**4. Choosing a sort (20 pts).** CampusNav wants to re-sort its
directory on a real-time kiosk display that cannot tolerate an
occasional multi-second pause, and does not care about preserving
duplicate-key order. Which of today's two sorts would you recommend,
and why? Then describe one concrete change to quicksort itself (not a
switch to a different algorithm) that would make it safe to use here,
and explain exactly what it fixes.

## Submission format

One PDF or Markdown file containing all four parts, clearly labeled.
Traces may be handwritten-then-scanned, as long as they're legible.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All traces, counts, and explanations are correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Trace precision** | Every comparison/swap shown exactly, matching the lecture format | Minor omission or off-by-one | Traces present but a step is wrong | No real trace attempted |
| **Rigor of reasoning** | Recurrence and Big-O claims are derived, not just stated | Claim correct, derivation thin | Claim stated with no derivation | No attempt |
| **Clarity of explanation** | Every justification is clear and complete | Mostly clear, one weak spot | Justifications thin or hard to follow | Little to no explanation |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review is
available on request.
