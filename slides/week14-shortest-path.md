---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 14: Shortest Path

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703
</div>

<!--
notes: Open with: "Last week CampusNav learned to draw the whole campus as a graph. This week it finally learns to answer the one question everyone actually asks a map app: what's the fastest way from here to there?" This is also the last new-content week - Week 15 is the final exam, covering Weeks 9-14. Flag the new Week 14 Check, due before Week 15 begins.
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
<div class="wk"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk now"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Point at Week 14, then at Week 15. Say: "This is the last new technique of the semester. Next week is entirely review." -->

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** CampusNav finally represents the *whole
  campus* as a graph - buildings and junctions as nodes, walkways as
  weighted edges - and picked adjacency list over matrix once the
  real campus's sparse walkway network was shown numerically.
- **Last week left broken:** having a graph lets CampusNav *draw* the
  campus and *visit* every node, but it still can't answer the one
  question every visitor actually asks: what's the cheapest way to
  get from A to B?

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# The Map Exists. The Directions Don't.

<div class="pain">

CampusNav now shows a beautiful map of the whole campus - every
building, every walkway, every junction, all connected correctly.
A first-year student opens it and taps "Get Directions: Gate to
CS Building." Nothing happens. There is no button that actually
computes a route. The student can <em>see</em> six or seven different paths
on the screen, all technically valid, and still has to guess which
one is fastest - by eye, the same way they'd guess at a printed
map. The graph CampusNav built last week can be looked at. It cannot
yet be <em>asked a question</em>.

</div>

<!-- notes: Do not say "Dijkstra" or "shortest path algorithm" yet. Let the class feel that "we drew the map" and "we can navigate it" are not the same achievement. -->

---

<!-- SLOT 5: Cost of not knowing -->

# What Else This Actually Costs

- Guessing "by eye" which of several routes is shortest works on a
  6-node toy graph - it silently breaks the moment the graph has
  hundreds of junctions and the shortest route isn't the visually
  obvious one.
- A wrong "shortest route" isn't just inconvenient - it's the kind of
  bug a user notices immediately and stops trusting the app for.
- Every GPS app, ride-hailing app, and network router on Earth
  answers exactly this question, millions of times a second.

<div class="why">
<strong>In industry:</strong> Dijkstra's algorithm is one of the most
asked algorithms in technical interviews, and its real-world twin -
network routers finding the cheapest path for a packet - runs this
exact computation continuously, at massive scale, every day.
</div>

---

<!-- SLOT 6: Driving question -->

# This Week's Question

<div class="driving-q">"Given a weighted map and a starting point, how do we compute the cheapest route to every other place - provably, not by guessing - and what happens when a 'shortcut' can be worth a negative cost?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. Trace Dijkstra's algorithm by hand on a small weighted graph, updating tentative distances round by round.
2. Explain *why* Dijkstra's greedy strategy fails in the presence of negative edge weights, with a concrete counterexample.
3. Trace Bellman-Ford's algorithm, explain why V−1 relaxation rounds suffice, and use one extra pass to detect a negative cycle.
4. State the difference between P and NP precisely, and classify shortest path and the campus scavenger hunt correctly.

---

