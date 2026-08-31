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
