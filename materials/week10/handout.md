# Week 10 Handout - Greedy Algorithms

Computer Algorithms (506994-002). Keep this handout. It has the full
glossary, the room-booking exchange-argument proof spelled out in
full, the campus-points coin-change failure walked through in detail,
the fairness discussion, extra reading, and practice problems with
answers.

---

## Part 1: Glossary (all key terms, in plain words)

| Term | Plain definition |
|---|---|
| **Greedy algorithm** | Builds a solution step by step, always making the choice that looks best *right now*, and never revisiting that choice. |
| **Greedy-choice property** | A globally optimal solution can always be reached by making the locally optimal choice first. |
| **Optimal substructure** | An optimal solution to the whole problem contains, inside it, an optimal solution to the smaller subproblem left after the first choice. Shared with dynamic programming (Week 11). |
| **Feasible solution** | Any solution that satisfies the problem's constraints (e.g. no two granted bookings overlap), whether or not it's the *best* one. |
| **Exchange argument** | A proof technique: show that any optimal solution can have its first choice swapped for the greedy algorithm's choice without making it worse. Used to prove a greedy rule safe. |
| **Interval scheduling / activity selection** | The problem of choosing the maximum number of non-overlapping intervals (time requests) from a larger set. CLRS calls this "activity selection." |
| **Counterexample** | A single input that disproves a general claim. One is enough to break "greedy always finds the optimal solution." |
| **Denomination** | One of the fixed values a change-making/token system is allowed to use, e.g. {1, 3, 4} campus points. |
| **Huffman coding** | A greedy algorithm that builds an optimal compression code by repeatedly merging the two lowest-frequency symbols. |
| **Fairness trade-off** | A design tension where the choice that's most efficient at a stated goal (e.g. maximum bookings granted) is not necessarily the fairest choice across different kinds of requests. |

---

## Part 2: The Worked Examples, Step by Step

### 2a. The Room-Booking Scheduler and Its Exchange-Argument Proof

**The problem.** CampusNav's shared seminar room in 성파관 can host
only one club at a time. Given $n$ requests, each with a start time
and an end time, choose the **maximum number** of non-overlapping
requests to grant.

**The greedy rule.** Sort all requests by **end time**, ascending.
Walk through them in that order; grant a request if and only if its
start time is at or after the end time of the most recently granted
request.

```text
BOOK_ROOM(requests):
    sort requests by end time, ascending
    granted = {}
    lastEnd = -infinity
    for each request r in sorted order:
        if r.start >= lastEnd:
            add r to granted
            lastEnd = r.end
    return granted
```

**Why should we trust this?** "It worked on the five requests I
traced in class" is not a proof - Week 2's `MAX` bug already
established that testing shows the *presence* of correctness on tried
inputs, never its *absence* on the rest. We need a proof that holds
for every valid input. That proof is an **exchange argument**.

**The proof, in full.**

Let $G$ be the set of bookings the greedy algorithm grants, and let
$O$ be *any* optimal solution - that is, any feasible (non-overlapping)
set of bookings with the maximum possible size.

*Claim:* $G$ is also optimal, i.e. $|G| = |O|$.

*Step 1 - identify the first disagreement.* Sort every request by end
time. Let $g$ be the first request greedy grants. By construction of
the algorithm, $g$ has the **earliest end time of any request in the
entire input** - it is the very first request the sorted loop
considers, and the loop only skips a request when it conflicts with
something already granted; since nothing has been granted yet when the
loop reaches $g$, greedy grants it. If $O$ also contains $g$ as its
first (earliest-starting-after-nothing) booking, greedy and $O$ agree
on this choice, and we move to the next one. Otherwise, let $o$ be the
request $O$ grants that would have been greedy's first choice's
"competitor" - formally, the request in $O$ whose slot greedy's choice
$g$ could occupy - and assume $o \ne g$.

*Step 2 - the exchange is always safe.* Because $g$ has the earliest
end time of *any* request in the whole input, in particular
$\text{end}(g) \le \text{end}(o)$. Construct a new solution $O'$ by
removing $o$ from $O$ and inserting $g$ in its place:
$O' = (O \setminus \{o\}) \cup \{g\}$.

We must check $O'$ is still feasible (non-overlapping). Every other
request already in $O$ starts *after* $o$ ends, because $O$ is a valid
non-overlapping schedule and $o$ was one of its members. Since
$\text{end}(g) \le \text{end}(o)$, every one of those requests also
starts *after* $g$ ends. So swapping $o$ for $g$ introduces no new
conflict. $O'$ is feasible.

*Step 3 - no loss.* $O'$ has exactly the same number of bookings as
$O$ (one removed, one added), so $O'$ is optimal too - and now $O'$
agrees with greedy on the first choice.

*Step 4 - induction.* The requests remaining after $g$'s end time form
a smaller instance of the exact same problem. By the same argument
applied to this smaller instance (formally, induction on the number of
requests), greedy's second choice can be exchanged into $O'$ without
loss, its third choice into the result of *that* exchange, and so on.

