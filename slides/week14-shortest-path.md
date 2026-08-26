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
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
</div>

<!--
notes: Open with: "Last week CampusNav learned to draw the whole campus as a graph. This week it finally learns to answer the one question everyone actually asks a map app: what's the fastest way from here to there?" This is also the last new-content week - Week 15 is the final exam, covering Weeks 9-14.
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

<!-- NEW: warm-up, placed right after the roadmap (slot 2) per course design -->

# Before We Start: Two Routes to the Library

<div class="thread">A quick warm-up. No algorithm needed yet.</div>

You're standing at the Gate. A friend says "go through the Dorm and
the Gym, it's more scenic." Another friend says "just cut past the
CS Building, it's faster." Neither has actually timed it.

- Both routes are made of segments you already know the walking time
  for (you memorized them from the campus map last week).
- Without walking both routes, how would you figure out - for sure,
  not by guessing - which one is actually shorter?

<!--
notes: Let students think for 20 seconds. Someone will usually say "add up the segments." Push further: "What if there are five routes, not two? Fifty?" Do not name "Dijkstra" yet.
-->

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

<!-- NEW: Key Words Today, session 1 -->

# Key Words Today

- **Shortest path:** the minimum-total-weight way to get from one vertex to another along the graph's edges.
- **Source vertex:** the fixed starting point a single-source shortest-path algorithm computes distances *from*.
- **Weighted graph:** a graph where every edge carries a cost (here: walking minutes), not just a yes/no connection.
- **Tentative distance:** the *best known so far* cost to reach a vertex - may still improve as the algorithm runs.

<!-- notes: Read each term aloud. Say these four words are what today's whole first half is built from. -->

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# The Map Exists. The Directions Don't.

<div class="pain">

CampusNav now shows a beautiful map of the whole campus - every
building, every walkway, every junction, all connected correctly.
A first-year student opens it and taps "Get Directions: Gate to
CS Building." Nothing happens. There is no button that actually
computes a route. The student can *see* six or seven different paths
on the screen, all technically valid, and still has to guess which
one is fastest - by eye, the same way they'd guess at a printed
map. The graph CampusNav built last week can be looked at. It cannot
yet be *asked a question*.

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

<!-- _class: section -->

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

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: who actually invented this, and how does it work?</div>

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

<div class="why">
Both were solving the same underlying problem that shows up in
road networks, telephone routing, and - decades later - the internet
itself: given costs on connections, find the cheapest path through
the network.
</div>

---

<!-- SLOT 9: Core concept (Act 2 / GROUND) -->

# Single-Source Shortest Path: Definition

<div class="thread">Formal, now that the pain is fresh.</div>

> Given a weighted graph $G = (V, E)$ with edge weights $w(u, v)$ and
> a single **source vertex** $s$, the **single-source shortest path
> problem** asks: for every vertex $v \in V$, find the minimum total
> weight of any path from $s$ to $v$ - its **shortest-path
> distance**, written $\delta(s, v)$.

This is CampusNav's small six-location graph, reused from last week -
Gate is today's source:

<svg viewBox="0 0 620 240" width="560" height="216" xmlns="http://www.w3.org/2000/svg">
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

<!-- Act 3 / BUILD -->

# Dijkstra's Algorithm: The Greedy Idea

<div class="thread">Back to the warm-up: how do you find the shortest route without walking every one?</div>

1. Start at the source; its distance is 0, every other vertex starts at $\infty$.
2. Repeatedly pick the **unvisited** vertex with the smallest tentative distance - this one is now guaranteed final ("settled").
3. **Relax** every edge out of it: if going through it makes a neighbor's distance shorter, update that neighbor.
4. Repeat until every vertex is settled.

<div class="why">
Why is step 2 safe? Because every remaining edge weight is
**non-negative**, no unvisited vertex can later become cheaper than
the one currently smallest - nothing can subtract from a distance.
That single assumption is the whole algorithm's foundation, and
exactly what breaks later this week.
</div>

---

# Dijkstra's Algorithm: Pseudocode

```text
DIJKSTRA(G, w, source):
    for each vertex v in G.V:
        dist[v] = infinity
        prev[v] = NIL
    dist[source] = 0
    Q = all vertices in G.V, keyed by dist[]

    while Q is not empty:
        u = EXTRACT-MIN(Q)              // smallest tentative distance
        for each vertex v adjacent to u:
            if dist[u] + w(u, v) < dist[v]:
                dist[v] = dist[u] + w(u, v)
                prev[v] = u
                DECREASE-KEY(Q, v, dist[v])

    return dist, prev
```

