# Week 13 Handout - Graph Representation

Computer Algorithms (506994-002). Keep this handout. It has the full
glossary, the campus graph worked in full detail (both
representations), the sparse-graph space argument with real numbers,
BFS/DFS pseudocode sketches, extra reading, and practice problems with
answers.

---

## Part 1: Glossary (all key terms, in plain words)

| Term | Plain definition |
|---|---|
| **Graph** | A set of "things" (vertices) and the connections between them (edges); formally $G = (V, E)$. |
| **Vertex (node)** | One of the "things" in a graph - e.g., a building or junction. |
| **Edge** | A connection between two vertices - e.g., a walkway. |
| **Directed graph** | An edge $(u, v)$ means only $u \to v$, not necessarily $v \to u$. |
| **Undirected graph** | An edge $\{u, v\}$ means both directions - if you can walk it one way, you can walk it back. |
| **Weighted graph** | Every edge carries a number (cost, distance, time). |
| **Unweighted graph** | Edges only say "connected" or "not connected," no number attached. |
| **Degree** | How many edges touch a vertex. |
| **Adjacent** | Two vertices directly connected by an edge. |
| **Path** | A sequence of edges connecting one vertex to another. |
| **Sparse graph** | A graph with close to the fewest possible edges relative to its vertex count - most real-world networks (roads, campuses, social graphs). |
| **Dense graph** | A graph with close to the maximum possible edges - most pairs of vertices are connected. |
| **Adjacency matrix** | A $\lvert V \rvert \times \lvert V \rvert$ grid; cell $(i, j)$ holds the weight of edge $(i, j)$, or a marker for "no edge." |
| **Adjacency list** | One list per vertex, holding only its actual neighbors (and their edge weights, if weighted). |
| **Traversal** | Systematically visiting every vertex reachable from a starting vertex. |
| **BFS (breadth-first search)** | Traversal using a queue; visits vertices in layers by distance (edge count) from the start. |
| **DFS (depth-first search)** | Traversal using a stack (or recursion); plunges as deep as possible down one path before backtracking. |
| **Connectivity** | Whether every vertex can be reached from a given start vertex. |

---

## Part 2: The Campus Graph, Worked in Full

This is CampusNav's small six-location campus map, reused unchanged
through Week 14 and Assignment 4.

**Vertices:** Gate (G), Library (L), CS-Building (C), Dorm (D), Gym
(Y), Cafeteria (F).

**Edges** (undirected, weighted by walking minutes): G–L 3, G–D 4,
L–C 2, L–Y 5, D–Y 6, Y–F 3, C–F 2.

### Adjacency matrix

| | G | L | C | D | Y | F |
|---|---|---|---|---|---|---|
| **G** | - | 3 | - | 4 | - | - |
| **L** | 3 | - | 2 | - | 5 | - |
| **C** | - | 2 | - | - | - | 2 |
| **D** | 4 | - | - | - | 6 | - |
| **Y** | - | 5 | - | 6 | - | 3 |
| **F** | - | - | 2 | - | 3 | - |

A $6 \times 6 = 36$-cell grid. Symmetric because the graph is
undirected. Only 14 of the 36 cells hold a real edge (7 edges, each
appearing twice - once as $(u,v)$, once as $(v,u)$); the rest are
empty.

### Adjacency list

| Vertex | Neighbors (weight) |
|---|---|
| G | L (3), D (4) |
| L | G (3), C (2), Y (5) |
| C | L (2), F (2) |
| D | G (4), Y (6) |
| Y | L (5), D (6), F (3) |
| F | C (2), Y (3) |

6 list headers + 14 neighbor entries = 20 total entries. That "14" is
exactly $2 \times 7$ edges, for the same reason the matrix has 14
filled cells: each undirected edge is recorded once at each endpoint.

---

## Part 3: The Sparse-Graph Space Argument, With Real Numbers