*Conclusion.* Every one of greedy's choices can be exchanged into some
optimal solution without ever decreasing the number of bookings
granted. Since we can transform $O$ into exactly $G$ this way without
ever losing a booking, $|G| \ge |O|$. Since $O$ was already optimal (no
feasible solution can beat it), $|G| = |O|$. **Greedy is optimal.** $\blacksquare$

**What made this proof work - and why it won't always.** The proof
leaned on one specific fact: because $g$ has the earliest end time of
*anything* in the input, swapping it in can never create a new
conflict with what comes later. That fact is what "greedy-choice
property" means here, precisely. Section 2b shows a problem where the
locally best-looking choice has **no** such guarantee.

### 2b. Campus Points: The {1, 3, 4} Coin-Change Failure, in Detail

**The problem.** CampusNav's gamified "campus points" reward system
lets students spend earned points in fixed-value tokens at the campus
store. To keep the token design simple, the team picked denominations
**{1, 3, 4}** - deliberately not the familiar {1, 5, 10, 25}-style set
most currency systems use. Checkout needs to give a student **exactly
6 points** of credit using as **few tokens as possible**.

**The greedy attempt.** Reuse the room-booking trick: at each step,
take the largest denomination that still fits without exceeding the
remaining target.

| Step | Remaining target | Largest token that fits | Tokens used so far |
|---|---|---|---|
| 1 | 6 | 4 (6 ≥ 4) | {4} |
| 2 | 2 | 1 (4 and 3 don't fit; 2 ≥ 1) | {4, 1} |
| 3 | 1 | 1 | {4, 1, 1} |
| 4 | 0 | - done | {4, 1, 1} |

**Greedy result: 4 + 1 + 1 = 6, using 3 tokens.**

**The optimal answer.** Check the alternative directly: $3 + 3 = 6$,
using only **2 tokens**. Greedy's answer is *feasible* (it does sum to
6) but not *optimal* (a strictly better feasible answer exists).

**Exactly where greedy goes wrong.** At step 1, greedy takes the
largest denomination, 4, because "4 fits and is the biggest option" -
the local best-looking move. But taking a 4 leaves a remainder of 2,
and **no combination of {1, 3, 4} can make 2 in fewer than two
tokens** (two 1s). Taking a 3 instead at step 1 would have left a
remainder of 3 - makeable in exactly **one** token (another 3). The
greedy rule has no way to see that far ahead; it only ever looks at
"what's the biggest piece I can place right now," never at "which
choice leaves the *easiest* remainder."

**Why this is a genuine counterexample, not a fluke.** One
counterexample is sufficient to disprove a universal claim. It does
not matter that greedy succeeds on many other targets with this same
denomination set (try target = 8: greedy takes 4, then 4 again, for 2
tokens total - which *is* optimal). "Sometimes right" is not "always
right," and a change-making system that is wrong even once, silently,
on a real target its own users will hit (6 is not an unusual balance
to reach) is a real bug, not a theoretical curiosity. Contrast this
with the *standard* denomination sets many real currencies use (like
{1, 5, 10, 25} US cents), which are specifically structured so that
greedy change-making always is optimal - a property that has to be
checked, not assumed, for any new denomination set.

**Connecting back to the two properties.** The campus-points problem
still has **optimal substructure**: the optimal way to make 6 does
contain, inside it, the optimal way to make some smaller remainder
(e.g. the optimal 2-token answer for 6 contains the optimal 1-token
answer for 3). What it's missing is the **greedy-choice property** -
unlike room-booking's $g$, taking the locally largest denomination
does *not* guarantee it belongs to some optimal solution. A problem
having optimal substructure but not the greedy-choice property is
exactly the situation Week 11's dynamic programming is built to
handle: instead of committing to one local choice, DP keeps every
"remainder" option's best answer computed and available, so it never
has to guess which local move leaves the easiest remainder.

---

## Part 3: The Fairness Discussion, and Optional Reading

### Efficiency vs. fairness in the room-booking scheduler

The exchange-argument proof in Part 2a is airtight *for the goal it
was written to prove*: maximizing the number of bookings granted. But
"maximizes throughput" and "treats every requester fairly" are
different goals, and a scheduler can be provably optimal at the first
while doing badly at the second.

Concretely: earliest-finish-time greedy systematically favors
**short** requests. A three-hour workshop request competes for the
same room against three separate one-hour requests scheduled around
it - and because each of the three short requests frees the room
sooner, they will tend to win out over the long one whenever there's
a conflict, even though granting the long request might arguably serve
the requesting club just as well or better. Over a semester, a club
that only ever needs long, complex bookings (a full rehearsal block, a
multi-hour competition prep session) could find itself rejected far
more often than clubs that only need short slots - not because of any
malicious rule, but as a direct, structural consequence of optimizing
for booking *count* rather than booking *value* or *fairness across
request types*.

This is not a flaw in the proof - the proof is correct about what it
proves. It is a reminder that **choosing the optimization target is a
design decision**, separate from proving the chosen target is met
efficiently. A team shipping this feature has to decide, deliberately,
whether raw throughput is the right thing to optimize, or whether some
weighting (by request duration, by how rarely a club requests the
room, by a fairness quota) should adjust the rule - and that decision
is not one the algorithm can make on its own.

