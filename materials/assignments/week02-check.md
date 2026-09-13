# Week 2 Check - Algorithm Concepts

Computer Algorithms (506994-002). Released Week 2. **Due before Week
3's class begins** (submit via the course Learning Management System,
LMS). Individual work. A short, teacher-graded check on this week's
five properties, Euclid's greatest common divisor (GCD), and
`FIND_ROOM` only - no other assignment overlaps this week.

## Tasks

**1. Property violations (30 pts).** For each of the following
"algorithms," name the exact one (or two) of the five properties
(finiteness, definiteness, input, output, effectiveness) it violates,
and justify your answer in one or two sentences:

- (a) "Keep refining the search area until you're confident you've
  found the nearest open study room."
- (b) "Print every perfect square, forever."
- (c) "Sort the list nicely."

**2. GCD by hand (25 pts).** Trace Euclid's algorithm, one iteration
per row (in the lecture's `a`, `b`, `r` format), on `GCD(105, 45)`.
State the final answer and the exact number of iterations.

**3. Write an algorithm (30 pts).** Write pseudocode, following the
course's house style (Week 2's pseudocode conventions), for
`FIND_FIRST_FLOOR(directory, floorNumber)`: given CampusNav's array of
`(building, room, floor)` records, return the location of the first
room found on the given floor, or a well-defined sentinel if none
exists. Then check your own pseudocode against all five properties,
one sentence each.

**4. Algorithm vs. program (15 pts).** A classmate rewrites your
`FIND_FIRST_FLOOR` in a different programming language, using a
`while` loop instead of a `for` loop, but visiting records in the same
order and returning the same sentinel. Is this the same algorithm, a
different algorithm, or something else? Justify your answer in 2-3
sentences.

## Submission format

One PDF or Markdown file containing all four parts, clearly labeled.
Pseudocode and traces may be handwritten-then-scanned, as long as
they're legible.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All property calls, traces, and pseudocode are correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Trace precision** | GCD trace shown exactly, iteration count correct | Minor omission or off-by-one | Trace present but a step is wrong | No real trace attempted |
| **Pseudocode quality** | Precise, unambiguous, satisfies all 5 properties, correct indices | Minor ambiguity or off-by-one, otherwise sound | Missing a property or has a real bug | Not real pseudocode (prose only) |
| **Clarity of explanation** | Every justification is clear and complete | Mostly clear, one weak spot | Justifications thin or hard to follow | Little to no explanation |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review is
available on request.