<!-- NEW: Key Words Today, session 1 (moved after Act 1 / MOTIVATE per SPINE.md's no-definition-before-slot-8 rule) -->

# Key Words Today

- **Shortest path:** the minimum-total-weight way to get from one vertex to another along the graph's edges.
- **Source vertex:** the fixed starting point a single-source shortest-path algorithm computes distances *from*.
- **Weighted graph:** a graph where every edge carries a cost (here: walking minutes), not just a yes/no connection.
- **Tentative distance:** the *best known so far* cost to reach a vertex - may still improve as the algorithm runs.

<!-- notes: Read each term aloud. Say these four words are what today's whole first half is built from. -->

---

<!-- SLOT 8: Origin (Act 2 / GROUND) -->

# Where This Idea Came From

<div class="thread">Two names, two decades, two different pains - both still running inside your GPS today.</div>

- **1959, Edsger Dijkstra:** by his own account, he designed the
  algorithm in about 20 minutes at a café table in Amsterdam, without
  pencil or paper, while thinking about the shortest route between
  two Dutch cities - then spent the next few days working out why it
  was correct. It was first published as a solution to exactly this
  kind of routing problem.
- **1958, Richard Bellman** (and, independently, **Lester Ford**
  slightly earlier, in routing/network-flow work): developed a
  slower but more general method - one that keeps working even when
  some edges are allowed to have *negative* weight, something
  Dijkstra's method cannot handle.

---

# One Problem, Two Names

<div class="thread">Same underlying question, solved twice, one year apart.</div>

<div class="why">
Both were solving the same underlying problem that shows up in
road networks, telephone routing, and - decades later - the internet
itself: given costs on connections, find the cheapest path through
the network.
</div>

---

<!-- SLOT 9: Core concept (Act 2 / GROUND) -->

# Single-Source Shortest Path: Definition

<div class="thread">Formal, now that the pain is fresh. (CLRS - Cormen/Leiserson/Rivest/Stein's <em>Introduction to Algorithms</em>, 4th ed, Ch 22)</div>

> Given a weighted graph $G = (V, E)$ with edge weights $w(u, v)$ and
> a single **source vertex** $s$, the **single-source shortest path
> problem** asks: for every vertex $v \in V$, find the minimum total
> weight of any path from $s$ to $v$ - its **shortest-path
> distance**, written $\delta(s, v)$.

---

# The Graph We're Working With

<div class="thread">CampusNav's small six-location graph, reused from last week - Gate is today's source:</div>

<svg viewBox="0 0 620 240" width="900" xmlns="http://www.w3.org/2000/svg">
  <line x1="96" y1="50" x2="294" y2="50" stroke="#4A66AC" stroke-width="2.5"/>
  <text x="195" y="40" font-size="15" fill="#0B3954" text-anchor="middle">3</text>
  <line x1="346" y1="50" x2="544" y2="50" stroke="#4A66AC" stroke-width="2.5"/>
  <text x="445" y="40" font-size="15" fill="#0B3954" text-anchor="middle">2</text>
  <line x1="70" y1="80" x2="70" y2="170" stroke="#4A66AC" stroke-width="2.5"/>
  <text x="50" y="128" font-size="15" fill="#0B3954" text-anchor="middle">4</text>
  <line x1="320" y1="80" x2="320" y2="170" stroke="#4A66AC" stroke-width="2.5"/>
  <text x="300" y="128" font-size="15" fill="#0B3954" text-anchor="middle">5</text>
  <line x1="570" y1="80" x2="570" y2="170" stroke="#4A66AC" stroke-width="2.5"/>
  <text x="550" y="128" font-size="15" fill="#0B3954" text-anchor="middle">2</text>
  <line x1="102" y1="200" x2="288" y2="200" stroke="#4A66AC" stroke-width="2.5"/>
  <text x="195" y="222" font-size="15" fill="#0B3954" text-anchor="middle">6</text>
  <line x1="352" y1="200" x2="538" y2="200" stroke="#4A66AC" stroke-width="2.5"/>
  <text x="445" y="222" font-size="15" fill="#0B3954" text-anchor="middle">3</text>
  <circle cx="70" cy="50" r="27" fill="#242852"/>
  <text x="70" y="56" font-size="16" fill="#fff" text-anchor="middle">G</text>
  <circle cx="320" cy="50" r="27" fill="#4A66AC"/>
  <text x="320" y="56" font-size="16" fill="#fff" text-anchor="middle">L</text>
  <circle cx="570" cy="50" r="27" fill="#4A66AC"/>
  <text x="570" y="56" font-size="16" fill="#fff" text-anchor="middle">C</text>
  <circle cx="70" cy="200" r="27" fill="#4A66AC"/>
  <text x="70" y="206" font-size="16" fill="#fff" text-anchor="middle">D</text>
  <circle cx="320" cy="200" r="27" fill="#4A66AC"/>
  <text x="320" y="206" font-size="16" fill="#fff" text-anchor="middle">Y</text>
  <circle cx="570" cy="200" r="27" fill="#4A66AC"/>
  <text x="570" y="206" font-size="16" fill="#fff" text-anchor="middle">F</text>
</svg>
<div class="graphviz-note">G Gate (source) &middot; L Library &middot; C CS-Building &middot; D Dorm &middot; Y Gym &middot; F Cafeteria. Weights are walking minutes.</div>

---

<!-- NEW: Key Words Today, session 2 -->

# Key Words Today

- **Relaxation:** checking whether going through a vertex $u$ gives a *shorter* known path to a neighbor $v$ than what's currently recorded, and updating it if so.
- **Greedy choice:** at each step, commit to the locally best-looking option (smallest tentative distance) without reconsidering it later.
- **Priority queue:** a data structure that always hands back the not-yet-finalized vertex with the smallest tentative distance, in $O(\log V)$.
- **Settled / finalized vertex:** a vertex whose shortest-path distance is *proven* final - Dijkstra never revisits it.

<!-- notes: Read each term aloud. Say: "Every one of these words appears in the trace you're about to watch, step by step." -->

---

<!-- Act 3 / BUILD: Dijkstra idea + pseudocode merged, folds in the old warm-up's payload as a teacher-delivered lead-in -->

# Dijkstra's Algorithm: Idea and Pseudocode

<div class="thread">Picture two routes to the Library: one "through the Dorm and the Gym," one "past the CS Building" - how do you know which is shorter without walking both? (CLRS 4th ed, &sect;22.3)</div>

<div class="two-col">
<div>

1. Start at the source; its distance is 0, every other vertex starts at $\infty$.
2. Repeatedly pick the **unvisited** vertex with the smallest tentative distance - this one is now guaranteed final ("settled").
3. **Relax** every edge out of it: if going through it makes a neighbor's distance shorter, update that neighbor.
4. Repeat until every vertex is settled.

`EXTRACT-MIN` is the "settle the closest unvisited vertex" step; the
inner loop is relaxation.

</div>
<div>

```text
DIJKSTRA(G, w, source):
    for each vertex v in G.V:
        dist[v] = infinity
        prev[v] = NIL
    dist[source] = 0
    Q = all vertices in G.V, keyed by dist[]
    while Q is not empty:
        u = EXTRACT-MIN(Q)
        for each vertex v adjacent to u:
            if dist[u] + w(u, v) < dist[v]:
                dist[v] = dist[u] + w(u, v)
                prev[v] = u
                DECREASE-KEY(Q, v, dist[v])
    return dist, prev
```

</div>
</div>

<div class="why">
Why is step 2 safe? Because every remaining edge weight is
<strong>non-negative</strong>, no unvisited vertex can later become cheaper than
the one currently smallest - nothing can subtract from a distance.
That single assumption is the whole algorithm's foundation, and
exactly what breaks later this week.
</div>

---

<!-- NEW: dense worked example, Dijkstra, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Dijkstra · worked example 1 of 3 (simple)</div>

# Three Nodes: S, A, B

<div class="wx-top">
<div class="lead">The smallest graph where the direct edge is not the shortest route.</div>
<div class="goalbox"><span class="k">Goal</span>Find every shortest distance from S on S-A=2, S-B=5, A-B=1.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Settle S</div>
<div class="wx-body">dist[S]=0. Relax S's edges: A becomes 0+2=2, B becomes 0+5=5.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Settle A</div>
<div class="wx-body">Smallest unvisited: A (2). Relax A-B: 2+1=3 &lt; 5, so B improves to 3.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Settle B</div>
<div class="wx-body">Only B left, now at 3. Final distances: S=0, A=2, B=3, via S&rarr;A&rarr;B - cheaper than the direct S-B edge (5).</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>&delta;(S,A)=2, &delta;(S,B)=3 - the direct edge (5) is never the answer once a cheaper detour exists.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Relaxation is what finds the detour - without it, Dijkstra would just report the direct edge's weight.</div></div>

---

<!-- NEW: dense worked example, Dijkstra, moderate tier -->
<!-- _class: dense -->

<div class="eyebrow">Dijkstra · worked example 2 of 3 (moderate)</div>

# The Campus Graph, Round by Round

<div class="wx-top">
<div class="lead">Same six-location graph as this week's core example, source = Gate.</div>
<div class="goalbox"><span class="k">Goal</span>Settle all six vertices and read off the shortest-path tree.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Rounds 1-2</div>
<div class="wx-body">Settle Gate(0): relax to Library=3, Dorm=4. Settle Library(3): relax to CS-Building=3+2=5, Gym=3+5=8.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Rounds 3-4</div>
<div class="wx-body">Settle Dorm(4): relax Dorm&rarr;Gym offers 4+6=10, not better than 8 - no change. Settle CS-Building(5): relax to Cafeteria=5+2=7.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Rounds 5-6</div>
<div class="wx-body">Settle Cafeteria(7), smaller than Gym's 8: relax Cafeteria&rarr;Gym offers 7+3=10 - no change. Settle Gym(8) last, nothing left to relax.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Reading the tree</div>
<div class="wx-body">Final, proven-optimal distances: Gate 0, Library 3, Dorm 4, CS-Building 5, Cafeteria 7, Gym 8. Tree: Gate&rarr;Library(3), Gate&rarr;Dorm(4), Library&rarr;CS-Building(5), CS-Building&rarr;Cafeteria(7), Library&rarr;Gym(8).</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Six settles, six final distances - every vertex settled exactly once, in increasing distance order.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Cafeteria (7) settles before Gym (8) even though Gym was discovered first - Dijkstra always settles by tentative distance, never by discovery order.</div></div>

---

<!-- NEW: dense worked example, Dijkstra, harder tier (the negative-weight counterexample) -->
<!-- _class: dense -->

<div class="eyebrow">Dijkstra · worked example 3 of 3 (harder)</div>

# Where Dijkstra Breaks: One Negative Edge

<div class="wx-top">
<div class="lead">A clean, minimal counterexample - no lucky ties, just a wrong answer.</div>
<div class="goalbox"><span class="k">Goal</span>Show Dijkstra reports the wrong distance the moment one edge is negative.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">Source S. Directed edges: S&rarr;C=2, S&rarr;B=3, B&rarr;C=&minus;4.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Settle S, then C</div>
<div class="wx-body">Settle S(0). Frontier: C=2, B=3. Smallest is C (2) - settle it, <strong>final</strong>. Dijkstra reports &delta;(S,C) = 2.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Settle B, relax B&rarr;C</div>
<div class="wx-body">Settle B(3). Relax B&rarr;C: candidate 3+(&minus;4) = &minus;1.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The wrong answer</div>
<div class="wx-body">&minus;1 is less than C's distance of 2 - but C is already settled, so standard Dijkstra silently skips this update. True shortest distance, via S&rarr;B&rarr;C, is &minus;1. Dijkstra's reported answer, 2, is simply wrong.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>One negative edge, no lucky tie: Dijkstra's "settle and never revisit" strategy reports 2 when the true answer is &minus;1.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Dijkstra's correctness proof depends entirely on non-negative weights - with even one negative edge, no amount of "it happened to work here" is a guarantee.</div></div>

---

# Dijkstra's Complexity

<div class="thread">Why bother with a priority queue at all? (Priority queue and binary heap: as introduced last week, Week 13.)</div>

- Each of the $V$ vertices is extracted from the priority queue
  exactly once: $O(V \log V)$.
- Each of the $E$ edges is relaxed at most once (when its tail
  vertex is settled), and each relaxation that improves a distance
  costs a `DECREASE-KEY`: $O(E \log V)$.

<div class="bignotation">O((V + E) log V)</div>

with a binary-heap priority queue - the same $O(\log n)$ insert/
extract-min fact Week 13 handed you as a tool. On CampusNav's real
campus graph (sparse - a junction connects to only a handful of
walkways, not every other junction), this is dramatically faster than
checking every possible route by hand, which grows exponentially with
the number of stops.

---

<!-- NEW: Key Words Today, session 3 -->

# Key Words Today

- **Negative cycle:** a cycle whose edge weights sum to less than zero - walking it repeatedly makes "shortest path" undefined, since you could loop forever and keep saving time.
- **Polynomial time:** an algorithm's cost is bounded by $n^k$ for some fixed constant $k$ - this course's working definition of "efficient."
- **Verifiable:** given a candidate answer, checking that it's correct can be done quickly - a different question from *finding* the answer.
- **NP-hard / NP-complete:** at least as hard as every problem in NP; no known polynomial algorithm solves these, and none may exist.

<!-- notes: Read each term aloud. Say: "By the end of today these four words fully separate two kinds of problems: ones we can solve fast, and ones we currently can only check fast." -->

---

# The Covered Walkway

<div class="thread">CampusNav's gamification team pitches a rainy-day feature.</div>

To reward students for using a covered, roofed path between the
Cafeteria and the Library on rainy days, CampusNav's designers add a
"shortcut credit": walking that one specific direction, Cafeteria →
Library, is logged as **−4 minutes** instead of a normal positive
cost - a one-way perk, not a real physical shortcut.

<svg viewBox="0 0 620 240" width="640" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowneg" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#C0392B"/>
    </marker>
  </defs>
  <line x1="96" y1="50" x2="294" y2="50" stroke="#4A66AC" stroke-width="2"/>
  <text x="195" y="40" font-size="14" fill="#0B3954" text-anchor="middle">3</text>
  <line x1="346" y1="50" x2="544" y2="50" stroke="#4A66AC" stroke-width="2"/>
  <text x="445" y="40" font-size="14" fill="#0B3954" text-anchor="middle">2</text>
  <line x1="70" y1="80" x2="70" y2="170" stroke="#4A66AC" stroke-width="2"/>
  <text x="50" y="128" font-size="14" fill="#0B3954" text-anchor="middle">4</text>
  <line x1="320" y1="80" x2="320" y2="170" stroke="#4A66AC" stroke-width="2"/>
  <text x="300" y="128" font-size="14" fill="#0B3954" text-anchor="middle">5</text>
  <line x1="570" y1="80" x2="570" y2="170" stroke="#4A66AC" stroke-width="2"/>
  <text x="550" y="128" font-size="14" fill="#0B3954" text-anchor="middle">2</text>
  <line x1="102" y1="200" x2="288" y2="200" stroke="#4A66AC" stroke-width="2"/>
  <text x="195" y="222" font-size="14" fill="#0B3954" text-anchor="middle">6</text>
  <line x1="352" y1="200" x2="538" y2="200" stroke="#4A66AC" stroke-width="2"/>
  <text x="445" y="222" font-size="14" fill="#0B3954" text-anchor="middle">3</text>
  <path d="M 548 178 Q 430 90 342 63" fill="none" stroke="#C0392B" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arrowneg)"/>
  <text x="470" y="105" font-size="15" fill="#C0392B" text-anchor="middle" font-weight="bold">-4</text>
  <circle cx="70" cy="50" r="27" fill="#242852"/>
  <text x="70" y="56" font-size="16" fill="#fff" text-anchor="middle">G</text>
  <circle cx="320" cy="50" r="27" fill="#4A66AC"/>
  <text x="320" y="56" font-size="16" fill="#fff" text-anchor="middle">L</text>
  <circle cx="570" cy="50" r="27" fill="#4A66AC"/>
  <text x="570" y="56" font-size="16" fill="#fff" text-anchor="middle">C</text>
  <circle cx="70" cy="200" r="27" fill="#4A66AC"/>
  <text x="70" y="206" font-size="16" fill="#fff" text-anchor="middle">D</text>
  <circle cx="320" cy="200" r="27" fill="#4A66AC"/>
  <text x="320" y="206" font-size="16" fill="#fff" text-anchor="middle">Y</text>
  <circle cx="570" cy="200" r="27" fill="#4A66AC"/>
  <text x="570" y="206" font-size="16" fill="#fff" text-anchor="middle">F</text>
</svg>

---

# Dijkstra's Blind Spot

<div class="thread">Re-run Dijkstra from Gate with the walkway edge added.</div>

- Dijkstra **settles Library in round 2**, at distance 3 - long
  before it ever reaches Cafeteria, which isn't settled until
  **round 5**, at distance 7.
- Once Library is settled, the algorithm - by its own design - never
  looks at it again, *even when* it later discovers the −4 edge
  arriving at Library from Cafeteria.
- If it did check: 7 + (−4) = 3. Here that happens to tie Library's
  existing answer - but Dijkstra never performs this check at all,
  and has no way of knowing in advance that it would only tie.

---

# One Minute Worse, and There's No Answer At All

<div class="thread">The tie above was luck. Push the credit one minute further.</div>

<div class="pain">
Shave the shortcut credit by one more minute (−5 instead of −4) and
the loop Library→CS-Building→Cafeteria→Library costs 2+2+(−5) = −1
minute per lap: a <strong>negative cycle</strong>. "Shortest path to
Library" stops being a well-defined number - you could loop forever
and save time forever. Dijkstra has no mechanism to notice this at
all; it would simply report a wrong, finite answer.
</div>

---

<!-- Bellman-Ford idea + pseudocode merged -->

# Bellman-Ford: Idea and Pseudocode

<div class="thread">If you can't trust "settle and never revisit," stop settling permanently. (CLRS 4th ed, &sect;22.1)</div>

<div class="two-col">
<div>

- Initialize distances exactly like Dijkstra: source = 0, everything
  else = $\infty$.
- Instead of picking one vertex at a time, **relax every edge in the
  graph**, in any order, once.
- Repeat that full pass **V − 1 times total**.
- No priority queue, no "settled" vertices - every distance stays
  open to improvement until the algorithm finishes, so a negative
  edge discovered late can still correct an earlier estimate.

</div>
<div>

```text
BELLMAN-FORD(G, w, source):
    for each vertex v in G.V:
        dist[v] = infinity
        prev[v] = NIL
    dist[source] = 0
    for i = 1 to |G.V| - 1:
        for each edge (u, v) in G.E:
            if dist[u] + w(u, v) < dist[v]:
                dist[v] = dist[u] + w(u, v)
                prev[v] = u
    for each edge (u, v) in G.E:
        if dist[u] + w(u, v) < dist[v]:
            report "negative-weight cycle detected"
    return dist, prev
```

</div>
</div>

---

<!-- NEW: dense worked example, Bellman-Ford, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Bellman-Ford · worked example 1 of 3 (simple)</div>

# Three Nodes, One Negative Edge

<div class="wx-top">
<div class="lead">The smallest graph where a negative edge actually changes the answer.</div>
<div class="goalbox"><span class="k">Goal</span>Find every shortest distance from S on S&rarr;A=4, A&rarr;B=&minus;2, S&rarr;B=5.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">V=3, so V&minus;1=2 rounds are required. dist[S]=0, dist[A]=dist[B]=&infin;.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Round 1</div>
<div class="wx-body">S&rarr;A: 0+4=4 &lt; &infin;, update A=4. A&rarr;B: 4+(&minus;2)=2 &lt; &infin;, update B=2. S&rarr;B: 0+5=5, not &lt; 2, no change.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Round 2</div>
<div class="wx-body">Every edge re-checked, nothing improves. Final: A=4, B=2, via S&rarr;A&rarr;B - beats the direct S&rarr;B edge (5).</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>&delta;(S,B)=2, not the direct edge's 5 - the negative edge made the detour through A the true shortest route.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Round 2 found nothing new here, but Bellman-Ford has no way to know that in advance - it always budgets V&minus;1 rounds.</div></div>

---

# Bellman-Ford on the Campus Graph

<div class="thread">Same graph, same walkway edge, the algorithm that's actually safe to use.</div>

Relaxing every edge (both directions of each walkway, plus the
one-way −4 walkway) just **once**, in the natural reading order,
already reaches the final answer:

<div class="tracetable">
<div class="row"><div class="rowlabel">&nbsp;</div><div class="cell hl">Round 0</div><div class="cell hl">Round 1</div></div>
<div class="row"><div class="rowlabel">Gate</div><div class="cell">0</div><div class="cell">0</div></div>
<div class="row"><div class="rowlabel">Library</div><div class="cell">&infin;</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">Dorm</div><div class="cell">&infin;</div><div class="cell">4</div></div>
<div class="row"><div class="rowlabel">CS-Bldg</div><div class="cell">&infin;</div><div class="cell">5</div></div>
<div class="row"><div class="rowlabel">Gym</div><div class="cell">&infin;</div><div class="cell">8</div></div>
<div class="row"><div class="rowlabel">Cafeteria</div><div class="cell">&infin;</div><div class="cell">7</div></div>
</div>

---

<!-- NEW: dense worked example, Bellman-Ford, moderate tier (absorbs the 3 edge-by-edge slides and the "still runs 5 more rounds" slide) -->
<!-- _class: dense -->

<div class="eyebrow">Bellman-Ford · worked example 2 of 3 (moderate)</div>

# Round 1, Every Edge

<div class="wx-top">
<div class="lead">The table above is the summary. Here is every single check that produced it, visiting G, L, C, D, Y, F in turn.</div>
<div class="goalbox"><span class="k">Goal</span>Relax all 15 directed checks (7 undirected edges, both ways, plus the one-way credit) once.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Gate, Library</div>
<div class="wx-body">G&rarr;L: 0+3=3&lt;&infin;, L=3. G&rarr;D: 0+4=4&lt;&infin;, D=4. L&rarr;G: 3+3=6, not&lt;0. L&rarr;C: 3+2=5&lt;&infin;, C=5. L&rarr;Y: 3+5=8&lt;&infin;, Y=8.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">CS-Bldg, Dorm, Gym</div>
<div class="wx-body">C&rarr;L: 5+2=7, not&lt;3. C&rarr;F: 5+2=7&lt;&infin;, F=7. D&rarr;G: 4+4=8, not&lt;0. D&rarr;Y: 4+6=10, not&lt;8. Y&rarr;L: 8+5=13, not&lt;3.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Gym, Cafeteria</div>
<div class="wx-body">Y&rarr;D: 8+6=14, not&lt;4. Y&rarr;F: 8+3=11, not&lt;7. F&rarr;Y: 7+3=10, not&lt;8. F&rarr;C: 7+2=9, not&lt;5. F&rarr;L(&minus;4): 7&minus;4=3, ties (not &lt;3) - the credit only ties Library, never beats it.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Why it still runs 5 rounds</div>
<div class="wx-body">Round 1 already reached the final answer here - but Bellman-Ford cannot know that in advance, so it must still run all V&minus;1=5 rounds to guarantee it. Rounds 2-5 change nothing; the extra check pass also finds nothing - no negative cycle, distances confirmed final.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>15 edge checks, 4 improve a distance, 1 (the &minus;4 credit) only ties - matching the summary table exactly.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>A different edge-visiting order could take longer than one round to converge - that's exactly why Bellman-Ford always budgets the full V&minus;1 rounds.</div></div>

---

# Why V − 1 Rounds Suffice

<div class="thread">Not a magic number - a direct consequence of what a shortest path can look like.</div>

- Assuming no negative cycle, any shortest path is a **simple path**
  (no repeated vertex) - so it uses **at most $V - 1$ edges**.
- **Claim (by induction on rounds):** after round $k$, `dist[v]` is
  correct for every vertex whose true shortest path uses $k$ or fewer
  edges.
- Round 1 correctly finds every shortest path of 1 edge (direct
  neighbors of the source). Round 2 extends that to 2-edge paths, and
  so on.
- After round $V-1$, every vertex's shortest path - which uses at
  most $V-1$ edges - has been found, no matter what order the edges
  were relaxed in.

---

# Detecting Negative Cycles

<div class="thread">The one extra pass Dijkstra could never offer.</div>

- If distances are truly final after $V-1$ rounds, one more full pass
  over every edge should change **nothing**.
- If the $V$-th pass *still* finds an edge it can relax, that
  improvement can only come from a **negative-weight cycle**
  reachable from the source - a loop you could walk forever, each
  lap making the "distance" smaller without bound.
- Bellman-Ford reports this explicitly instead of returning a
  silently wrong number. Dijkstra has no equivalent check - it would
  never even reach that part of the graph in a way that reveals the
  problem.

---

<!-- NEW: dense worked example, Bellman-Ford, harder tier (negative-cycle detection) -->
<!-- _class: dense -->

<div class="eyebrow">Bellman-Ford · worked example 3 of 3 (harder)</div>

# A Steeper Credit Would Create a Cycle

<div class="wx-top">
<div class="lead">Isolate the Library-CS-Building-Cafeteria loop and make the credit -5 instead of -4, purely to see what a real negative cycle does.</div>
<div class="goalbox"><span class="k">Goal</span>Show why Bellman-Ford can only ever report this case, never silently guess a wrong number.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">Isolated 3-edge cycle: L&rarr;C=2, C&rarr;F=2, F&rarr;L=&minus;5. For illustration only, start dist[L]=0.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Lap 1</div>
<div class="wx-body">L&rarr;C: 0+2=2, C=2. C&rarr;F: 2+2=4, F=4. F&rarr;L: 4+(&minus;5)=&minus;1 &lt; 0, update L=&minus;1.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Lap 2</div>
<div class="wx-body">L&rarr;C: &minus;1+2=1&lt;2, C=1. C&rarr;F: 1+2=3&lt;4, F=3. F&rarr;L: 3+(&minus;5)=&minus;2&lt;&minus;1, update L=&minus;2.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">It never stops</div>
<div class="wx-body">Each lap subtracts exactly 1 from L's distance, forever. The extra V-th pass always finds one more improvement, so Bellman-Ford correctly reports "negative-weight cycle detected" instead of a wrong finite number - exactly what Dijkstra has no mechanism to notice at all.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>A single -1-per-lap cycle makes "shortest path" undefined - Bellman-Ford's extra pass is what catches it.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>The deck's actual -4 credit leaves this loop at exactly 0 (no cycle) - this shows what happens once it tips negative.</div></div>

---

# Dijkstra vs. Bellman-Ford

| | Dijkstra | Bellman-Ford |
|---|---|---|
| Negative weights | **Unsafe** - can silently return the wrong distance | **Safe** - always correct if no negative cycle |
| Negative cycles | No detection at all | Detects them (one extra pass) |
| Strategy | Greedy - settle closest vertex, never revisit | Relax every edge, every round, nothing is final until the end |
| Time complexity | $O((V+E) \log V)$ with a priority queue | $O(VE)$ |
| When to use | Non-negative weights, need speed (e.g. real road networks) | Weights may be negative, or you need cycle detection |

---

# So Which One Does CampusNav Actually Ship?

<div class="thread">The table says "it depends." Here's what it depends on, for this app.</div>

<div class="why">
CampusNav's real walkway network never has negative weights - so
Dijkstra is what should actually ship. Bellman-Ford earns its keep
the moment <em>any</em> feature (like a shortcut credit) can make an edge
negative.
</div>

---

# P: Polynomial-Time Solvable

<div class="thread">The class shortest path belongs to. (CLRS 4th ed, &sect;34.1)</div>

> A problem is in **P** if there exists an algorithm that **solves**
> it - produces a correct answer, for every valid input - in time
> bounded by $n^k$ for some fixed constant $k$, where $n$ is the
> input size.

- Sorting: $O(n \log n)$ - in P.
- Binary search: $O(\log n)$ - in P.
- Single-source shortest path: $O((V+E)\log V)$ or $O(VE)$ - in P.
- "In P" means solvable *efficiently and completely*, not just
  quickly on one instance you happened to try.

---

# NP: Polynomial-Time Verifiable

<div class="thread">The most common misconception in this entire topic - let's fix it directly. (CLRS 4th ed, &sect;34.2)</div>

> A problem is in **NP** if, given a **candidate solution**, you can
> **verify** whether it's correct in polynomial time - *even if
> finding* that solution might take far longer.

<div class="pain">
<strong>Common misconception: "NP means not solvable in polynomial
time."</strong> That is false. NP stands for
<strong>N</strong>ondeterministic <strong>P</strong>olynomial time -
it is entirely about how fast a solution can be <em>checked</em>, not
about how slow it is to <em>find</em>. Every problem in P is also in
NP (if you can solve it fast, you can certainly verify a solution
fast - just solve it and compare). The open question is whether the
reverse is also always true.
</div>

---

# The Campus Scavenger Hunt: NP-Hard

<div class="thread">Same campus graph, one extra constraint, a completely different kind of problem.</div>

CampusNav's events team pitches a new feature: a single scavenger
hunt route that visits **every** building on campus **exactly once**,
minimizing total walking distance.

- **Verifying** a proposed route is fast: check every building
  appears exactly once, sum the weights - polynomial time, so this
  problem is in **NP**.
- **Finding** the optimal route is a different story: this is
  shaped exactly like the **Hamiltonian-path** / **Traveling
  Salesman** problem - no known algorithm solves it faster than
  roughly trying all orderings, which is *exponential* in the number
  of buildings. Knowing how to solve shortest path (one destination)
  gives no shortcut here - a fundamentally different shape of problem.

---

<!-- NEW: dense worked example, verifying a scavenger-hunt route (merges 3 slides into one graduated example) -->
<!-- _class: dense -->

<div class="eyebrow">P vs. NP · worked example</div>

# Verifying a Scavenger-Hunt Route, By Hand

<div class="wx-top">
<div class="lead">"Hard to find" and "hard to check" are not the same claim - watch the check actually happen. (CLRS 4th ed, &sect;34.2)</div>
<div class="goalbox"><span class="k">Goal</span>Verify a candidate route in polynomial time, without solving the harder search problem.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">The candidate</div>
<div class="wx-body">Gate &rarr; Dorm &rarr; Gym &rarr; Cafeteria &rarr; CS-Building &rarr; Library. Check 1: all six locations appear exactly once - one pass, O(V).</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Check every edge</div>
<div class="wx-body">Gate&rarr;Dorm(4), Dorm&rarr;Gym(6), Gym&rarr;Cafeteria(3), Cafeteria&rarr;CS-Building(2), CS-Building&rarr;Library(2) - all five pairs are real edges, one adjacency-list lookup each.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Sum it</div>
<div class="wx-body">4+6+3+2+2 = 17 minutes total. Verified valid, in five quick lookups plus one pass over the list.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Fast to check, slow to find</div>
<div class="wx-body">Verifying took O(V) work. <em>Finding</em> this route among all orderings of six locations (up to 6!/2 = 360 distinct routes) offers no comparable shortcut - that gap is exactly what puts the scavenger hunt in NP without putting it in P.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>A candidate route verifies in a handful of lookups; no known method finds the best one nearly as fast.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>NP is about how fast a solution can be checked - not how slow it is to find, the most common mix-up here.</div></div>

---

# NP-Complete, NP-Hard, and P =? NP

<div class="thread">The open question underneath all of this - and why it matters.</div>

- A problem is **NP-complete** if it's in NP *and* every other
  problem in NP can be transformed into it in polynomial time - the
  "hardest" problems within NP. The scavenger hunt is one of these.
- **NP-hard** problems are at least as hard as NP-complete ones, even
  if they aren't themselves required to be in NP.
- Nobody has ever found a polynomial algorithm for *any* NP-complete
  problem, and nobody has proven one is impossible - **P =? NP** is
  one of the most famous open problems in mathematics and computer
  science (a Clay Millennium Prize problem).

<div class="why">
<strong>Why we care:</strong> recognizing a new problem as NP-hard
tells you, immediately, not to waste time hunting for a fast exact
algorithm - a judgment call that matters far beyond CampusNav, in
routing, scheduling, and resource-allocation systems everywhere.
</div>

---

<!-- SLOT N-2: Worked example -->

# CampusNav: Get Directions, Live

<div class="thread">Everything above, together, on the actual feature.</div>

The "Get Directions" button now runs Dijkstra over last week's graph
every time a student taps it. From the Gate:

| Destination | Shortest distance | Route |
|---|---|---|
| Library | 3 min | Gate → Library |
| Dorm | 4 min | Gate → Dorm |
| CS-Building | 5 min | Gate → Library → CS-Building |
| Cafeteria | 7 min | Gate → Library → CS-Building → Cafeteria |
| Gym | 8 min | Gate → Library → Gym |

---

# What About the Covered Walkway?

<div class="thread">The feature from earlier this week - shipped, but not the way it was pitched.</div>

The covered-walkway credit stays in the app as a rainy-day *display*
feature, but it never feeds into the live Dijkstra computation - the
team learned this week exactly why that would be dangerous.

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **"Dijkstra works correctly with negative edge weights."** It
  doesn't - its greedy "settle once, never revisit" strategy assumes
  no future discovery can ever beat an already-settled distance,
  which only holds when every remaining weight is non-negative.
- **"NP means not solvable in polynomial time."** It means a
  candidate solution can be *verified* in polynomial time - a
  completely different, much weaker claim about *checking*, not
  *finding*.
- **Confusing "hard to solve" with "hard to verify."** The scavenger
  hunt is hard to *solve* but easy to *verify* - that gap is the
  entire reason NP is an interesting class at all.
- **Assuming both campus problems share one complexity class.**
  Shortest path is in P; the scavenger hunt is NP-complete.

---

<!-- Pointer slide, points to Week 15's full worked practice set -->

# Final Exam Blueprint

<div class="driving-q">Full worked practice set (Weeks 9-14): see next week's Week 15 final review.</div>

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE) -->

