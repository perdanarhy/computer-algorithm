---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 13: Graph Representation

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
</div>

<div class="thread">Assignment 4 released this week - Dynamic Programming &amp; Graphs, due Week 15</div>

<!--
notes: Welcome the class. Say: "Every feature we've built so far - the room directory, the tour planner, study-buddy matching - treats CampusNav's data as a flat list. Today that stops being enough." Mention Assignment 4 is now posted, due Week 15, and briefly point at materials/assignments/assignment4.md.
-->

---

<!-- SLOT 2: Where we are -->

# Where We Are

<div class="roadmap">
<div class="wk"><div class="n">Wk 1</div><div class="t">Introduction</div></div>
<div class="wk"><div class="n">Wk 2</div><div class="t">Algorithm Concepts</div></div>
<div class="wk"><div class="n">Wk 3</div><div class="t">Complexity Analysis</div></div>
<div class="wk"><div class="n">Wk 4</div><div class="t">Recursion &amp; Recurrence</div></div>
<div class="wk"><div class="n">Wk 5</div><div class="t">Basic Sorting</div></div>
<div class="wk"><div class="n">Wk 6</div><div class="t">Advanced Sorting</div></div>
<div class="wk"><div class="n">Wk 7</div><div class="t">Searching</div></div>
<div class="wk review"><div class="n">Wk 8</div><div class="t">Midterm Exam</div></div>
<div class="wk"><div class="n">Wk 9</div><div class="t">Divide &amp; Conquer</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">Greedy Algorithms</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">Dynamic Programming I</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">Dynamic Programming II</div></div>
<div class="wk now"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Point at the row. Say: "We've spent three weeks on paradigms for arrays and sequences. Today CampusNav's data stops being a line and becomes a network." -->

---

<!-- NEW: warm-up, placed right after the roadmap (slot 2) per course design -->

# Before We Start: Map a Friend Group

<div class="thread">A quick warm-up. No code needed yet.</div>

Think of five people you know. Some of them are friends with each
other; some aren't. On scratch paper, draw a dot for each person, and
a line between every pair that's actually friends.

- Now, without drawing anything else - how would you describe that
  same picture to a computer, using only numbers or short lists?

<!--
notes: Give 30 seconds to think, alone. Ask aloud for suggestions: some students will say "a grid of yes/no," some will say "a list per person." Do not name "graph," "adjacency matrix," or "adjacency list" yet - let them describe it in their own words.
-->

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** CampusNav's "find a study buddy" feature -
  comparing two students' weekly course sequences and finding their
  longest shared subsequence (LCS), a real dynamic-programming payoff.
- **Last week left broken:** every CampusNav feature so far - the room
  directory, the tour planner, study-buddy matching - treats data as a
  flat list or a pair of sequences. Nothing so far can describe "which
  places connect to which, and how" - and the next flagship feature,
  walking directions, needs exactly that.

---

<!-- NEW: Key Words Today, session 1 -->

# Key Words Today

- **Graph:** informally, a set of "things" and the connections between them.
- **Vertex (node):** one of the things in a graph - e.g., a building.
- **Edge:** a connection between two vertices - e.g., a walkway.
- **Directed / undirected:** whether a connection only goes one way, or both.

<!-- notes: Read each term aloud once. Say these get a precise definition later this session. -->

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# "Get Directions" Doesn't Exist

<div class="pain">

A first-year student opens CampusNav and taps "Get Directions" from
the Gate to the Cafeteria. Nothing happens - the button was never
finished. When the CampusNav team looks into why, they realize the
problem isn't the button: their app has a room list and a class
schedule, but nothing that says "the Gate is a three-minute walk from
the Library" or "the Dorm is right next to the Gym." There's no way
to even ask "what's near what," let alone compute a route.

</div>

<!-- notes: Do not say "graph," "vertex," or "edge" here. Let the class feel the mess first. -->

---

# The Hardcoded-Paths Trap

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">6 hardcoded routes (pilot)</div>
  <div class="bar-track"><div class="bar-fill short" style="width: 8%"></div></div>
  <div class="bar-value">manageable, a few hours</div>
</div>
<div class="bar-row">
  <div class="bar-label">~30 buildings, all pairs</div>
  <div class="bar-track"><div class="bar-fill risk-med" style="width: 55%"></div></div>
  <div class="bar-value">hundreds of routes to write</div>
