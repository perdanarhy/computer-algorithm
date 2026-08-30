# Week 13 Worksheet - Graph Representation

Computer Algorithms (506994-002). Work with your neighbor (pair work).
Write your names here:

Name 1: _______________________  Name 2: _______________________

---

## Worksheet Part A (~15 minutes)

CampusNav's small campus map has six locations: **Gate (G)**,
**Library (L)**, **CS-Building (C)**, **Dorm (D)**, **Gym (Y)**,
**Cafeteria (F)**. The walkways (undirected, weighted by walking
minutes) are:

G–L 3, G–D 4, L–C 2, L–Y 5, D–Y 6, Y–F 3, C–F 2.

**A1. Build the adjacency matrix.** Fill in every cell below. Use a
dash for "no direct walkway."

| | G | L | C | D | Y | F |
|---|---|---|---|---|---|---|
| **G** | | | | | | |
| **L** | | | | | | |
| **C** | | | | | | |
| **D** | | | | | | |
| **Y** | | | | | | |
| **F** | | | | | | |

**A2. Build the adjacency list.** Fill in each vertex's neighbors and
their edge weights.

- G: ___________________________________________
- L: ___________________________________________
- C: ___________________________________________
- D: ___________________________________________
- Y: ___________________________________________
- F: ___________________________________________

**A3. Count.** How many cells in your matrix hold a real edge weight
(not a dash)? How many total neighbor entries are in your adjacency
list (across all six vertices)? What do you notice about these two
numbers?

Filled matrix cells: _______   Total list entries: _______

_____________________________________________________________

**A4. Degree.** What is the degree of the Library? List everything it
connects to, in order of edge weight, cheapest walk first.

_____________________________________________________________

---

## Worksheet Part B (~15 minutes)

Use the adjacency list you built in Part A. For consistency, list each
vertex's neighbors in this fixed order when there's a choice: the
order the edges were introduced above (G–L, G–D, L–C, L–Y, D–Y, Y–F,
C–F).

**B1. Trace BFS from the Gate.** Using a queue (first-in, first-out),
fill in the queue's contents at each step, then read off the visit
order.

Start: enqueue G. Queue: `[G]`

| Step | Dequeue (visit) | Enqueue this step | Queue after |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |

Visit order: _______________________________________________

**B2. Trace DFS from the Gate.** Using a stack or recursion (always go
to the *first* unvisited neighbor before trying the next one), write
down the order vertices are visited.

Visit order: _______________________________________________

**B3. Compare.** Are the BFS and DFS orders the same? If not, at what
point do they first diverge, and why?

_____________________________________________________________
_____________________________________________________________

**B4. Short answer.** Which traversal would you use if CampusNav
wanted to tell a student "how many walkway-steps away is the
Cafeteria from the Gate?" Why?

_____________________________________________________________
_____________________________________________________________

**B5. Scale it up.** If the real DEU campus has about 300 locations
and each connects to about 4 others on average, roughly how many cells
would a full adjacency matrix need? Roughly how many entries would a
full adjacency list need? Which would you build CampusNav on?

Matrix cells: _______   List entries: _______   My choice: _______

---

<!-- ============================================================ -->
<!-- Instructor Answer Key - do not hand out this section -->
<!-- ============================================================ -->

## Instructor Answer Key - do not hand out this section

### Part A

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

### Part B

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