# What This Week's Toolkit Cannot Do

<div class="limits">
Shortest path is solvable efficiently because it's in P - Dijkstra
and Bellman-Ford both compute it in polynomial time, provably
correctly. But closely related problems, like the scavenger-hunt
route, may have no efficient algorithm at all, known or possible.
Being able to solve one well-behaved problem in a family says nothing
about the rest of that family - and for an entire class of important,
everyday-shaped problems (P vs. NP), we do not yet know - and may
never know - whether an efficient algorithm even exists.
</div>

---

<!-- SLOT N+2: Bridge (Act 4 / CLOSE) -->

# Next Week

Week 14 leaves **which problems have any efficient algorithm at
all** an open question - P vs. NP is unsolved, not just unsolved *by
us*. There is no Week 16 to answer it. **Week 15 is the Final Exam**,
covering everything from Weeks 9-14: divide-and-conquer, greedy
algorithms, dynamic programming (twice), graph representation, and
this week's shortest path and P/NP material - with a full worked
practice set waiting for you there.

---

<!-- NEW: CLRS reference slide, positioned immediately before Summary per course design -->

# Where This Week Lives in CLRS

<div class="thread">Everything above, mapped to the textbook - and where to look if you want more.</div>

| This week's topic | CLRS 4th ed |
|---|---|
| Bellman-Ford algorithm | &sect;22.1 |
| Dijkstra's algorithm | &sect;22.3 |
| Polynomial time (the definition of "efficient") | &sect;34.1 |
| Polynomial-time verification (P vs. NP) | &sect;34.2 |