The 6-node demo graph makes the two representations look close (36
matrix cells vs. 20 list entries - not a dramatic gap). That's
misleading. The real DEU campus is not 6 locations; it's every
building, junction, and walkway - roughly **300 nodes**, each
realistically connected to only about **4 neighboring paths** (a
sparse network, the way real sidewalks are, not a network where every
place connects to every other place).

With $V = 300$ and average degree 4, the edge count is
$E = \frac{V \times 4}{2} = 600$ (each edge counted once, not twice,
since we divide by 2 for the two endpoints it touches).

| | 6-node demo (V=6, E=7) | Full DEU campus (V≈300, E≈600) |
|---|---|---|
| Adjacency matrix cells: $V^2$ | 36 | $300^2 = 90{,}000$ |
| Adjacency list entries: $V + 2E$ | $6 + 14 = 20$ | $300 + 1{,}200 = 1{,}500$ |
| Ratio (matrix ÷ list) | 1.8× | **60×** |

At full scale, the adjacency matrix needs **60 times more storage**
than the adjacency list - and of its 90,000 cells, $90{,}000 -
1{,}500 = 88{,}500$ would be sitting empty, holding no information at
all. This is precisely why CampusNav uses an adjacency list once it
represents the whole campus, not just the six-location demo.

**The general rule:** adjacency matrix space is $O(V^2)$ regardless of
how many edges actually exist. Adjacency list space is $O(V + E)$ - it
only pays for edges that are actually there. For a **sparse** graph
(edge count roughly proportional to $V$, as almost every real-world
network is - road maps, campuses, social graphs, the web), $O(V + E)$
is close to $O(V)$, while $O(V^2)$ keeps growing quadratically no
matter what. The gap only widens as the graph grows.

---

## Part 4: BFS and DFS, Pseudocode Sketches

Both traversals answer "starting from vertex $s$, what can I reach,
and in what order do I discover it?" - but they use different data
structures and produce different orders.

### Breadth-first search (BFS)

```text
BFS(G, s):
    mark s visited; enqueue s onto Q
    while Q is not empty:
        u = dequeue(Q)
        visit(u)
        for each neighbor v of u:
            if v not visited:
                mark v visited; enqueue v
```

- Uses a **queue** (first-in, first-out): the earliest-discovered
  vertex is explored first.
- Visits vertices in **layers**, by distance (edge count) from $s$.
- On an **unweighted** graph, BFS's discovery order already gives the
  shortest path (fewest edges) from $s$ to every reachable vertex.
  Weighted shortest paths need a different algorithm - Dijkstra, Week 14.
- Complexity: $O(V + E)$ - every vertex is enqueued exactly once, and
  every edge is examined exactly once (twice on an undirected graph,
  which is still $O(E)$).

### Depth-first search (DFS)

```text
DFS(G, u):
    mark u visited; visit(u)
    for each neighbor v of u:
        if v not visited:
            DFS(G, v)
```

- Uses a **stack** - usually the implicit call stack via recursion (as
  written above), or an explicit stack for an iterative version.
- Plunges as deep as possible down one path before backtracking,
  rather than exploring layer by layer.