`EXTRACT-MIN` is the "settle the closest unvisited vertex" step;
the inner loop is relaxation.

---

# Dijkstra Trace, Round 1: Settle Gate

<div class="thread">Source distance is 0 by definition. Everything else starts unknown.</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">Gate</div><div class="cell hl">0</div></div>
<div class="row"><div class="rowlabel">Library</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">Dorm</div><div class="cell">4</div></div>
<div class="row"><div class="rowlabel">CS-Bldg</div><div class="cell">&infin;</div></div>
<div class="row"><div class="rowlabel">Gym</div><div class="cell">&infin;</div></div>
<div class="row"><div class="rowlabel">Cafeteria</div><div class="cell">&infin;</div></div>
</div>

**Settled:** {Gate}. Relaxing Gate's edges: Library becomes 0+3=3,
Dorm becomes 0+4=4. Everything else is still unreachable so far.

---

# Dijkstra Trace, Round 2: Settle Library

<div class="thread">Smallest tentative distance among the unvisited: Library (3).</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">Gate</div><div class="cell">0</div></div>
<div class="row"><div class="rowlabel">Library</div><div class="cell hl">3</div></div>
<div class="row"><div class="rowlabel">Dorm</div><div class="cell">4</div></div>
<div class="row"><div class="rowlabel">CS-Bldg</div><div class="cell hl2">5</div></div>
<div class="row"><div class="rowlabel">Gym</div><div class="cell hl2">8</div></div>
<div class="row"><div class="rowlabel">Cafeteria</div><div class="cell">&infin;</div></div>
</div>

**Settled:** {Gate, Library}. Relaxing Library's edges: CS-Building
becomes 3+2=5, Gym becomes 3+5=8.

---

# Dijkstra Trace, Round 3: Settle Dorm

<div class="thread">Smallest tentative distance among the unvisited: Dorm (4).</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">Gate</div><div class="cell">0</div></div>
<div class="row"><div class="rowlabel">Library</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">Dorm</div><div class="cell hl">4</div></div>
<div class="row"><div class="rowlabel">CS-Bldg</div><div class="cell">5</div></div>
<div class="row"><div class="rowlabel">Gym</div><div class="cell">8</div></div>
<div class="row"><div class="rowlabel">Cafeteria</div><div class="cell">&infin;</div></div>
</div>

**Settled:** {Gate, Library, Dorm}. Relaxing Dorm's edges: Dorm→Gym
would offer 4+6=10 - **not** better than Gym's existing 8, so no
update. This is relaxation *failing* to improve something, which is
just as important to trace as when it succeeds.

---

# Dijkstra Trace, Round 4: Settle CS-Building

<div class="thread">Smallest tentative distance among the unvisited: CS-Building (5).</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">Gate</div><div class="cell">0</div></div>
<div class="row"><div class="rowlabel">Library</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">Dorm</div><div class="cell">4</div></div>
<div class="row"><div class="rowlabel">CS-Bldg</div><div class="cell hl">5</div></div>
<div class="row"><div class="rowlabel">Gym</div><div class="cell">8</div></div>
<div class="row"><div class="rowlabel">Cafeteria</div><div class="cell hl2">7</div></div>
</div>

**Settled:** {Gate, Library, Dorm, CS-Building}. Relaxing
CS-Building's edges: Cafeteria becomes 5+2=7.

---

# Dijkstra Trace, Round 5: Settle Cafeteria

<div class="thread">Smallest tentative distance among the unvisited: Cafeteria (7), not Gym (8).</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">Gate</div><div class="cell">0</div></div>
<div class="row"><div class="rowlabel">Library</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">Dorm</div><div class="cell">4</div></div>
<div class="row"><div class="rowlabel">CS-Bldg</div><div class="cell">5</div></div>
<div class="row"><div class="rowlabel">Gym</div><div class="cell">8</div></div>
<div class="row"><div class="rowlabel">Cafeteria</div><div class="cell hl">7</div></div>
</div>

**Settled:** {Gate, Library, Dorm, CS-Building, Cafeteria}. Relaxing
Cafeteria's edges: Cafeteria→Gym would offer 7+3=10 - not better than
Gym's existing 8, so no update.

---

# Dijkstra Trace, Round 6: Settle Gym - Done

<div class="thread">Only one unvisited vertex left.</div>

