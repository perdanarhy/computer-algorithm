# Week 13 Worksheet - Answer Key (Instructor Only)

Computer Algorithms (506994-002). Do not hand out this page - it is
never built into the deployed course site.

## Part A

- **A1.** Filled matrix (symmetric, dash elsewhere):

  | | G | L | C | D | Y | F |
  |---|---|---|---|---|---|---|
  | **G** | - | 3 | - | 4 | - | - |
  | **L** | 3 | - | 2 | - | 5 | - |
  | **C** | - | 2 | - | - | - | 2 |
  | **D** | 4 | - | - | - | 6 | - |
  | **Y** | - | 5 | - | 6 | - | 3 |
  | **F** | - | - | 2 | - | 3 | - |

- **A2.** G: L(3), D(4). L: G(3), C(2), Y(5). C: L(2), F(2). D: G(4),
  Y(6). Y: L(5), D(6), F(3). F: C(2), Y(3).
- **A3.** 14 filled matrix cells; 14 total list entries (not counting
  the 6 vertex headers). They're the same number - each of the 7
  undirected edges contributes exactly one filled cell/entry per
  endpoint, i.e., 2 per edge, $2 \times 7 = 14$. Accept "20" for the
  list total if a student includes the 6 headers; clarify the 14 vs.
  20 distinction if it comes up.
- **A4.** Degree 3. Connects to: CS-Building (2), Gate (3), Gym (5) -
  cheapest walk first.

## Part B

Adjacency list neighbor order (as fixed in the prompt): G→[L,D],
L→[G,C,Y], C→[L,F], D→[G,Y], Y→[L,D,F], F→[Y,C].

- **B1. BFS order: G, L, D, C, Y, F.** Filled queue table:

  | Step | Dequeue (visit) | Enqueue this step | Queue after |
  |---|---|---|---|
  | 1 | G | L, D | [L, D] |
  | 2 | L | C, Y | [D, C, Y] |
  | 3 | D | - (both neighbors already visited) | [C, Y] |
  | 4 | C | F | [Y, F] |
  | 5 | Y | - (all neighbors already visited) | [F] |
  | 6 | F | - (all neighbors already visited) | [] |

  Trace: visit G, enqueue L,D. Visit L, enqueue C,Y (G already
  visited). Visit D, neighbors G,Y already visited/enqueued - nothing
  new. Visit C, enqueue F (L already visited). Visit Y, neighbors
  L,D,F all visited/enqueued - nothing new. Visit F, neighbors Y,C
  both visited. Done.
- **B2. DFS order: G, L, C, F, Y, D.**
  Trace: visit G → first neighbor L → visit L → first unvisited
  neighbor C → visit C → first unvisited neighbor F → visit F → first
  unvisited neighbor Y → visit Y → first unvisited neighbor D → visit
  D → neighbors G,Y both visited, backtrack fully. Done.
- **B3.** They match for the first two vertices (G, L) and then
  diverge immediately at the third: BFS visits D next (Gate's other
  direct neighbor) while DFS visits C next (Library's first unvisited
  neighbor, going deeper instead of sideways). Accept any answer that
  correctly identifies the divergence point and the layer-first vs.
  depth-first reason.
- **B4.** BFS. Its layer-by-layer order means the number of "hops"
  (queue layers) it took to first reach a vertex is exactly the fewest
  possible edges from the Gate to that vertex - which is what
  "how many walkway-steps away" is asking. DFS's order carries no such
  guarantee.
- **B5.** Matrix cells: $300^2 = 90{,}000$. List entries: $V + 2E
  \approx 300 + 2(300\times4/2) = 300 + 1{,}200 = 1{,}500$. Expected
  choice: the adjacency list - about 60× less storage, and the matrix
  would be almost entirely empty cells. Accept reasoning that cites
  the sparse-graph argument from the handout/slides even if the exact
  arithmetic is slightly off.