<div class="why">
<strong>If you want to go deeper</strong> (not required this semester):
CLRS Chapter 21 (Minimum Spanning Trees - connecting every vertex as
cheaply as possible, a different optimization goal than shortest
path) and Chapter 23 (All-Pairs Shortest Paths - every vertex's
distance to every other, not just from one source) are the natural
next structures built on top of this week's single-source algorithms.
</div>

---

<!-- SLOT N+3: Summary (Act 4 / CLOSE) -->

# Summary

- **Dijkstra:** greedy, settle-and-never-revisit, $O((V+E)\log V)$ -
  correct *only* with non-negative weights, as the walkway edge showed.
- **Bellman-Ford:** relax every edge $V-1$ times, $O(VE)$ - correct
  even with negative weights, and its extra pass detects negative
  cycles outright.
- **P** = solvable in polynomial time. **NP** = a candidate solution
  is *verifiable* in polynomial time - not "unsolvable fast," the
  most common misreading.
- Shortest path is in P; the campus scavenger hunt is NP-hard - same
  campus, two very different kinds of problem.
- **New: Week 14 Check** - a short graded exercise on Dijkstra,
  Bellman-Ford, and P vs. NP, released now, due before Week 15
  begins, separate from Assignment 4 (see
  `materials/assignments/week14-check.html`).

---

# Summary, Continued

- **Reading:** CLRS, Chapter 22 - &sect;22.1 (Bellman-Ford), &sect;22.3
  (Dijkstra); Chapter 34 - &sect;34.1 (polynomial time), &sect;34.2
  (polynomial-time verification).
- **Prepare:** work through Week 15's full practice set (seven
  questions, Weeks 9-14) without looking at the answers first.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