<div class="tracetable">
<div class="row"><div class="rowlabel">Gate</div><div class="cell hl2">0</div></div>
<div class="row"><div class="rowlabel">Library</div><div class="cell hl2">3</div></div>
<div class="row"><div class="rowlabel">Dorm</div><div class="cell hl2">4</div></div>
<div class="row"><div class="rowlabel">CS-Bldg</div><div class="cell hl2">5</div></div>
<div class="row"><div class="rowlabel">Cafeteria</div><div class="cell hl2">7</div></div>
<div class="row"><div class="rowlabel">Gym</div><div class="cell hl">8</div></div>
</div>

Every vertex is now settled. These six numbers are the **final,
proven-optimal** shortest distances from Gate - the shortest-path
tree is Gate→Library (3), Gate→Dorm (4), Library→CS-Building (5
total), CS-Building→Cafeteria (7 total), Library→Gym (8 total).

---

# Dijkstra's Complexity

<div class="thread">Why bother with a priority queue at all?</div>

- Each of the $V$ vertices is extracted from the priority queue
  exactly once: $O(V \log V)$.
- Each of the $E$ edges is relaxed at most once (when its tail
  vertex is settled), and each relaxation that improves a distance
  costs a `DECREASE-KEY`: $O(E \log V)$.

<div class="bignotation">O((V + E) log V)</div>

with a binary-heap priority queue. On CampusNav's real campus graph
(sparse - a junction connects to only a handful of walkways, not
every other junction), this is dramatically faster than checking
every possible route by hand, which grows exponentially with the
number of stops.

---

<!-- NEW: worksheet hand-off -->

# Now: Worksheet Part A

<div class="thread">Time to run the algorithm yourself.</div>

Work with your neighbor. Open **[Worksheet Part
A](materials/week14/worksheet.html)** and hand-simulate Dijkstra's
relaxation steps on this same campus graph, from Gate, filling in the
distance table round by round.

**~15 minutes.** Raise your hand if a relaxation doesn't match.

<!--
notes: Walk the room while pairs work. After 15 minutes, ask one pair to read out their final distance table and compare against the slide trace above.
-->

---

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: the one thing that breaks everything you just learned.</div>

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

<svg viewBox="0 0 620 240" width="520" height="200" xmlns="http://www.w3.org/2000/svg">
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

<div class="pain">
Shave the shortcut credit by one more minute (−5 instead of −4) and
the loop Library→CS-Building→Cafeteria→Library costs 2+2+(−5) = −1
minute per lap: a <strong>negative cycle</strong>. "Shortest path to
Library" stops being a well-defined number - you could loop forever
and save time forever. Dijkstra has no mechanism to notice this at
all; it would simply report a wrong, finite answer.
</div>

---

# A Cleaner Example of the Same Failure

<div class="thread">Same mechanism, smaller graph, no lucky tie.</div>

Source $S$, with $S{\to}A = 2$, $S{\to}B = 5$, $A{\to}B = 1$, and one
more edge $B{\to}A = -4$ (directed).

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">Settle $S$ (0). Frontier: $A=2$, $B=5$.</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">Smallest is $A$ (2) - settle it. Relax $A{\to}B$: $B = \min(5, 2+1) = 3$.</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">Smallest is $B$ (3) - settle it, final. Dijkstra reports $\delta(S,B) = 3$.</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">But $B{\to}A$ was never relaxed <em>into</em> anything, because $A$ was already settled at step 2 - so this edge is irrelevant here. The true shortest path is still $S{\to}A{\to}B = 2+1=3$. Dijkstra is right this time <em>only because $A$ happened to settle before $B$</em> - swap which vertex is closer to $S$ and the same blind spot silently returns a wrong number.</div></div>
</div>

