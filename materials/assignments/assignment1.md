# Assignment 1 - Complexity & Pseudocode

Computer Algorithms (506994-002). Released Week 3. **Due Week 5,
23:59** (submit via the course LMS). Individual work.

## Tasks

**1. Pseudocode (30 pts).** Write pseudocode, following the course's
pseudocode conventions (Week 2 house rules), for each of
the following. Each must satisfy all five algorithm properties
(finiteness, definiteness, input, output, effectiveness):

- (a) Given CampusNav's unsorted 1,200-entry room directory (an array
  of `(building, room, floor)` records), find every room on a given
  floor of a given building.
- (b) Given an array of integers, return the second-largest distinct
  value, or report that fewer than two distinct values exist.
- (c) Given two sorted arrays of equal length, merge them into one
  sorted array (this is the merge step you'll meet formally in Week 6
  - write it now from first principles). *Hint: think of two fingers,
  one pointing into each sorted pile, always taking the smaller of
  the two you're currently pointing at.* Partial credit is available
  for a correct idea even if your pseudocode syntax isn't perfect.

**2. Big-O proofs (40 pts).** For each function below, state its
tightest O-bound and prove it directly from the formal definition
(exhibit constants $c$ and $n_0$):

- (a) $f(n) = 7n^2 + 3n + 40$
- (b) $f(n) = 5n\log n + 2n$
- (c) $f(n) = n^3 + 2^n$ (tightest bound only needs the dominant term - justify why the other term is absorbed)

**3. Growth-rate ordering (30 pts).** Order the following 10 functions
from slowest- to fastest-growing, and justify any two adjacent pairs
in your ordering with one sentence each (why is the one you placed
second definitely bigger for large $n$?):

$$
\log n,\ n,\ n^2,\ 1,\ n\log n,\ 2^n,\ n^3,\ \sqrt{n},\ n!,\ n^{1.5}
$$

## Submission format

One PDF or Markdown file containing all three parts, clearly labeled.
Pseudocode may be typed or handwritten-then-scanned, as long as it's
legible. Show your work for the Big-O proofs - a bare answer with no
justification earns partial credit at most.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All pseudocode/proofs/orderings are correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Rigor of analysis** | Every Big-O proof exhibits valid $(c, n_0)$ and full justification | Proof structure present, one gap | Bound stated but proof incomplete | No proof attempted |
| **Pseudocode quality** | Precise, unambiguous, satisfies all 5 properties, correct indices | Minor ambiguity or off-by-one, otherwise sound | Missing a property or has a real bug | Not real pseudocode (prose only) |
| **Clarity of explanation** | Every justification is clear and complete | Mostly clear, one weak spot | Justifications thin or hard to follow | Little to no explanation |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review
is available on request.
