# Assignment 2 - Sorting

Computer Algorithms (506994-002). Released Week 6. **Due Week 8,
before the midterm exam begins** (submit via the course LMS).
Individual work.

## Tasks

**1. Implement (40 pts).** In a language of your choice, implement:
bubble sort, insertion sort, merge sort, and quicksort (Lomuto
partition). Each function must accept an array and return (or sort
in place) the sorted result. Include your source code in the
submission.

**2. Instrument (20 pts).** Add a comparison counter (and, if your
language makes it easy, a swap/assignment counter) to each of the
four implementations. Run all four on the same randomly generated
input arrays at sizes $n = 100, 1000, 5000, 10000$.

**3. Empirical vs. theoretical comparison (25 pts).** Produce a table
or chart of comparison counts vs. $n$ for all four algorithms. Discuss:
does the *shape* of your empirical curve match the theoretical
O-bound of each algorithm (O(n²) for bubble/insertion, O(n log n) for
merge/quicksort)? Also time quicksort specifically on an
**already-sorted** input of size 5,000 using your Lomuto partition
with a fixed last-element pivot, and explain what you observe in
light of Week 6's worst-case discussion.

**4. Stability analysis (15 pts).** Using an array of `(key, original
index)` pairs with duplicate keys, empirically verify which of your
four implementations are stable (preserve relative order of equal
keys) and which are not. State whether this matches the theoretical
stability of each algorithm, and for any unstable one, show the
smallest input that demonstrates instability.

## Submission format

Source code (all four implementations + instrumentation), a short
report (PDF or Markdown, 1-3 pages) with your table/chart and written
answers to parts 3-4.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All 4 sorts correct on all test sizes | 1 minor bug | 2+ bugs or 1 algorithm fundamentally broken | Most/all sorts incorrect |
| **Empirical analysis** | Data matches theory, discussion is precise and correct | Data present, discussion has a gap | Data present, little/wrong discussion | No real data or analysis |
| **Code quality** | Clean, instrumented correctly, easy to re-run | Works, minor clarity issues | Works but hard to follow/re-run | Does not run |
| **Explanation** | Stability findings and worst-case-pivot result both explained correctly and tied to lecture concepts | One of the two explained well | Both attempted, weak justification | Not addressed |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review
is available on request.