<div class="why">
The general, provable fact (this week's core misconception to avoid):
Dijkstra's correctness proof depends entirely on non-negative
weights. With even one negative edge, no amount of "it happened to
work here" is a guarantee.
</div>

---

# Bellman-Ford: The Idea

<div class="thread">If you can't trust "settle and never revisit," stop settling permanently.</div>

- Initialize distances exactly like Dijkstra: source = 0, everything
  else = $\infty$.
- Instead of picking one vertex at a time, **relax every edge in the
  graph**, in any order, once.
- Repeat that full pass **$V - 1$ times total**.
- No priority queue, no "settled" vertices - every distance stays
  open to improvement until the algorithm finishes, so a negative
  edge discovered late can still correct an earlier estimate.

---

# Bellman-Ford: Pseudocode

```text
BELLMAN-FORD(G, w, source):
    for each vertex v in G.V:
        dist[v] = infinity
        prev[v] = NIL
    dist[source] = 0

    for i = 1 to |G.V| - 1:                 // V-1 rounds
        for each edge (u, v) in G.E:
            if dist[u] + w(u, v) < dist[v]:
                dist[v] = dist[u] + w(u, v)
                prev[v] = u

    for each edge (u, v) in G.E:             // one more pass
        if dist[u] + w(u, v) < dist[v]:
            report "negative-weight cycle detected"

    return dist, prev
```

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

Rounds 2-5 change nothing - but Bellman-Ford has no way to know that
in advance, so it must always run all $V-1=5$ rounds to *guarantee*
this. Round 6 (the extra check) also finds no improvement: **no
negative cycle**, so these five numbers are confirmed final - matching
Dijkstra's answer here only because this particular −4 credit happens
to leave the Library–CS-Building–Cafeteria loop at exactly 0.

---

# Dijkstra vs. Bellman-Ford

| | Dijkstra | Bellman-Ford |
|---|---|---|
| Negative weights | **Unsafe** - can silently return the wrong distance | **Safe** - always correct if no negative cycle |
| Negative cycles | No detection at all | Detects them (one extra pass) |
| Strategy | Greedy - settle closest vertex, never revisit | Relax every edge, every round, nothing is final until the end |
| Time complexity | $O((V+E) \log V)$ with a priority queue | $O(VE)$ |
| When to use | Non-negative weights, need speed (e.g. real road networks) | Weights may be negative, or you need cycle detection |

<div class="why">
CampusNav's real walkway network never has negative weights - so
Dijkstra is what should actually ship. Bellman-Ford earns its keep
the moment *any* feature (like a shortcut credit) can make an edge
negative.
</div>

---

<!-- NEW: worksheet hand-off -->

# Now: Worksheet Part B

<div class="thread">Watch the failure and the fix, by hand.</div>

With the same partner, open **[Worksheet Part
B](materials/week14/worksheet.html)**: re-run Dijkstra on the campus
graph with the covered-walkway edge added, confirm where it stops
checking Library, then run Bellman-Ford on the same graph and compare.

**~15 minutes.**

---

<!-- _class: section -->

# P, NP, and NP-Completeness

<div class="driving-q">A different kind of question: which problems have *any* efficient algorithm at all?</div>

---

# P: Polynomial-Time Solvable

<div class="thread">The class shortest path belongs to.</div>

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

<div class="thread">The most common misconception in this entire topic - let's fix it directly.</div>

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

# Shortest Path Is in P

<div class="thread">Both directions hold for this week's problem.</div>

- **Solvable in P:** Dijkstra and Bellman-Ford both compute shortest
  distances in polynomial time, as just shown.
- **Also easy to verify:** given a candidate route from Gate to
  Cafeteria, checking it's valid and summing its weights takes time
  proportional to the route's length - trivially polynomial.

Shortest path is the easy case: efficiently *solvable*, which
automatically makes it efficiently *verifiable* too. Not every
problem CampusNav might want to solve is this well-behaved.

---

# The Campus Scavenger Hunt: NP-Hard

<div class="thread">Same campus graph, one extra constraint, a completely different kind of problem.</div>

CampusNav's events team pitches a new feature: a single scavenger
hunt route that visits **every** building on campus **exactly once**,
minimizing total walking distance.

- **Verifying** a proposed route is fast: check every building
  appears exactly once, sum the weights - polynomial time.
- **Finding** the optimal route is a different story: this is
  shaped exactly like the **Hamiltonian-path** / **Traveling
  Salesman** problem - no known algorithm solves it faster than
  roughly trying all orderings, which is *exponential* in the number
  of buildings.
- Knowing how to solve shortest path (one destination, no
  "visit-everything" constraint) does **not** help here - it's a
  fundamentally different shape of problem, believed to have no
  efficient algorithm at all.

---

# NP-Completeness and P =? NP

<div class="thread">The open question underneath all of this.</div>

- A problem is **NP-complete** if it's in NP *and* every other
  problem in NP can be transformed into it in polynomial time - the
  "hardest" problems within NP. The scavenger-hunt-shaped problem is
  in this category.
- **NP-hard** problems are at least as hard as NP-complete ones, even
  if they aren't themselves required to be in NP.
- Nobody has ever found a polynomial algorithm for *any* NP-complete
  problem - and nobody has proven one is impossible either.
  **P =? NP** is one of the most famous open problems in mathematics
  and computer science (a Clay Millennium Prize problem).
- If **any** NP-complete problem turned out to be in P, *every*
  problem in NP would be - including the scavenger hunt. So far, that
  has never happened.

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

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. On a small graph, why does Dijkstra never reconsider a vertex once it's been settled - and why does that assumption require non-negative weights?
2. Why does Bellman-Ford need exactly $V-1$ rounds (not more, not fewer) to guarantee correct distances, assuming no negative cycle?
3. Is "find the shortest route from Gate to CS-Building" in P, in NP, both, or neither? What about "find a scavenger-hunt route visiting every building exactly once"?

---

# Answers

1. A settled vertex's distance is treated as final because, with only non-negative weights left to explore, no future path through an unsettled vertex could ever be cheaper. A negative edge can violate exactly that assumption, letting a later-discovered path beat an already-"final" distance that Dijkstra will never re-check.
2. Any shortest path (with no negative cycle) is simple and therefore uses at most $V-1$ edges; round $k$ correctly resolves all shortest paths of $\leq k$ edges, so round $V-1$ resolves every possible shortest path in the graph, regardless of edge order.
3. Shortest path to CS-Building is in **P** (and therefore also in NP - solvable fast implies verifiable fast). The scavenger-hunt route is in **NP** (easy to verify) but believed **not** to be in P - it is NP-hard/NP-complete-shaped, with no known efficient algorithm.

---

<!-- NEW: quiz hand-off -->

# Now: Quick Self-Check Quiz

<div class="thread">Ungraded. Just for you, to see what stuck.</div>

Open the **[Week 14 Quiz](materials/week14/quiz.html)**. Answer on
your own, about 10 minutes. Check your own answers at the end.

<!--
notes: Distribute or project the quiz. After about 10 minutes, discuss as a group any question most of the class missed - the P/NP question in particular tends to need a second pass.
-->

---

<!-- _class: section -->

# Final Exam Blueprint

<div class="driving-q">Week 15 is the Final Exam. Here's exactly what it covers and how to prepare.</div>

---

# Final Exam: Scope and Format

<div class="thread">Not a surprise. Six weeks, one blueprint.</div>

- **Coverage:** Weeks 9-14 only - Divide & Conquer (Master theorem),
  Greedy Algorithms, Dynamic Programming I, Dynamic Programming II
  (LCS), Graph Representation, Shortest Path (Dijkstra, Bellman-Ford,
  P/NP).
- **Format:** same style as the midterm - a mix of short-answer,
  trace-by-hand, and proof-sketch questions, worth 25% of the final
  grade.
- **The best preparation:** the six practice questions on the next
  several slides span every topic above. Work each one out yourself
  *before* looking at its answer.

---

# Practice Q1 - Divide & Conquer

CampusNav's multi-stop tour recursion has recurrence
$T(n) = 2T(n/2) + O(n)$. Use the Master theorem to find $T(n)$'s
growth rate.

---

# Practice A1

Master theorem form $T(n) = aT(n/b) + f(n)$ with $a=2$, $b=2$,
$f(n) = O(n)$.

$n^{\log_b a} = n^{\log_2 2} = n^1 = n$, which matches $f(n) = \Theta(n)$ -
this is **Case 2** (the split-work and combine-work grow at the
same rate).

$$T(n) = \Theta(n \log n)$$

---

# Practice Q2 - Greedy Algorithms

CampusNav's room-booking scheduler receives these requests for one
seminar room, as (start, finish): A(1,4), B(3,5), C(0,6), D(5,7),
E(8,9), F(5,9). Using earliest-finish-time greedy, which requests get
the room, and how many total bookings?

---

# Practice A2

Sort by finish time: A(1,4), B(3,5), C(0,6), D(5,7), F(5,9), E(8,9).

- Pick **A** (1,4) - finish = 4.
- B(3,5): start 3 < 4 - reject. C(0,6): start 0 < 4 - reject.
- **D** (5,7): start 5 ≥ 4 - accept, finish = 7.
- F(5,9): start 5 < 7 - reject.
- **E** (8,9): start 8 ≥ 7 - accept.

**Result: A, D, E - 3 bookings.**

---

# Practice Q3 - Dynamic Programming I

A free block of 6 (10-minute units) and activities (duration,
enjoyment): Coffee (2,3), Club Fair (3,5), Quick Nap (1,1), Gallery
(4,6). Maximize total enjoyment without exceeding 6 units (0/1
knapsack).

---

# Practice A3

Total weight available if everything were chosen: 2+3+1+4=10 (over
budget), so some subset must be dropped. Checking combinations that
fit within capacity 6:

- Gallery + Coffee = 4+2 = 6 units, enjoyment 6+3 = **9**
- Club Fair + Nap + Coffee = 3+1+2 = 6 units, enjoyment 5+1+3 = **9**
- Club Fair + Gallery = 3+4 = 7 units - over budget, invalid

**Maximum enjoyment = 9** (e.g. Gallery + Coffee), found by the DP
table's standard "include vs. exclude" recurrence, same one used for
the Tour Planner in Week 11.

---

# Practice Q4 - Dynamic Programming II (LCS)

Student A's course sequence: [CS101, MATH201, ENG150, PHYS110].
Student B's: [MATH201, CS101, PHYS110, ART100]. Find the longest
common subsequence (shared courses, in the order each student has
them).

---

# Practice A4

Checking length-3 candidates: "MATH201, CS101, PHYS110" needs
MATH201 before CS101 in **both** sequences - true in B, but false in
A (CS101 comes first in A). No length-3 common subsequence exists.

Length-2 candidates that work in both orders: **{CS101, PHYS110}** -
in A, CS101 (pos 1) before PHYS110 (pos 4); in B, CS101 (pos 2)
before PHYS110 (pos 3). Both consistent.

**LCS length = 2**, e.g. CS101, PHYS110 - that's what CampusNav's
study-buddy matcher reports these two students share, in order.

---

# Practice Q5 - Graph Representation

CampusNav's full campus graph has $V = 50$ (buildings/junctions) and
$E = 140$ (walkways). Should CampusNav use an adjacency matrix or an
adjacency list? Justify with space complexity.

---

# Practice A5

- Adjacency **matrix**: $O(V^2) = 50^2 = 2{,}500$ cells, regardless
  of how many walkways actually exist.
- Adjacency **list**: $O(V + E) = 50 + 140 = 190$ entries total.

The graph is sparse - 140 actual edges against up to $\binom{50}{2} =
1{,}225$ possible undirected pairs, roughly 11% density. **Adjacency
list** is the right choice: it uses over 10× less space here, and
listing one vertex's neighbors is still fast - exactly the
Week 13 decision CampusNav actually made.

---

# Practice Q6 - Shortest Path & P/NP

(a) Run Dijkstra by hand from $S$ on: $S{-}A=2$, $S{-}B=5$, $A{-}B=1$,
$A{-}C=7$, $B{-}C=2$. Find $\delta(S, C)$.

(b) True or False, with a one-sentence justification: "The
campus-wide scavenger hunt is in P because we already know how to
solve shortest path efficiently."

---

# Practice A6

**(a)** Settle $S$(0). Frontier: $A=2, B=5$. Settle $A$(2); relax
$A{-}B$: $B = \min(5, 2+1)=3$; relax $A{-}C$: $C=\min(\infty,2+7)=9$.
Settle $B$(3); relax $B{-}C$: $C=\min(9,3+2)=5$. Settle $C$(5).

$$\delta(S, C) = 5 \quad \text{(path } S{\to}A{\to}B{\to}C\text{)}$$

**(b) False.** Shortest path solves "cheapest route between two
fixed points" - a single-destination problem. The scavenger hunt adds
a "visit every location exactly once" constraint, which is a
fundamentally different (Hamiltonian-path/TSP-shaped) problem;
solving one does not give an efficient algorithm for the other.

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
this week's shortest path and P/NP material - exactly the six
practice questions you just worked through.

---

<!-- SLOT N+3: Summary (Act 4 / CLOSE) -->

# Summary

- **Dijkstra:** greedy, settle-and-never-revisit, $O((V+E)\log V)$ -
  correct *only* with non-negative weights, as the covered-walkway
  edge showed concretely.
- **Bellman-Ford:** relax every edge $V-1$ times, $O(VE)$ - correct
  even with negative weights, and its extra pass detects negative
  cycles outright.
- **P** = solvable in polynomial time. **NP** = a candidate solution
  is *verifiable* in polynomial time - not "unsolvable fast," the
  most common misreading of the name.
- Shortest path is in P; the campus scavenger hunt is NP-hard -
  same campus, two very different kinds of problem.
- **Reading:** CLRS, Chapter 24 (Single-Source Shortest Paths) and
  Chapter 34 (NP-Completeness, skim).
- **Prepare:** rework all six final-exam practice questions from
  today without looking at the answers first. Bring questions to
  Week 15.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
