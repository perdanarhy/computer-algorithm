# Week 10 Check - Greedy Algorithms

Computer Algorithms (506994-002). Released Week 10. **Due before Week
11's class begins** (submit via the course Learning Management System,
LMS). Individual work. A short, teacher-graded check on this week's
two greedy techniques (interval scheduling, Huffman coding) and the
campus-points counterexample only - **separate from Assignment 3**
(Greedy & Divide-and-Conquer), which is also released this week but
not due until Week 12 - see `materials/assignments/assignment3.md`.

## Tasks

**1. Hand trace (25 pts).** Trace `BOOK_ROOM` (the earliest-finish-time
greedy scheduler from lecture) by hand on four requests: P
(08:00-09:00), Q (08:30-09:30), R (09:00-10:00), S (09:15-11:00). Show
the sorted order, and state exactly which requests are granted and
which are skipped, and why.

**2. Exchange argument (20 pts).** In your own words (3-5 sentences),
explain why the exchange-argument's swap step - replacing an optimal
solution's first pick `o` with greedy's first pick `g` - always keeps
the schedule valid. Your answer must use the fact that `end(g) <=
end(o)`.

**3. A new counterexample (30 pts).** Campus points now also offers
denominations **{1, 5, 8}**, target = **10 points**. Run the
"grab the largest token that still fits" greedy rule by hand and
report its token count. Then state the true optimal (fewest-token)
answer. Finally, in 2-3 sentences, explain why this is (or is not) a
counterexample to "greedy always finds the optimal solution."

**4. Huffman coding (25 pts).** Build a Huffman tree by hand for four
symbols with frequencies V=4, W=5, X=7, Y=20 (36 total). Show every
merge, write down the resulting code for each symbol, and compute the
weighted total number of bits. Compare that total to a fixed 2
bits/symbol encoding.

## Submission format

One PDF or Markdown file containing all four parts, clearly labeled.
Traces may be handwritten-then-scanned, as long as they're legible.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All traces, counts, and codes are correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Trace precision** | Every grant/skip decision shown and justified | Minor omission | Trace present but a decision is wrong | No real trace attempted |
| **Proof reasoning** | Exchange-argument explanation is precise and uses end(g) &le; end(o) correctly | Mostly correct, one gap | Explanation thin or partly incorrect | No real attempt |
| **Clarity of explanation** | Every justification is clear and complete | Mostly clear, one weak spot | Justifications thin or hard to follow | Little to no explanation |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review is
available on request.
