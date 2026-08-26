<!--
Running case study: CampusNav - a fictional DEU campus wayfinding &
scheduling assistant app, whose story supplies the worked example for
each week's technique. Not software the class develops - a recurring
illustration, revisited from a new angle each week. Update this file
whenever a week adds a feature/state; copy the *current* snapshot into
that week's worked-example slide so decks stay self-contained (Marp
has no live includes).
-->

## The premise (introduced Week 1)

New DEU students get lost constantly: wrong building, wrong room,
missed the first ten minutes of class. In the story, a senior project
team sets out to build **CampusNav**, a campus assistant app - but v0
is just a kiosk map and a printed room list, so finding anything still
means scanning by eye or asking a stranger. Each week's technique
becomes the next chapter of the story: the actual algorithms behind
CampusNav.

## Feature state, by week

- **Week 1:** the premise only, introduced briefly as course framing -
  a printed room list, scanned by eye or by asking around, with no
  guarantee of correctness or speed. No technique taught yet; Week 1
  is the course contract (grading, policy, schedule).
- **Week 2:** "find room 성파703" is written as an actual algorithm
  for the first time - checked against the five properties
  (finiteness, definiteness, input, output, effectiveness). Vague
  steps like "look around until you find it" are rejected.
- **Week 3:** the first real scale-up illustration - ~40 rooms for one
  building, ~1,200 campus-wide, 10,000+ once partner campuses merge in.
  CampusNav's room list is timed at the 1,200-room scale and its
  growth reasoned about with Big-O - motivates that "add more
  features" will not scale if every one of them is O(n²) by default.
  This is the numeric anchor every later week's directory-size figures
  build on.
- **Week 4:** a "multi-stop tour" feature (visit the library, then the
  gym, then a friend's dorm) is naturally recursive - total walking
  time = first leg + recursive time for the rest. Counting *all
  possible tour orders* recursively is traced and shown to blow up
  exponentially - a problem CampusNav will need to solve properly
  later (Week 11).
- **Weeks 5-6:** the room directory needs to be sorted for the UI
  (alphabetical building list) and, as CampusNav adds the full campus
  (not just one building), sorted fast enough that adding more rooms
  doesn't visibly slow the app down. Basic sorts (Weeks 5) are traced
  by hand on a small sample directory, then replaced with merge
  sort/quicksort (Week 6) once the full 1,200-entry directory is used.
- **Week 7:** with the directory finally *sorted*, room lookup becomes
  binary search - CampusNav's "jump to room" feature goes from
  scanning up to 1,200 entries to about 11 comparisons.
- **Week 9:** two D&C features: (a) "best free-time block" - a
  student's day is encoded as +1 (free) / -1 (busy) per 10-minute
  slot; the longest, most useful contiguous free block is the maximum
  subarray problem; (b) a "how many ways can I take a 20-step
  shortcut, 1 or 2 steps at a time" counter is sped up with fast
  exponentiation-style halving (also previews Week 11's climbing-stairs
  DP from the other direction - same numbers, different technique).
- **Week 10:** CampusNav's **room-booking assistant** - many clubs
  request the same seminar room; a greedy earliest-finish-time
  scheduler maximizes the number of bookings granted. Separately,
  CampusNav's gamified **"campus points"** reward system uses a
  deliberately non-standard point-denomination set {1, 3, 4} to make
  greedy change-making *fail*, motivating that not everything greedy
  touches is safe.
- **Week 11:** the **Tour Planner** - given a free block between
  classes (from Week 9) and a list of nearby activities each with a
  duration and an enjoyment score, maximize total enjoyment without
  running late (a rod-cutting-shaped knapsack). The "20-step shortcut"
  counter from Week 9 reappears, now solved properly as a DP
  (climbing-stairs), with its recursion tree from Week 4 finally fixed.
- **Week 12:** a **"find a study buddy"** feature compares two
  students' weekly course-code sequences and finds the longest
  common subsequence of shared courses - CampusNav's actual matching
  algorithm.
- **Week 13:** CampusNav finally represents the **whole campus as a
  graph** - buildings and junctions as nodes, walkways as weighted
  edges (walking minutes) - and picks adjacency list over matrix once
  the real campus's sparse walkway network is shown numerically.
- **Week 14:** the flagship feature, **"Get Directions"**, is Dijkstra
  over the Week 13 graph. A "covered-walkway credit" gamification
  idea (negative edge weight, rainy-day incentive) is used to show
  Dijkstra breaking, motivating Bellman-Ford. The final sidebar asks
  whether CampusNav could also plan a **single campus-wide scavenger
  hunt route visiting every building exactly once** - and why that
  turns out to be a fundamentally different (NP-hard) kind of problem
  than shortest path.

## Small campus graph used from Week 13 onward

Six locations, reused across Weeks 13-14 so both decks stay visually
consistent (same node layout, same edge weights in minutes):

```
Gate(G) --3-- Library(L) --2-- CS-Building(C)
 |             |                |
 4             5                2
 |             |                |
Dorm(D) --6-- Gym(Y) ----3---- Cafeteria(F)
```

Edges (undirected unless noted): G-L 3, G-D 4, L-C 2, L-Y 5, D-Y 6,
Y-F 3, C-F 2. Week 14's negative-edge counterexample adds one
directed "covered walkway" edge F→L weight −4 (a shortcut credit),
which is exactly what breaks Dijkstra.
