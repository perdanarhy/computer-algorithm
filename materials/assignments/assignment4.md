# Assignment 4 - Dynamic Programming & Graphs

Computer Algorithms (506994-002). Released Week 13. **Due Week 15,
before the final exam begins** (submit via the course LMS). Individual
work.

## Tasks

**1. LCS with traceback (35 pts).** CampusNav's "find a study buddy"
feature compares two students' weekly course-code sequences and finds
their longest common subsequence.

- (a) Implement the LCS dynamic-programming algorithm (in a language
  of your choice): build the full 2-D table for two input sequences.
- (b) Implement the traceback procedure to reconstruct the actual
  longest common subsequence (not just its length).
- (c) Run your implementation on `X = "ALGDPGRPHSRT"`,
  `Y = "ALGRDPGRAPH"` and report the LCS length and the actual
  subsequence found.
- (d) State the time and space complexity of your implementation.

**2. Dijkstra on a real dataset (35 pts).** Using the six-location
CampusNav campus graph from `slides/_shared/case-study.md` (Gate,
Library, CS-Building, Dorm, Gym, Cafeteria; edge weights as given),
implement Dijkstra's algorithm.

- (a) Compute shortest walking distances from **Gate** to every other
  location, and report the shortest path (sequence of nodes) to each.
- (b) Add the directed "covered walkway" edge Cafeteria → Library,
  weight **−4**, from Week 14, and run your same Dijkstra
  implementation on the modified graph. Report what happens - does it
  still find the true shortest path from Gate to Library? Show the
  computation that goes wrong.
- (c) In 2-3 sentences, explain why Bellman-Ford would handle part (b)
  correctly where Dijkstra does not.

**3. Short written question - P vs. NP (30 pts).** CampusNav's
organizers want a feature that plans a single scavenger-hunt route
visiting every one of the 6 campus locations exactly once, minimizing
total walking distance.

- (a) Is this the same problem as Dijkstra's shortest path? Explain
  the difference in one or two sentences.
- (b) What complexity class does this problem belong to, and why is
  it fundamentally harder (in the worst case, with current knowledge)
  than shortest path? Use the terms P, NP, and (if relevant)
  NP-complete correctly in your answer.

## Submission format

Source code (LCS + Dijkstra implementations), a short report (PDF or
Markdown) with the LCS result, Dijkstra results (both graphs), and
written answers to task 3.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | LCS table/traceback and Dijkstra results all correct | One minor error | One algorithm has a real bug | Both fundamentally incorrect |
| **Traceback & complexity** | Correct reconstructed LCS string, correct complexity stated and justified | Correct string, complexity minor error | String or complexity wrong, not both | Neither correct |
| **Negative-edge investigation** | Clearly shows Dijkstra's incorrect result with the wrong distance/path identified, and correctly explains why Bellman-Ford fixes it | Shows the failure, explanation has a gap | Runs the experiment but conclusion is vague/wrong | Not attempted |
| **P/NP explanation** | Correctly distinguishes the two problems and uses P/NP/NP-complete accurately | Mostly correct, one terminology slip | Right intuition, wrong terminology | Missing or incorrect |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review
is available on request.
