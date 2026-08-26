# Week 14 Worksheet - Shortest Path

Computer Algorithms (506994-002). Work with your neighbor (pair work).
Write your names here:

Name 1: _______________________  Name 2: _______________________

CampusNav's six-location graph, source = Gate (G):

```
Gate(G) --3-- Library(L) --2-- CS-Building(C)
 |             |                |
 4             5                2
 |             |                |
Dorm(D) --6-- Gym(Y) ----3---- Cafeteria(F)
```

Edges (undirected, walking minutes): G-L 3, G-D 4, L-C 2, L-Y 5,
D-Y 6, Y-F 3, C-F 2.

---

## Worksheet Part A (~15 minutes) - Dijkstra by Hand

Hand-simulate Dijkstra's algorithm from Gate. At each round, write
down which vertex you settle and update the distance table.

**A1. Fill in the distance table, one round at a time.** Start with
Gate = 0 and everything else = ∞. After each round, write the
*updated* distances (leave a cell unchanged if nothing improved it).

| Vertex | Round 0 (init) | Round 1 | Round 2 | Round 3 | Round 4 | Round 5 | Round 6 |
|---|---|---|---|---|---|---|---|
| Gate | 0 | | | | | | |
| Library | ∞ | | | | | | |
| Dorm | ∞ | | | | | | |
| CS-Building | ∞ | | | | | | |
| Gym | ∞ | | | | | | |
| Cafeteria | ∞ | | | | | | |

**A2. Settlement order.** Write, in order, which vertex got settled
in each round:

Round 1: _______ Round 2: _______ Round 3: _______
Round 4: _______ Round 5: _______ Round 6: _______

**A3. Explain one "no update" round.** Find at least one round in
your trace where relaxing an edge did **not** improve a distance.
Which edge was it, and what was the candidate distance that got
rejected?

_____________________________________________________________
_____________________________________________________________

**A4. Final answer.** What is the shortest distance from Gate to the
Cafeteria, and what is the actual route (list the vertices in
order)?

Distance: _______   Route: _____________________________________

---

## Worksheet Part B (~15 minutes) - When Dijkstra Breaks

CampusNav's design team adds a one-way "covered walkway" shortcut
credit: **Cafeteria → Library costs −4 minutes** (directed - it only
applies in that direction).

**B1. Re-run Dijkstra with the new edge.** Using your Part A trace as
a starting point, mark clearly: in which round does Dijkstra *settle*
Library? In which round does Dijkstra first *discover* the new
Cafeteria → Library edge (i.e. which round settles Cafeteria)?

Library settled in round: _______   Cafeteria settled in round: _______

**B2. Does Dijkstra ever use the new edge?** Standard Dijkstra only
relaxes edges going *into* vertices that are still unsettled. Given
your answer to B1, does Dijkstra ever actually check the Cafeteria →
Library edge as a way to *improve* Library's distance? Why or why
not?

_____________________________________________________________
_____________________________________________________________

**B3. Compute the "what if" by hand.** What distance to Library would
the Cafeteria → Library edge *offer*, if Dijkstra did check it? (Use
Cafeteria's final distance from Part A.) Is this offer better than,
worse than, or equal to Library's actual settled distance?

Offer: _______   Compared to settled distance: (circle one) better / worse / equal

**B4. The danger, in your own words.** Even though the numbers in B3
came out the way they did, explain in 2-3 sentences why relying on
Dijkstra with a negative edge present is still risky in general.
(Hint: what would happen to the loop Library → CS-Building →
Cafeteria → Library if the shortcut credit were −5 instead of −4?)

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

**B5. Run Bellman-Ford instead.** Relax every edge (both directions
of each walkway, plus the one-way −4 edge) once, then check: did
anything change compared to your Part A table? How many total rounds
would you need to run to be **guaranteed** correct, regardless of
edge order, for a 6-vertex graph?

Anything changed after round 1? _______   Guaranteed-correct rounds needed: _______

---

<!-- ============================================================ -->
<!-- Instructor Answer Key - do not hand out this section -->
<!-- ============================================================ -->

## Instructor Answer Key - do not hand out this section

### Part A

- **A1 / A2.**

  | Vertex | R0 | R1 | R2 | R3 | R4 | R5 | R6 |
  |---|---|---|---|---|---|---|---|
  | Gate | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
  | Library | ∞ | 3 | 3 | 3 | 3 | 3 | 3 |
  | Dorm | ∞ | 4 | 4 | 4 | 4 | 4 | 4 |
  | CS-Building | ∞ | ∞ | 5 | 5 | 5 | 5 | 5 |
  | Gym | ∞ | ∞ | 8 | 8 | 8 | 8 | 8 |
  | Cafeteria | ∞ | ∞ | ∞ | ∞ | 7 | 7 | 7 |

  Settlement order: R1=Gate, R2=Library, R3=Dorm, R4=CS-Building,
  R5=Cafeteria, R6=Gym. Accept a trace that reaches the same final
  numbers and settlement order even if intermediate columns are
  written slightly differently (e.g. combining rounds), as long as
  the reasoning is sound.
- **A3.** Two valid examples: (1) Round 3, relaxing Dorm→Gym offers
  4+6=10, not better than Gym's existing 8 - rejected. (2) Round 5,
  relaxing Cafeteria→Gym offers 7+3=10, not better than Gym's
  existing 8 - rejected. Accept either (or both).
- **A4.** Distance = **7**. Route: **Gate → Library → CS-Building →
  Cafeteria**.

### Part B

- **B1.** Library settled in **round 2**. Cafeteria settled in
  **round 5** - three rounds later.
- **B2.** No. Standard Dijkstra only relaxes edges into vertices that
  are still unsettled; Library was already settled in round 2, three
  rounds before the Cafeteria→Library edge is even discovered in
  round 5. The algorithm never performs this comparison at all - it
  is structurally excluded, not just numerically rejected.
- **B3.** Offer = 7 + (−4) = **3**. Compared to Library's settled
  distance (3): **equal** (a tie).
- **B4.** Accept any answer that captures: the tie here is a
  coincidence of these specific numbers (the loop Library→CS-Building
  →Cafeteria→Library sums to exactly 2+2−4=0). If the credit were
  −5 instead of −4, that loop would sum to −1 - a **negative cycle**
  - and you could walk it forever, reducing "distance to Library"
  without bound; Dijkstra has no way to detect this and would give a
  wrong, finite answer with no warning. Relying on a tie working out
  is not the same as the algorithm being correct.
- **B5.** Nothing changes after round 1 in this graph - with the
  natural edge order, Bellman-Ford already reaches the final,
  correct distances (G=0, L=3, D=4, C=5, F=7, Y=8) after a single
  pass, and every subsequent round (including the extra check pass)
  confirms no further improvement and no negative cycle. Guaranteed-
  correct rounds needed for any 6-vertex graph, regardless of edge
  order: **V − 1 = 5** (plus one more pass if you want to confirm no
  negative cycle exists).