</div>
<div class="bar-row">
  <div class="bar-label">Whole campus + events</div>
  <div class="bar-track"><div class="bar-fill long" style="width: 100%"></div></div>
  <div class="bar-value">combinatorially impossible by hand</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: the point is that "just hardcode it" doesn't scale.</div>

---

<!-- SLOT 5: Cost of not knowing -->

# What Else This Actually Costs

- A feature "coded" as a handful of hardcoded routes breaks the moment
  CampusNav adds one new building or walkway - nothing generalizes.
- Every future feature that needs "what's nearby" (shuttle stops,
  accessible routes, event check-in) would have to reinvent its own
  ad hoc map from scratch.
- Without a real representation, there's no way to even ask precise
  questions like "how many walkways touch the Library?" - let alone
  compute a route.

<div class="why">
<strong>In industry:</strong> modeling "what connects to what" - friend
networks, road networks, dependency graphs in a build system, web
links - is one of the most common real system-design and interview
topics. Picking the wrong representation (or a slow one) is a classic,
career-relevant mistake.
</div>

---

# It Gets Worse As the Campus Grows

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">One building's rooms</div>
  <div class="bar-track"><div class="bar-fill risk-low" style="width: 10%"></div></div>
  <div class="bar-value">a short list is fine</div>
</div>
<div class="bar-row">
  <div class="bar-label">Whole DEU campus, ~300 spots</div>
  <div class="bar-track"><div class="bar-fill risk-med" style="width: 55%"></div></div>
  <div class="bar-value">a real network, hundreds of connections</div>
</div>
<div class="bar-row">
  <div class="bar-label">Campus + shuttle stops + events</div>
  <div class="bar-track"><div class="bar-fill risk-high" style="width: 92%"></div></div>
  <div class="bar-value">unmanageable without a real structure</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: the point is the trend - we'll compute real numbers later this week.</div>

---

<!-- SLOT 6: Driving question -->

<!-- _class: section -->

# This Week's Question

<div class="driving-q">"How do we store 'what connects to what' precisely enough that a computer can compute with it - and which way of storing it should CampusNav actually use?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. Define a graph formally - vertices, edges, directed vs. undirected, weighted vs. unweighted.
2. Build both an adjacency matrix and an adjacency list for the same graph, by hand.
3. Compare the space and time trade-offs of each representation, and justify a choice for a large, sparse real-world graph.
4. Trace breadth-first and depth-first search by hand, and state why both run in O(V + E).

---

<!-- NEW: session-1 close, previews Worksheet Part A -->

# Coming Up: Worksheet Part A

<div class="thread">Next in this class: less listening, more building.</div>

Later today, you and a partner will build both representations, by
hand, for CampusNav's actual six-location campus map.

That is **Worksheet Part A**. Keep a pen ready.

---

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: where did "graph" come from, and what exactly is one?</div>

---

<!-- SLOT 8: Origin -->

# This Problem Is Not New

<div class="thread">You just felt the pain. Now: who else felt it, and what did they do?</div>

- In 1736, the city of Königsberg had seven bridges connecting two
  islands and two riverbanks. People wondered: could you walk a route
  crossing every bridge exactly once? Leonhard Euler proved it was
  impossible - not by measuring distances, but by reducing the whole
  map to just dots (landmasses) and lines (bridges), throwing away
  everything else. That reduction is graph theory's birth.
