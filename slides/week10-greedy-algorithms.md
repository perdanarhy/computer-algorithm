---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 10: Greedy Algorithms

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
</div>

<!--
notes: Welcome the class. Ask: "Has a quick decision you made in the moment - the option that looked best right then - ever turned out worse once you saw the whole picture?"
Let a few students answer with a show of hands. That tension (locally best vs. globally best) is the whole week.
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
<div class="wk now"><div class="n">Wk 10</div><div class="t">Greedy Algorithms</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">Dynamic Programming I</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">Dynamic Programming II</div></div>
<div class="wk"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Point at the row. Say: "Nine weeks in. Today CampusNav learns to make a single, local, never-revisited choice - and we'll prove exactly when that's safe." -->

---

<!-- NEW: warm-up, placed right after the roadmap (slot 2) per course design -->

# Before We Start: Picking Events to Attend

<div class="thread">A quick warm-up. No code needed yet.</div>

It's a free Saturday. Six campus events look fun, but most overlap -
you can only attend one at a time.

- **Method A:** always pick whichever remaining event lasts the *shortest* amount of time.
- **Method B:** always pick whichever remaining event *ends soonest*.

- Which method lets you attend more events overall? Why might they give different answers?

<!--
notes: Give students 30 seconds to think, alone, before asking.
Do not name "greedy," "interval scheduling," or "earliest finish time" yet - let them describe their own reasoning first.
Most students guess A (shortest first); B is actually the safe rule, revealed properly later this week.
-->

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** CampusNav found its best free-time block with a maximum-subarray divide-and-conquer algorithm, and sped up its "N-step shortcut" counter by recursively halving the problem instead of counting one step at a time.
- **Last week left broken:** divide-and-conquer assumes a problem splits cleanly into independent left/right halves that can be solved separately and then merged - but not every problem is shaped like that. Some reward one purely local choice, made once, instead of a full recursive split.

<!-- notes: This is Week 9's Limit slide, restated. It becomes today's pain, made concrete next slide. -->

---

<!-- NEW: assignment announcement -->

# Assignment 3: Released This Week

- **Released:** today (Week 10). **Due:** Week 12, 23:59, via the course LMS. Individual work.
- **Tasks (preview):** (1) design a greedy room-booking rule and prove it safe with an exchange argument, (2) analyze last week's free-time-block divide-and-conquer recurrence with the Master theorem, (3) explain, in your own words, why the campus-points coin-change example breaks "greedy always works."
- Full spec and rubric: **`materials/assignments/assignment3.md`**.
- Task 1 asks you to run your algorithm on a specific 8-request instance - that instance is **Worksheet Part B**, today's in-class exercise. Keep your worksheet.

<!-- notes: Mention this once, clearly, then move on - don't let logistics eat into the pain slide's momentum. -->

---

<!-- NEW: Key Words Today, session 1 -->

# Key Words Today

