# Week 3 Check - Complexity Analysis

Computer Algorithms (506994-002). Released Week 3. **Due before Week
4's class begins** (submit via the course Learning Management System,
LMS). Individual work. A short, teacher-graded check on this week's
Big-O/Big-&Omega;/Big-&Theta; proofs and growth rates only - **separate
from Assignment 1** (Complexity & Pseudocode), which also releases
this week but is due Week 5 and covers different, more extensive work.

## Tasks

**1. Big-O proof (30 pts).** Prove $f(n) = 4n^2 + 6n + 9 = O(n^2)$
directly from the formal definition: exhibit valid constants $c$ and
$n_0$, and show your work bounding each term (the same style as the
lecture's $3n^2+10n+7$ proof).

**2. Tight bound (25 pts).** Prove $\dfrac{n(n+1)}{2} = \Theta(n^2)$ by
showing both an upper bound ($O$) and a lower bound ($\Omega$), each
with its own valid $(c, n_0)$ pair.

**3. Growth-rate ordering (25 pts).** Order the following six
functions from slowest- to fastest-growing, and justify **two**
adjacent pairs in your ordering with one sentence each:

$$
n \log n,\ \sqrt{n},\ n^2,\ \log n,\ n^{1.5},\ n
$$

**4. Space complexity (20 pts).** CampusNav's new "recently viewed
rooms" feature keeps a second array, capped at a fixed 20 entries,
alongside the original 1,200-entry directory. Is this feature
in-place? State its space complexity and justify your answer in 2-3
sentences.

## Submission format

One PDF or Markdown file containing all four parts, clearly labeled.
Proofs may be handwritten-then-scanned, as long as they're legible.
Show your work - a bare answer with no justification earns partial
credit at most.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All proofs, bounds, and the ordering are correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Rigor of proof** | Every proof exhibits valid $(c, n_0)$ and full justification | Proof structure present, one gap | Bound stated but proof incomplete | No proof attempted |
| **Ordering justification** | Both required pairs justified clearly and correctly | One justification thin | Ordering correct, justification missing | Ordering itself incorrect |
| **Clarity of explanation** | Every justification is clear and complete | Mostly clear, one weak spot | Justifications thin or hard to follow | Little to no explanation |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review is
available on request.