- Two centuries later, when graphs moved into computers, "what's
  connected to what" needed an actual data structure, not just a
  diagram on paper - and two natural answers emerged: a grid
  (borrowed from linear algebra's matrices) and a set of per-vertex
  lists (built for the sparse, memory-constrained reality of real
  programs).

<div class="why">
Both representations are correct. The right choice, then and now,
depends entirely on how many connections the graph actually has - the
same question CampusNav's team is about to face at full campus scale.
</div>

---

<!-- SLOT 9: Core concept -->

# Graph: Definition

<div class="thread">Two centuries of dots-and-lines, formalized.</div>

> A **graph** $G = (V, E)$ is a set of **vertices** $V$ (the "things")
> together with a set of **edges** $E$ (the connections between pairs
> of vertices).

- **Directed vs. undirected:** does an edge $(u, v)$ only mean $u \to v$, or does it mean both $u \to v$ and $v \to u$?
- **Weighted vs. unweighted:** does each edge carry a number (a cost, a distance, a time), or just say "connected" / "not connected"?

CampusNav's campus map will be **undirected** (walkways go both ways)
and **weighted** (walking minutes) - but the same definition covers
one-way, unweighted graphs too (e.g., "who follows whom" online).

---

<!-- NEW: Key Words Today, session 2 -->

# Key Words Today

- **Degree:** how many edges touch a vertex - e.g., the Library's degree is how many walkways lead to it.
- **Adjacent:** two vertices connected directly by an edge.
- **Path:** a sequence of edges connecting one vertex to another.
- **Sparse / dense:** whether a graph has close to the fewest possible edges (sparse) or close to the most possible (dense) - today's whole argument hinges on this.

<!-- notes: Read each term aloud. Say "sparse vs. dense" returns in about ten minutes with real numbers. -->

---

<!-- Act 3 / BUILD -->

# Two Design Choices Every Graph Makes

<div class="two-col">

<div>

**Directed vs. undirected**

- Instagram "follows": directed - you can follow someone who doesn't follow you back.
- Campus walkways: undirected - if you can walk Gate → Library, you can walk back.

</div>

<div>

**Weighted vs. unweighted**

- "Is there a road between these two cities?": unweighted - yes/no.
- "How many minutes does that road take?": weighted - a number on every edge.

</div>

</div>

Every graph you'll ever build makes both choices before you write a
single line of representation code.

---

# CampusNav's Campus, as a Graph

<div class="thread">Six real locations. Undirected. Weighted by walking minutes.</div>

<svg viewBox="0 0 760 240" width="100%" height="240" xmlns="http://www.w3.org/2000/svg">
  <line x1="80" y1="55" x2="380" y2="55" stroke="var(--brand)" stroke-width="2"/>
  <line x1="380" y1="55" x2="680" y2="55" stroke="var(--brand)" stroke-width="2"/>
  <line x1="80" y1="55" x2="80" y2="195" stroke="var(--brand)" stroke-width="2"/>
  <line x1="380" y1="55" x2="380" y2="195" stroke="var(--brand)" stroke-width="2"/>
  <line x1="680" y1="55" x2="680" y2="195" stroke="var(--brand)" stroke-width="2"/>
  <line x1="80" y1="195" x2="380" y2="195" stroke="var(--brand)" stroke-width="2"/>
  <line x1="380" y1="195" x2="680" y2="195" stroke="var(--brand)" stroke-width="2"/>
  <text x="230" y="45" font-size="16" fill="var(--deep)" text-anchor="middle">3</text>
  <text x="530" y="45" font-size="16" fill="var(--deep)" text-anchor="middle">2</text>
  <text x="60" y="130" font-size="16" fill="var(--deep)" text-anchor="middle">4</text>
  <text x="360" y="130" font-size="16" fill="var(--deep)" text-anchor="middle">5</text>
  <text x="660" y="130" font-size="16" fill="var(--deep)" text-anchor="middle">2</text>
  <text x="230" y="215" font-size="16" fill="var(--deep)" text-anchor="middle">6</text>
  <text x="530" y="215" font-size="16" fill="var(--deep)" text-anchor="middle">3</text>
  <circle cx="80" cy="55" r="27" fill="var(--brand)"/>
  <circle cx="380" cy="55" r="27" fill="var(--brand)"/>
  <circle cx="680" cy="55" r="27" fill="var(--brand)"/>
  <circle cx="80" cy="195" r="27" fill="var(--brand)"/>
  <circle cx="380" cy="195" r="27" fill="var(--brand)"/>
  <circle cx="680" cy="195" r="27" fill="var(--brand)"/>
  <text x="80" y="60" font-size="15" fill="#fff" text-anchor="middle" font-weight="700">G</text>
  <text x="380" y="60" font-size="15" fill="#fff" text-anchor="middle" font-weight="700">L</text>
  <text x="680" y="60" font-size="15" fill="#fff" text-anchor="middle" font-weight="700">C</text>
  <text x="80" y="200" font-size="15" fill="#fff" text-anchor="middle" font-weight="700">D</text>
  <text x="380" y="200" font-size="15" fill="#fff" text-anchor="middle" font-weight="700">Y</text>
  <text x="680" y="200" font-size="15" fill="#fff" text-anchor="middle" font-weight="700">F</text>
</svg>
<div class="graphviz-note">G = Gate, L = Library, C = CS-Building, D = Dorm, Y = Gym, F = Cafeteria. Edge labels = walking minutes.</div>

---

# Representation 1: Adjacency Matrix

A $|V| \times |V|$ grid; cell $(i, j)$ holds the edge weight between
vertex $i$ and vertex $j$ (dash = no edge). Symmetric, because the
graph is undirected.

| | G | L | C | D | Y | F |
|---|---|---|---|---|---|---|
| **G** | - | 3 | - | 4 | - | - |
| **L** | 3 | - | 2 | - | 5 | - |
| **C** | - | 2 | - | - | - | 2 |
| **D** | 4 | - | - | - | 6 | - |
| **Y** | - | 5 | - | 6 | - | 3 |
| **F** | - | - | 2 | - | 3 | - |

---

# Representation 2: Adjacency List

One list per vertex, holding only its actual neighbors - and, since
this graph is weighted, each neighbor's edge weight.

<div class="steps">
<div class="step-row"><span class="chip">G</span><span class="step-text">→ L (3), D (4)</span></div>
<div class="step-row"><span class="chip">L</span><span class="step-text">→ G (3), C (2), Y (5)</span></div>
<div class="step-row"><span class="chip">C</span><span class="step-text">→ L (2), F (2)</span></div>
<div class="step-row"><span class="chip">D</span><span class="step-text">→ G (4), Y (6)</span></div>
<div class="step-row"><span class="chip">Y</span><span class="step-text">→ L (5), D (6), F (3)</span></div>
<div class="step-row"><span class="chip">F</span><span class="step-text">→ C (2), Y (3)</span></div>
</div>

---

# Side by Side

<div class="two-col">

<div>

**Adjacency Matrix**

| | G | L | C | D | Y | F |
|---|---|---|---|---|---|---|
| **G** | - | 3 | - | 4 | - | - |
| **L** | 3 | - | 2 | - | 5 | - |
| **C** | - | 2 | - | - | - | 2 |
| **D** | 4 | - | - | - | 6 | - |
| **Y** | - | 5 | - | 6 | - | 3 |
| **F** | - | - | 2 | - | 3 | - |

</div>

<div>

**Adjacency List**

<div class="chip-row">
<span class="chip">G: L(3), D(4)</span>
<span class="chip">L: G(3), C(2), Y(5)</span>
<span class="chip">C: L(2), F(2)</span>
<span class="chip">D: G(4), Y(6)</span>
<span class="chip">Y: L(5), D(6), F(3)</span>
<span class="chip">F: C(2), Y(3)</span>
</div>

</div>

</div>

Same graph. Two different structures holding the same information.

---

# Complexity Trade-off

| Operation | Adjacency Matrix | Adjacency List |
|---|---|---|
| Space | <span class="bignotation">O(V²)</span> | <span class="bignotation">O(V + E)</span> |
| Is (u, v) an edge? | O(1) | O(deg(u)) |
| List all neighbors of u | O(V) | O(deg(u)) |
| Iterate all edges | O(V²) | O(V + E) |
| Add a new vertex | O(V²) (resize/copy) | O(1) |

On CampusNav's 6-node demo graph the difference looks small. It stops
looking small the moment the graph gets big - next slide.

---

# Why It Matters: the Full DEU Campus

The real DEU campus isn't 6 locations - it's every building, junction,
and walkway: roughly **300 nodes**, each realistically connected to
only about **4 neighboring paths** (a sparse network, like real
sidewalks - not a place where everywhere connects to everywhere). Note
this counts *locations* (buildings and path junctions), a coarser unit
than the ~1,200 individual *rooms* the directory-lookup weeks used -
one building is one node here, but dozens of rooms there.

| | 6-node demo (V=6, E=7) | Full DEU campus (V≈300, E≈600) |
|---|---|---|
| Adjacency matrix cells | 36 | 90,000 |
| Adjacency list entries | 6 + 2×7 = 20 | 300 + 2×600 = 1,500 |

At full scale the matrix needs **60× more storage** than the list -
and 88,500 of its 90,000 cells would just be empty. This is exactly
why CampusNav will use an adjacency list once it goes campus-wide.

---

<!-- NEW: Try-It hand-off, session 2 -->

# Now: Worksheet Part A

<div class="thread">Time to practice. Build both representations yourself.</div>

Work with your neighbor. Open **[Worksheet Part
A](materials/week13/worksheet.html)**. Build the adjacency matrix and
adjacency list for CampusNav's six-location campus map, by hand.

**~15 minutes.** Raise your hand if you get stuck.

<!--
notes: Hand out or project Worksheet Part A. Walk the room while pairs work.
After 15 minutes, ask one pair to read their adjacency list aloud and check it against the slide.
-->

---

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: now that we can store the map, how do we walk it?</div>

---

<!-- NEW: Key Words Today, session 3 -->

# Key Words Today

- **Traversal:** systematically visiting every reachable vertex in a graph.
- **Queue:** a first-in-first-out list - what BFS uses to decide what to visit next.
- **Stack (or recursion):** a last-in-first-out structure - what DFS uses instead.
- **Connectivity:** whether every vertex can be reached from a given start vertex.

<!-- notes: Read each term aloud. Say these four words are about to appear in real pseudocode. -->

---

# Storing the Network Isn't Enough

<div class="thread">We can now hold the whole map in memory. Can we use it yet?</div>

Both representations answer "what connects to what." Neither one, by
itself, answers a question CampusNav needs constantly: "starting from
the Gate, what can I reach, and in what order should I visit it?"

That requires actually walking the graph, one vertex at a time - a
**traversal**. There are exactly two fundamental ways to do it.

---

# Breadth-First Search (BFS)

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

- Visits vertices in **layers** - everyone 1 step away, then everyone 2 steps away, and so on.
- Uses a **queue**: the first vertex found is the first one explored further.
- On an **unweighted** graph, BFS's discovery order already gives the shortest path (fewest edges) from the start - full *weighted* shortest paths are next week.
- Runtime: <span class="bignotation">O(V + E)</span> - every vertex enqueued once, every edge examined once.

---

# Depth-First Search (DFS)

```text
DFS(G, u):
    mark u visited; visit(u)
    for each neighbor v of u:
        if v not visited:
            DFS(G, v)
```

- Plunges as deep as possible down one path before backtracking - the opposite instinct from BFS.
- Uses a **stack**, usually the implicit call stack via recursion (as above), or an explicit stack iteratively.
- A natural fit for "is the whole graph connected?" or "does this graph have a cycle?" - not for shortest paths.
- Runtime: <span class="bignotation">O(V + E)</span> - same bound as BFS, same reason.

---

<!-- SLOT N-2: Worked example -->

# CampusNav: Tracing BFS and DFS from the Gate

<div class="thread">Everything above, together, on the actual campus map.</div>

Using the adjacency list (neighbors in the order each edge was added):
G→[L,D]  L→[G,C,Y]  C→[L,F]  D→[G,Y]  Y→[L,D,F]  F→[Y,C]

<div class="steps">
<div class="step-row"><div class="step-num">B</div><div class="step-text">BFS from Gate: G, then L &amp; D, then C &amp; Y, then F → <strong>G, L, D, C, Y, F</strong></div></div>
<div class="step-row"><div class="step-num">D</div><div class="step-text">DFS from Gate: plunges G → L → C → F → Y → D → <strong>G, L, C, F, Y, D</strong></div></div>
</div>

Same start, same graph, same six stops - a completely different
order, because one explores layer by layer and the other commits to a
path first.

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **"Adjacency matrix is always fine - it's simpler."** Fine at 6 nodes (36 cells). At the full campus (~300 nodes) it's 90,000 mostly-empty cells versus about 1,500 for a list - a 60× waste that gets *worse*, not better, as CampusNav grows. Matrix vs. list is a density decision, not a taste decision.
- **Forgetting an undirected edge is two list entries, not one.** If G–L is a walkway, L must list G as a neighbor *and* G must list L - miss one direction and a traversal from the other side silently can't reach back.
- **Assuming DFS also finds the shortest path.** Only BFS's layer-by-layer order guarantees fewest edges to reach each vertex on an unweighted graph; DFS's order says nothing about distance at all.

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. For CampusNav's 6-node campus graph, how many total entries does the adjacency list store, and why is that number 2× the edge count?
2. Starting a BFS and a DFS from the same vertex on the same graph, are they guaranteed to visit vertices in the same order? Why or why not?
3. Why does an adjacency matrix become a *worse* choice, not a better one, as a graph gets larger while staying sparse?

---

# Answers

1. 20 entries (6 vertex list headers + 14 neighbor entries). It's 2× the edge count (7 edges × 2 = 14) because each undirected edge is stored once in *each* endpoint's list.
2. No. BFS explores in layers via a queue (nearest first); DFS commits to one path via a stack/recursion (deepest first) - different data structures, different order, even though both eventually visit every reachable vertex.
3. Its space is O(V²), which grows with the *square* of the vertex count regardless of how many edges actually exist. As V grows with the edge count staying roughly proportional to V (sparse), the fraction of the matrix that's real data shrinks toward zero, while the adjacency list's O(V + E) space tracks only what's actually there.

---

<!-- NEW: Try-It hand-off, session 3 -->

# Now: Worksheet Part B

<div class="thread">Same graph, new question: in what order do you actually visit it?</div>

With the same partner, open **[Worksheet Part
B](materials/week13/worksheet.html)**. Trace BFS and then DFS from the
Gate on your own adjacency list, and compare the two orders.

**~15 minutes.** Raise your hand if you get stuck.

---

# Where This Shows Up Everywhere Else

<div class="thread">This isn't only about CampusNav.</div>

Social networks (who's reachable within 2 connections), web crawlers
(BFS from a seed page), dependency resolution (DFS to detect a cycle
in a build system), maze and puzzle solvers, network broadcast and
routing - all the same two traversal ideas, over and over.

<div class="why">
"Given a graph, traverse it" is one of the most frequently asked
technical-interview question shapes, precisely because both the
representation choice (matrix vs. list) and the traversal choice (BFS
vs. DFS) have real, defensible right answers depending on the problem.
</div>

---

<!-- NEW: quiz hand-off -->

# Now: Quick Self-Check Quiz

<div class="thread">Ungraded. Just for you, to see what stuck.</div>

Open the **[Week 13 Quiz](materials/week13/quiz.html)**. Answer on your
own, about 10 minutes. Check your own answers at the end.

<!--
notes: Distribute or project the quiz. After about 10 minutes, reveal the
answer key and discuss as a group any question most of the class missed.
-->

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 14 slot 4 -->

# What Graph Representation Cannot Do

<div class="limits">
We can now store CampusNav's entire campus as a real network, and
BFS/DFS let us visit - and confirm we can reach - every location from
a given start. But neither traversal, as covered this week, answers
the single most common request the "Get Directions" feature actually
gets: not "can I reach the Cafeteria," but "what's the <em>cheapest</em>
(fastest-walking) way to reach it." Reachability is not the same
question as shortest weighted path.
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 13 leaves **finding the cheapest path between two locations, not
just any reachable path** unsolved. **Week 14, Shortest Path**,
addresses it: Dijkstra's algorithm (and, when a walkway "credit" makes
an edge weight negative, Bellman-Ford) computes CampusNav's actual
"Get Directions" feature over this exact campus graph.

---

<!-- SLOT N+3: Summary -->

# Summary

- A graph is vertices + edges, directed/undirected, weighted/unweighted - the formal shape behind "what connects to what."
- Adjacency matrix (O(V²) space, O(1) edge lookup) and adjacency list (O(V+E) space, O(deg(u)) edge lookup) store the *same* graph differently - and the real DEU campus's sparsity (≈300 nodes, ≈600 edges) makes the list the clear winner, 60× less storage.
- BFS (queue, layer-by-layer, shortest paths on unweighted graphs) and DFS (stack/recursion, deep-first, connectivity) both traverse a graph in O(V+E), but visit it in different orders.
- **Assignment 4 released this week** (Dynamic Programming & Graphs) - see `materials/assignments/assignment4.md`. Due Week 15, before the final exam.
- **Reading:** CLRS, Chapter 22 (Sections 22.1-22.2) - graph representations and BFS/DFS.
- **Prepare:** think about how you'd find the *shortest* walking route on the campus graph if some walkways were much longer than others. Bring your intuition to Week 14.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
