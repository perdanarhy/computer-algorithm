# Week 12 Check - Dynamic Programming II

Computer Algorithms (506994-002). Released Week 12. **Due before
Week 13's class begins** (submit via the course Learning Management
System, LMS). Individual work. A short, teacher-graded check on this
week's longest common subsequence (LCS) technique only - **separate
from Assignment 3** (Greedy & Divide-and-Conquer), released Week 10
and due this same week - see `materials/assignments/assignment3.md`.

## Tasks

**1. Build the table (30 pts).** For $X = \texttt{SEAT}$ and
$Y = \texttt{EATS}$, build the full $5 \times 5$ LCS table by hand
using the lecture's recurrence, showing your work for every cell (not
just the final answer). Report $L(4,4)$.

**2. Traceback (25 pts).** Starting from the bottom-right cell of your
table, perform traceback to reconstruct the actual longest common
subsequence of SEAT and EATS. Show each step of the walk (which cell
you moved to and why), then state the final reconstructed string.

**3. Substring vs. subsequence (25 pts).** Is "ACE" a substring of
"AXCYE"? Is it a subsequence? Justify both answers precisely, and
explain in 1-2 sentences why LCS is defined in terms of one of these
two notions and not the other.

**4. Complexity (20 pts).** If $|X| = m$ and $|Y| = n$, state and
justify the time complexity of building the full LCS table. Then state
the space complexity (a) if you need the traceback (the actual
sequence), and (b) if you only need the LCS's length - and explain the
difference in one sentence.

## Submission format

One PDF or Markdown file containing all four parts, clearly labeled.
Traces may be handwritten-then-scanned, as long as they're legible.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | Table, traceback, and complexity are all correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Table precision** | Every cell shown with its recurrence case | Minor omission | Table present but a cell is wrong | No real table attempted |
| **Traceback precision** | Every step of the walk shown, correct final string | Minor omission or off-by-one | Traceback attempted but a step is wrong | No real traceback attempted |
| **Clarity of explanation** | Every justification is clear and complete | Mostly clear, one weak spot | Justifications thin or hard to follow | Little to no explanation |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review is
available on request.