- Natural fit for connectivity questions ("can every vertex reach
  every other?"), cycle detection, and topological ordering - not for
  shortest paths.
- Complexity: $O(V + E)$, for the same reason as BFS.

### Traced on the campus graph, starting from Gate (G)

Adjacency list, neighbors in the order each edge was added:
G→[L, D], L→[G, C, Y], C→[L, F], D→[G, Y], Y→[L, D, F], F→[Y, C].

**BFS from G:**

1. Visit G. Enqueue its unvisited neighbors: L, D.
2. Dequeue L. Its neighbors are G (visited), C, Y - enqueue C, Y.
3. Dequeue D. Its neighbors are G (visited), Y (already enqueued) - nothing new.
4. Dequeue C. Its neighbors are L (visited), F - enqueue F.
5. Dequeue Y. Its neighbors are L, D, F - all visited. Nothing new.
6. Dequeue F. Its neighbors are Y, C - all visited. Done.

**BFS order: G, L, D, C, Y, F**

**DFS from G:**

1. Visit G. First unvisited neighbor: L. Recurse into L.
2. Visit L. First unvisited neighbor: C. Recurse into C.
3. Visit C. First unvisited neighbor: F. Recurse into F.
4. Visit F. First unvisited neighbor: Y. Recurse into Y.
5. Visit Y. First unvisited neighbor: D. Recurse into D.
6. Visit D. Neighbors G, Y both visited - backtrack all the way up. Done.

**DFS order: G, L, C, F, Y, D**

Same graph, same start, same six stops - a completely different
order, because BFS spreads outward layer by layer while DFS commits to
one path as far as it will go before trying another.

---

## Part 5: Optional Reading

- CLRS (Cormen, Leiserson, Rivest, Stein), *Introduction to
  Algorithms*, Chapter 20, Sections 20.1–20.2: graph representations,
  breadth-first search, and depth-first search, with full correctness
  arguments and additional worked examples.
- Kleinberg & Tardos, *Algorithm Design*, Chapter 3: graph basics and
  BFS/DFS from a slightly more applied angle, with real network
  examples (the web, social graphs).

---

## Part 6: Practice Problems (with answers)

Try each problem yourself before checking the answer.

**1.** A graph has 5 vertices, and every vertex is connected to every
other vertex (a "complete graph"). How many edges does it have, and
how many cells does its adjacency matrix have?

> **Answer:** $\binom{5}{2} = 10$ edges. Adjacency matrix: $5^2 = 25$
> cells. Note that here the matrix is *not* wasteful - a dense graph
> like this is exactly the case where a matrix is a reasonable choice.

**2.** True or false: for an undirected graph, the adjacency matrix is
always symmetric ($A[i][j] = A[j][i]$ for all $i, j$).

> **Answer:** True. An undirected edge between $i$ and $j$ means the
> connection exists both ways, so both cells hold the same value. (A
> *directed* graph's matrix is generally not symmetric.)

**3.** For CampusNav's campus graph, what is the degree of the Gym
(Y)? List its neighbors.

> **Answer:** Degree 3. Neighbors: Library (5), Dorm (6), Cafeteria (3).

**4.** A social-media "who follows whom" graph has 10 million users,
and each user follows about 200 others on average. Roughly how many
adjacency-list entries would this graph need? Would an adjacency
matrix be realistic here? Why or why not?

> **Answer:** Adjacency list: roughly $V + E \approx 10{,}000{,}000 +
> 10{,}000{,}000 \times 200 = 2{,}010{,}000{,}000$ entries (this graph
> is directed, so each edge is stored once, not twice) - large, but
> proportional to the actual data. An adjacency matrix would need
> $V^2 = (10{,}000{,}000)^2 = 10^{14}$ cells - completely unrealistic
> to store, since the vast majority of user pairs don't follow each
> other. This is an extreme, real-world version of the sparse-graph
> argument from Part 3.

**5.** Starting BFS and DFS from the same vertex on the same
connected graph, will they always visit the *same set* of vertices?
Will they always visit them in the *same order*?

> **Answer:** Same set - yes, both traversals visit every vertex
> reachable from the start (that's what "connected" guarantees here).
> Same order - not necessarily; BFS explores nearest-first via a
> queue, DFS explores deepest-first via a stack/recursion, so unless
> the graph's structure forces only one possible order, the two orders
> usually differ (as seen on the campus graph: G,L,D,C,Y,F vs.
> G,L,C,F,Y,D).

**6.** Why is an adjacency list's "is $(u, v)$ an edge?" check slower,
in the worst case, than an adjacency matrix's?

> **Answer:** An adjacency matrix stores every possible pair directly
> as a grid cell, so checking one pair is a single lookup: $O(1)$. An
> adjacency list only stores a vertex's *actual* neighbors, so checking
> whether $v$ is among them means scanning $u$'s neighbor list, which
> takes $O(\deg(u))$ in the worst case - slower than $O(1)$, though
> still fast in practice on a sparse graph where degrees are small.
