# Week 13 Self-Check Quiz - Graph Representation

Computer Algorithms (506994-002). This quiz is **ungraded**. It is
only to help you see what you remember. Answer alone, about 10
minutes. Check your answers at the end.

Name: _______________________

---

**1.** A graph $G = (V, E)$ is best described as:

A. A sorted list of numbers
B. A set of vertices together with a set of edges connecting pairs of vertices
C. A recursive function that calls itself on smaller inputs
D. A table with rows and columns of arbitrary data

**2.** In an **undirected** graph, an edge between vertices $u$ and $v$
means:

A. You can travel from $u$ to $v$, but not from $v$ to $u$
B. You can travel from $v$ to $u$, but not from $u$ to $v$
C. You can travel both directions
D. Nothing - undirected edges carry no travel information

**3.** For the same graph, an adjacency **matrix** needs:

A. Less space than an adjacency list, always
B. $O(V^2)$ space, regardless of how many edges actually exist
C. $O(V + E)$ space, exactly matching the adjacency list
D. Space that depends only on the number of edges, not vertices

**4.** A sparse graph with 300 vertices, each connected to about 4
others on average, is best represented (in terms of space) by:

A. An adjacency matrix - grids are always simplest
B. An adjacency list - its space stays close to the actual edge count
C. Either - the space difference is negligible at this scale
D. Neither - sparse graphs cannot be represented in memory

**5.** Breadth-first search (BFS) uses which data structure to decide
what to visit next?

A. A stack
B. A queue
C. A sorted array
D. A hash table

**6.** On an **unweighted** graph, BFS's discovery order from a start
vertex $s$ gives:

A. A random valid ordering of all vertices
B. The shortest path (fewest edges) from $s$ to every reachable vertex
C. The longest possible path from $s$
D. Nothing useful - only DFS produces a meaningful order

**7.** Depth-first search (DFS) is most naturally suited to:

A. Finding the shortest path in a weighted graph
B. Checking whether a graph is connected, or contains a cycle
C. Sorting the vertices numerically
D. Computing the adjacency matrix from an adjacency list

**8. Short answer.** In your own words, explain why an adjacency list
is usually the better choice for a large, sparse, real-world graph
(like a road network or a campus map), while an adjacency matrix can
still be a reasonable choice for a small or dense graph. Give a
concrete example or number if you can.

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Answer Key -->
<!-- ============================================================ -->

## Answer Key

1. **B** - a graph is a set of vertices together with a set of edges
   connecting pairs of vertices.
2. **C** - an undirected edge means travel is possible in both
   directions between its two endpoints.
3. **B** - an adjacency matrix always needs $O(V^2)$ space, no matter
   how many edges the graph actually has; this is exactly what makes
   it wasteful on sparse graphs.
4. **B** - an adjacency list's space is $O(V + E)$, which stays close
   to the real amount of data on a sparse graph, unlike the matrix's
   fixed $O(V^2)$.
5. **B** - BFS uses a queue (first-in, first-out), which is what
   produces its layer-by-layer visiting order.
6. **B** - on an unweighted graph, BFS's discovery order gives the
   shortest path (fewest edges) from the start to every reachable
   vertex; this is the whole reason BFS matters before weighted
   shortest-path algorithms (Week 14).
7. **B** - DFS's deep-then-backtrack structure is the natural fit for
   connectivity and cycle-detection questions, not shortest paths.
8. Open-ended. Accept any answer that captures: adjacency list space
   is $O(V + E)$, proportional to what's actually there, while
   adjacency matrix space is always $O(V^2)$ regardless of edge count
   - so on a sparse graph (edges roughly proportional to vertices,
   like a campus or road network) the matrix wastes enormous space on
   empty cells, while on a small or dense graph (most possible edges
   actually exist) the matrix's simplicity and $O(1)$ edge lookups
   aren't wasted. Bonus credit for a concrete number (e.g., the
   90,000-cells-vs-1,500-entries campus comparison from class).
