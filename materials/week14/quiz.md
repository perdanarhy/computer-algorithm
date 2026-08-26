# Week 14 Self-Check Quiz - Shortest Path

Computer Algorithms (506994-002). This quiz is **ungraded**. It is
only to help you see what you remember. Answer alone, about 10
minutes. Check your answers at the end.

Name: _______________________

---

**1.** Dijkstra's algorithm repeatedly does which of the following?

A. Sorts all edges by weight, then adds them one at a time
B. Extracts the unvisited vertex with the smallest tentative distance and relaxes its outgoing edges
C. Relaxes every edge in the graph, V−1 times
D. Picks a random unvisited vertex and relaxes its edges

**2.** Once Dijkstra settles (finalizes) a vertex, it:

A. Rechecks that vertex's distance after every later round
B. Never looks at that vertex's distance again
C. Removes that vertex from the graph entirely
D. Only rechecks it if a negative edge is later discovered

**3.** Why can a negative edge weight break Dijkstra's correctness?

A. Negative weights cause the priority queue to crash
B. Dijkstra assumes no later-discovered path can ever beat an already-settled distance, which can be false with negative weights
C. Negative weights make the graph disconnected
D. Dijkstra cannot represent negative numbers at all

**4.** Bellman-Ford relaxes every edge in the graph how many times to
guarantee correct distances (assuming no negative cycle)?

A. Exactly once
B. $V - 1$ times
C. $E$ times
D. Until the priority queue is empty

**5.** How does Bellman-Ford detect a negative-weight cycle?

A. It cannot detect negative cycles at all
B. If one extra full pass (the $V$-th) still finds an edge it can relax, a negative cycle must exist
C. It checks whether any edge weight is negative before starting
D. It counts the number of edges in the graph

**6.** A problem being in **NP** means:

A. It cannot be solved in polynomial time
B. It can never be solved by any algorithm
C. A candidate solution can be verified in polynomial time
D. It has no known solution at all

**7.** Which statement about shortest path and the campus scavenger
hunt (visit every location exactly once, minimize distance) is
correct?

A. Both are in P
B. Shortest path is in P; the scavenger hunt is believed NP-hard, with no known efficient algorithm
C. The scavenger hunt is in P because shortest path is
D. Neither problem is in NP

**8.** True or False: every problem in P is also in NP.

A. True
B. False

**9. Short answer.** In your own words, explain why "NP" does *not*
mean "not solvable in polynomial time," and give one example (from
class or your own reasoning) of a problem that is easy to *verify*
but believed hard to *solve*.

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Answer Key -->
<!-- ============================================================ -->

## Answer Key

1. **B** - extract the smallest-tentative-distance unvisited vertex,
   then relax its outgoing edges. This is the greedy core of the
   algorithm.
2. **B** - settled vertices are never revisited, which is exactly
   the assumption negative weights can violate.
3. **B** - Dijkstra's correctness proof relies on every remaining
   edge weight being non-negative, so nothing discovered later can
   ever undercut an already-settled distance.
4. **B** - $V - 1$ rounds, because any shortest path (with no
   negative cycle) is simple and uses at most $V-1$ edges.
5. **B** - if distances were truly final after $V-1$ rounds, one more
   full pass should change nothing; any further improvement can only
   come from a negative cycle.
6. **C** - verifiable in polynomial time, given a candidate solution.
   This is a claim about checking, not about how hard the problem is
   to solve.
7. **B** - shortest path is efficiently solvable (in P); the
   scavenger hunt is Hamiltonian-path/TSP-shaped and believed
   NP-hard, with no known efficient algorithm, despite being easy to
   verify.
8. **A - True.** If a problem can be solved quickly, any candidate
   answer can be verified quickly too - just solve it and compare.
9. Open-ended. Should capture: NP is about how fast a *proposed*
   solution can be *checked*, not about how fast (or whether) a
   solution can be *found* - the two are different questions, and a
   problem can be easy to verify while (as far as anyone knows) hard
   to solve. Accept any reasonable example, e.g. the campus
   scavenger hunt / Hamiltonian path / Traveling Salesman, or a
   Sudoku-style puzzle (easy to check a filled-in grid, hard to find
   one).