### Optional reading: where this course is headed

| Weeks | What gets formalized |
|---|---|
| 9 | Divide-and-conquer: independent subproblems, solved recursively and merged |
| 10 | Greedy: one local choice, proved safe (or shown unsafe) - this week |
| 11-12 | Dynamic programming: keeps every possibly-optimal option alive, for problems where no single local choice is provably safe |
| 13-14 | Graphs and shortest paths - several classic graph algorithms (Kruskal's MST, Dijkstra) are themselves greedy algorithms, provable the same way |

If you want to go further this week: CLRS §16.4 formally defines
matroids, the general structure that explains *why* some problems
(like room-booking) always admit a safe greedy algorithm, and others
(like arbitrary coin denominations) do not. Not required, but it
answers "is there a shortcut to knowing in advance?" more precisely
than this week's slides could.

---

## Part 4: Practice Problems (with answers)

Try each problem yourself before checking the answer.

**1.** CampusNav's room-booking scheduler grants requests {B, C, E}
from the five-request in-class example (see slides). Suppose a sixth
request, F (09:45–10:05), arrives. Does adding F change the greedy
result? Walk through it.

> **Answer:** Re-sort by end time with F included: B (10:00), F
> (10:05), A (10:30), C (11:00), E (12:00), D (12:15). Greedy grants B
> first (lastEnd = 10:00). F starts at 09:45, before 10:00 - conflicts,
> skipped. The rest proceeds exactly as before: A skipped, C granted
> (lastEnd = 11:00), E granted (lastEnd = 12:00), D skipped. Result is
> still {B, C, E} - F simply never had a chance to be granted, since it
> conflicts with the already-optimal first pick.

**2.** True or false: if a greedy algorithm produces the correct
(optimal) answer on 100 different test inputs, it has been proven
correct.

> **Answer:** False. Just as with any algorithm (Week 2's `MAX` bug),
> passing many tests shows the *absence* of a bug on those specific
> inputs, never on all possible inputs. The campus-points example
> succeeds on target = 8 and fails on target = 6 with the exact same
> denominations and the exact same algorithm - a handful of successful
> tests would have missed the failure entirely. Only a proof (like the
> exchange argument) covers every valid input.

**3.** For denominations {1, 3, 4}, use greedy change-making on target
= 9. What does greedy produce, and is it optimal? Show your work.

> **Answer:** Greedy: take 4 (remaining 5), take 4 again (remaining
> 1), take 1 (remaining 0) → 4 + 4 + 1 = 9, using 3 tokens. Check for
> better: 3 + 3 + 3 = 9 also uses 3 tokens; no 2-token combination sums
> to 9 (the largest possible with 2 tokens is 4 + 4 = 8). So greedy's
> answer *is* optimal here - another reminder that greedy sometimes
> succeeds on this denomination set, which is exactly why testing
> alone can't be trusted to catch the target = 6 failure.

**4.** A classmate proposes a different greedy rule for room-booking:
"always grant whichever remaining request has the **shortest
duration**." Construct a small counterexample (3-4 requests) where
this rule grants fewer bookings than the earliest-finish-time rule.

> **Answer:** One concrete construction: Request A (09:00-09:50,
> duration 50 min), Request B (09:40-10:00, duration 20 min - the
> *shortest* of the three), and Request C (09:50-10:40, duration 50
> min).
>
> - A and B overlap (09:40-09:50). B and C overlap (09:50-10:00). A
>   and C do **not** overlap - A ends exactly when C starts, so both
>   can be granted together.
> - **Shortest-duration-first** grants B first (20 min, the shortest).
>   Both A and C conflict with B, so nothing else can be granted -
>   **1 request total**.
> - **Earliest-finish-time-first** grants A first (finishes 09:50,
>   earliest of the three). B conflicts with A and is dropped; C does
>   not conflict with A, so it is granted too - **2 requests total**
>   (A and C).
>
> Shortest-duration-first strictly underperforms earliest-finish-time
> here (1 grant vs. 2) because the shortest request happens to sit in
> the middle, conflicting with two requests that are themselves
> compatible with each other.

**5.** In the exchange-argument proof (Part 2a), which single fact
about $g$ (greedy's first choice) is the one the entire safety
argument depends on?

> **Answer:** That $g$ has the **earliest end time of any request in
> the whole input** - that single fact is what guarantees
> $\text{end}(g) \le \text{end}(o)$ for whatever request $o$ it
> replaces, which in turn is what guarantees the swap never introduces
> a new conflict with the rest of the schedule.

**6.** Explain, in one or two sentences, why "optimal substructure"
alone was not enough to save the campus-points greedy attempt.

> **Answer:** Optimal substructure only guarantees that an optimal
> solution to the whole problem is built from optimal solutions to
> smaller pieces - it says nothing about whether picking the
> *locally* best-looking piece first (the greedy-choice property) is
> guaranteed to be part of one of those optimal solutions. Campus
> points has the first property but not the second: the optimal
> 6-point answer is built from the optimal 3-point answer, but greedily
> grabbing a 4 first is never part of that optimal path.