- **Greedy algorithm:** builds a solution one locally-best choice at a time, and never revisits that choice.
- **Local choice:** the single best-looking option available right now, without checking how it affects later choices.
- **Optimal substructure:** a property where the best overall answer contains, inside it, the best possible answer to a smaller version of the same problem (shared with Week 11's dynamic programming).
- **Feasible solution:** any solution that satisfies the problem's constraints - e.g. no two granted bookings overlap - whether or not it's the *best* one.

<!-- notes: Read each term aloud once. Say: "greedy" gets a precise definition later this session; for now just recognize the words. -->

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# The Room-Booking Pile-Up

<div class="pain">

It's the Monday after midterms, and CampusNav's newest feature
request lands on the team's desk: a booking assistant for the one
shared seminar room in 성파관. By Wednesday afternoon there are 15
requests for Friday alone - the coding club, the debate society,
three different study groups - and most of them overlap. Someone on
the team tries the same trick that worked last week: split the pile
of requests in half, figure out the best picks in each half
separately, then merge the two halves back together. But merging is a
mess - a booking chosen from the left half runs right through one
chosen from the right half, so half the picks have to be thrown out
and re-decided by hand. By the time the merge is untangled, it's
Thursday night, and nobody is even sure the final list is the best
one possible - just the one that survived the untangling.

</div>

<!-- notes: Do not say "greedy," "recursion," or "algorithm design" yet. Let the class feel the mess first. -->

---

<!-- SLOT 5: Cost of not knowing -->

# What This Actually Costs

- A merge-and-untangle process that "happens to" produce a good-looking list is not the same as a list *proven* to grant the most bookings possible - nobody can even say how close to best it is.
- The untangling step gets worse, not better, as more clubs request the room - a process that takes an afternoon for 15 requests can take days once the whole campus's booking requests are involved.
- A silent mistake during untangling (missing one overlap) can double-book the room, and nobody finds out until two clubs show up to it at the same time.

<div class="why">
<strong>In industry:</strong> resource-scheduling problems - meeting
rooms, hospital operating rooms, CPU jobs, airline gates, ad-auction
slots - are among the most common real interview and systems-design
questions, precisely because the efficient, provably-optimal answer is
almost never "brute-force every combination" or "merge and hope."
</div>

---

# It Gets Worse As the Campus Gets Busier

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">One club's afternoon, 3 requests</div>
  <div class="bar-track"><div class="bar-fill risk-low" style="width: 15%"></div></div>
  <div class="bar-value">manageable by hand</div>
</div>
<div class="bar-row">
  <div class="bar-label">One busy Friday, 15 requests</div>
  <div class="bar-track"><div class="bar-fill risk-med" style="width: 55%"></div></div>
  <div class="bar-value">untangling eats hours, no proof it's best</div>
</div>
<div class="bar-row">
  <div class="bar-label">Festival week, 40+ requests, every room</div>
  <div class="bar-track"><div class="bar-fill risk-high" style="width: 92%"></div></div>
  <div class="bar-value">untangling by hand is no longer realistic</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: the point is the trend.</div>

A scheduler with no provable plan for this **will** either double-book
a room or quietly waste bookings it could have granted.

---

<!-- SLOT 6: Driving question -->

<!-- _class: section -->

# This Week's Question

<div class="driving-q">"When can a single, purely local choice - made once and never revisited - be proven to produce the best possible overall outcome, and when does that same trick provably fail?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. State the greedy-choice property and optimal substructure, and explain why a problem needs *both* for a greedy algorithm to be safe.
2. Design a greedy rule for an interval-scheduling problem and prove it safe using an exchange argument.
3. Construct a counterexample that shows a specific greedy rule fails to find the optimal solution.
4. Discuss the efficiency-vs-fairness trade-off a greedy scheduler introduces, and why "maximizes throughput" is not the same as "fair."

---

<!-- NEW: session-1 close, previews Worksheet Part A & B -->

# Coming Up: Worksheet Part A & B

<div class="thread">Next in this class: less listening, more doing.</div>

Later today, you and a partner will run CampusNav's actual
room-booking assistant by hand on a full Friday's worth of requests -
and go hunting for a case where a *different*, plausible-looking
greedy rule quietly fails.

That's **Worksheet Part A and B**. Keep a pen ready.

---

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: where did this idea come from, and what exactly does it promise?</div>

---

<!-- SLOT 8: Origin -->

# This Idea Is Not New

<div class="thread">You just felt the pile-up. Now: who else faced exactly this shape of problem?</div>

- Telephone exchanges in the mid-20th century needed to route as many
  calls as possible through a limited number of lines, deciding which
  calls to connect with no way to look ahead - the original
  interval-scheduling problem.
- In 1952, David Huffman, then a student at MIT, was offered a choice
  by his professor: solve an open problem on optimal binary codes, or
  sit the final exam. He found a purely greedy rule - repeatedly merge
  the two least-frequent symbols - and proved it always produces the
  shortest possible code. It's still called Huffman coding.
- Researchers spent decades afterward formalizing *why* some
  local-choice tricks are always safe (matroid theory, 1960s-70s) and
  why others - like change-making with arbitrary denominations - are not.

---

# The Pattern Behind All of Them

<div class="thread">Telephone exchanges, Huffman, matroid theory - one thread runs through all of it.</div>

<div class="why">
The pattern kept reappearing: some problems have a hidden structure
where "never look back" isn't a shortcut that risks wrongness - it's
provably the right move. This week is about learning to tell which is
which.
</div>

---

<!-- SLOT 9: Core concept -->

# Greedy Algorithm: Definition

<div class="thread">History hands us the trick. Now the precise version.</div>

> A **greedy algorithm** builds a solution step by step, at each step
> making the choice that looks best *right now* - and never
> reconsidering that choice - trusting that the sequence of
> locally-best choices adds up to a globally optimal solution.

A problem is safe for a greedy algorithm only when it has **both**:

- **Greedy-choice property:** a globally optimal solution can always be reached by making the locally optimal choice first.
- **Optimal substructure:** an optimal solution to the whole problem contains, inside it, an optimal solution to the smaller subproblem left after that first choice.

---

# A Property Greedy Shares With Next Week

<div class="thread">One of the two conditions above isn't unique to greedy at all.</div>

<div class="why">
Optimal substructure is not unique to greedy - Week 11's dynamic
programming leans on the exact same property. The difference is what
happens next: greedy commits to one local choice and never looks
back; DP keeps every option alive until it can prove which is best.
That distinction is exactly where next week's confusion starts.
</div>

---

<!-- NEW: Key Words Today, session 2 -->

# Key Words Today

- **Exchange argument:** a proof technique showing a greedy choice is safe by showing you can always swap it into any optimal solution without making that solution worse.
- **Interval scheduling:** choosing a maximum set of non-overlapping time intervals from a larger set - this week's room-booking problem, formally named.
- **Activity selection:** the classic textbook name (CLRS) for interval scheduling.
- **Counterexample:** a single input that disproves a general claim - one is enough to break "greedy always works."

<!-- notes: Read each term aloud. Say the exchange argument is the actual proof technique we build, step by step, this session. -->

---

<!-- Act 3 / BUILD -->

# What Makes a Problem Greedy-Amenable?

<div class="thread">Two properties, together - not just a hunch that "the obvious choice" will work.</div>

- Not every problem has both properties. A problem can have optimal
  substructure but *not* the greedy-choice property - the best local
  pick can still lead down a path that provably can't reach the
  optimal answer (this week's campus-points example, later).
- Checking both properties, usually via a proof, is what separates "I
  tried greedy and it seemed to work" from "greedy is *correct* here."
- CampusNav's room-booking problem turns out to have both. Let's build
  the greedy rule, then prove it.

---

# Worked Example: The Room-Booking Requests

CampusNav's seminar room in 성파관 can host only one club at a time.
Goal: grant the room to the **maximum number** of non-overlapping requests.

| Request | Club | Start | End |
|---|---|---|---|
| A | Coding Club | 09:00 | 10:30 |
| B | Debate Society | 09:30 | 10:00 |
| C | Robotics Team | 10:00 | 11:00 |
| D | Photography Club | 10:15 | 12:15 |
| E | Chess Club | 11:00 | 12:00 |

---

# The Greedy Rule: Earliest Finish Time

<div class="thread"><code>{}</code> is the empty set; <code>add r to granted</code> inserts <code>r</code> into it - set notation, previewed back in Week 2's reference card.</div>

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

- The rule: among whatever requests are still possible, always grant
  the one that **frees up the room soonest**.
- Why finish time, not start time or duration? Finishing soonest
  leaves the most room open for everything still to come.

---

# Trace: Running the Rule by Hand

<div class="thread">Same five requests. Let's run it.</div>

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">Sort by end time: B (10:00), A (10:30), C (11:00), E (12:00), D (12:15).</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">Consider B (09:30-10:00): room is free. Grant it. lastEnd = 10:00.</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">Consider A (09:00-10:30): starts before 10:00 - conflicts. Skip.</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">Consider C (10:00-11:00): starts at 10:00, free. Grant it. lastEnd = 11:00.</div></div>
<div class="step-row"><div class="step-num">5</div><div class="step-text">Consider E (11:00-12:00): starts at 11:00, free. Grant it. lastEnd = 12:00.</div></div>
<div class="step-row"><div class="step-num">6</div><div class="step-text">Consider D (10:15-12:15): starts before 12:00 - conflicts. Skip.</div></div>
</div>

**Result: {B, C, E} - 3 of 5 requests granted.** One sorted pass, no untangling.

---

# Why Trust This? Introducing the Exchange Argument

<div class="thread">It worked on one example. Week 2's `MAX` bug already taught us that isn't proof.</div>

- We need to show the greedy rule doesn't just look reasonable - it
  provably grants the **maximum possible** number of bookings, on
  every valid input, not just the five requests we happened to trace.
- The tool: an **exchange argument**. Take *any* optimal solution, and
  show you can always swap in the greedy algorithm's choice without
  making that solution any worse.
- If that swap always works, the greedy choice is "safe" - and
  repeating the argument on what's left proves the whole algorithm
  optimal.

---

# Exchange Argument: Setup

<div class="thread">Assume, for contradiction, that greedy and optimal disagree on the first pick (the contradiction move from Week 7).</div>

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">Let G be the greedy algorithm's solution, and let O be <em>any</em> optimal solution (one granting the maximum possible number of bookings).</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">Sort all requests by end time. Let g be the first request greedy grants - by construction, g has the earliest end time of any request in the whole input.</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">If O also grants g first, greedy and optimal already agree - nothing to prove yet; move to the next pick.</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">Otherwise, let o be the first request O grants, and by assumption o &ne; g.</div></div>
</div>

---

# Exchange Argument: The Swap

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">Because g has the earliest end time of any request in the input, end(g) &le; end(o).</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">Build O' by removing o from O and inserting g instead. Every other request in O starts after o ends (O is a valid, non-overlapping schedule) - and since end(g) &le; end(o), every one of those requests also starts after g ends. So O' is still valid and non-overlapping.</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">O' has exactly the same number of bookings as O - so O' is optimal too, and now agrees with greedy on the first pick.</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">Repeat the same argument on the remaining requests (those starting after g ends) - by induction, greedy's every later pick can also be exchanged into an optimal solution without loss.</div></div>
</div>

**Conclusion:** greedy's solution G can always be transformed, step by
step, into an optimal solution without ever losing a booking - so G
*is* optimal. <span class="bignotation">Q.E.D.</span>

---

# A Second Greedy Idea: Huffman Coding

<div class="thread">Not every greedy algorithm is about scheduling. A classic from data compression.</div>

- Problem: given how often each symbol appears, build a binary code
  representing the whole message in as few bits as possible.
- Huffman's greedy rule: repeatedly take the **two least-frequent**
  remaining symbols/nodes, merge them into one combined node, and
  repeat until one node is left.
- Example frequencies: A=5, B=9, C=12, D=13, E=16, F=45. Merge the two
  smallest first (A+B=14), then the two smallest of what remains, and
  so on, building a tree bottom-up.
- Like room-booking, Huffman coding is provably optimal - it has both
  the greedy-choice property and optimal substructure. (Full
  construction and proof: CLRS §16.3, not required this week.)

---

# When Greedy Fails: Campus Points

<div class="thread">Two examples so far, both provably safe. Now: the same trick, quietly wrong.</div>

- CampusNav's gamification team adds a **campus points** reward
  system: students earn points for attending events, and "spend" them
  in fixed-value chunks at the campus store.
- To keep the token design simple, the chosen values are **{1, 3,
  4}** - not the familiar {1, 5, 10, 25}-style sets most coin systems use.
- Checkout needs to give a student **exactly 6 points** of credit,
  using as **few tokens as possible**. The obvious approach: reuse
  this week's trick - greedily grab the largest token that still fits.

---

# Greedy vs. Optimal, on Target = 6

| Step | Greedy pick (largest that fits) | Remaining |
|---|---|---|
| 1 | 4 | 2 |
| 2 | 1 (3 doesn't fit) | 1 |
| 3 | 1 | 0 |

**Greedy result: 4 + 1 + 1 = 3 tokens.**
**Optimal result: 3 + 3 = 6, only 2 tokens.**

<div class="pain">
Greedy doesn't crash, doesn't error, and doesn't look wrong - it just
quietly hands out one more token than necessary, every single time a
student's balance needs exactly 6 points. Nothing about running the
algorithm tells you it failed.
</div>

---

# Fairness Sidebar: Efficient Isn't the Same as Fair

<div class="thread">Even when greedy is provably optimal at its own goal, its goal might not be the only thing that matters.</div>

- The room-booking greedy rule is provably optimal at **one specific
  goal: maximizing the number of bookings granted.**
- But "earliest finish time" systematically favors **short** requests.
  A single 3-hour workshop request competes against three separate
  1-hour requests that fit around it - and the three short ones almost
  always win, because they free up the room sooner.
- Clubs that need long or complex bookings (a multi-hour rehearsal, a
  full-day competition prep) get **systematically deprioritized**,
  even though nothing in the algorithm ever "intended" unfairness.

---

# Naming the Tension

<div class="thread">Provably optimal at one goal doesn't mean beyond challenge.</div>

<div class="why">
This is the efficiency-vs-fairness tension: a scheduler optimized for
one measurable goal (throughput) can be provably optimal at that goal
and still be worth challenging on a different, harder-to-measure goal
(fairness across request types). CampusNav's team has to <em>choose</em>
to weigh that trade-off - the algorithm alone won't do it for them.
</div>

---

<!-- SLOT N-2: Worked example -->

# CampusNav: This Week's Two Features

<div class="thread">Everything above, together, on the actual app.</div>

- The **room-booking assistant** now ships with the earliest-finish-time
  greedy scheduler, provably granting the maximum number of
  non-overlapping bookings for 성파관's shared seminar room - proof
  included, not just "it worked in testing."
- The **campus points** reward system deliberately keeps its {1, 3, 4}
  denominations, as a teaching example baked into the app itself -
  CampusNav's own team knows greedy change-making is wrong here, and
  flags it as a known limitation rather than a silently-hidden bug.

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **"Greedy always finds the optimal solution."** It doesn't - the
  campus-points example gives a token-for-token counterexample: greedy
  spends 3 tokens where 2 was possible. One counterexample is enough
  to disprove "always."
- **Trusting a greedy rule because it "seemed to work" on the example
  you tried.** Exactly like the `MAX` bug from Week 2 - the
  room-booking rule needed a full exchange-argument proof, not just
  one 5-request trace, before we trusted it.
- **Confusing optimal substructure with the greedy-choice property.**
  Campus-points still has optimal substructure (the best way to make
  6 does contain the best way to make some smaller remainder) - but
  it's missing the greedy-choice property. Having one without the
  other is exactly the gap that motivates Week 11's dynamic
  programming, which needs only the first.

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. In your own words, what does the exchange argument actually prove, and why is "it worked on this one example" not the same thing?
2. For denominations {1, 3, 4}, greedy gives 3 tokens for a target of 6. Try target = 8 by hand with the same greedy rule - does it also fail, and if so, by how much?
3. Name one downstream cost of the room-booking scheduler's fairness trade-off, and one way you might *notice* it happening in a real deployed system.

---

# Answers

1. It proves that no optimal solution can ever be strictly better than
   what greedy produces, because any optimal solution can always be
   transformed, one swap at a time, into greedy's solution without
   losing any bookings - a guarantee that holds for *every* valid
   input, not just the one you traced by hand.
2. Greedy on 8: take 4 (remaining 4), take 4 again (remaining 0) → 2
   tokens. That's also optimal here - greedy happens to succeed on
   this target. This is exactly why a *proof* is required, not a
   handful of examples: greedy can look fine on several targets and
   still be wrong in general (as target = 6 already showed).
3. Accept any reasonable answer, e.g.: long/complex booking requests
   get rejected far more often than short ones, noticeable as a
   pattern of repeated rejections for the same club over a semester;
   a real deployment might catch it with a fairness audit comparing
   acceptance rate by request duration.

---

<!-- NEW: Try-It hand-off -->

# Now: Worksheet Part A & B

<div class="thread">Time to practice - this time, you're the algorithm.</div>

Work with your partner. Open **[Worksheet Part A &
B](materials/week10/worksheet.html)**. Part A: hunt for an input where
a *different*, plausible-looking greedy rule quietly fails. Part B:
run CampusNav's real room-booking scheduler by hand on a full
8-request Friday - keep this one, Assignment 3 uses it.

**~20 minutes.** Raise your hand if you get stuck.

<!--
notes: Hand out or project the worksheet. Walk the room while pairs work.
After ~20 minutes, ask a pair to share their Part A counterexample and another to share their Part B granted-bookings list.
-->

---

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: where this shows up beyond CampusNav, and a quick self-check.</div>

---

<!-- NEW: Key Words Today, session 3 -->

# Key Words Today

- **Huffman coding:** a greedy algorithm that builds an optimal compression code by repeatedly merging the two lowest-frequency symbols.
- **Fairness trade-off:** a design tension where the choice that's most efficient (e.g. grants the most bookings) isn't necessarily the fairest one to every requester.
- **Denomination:** one of the fixed "coin" values a change-making system is allowed to use, e.g. {1, 3, 4} campus points.
- **Non-overlapping:** two intervals that share no time - the feasibility condition for room-booking.

<!-- notes: Read each term aloud. Say: greedy and DP share vocabulary on purpose - Week 11 will pull on that thread. -->

---

# Where Greedy Shows Up Beyond CampusNav

<div class="thread">This isn't only about a seminar room.</div>

Search "activity selection," "interval scheduling," or "greedy vs.
dynamic programming" in any technical interview question bank and
you'll find hundreds of problems - job/CPU scheduling, meeting-room
minimization, fractional knapsack, Huffman-style compression. The
transferable skill isn't memorizing which greedy rule to use - it's
recognizing *when* a problem has both required properties, and being
able to prove it, not just hope.

<div class="why">
Compilers use a greedy register-allocation strategy; network routers
use greedy rules for some scheduling decisions; and "prove your greedy
choice is safe" is a standard whiteboard-interview request at major
tech companies precisely because so many candidates skip the proof.
</div>

---

<!-- NEW: quiz hand-off -->

# Now: Quick Self-Check Quiz

<div class="thread">Ungraded. Just for you, to see what stuck.</div>

Open the **[Week 10 Quiz](materials/week10/quiz.html)**. Answer on
your own, about 10 minutes. Check your own answers at the end. Ask if
anything surprises you.

<!--
notes: Distribute or project the quiz. After about 10 minutes, reveal the
answer key and discuss as a group any question most of the class missed.
-->

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 11 slot 4 -->

# What Greedy Cannot Do

<div class="limits">
Greedy is fast - one sorted pass, no backtracking - and when a problem
has both the greedy-choice property and optimal substructure, we can
now <em>prove</em> it, not just hope. But its local choices are
sometimes provably wrong, as the campus-points counterexample showed,
and there is no general shortcut for telling in advance whether a new
problem is "room-booking-shaped" or "campus-points-shaped." We need a
technique that considers the full choice space - without paying the
brute-force cost of trying every combination.
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 10 leaves **problems where no single local choice is safe, but
brute-forcing every combination is too slow** unsolved. **Week 11,
Dynamic Programming I**, addresses it: keeping every still-possibly-optimal
option alive at once, reusing overlapping subproblems, on CampusNav's
new Tour Planner feature.

---

<!-- SLOT N+3: Summary -->

# Summary

- A greedy algorithm is safe only when a problem has **both** the
  greedy-choice property and optimal substructure - CampusNav's
  room-booking scheduler has both, proved by an exchange argument.
- Campus-points ({1, 3, 4}, target 6) is a clean counterexample:
  greedy spends 3 tokens where 2 was optimal - proof that "greedy
  always works" is false in general.
- A greedy algorithm can be provably optimal at its stated goal
  (throughput) and still raise a fairness question (which requests get
  systematically deprioritized) that the algorithm itself won't answer.

---

# Summary, Continued

- **Reading:** CLRS, Chapter 16 (Greedy Algorithms), §16.1 (activity
  selection) and §16.3 (Huffman codes).
- **Prepare:** Assignment 3 is due Week 12 - start the exchange-argument
  write-up early. Think about what CampusNav's Tour Planner (Week 11)
  might need that neither last week's recursion nor this week's greedy
  choice can safely provide.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
