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
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703
</div>

<!--
notes: Welcome the class. Ask: "Has a quick decision you made in the moment - the option that looked best right then - ever turned out worse once you saw the whole picture?"
Let a few students answer with a show of hands. That tension (locally best vs. globally best) is the whole week. Also flag that Assignment 3 is released today, due Week 12.
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

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** CampusNav found its best free-time block with a maximum-subarray divide-and-conquer algorithm, and sped up its "N-step shortcut" counter by recursively halving the problem instead of counting one step at a time.
- **Last week left broken:** divide-and-conquer assumes a problem splits cleanly into independent left/right halves that can be solved separately and then merged - but not every problem is shaped like that. Some reward one purely local choice, made once, instead of a full recursive split.

<!-- notes: This is Week 9's Limit slide, restated. It becomes today's pain, made concrete next slide. -->

---

<!-- SLOT: Assignment 3 announcement -->

# Assignment 3: Released This Week

- **Released:** today (Week 10). **Due:** Week 12, 23:59, via the course Learning Management System (LMS). Individual work.
- **Tasks (preview):** (1) design a greedy room-booking rule and prove it safe with an exchange argument, (2) analyze last week's free-time-block divide-and-conquer recurrence with the Master theorem, (3) explain, in your own words, why the campus-points coin-change example breaks "greedy always works."
- Full spec, the required 8-request instance, and rubric: **`materials/assignments/assignment3.md`**.

<!-- notes: Mention this once, clearly, then move on - don't let logistics eat into the pain slide's momentum. -->

---

<!-- Key Words Today, session 1 -->

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
shared seminar room in Building A. By Wednesday afternoon there are 15
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

---

# This Idea Is Not New, Continued: Formalizing *Why*

<div class="thread">Telephone exchanges and Huffman both worked by instinct. Researchers wanted to know why.</div>

- Researchers spent decades afterward formalizing *why* some
  local-choice tricks are always safe - **matroid theory** (1960s-70s)
  identifies a precise mathematical structure a problem must have for
  greedy to be automatically guaranteed correct, no case-by-case
  exchange argument needed.
- Other problems - like change-making with arbitrary denominations -
  do **not** have that structure, and no amount of clever rule design
  makes greedy safe for them. Telling the two apart is this week's job.

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

<div class="graphviz-note">CLRS (Cormen/Leiserson/Rivest/Stein's <em>Introduction to Algorithms</em>) 4th ed - Ch 15, Sections 15.1 (activity selection), 15.2 (elements of the greedy strategy), 15.3 (Huffman codes).</div>

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

<!-- Key Words Today, session 2 -->

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

<!-- Idea + pseudocode merged into one slide -->

# Room-Booking: Idea and Pseudocode

<div class="thread">First of two greedy rules this week. <code>{}</code> is the empty set; <code>add r to granted</code> inserts <code>r</code> into it - set notation, previewed back in Week 2's reference card.</div>

<div class="two-col">
<div>

CampusNav's seminar room can host only one club at a time. Goal:
grant the room to the **maximum number** of non-overlapping requests.
The rule: among whatever requests are still possible, always grant
the one that **frees up the room soonest**.

</div>
<div>

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

</div>
</div>

---

# Room-Booking: Why Earliest Finish, Not Shortest Duration

<div class="thread">A tempting alternative rule - and why it fails.</div>

Why finish time, not start time or duration? Finishing soonest leaves
the most room open for everything still to come. A "shortest duration
first" rule looks just as tempting, but is not safe in general: on
requests P (4h), Q (2h), R (4h) where Q sits between P and R,
shortest-first grants only Q (1 booking, blocking both others), while
earliest-finish grants {P, R} (2 bookings).

---

<!-- Dense worked example, room-booking, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Room-booking · worked example 1 of 3 (simple)</div>

# Three Requests: X, Y, Z

<div class="wx-top">
<div class="lead">The smallest case that still shows a skip and a grant right after it.</div>
<div class="goalbox"><span class="k">Goal</span>Run BOOK_ROOM on X (09:00-10:00), Y (09:30-10:30), Z (10:00-11:00).</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Sort &amp; grant X</div>
<div class="wx-body">Sorted by end time: X (10:00), Y (10:30), Z (11:00). Room free, grant X. lastEnd = 10:00.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Skip Y</div>
<div class="wx-body">Y starts 09:30, before lastEnd 10:00 - conflicts with X. Skip.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Grant Z, done</div>
<div class="wx-body">Z starts 10:00, exactly at lastEnd - free. Grant. Result: {X, Z}, 2 of 3 granted.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>{X, Z} granted, Y skipped - 2 of 3 requests, one sorted pass, zero backtracking.</div>
<div class="takeaway"><span class="k">Key takeaway</span>Even with only 3 requests, the rule's core behavior already shows: only the request that would delay everything later gets skipped.</div>

---

<!-- Dense worked example, room-booking, moderate tier -->
<!-- _class: dense -->

<div class="eyebrow">Room-booking · worked example 2 of 3 (moderate)</div>

# Five Requests: A Through E

<div class="wx-top">
<div class="lead">Coding Club (A), Debate Society (B), Robotics Team (C), Photography Club (D), Chess Club (E).</div>
<div class="goalbox"><span class="k">Goal</span>A 09:00-10:30, B 09:30-10:00, C 10:00-11:00, D 10:15-12:15, E 11:00-12:00.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Sort by end time</div>
<div class="wx-body">B (10:00), A (10:30), C (11:00), E (12:00), D (12:15).</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Grant B, skip A</div>
<div class="wx-body">B: room free, grant. lastEnd = 10:00. A: starts 09:00 &lt; 10:00 - conflicts, skip.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Grant C, grant E</div>
<div class="wx-body">C: starts 10:00 &ge; 10:00, grant. lastEnd = 11:00. E: starts 11:00 &ge; 11:00, grant. lastEnd = 12:00.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Skip D, result</div>
<div class="wx-body">D: starts 10:15 &lt; 12:00 - conflicts, skip. Result: {B, C, E}, 3 of 5 granted.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>3 of 5 requests granted: {B, C, E} - one sorted pass, no untangling needed.</div>
<div class="takeaway"><span class="k">Key takeaway</span>Compare to the pain slide's merge-and-untangle mess: one sorted pass replaces an entire afternoon of hand-splitting and re-merging.</div>

---

<!-- Dense worked example, room-booking, harder tier (exchange-argument proof, flagship slide) -->
<!-- _class: dense -->

<div class="eyebrow">Room-booking · proving the rule safe</div>

# The Exchange Argument, All Four Steps

<div class="wx-top">
<div class="lead">It worked on two traces. Here's why it works on every input - not just the ones we ran.</div>
<div class="goalbox"><span class="k">Goal</span>Prove: greedy's solution G always matches some optimal solution's size.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">Let G = greedy's solution, O = any optimal solution. Let g = greedy's first pick - by construction, the earliest end time of any request in the whole input. If O also picks g first, nothing to prove yet.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Otherwise</div>
<div class="wx-body">Let o be O's first pick, o &ne; g. Since g has the earliest end time of any request, end(g) &le; end(o).</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">The swap</div>
<div class="wx-body">Build O' = O with o replaced by g. Every other request in O starts after o ends; since end(g) &le; end(o), each also starts after g ends - O' is still valid, same size as O.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Induction, Q.E.D.</div>
<div class="wx-body">Repeat on requests starting after g ends. By induction, every greedy pick can be exchanged into an optimal solution without loss - so G is optimal.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>Greedy's solution can always be transformed into an optimal one without losing a booking - so greedy's solution IS optimal.</div>
<div class="takeaway"><span class="k">Key takeaway</span>An exchange argument doesn't test one input - it proves the swap always works, for every input, which is what "provably optimal" actually means.</div>

---

# BOOK_ROOM's Cost: O(n log n)

<div class="thread">Correctness just proven. Now, exactly like every other week: how fast is it?</div>

`BOOK_ROOM` does exactly two things, in order:

- **Sort `requests` by end time:** a comparison-based sort over $n$
  requests - $O(n \log n)$ (Week 6's merge sort or quicksort).
- **One linear pass over the sorted list:** one comparison
  (`r.start >= lastEnd`) and, at most, one insert into `granted` per
  request - $O(1)$ work per request, $O(n)$ total.

$$
T(n) = \underbrace{O(n \log n)}_{\text{sort}} + \underbrace{O(n)}_{\text{one pass}} = O(n \log n)
$$

<span class="bignotation">O(n log n)</span> - the sort dominates.
Dropping the slower-growing $O(n)$ term (Week 3's Big-O rules) leaves
the sort's cost as the whole algorithm's cost.

---

<!-- Idea + pseudocode for the second greedy technique -->

# Huffman Coding: A Second Greedy Idea

<div class="thread">Not every greedy algorithm is about scheduling. A classic from data compression.</div>

<div class="two-col">
<div>

Problem: given how often each symbol appears, build a binary code
representing the whole message in as few bits as possible. Huffman's
rule never reconsiders a merge once it's made - exactly like
room-booking never reconsiders a granted booking. Like room-booking,
Huffman coding is provably optimal: it has both the greedy-choice
property and optimal substructure (full construction and proof:
CLRS §15.3, not required this week).

</div>
<div>

```text
HUFFMAN(freqs):
    make one leaf node per symbol,
      weight = its frequency
    while more than one node
      remains:
        take the two lowest-weight
          nodes
        merge into a new parent
          node, weight = sum
    return the last remaining node
      (the tree root)
```

</div>
</div>

---

<!-- Dense worked example, Huffman, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Huffman coding · worked example 1 of 3 (simple)</div>

# Three Symbols: A=2, B=3, C=5

<div class="wx-top">
<div class="lead">The smallest case that still shows a merge, a tie, and real compression.</div>
<div class="goalbox"><span class="k">Goal</span>Build the tree for three symbols and compare against a fixed-length code.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Merge</div>
<div class="wx-body">Two smallest: A(2)+B(3) &rarr; AB(5). Two nodes left, AB(5) and C(5) - a tie. Merge them into the root(10).</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Codes</div>
<div class="wx-body">Root: left=AB(0), right=C(1). AB: left=A(00), right=B(01). Codes: A=00, B=01, C=1.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Weighted bits</div>
<div class="wx-body">2(2)+3(2)+5(1) = 4+6+5 = 15 bits, versus a fixed 2 bits/symbol &times; 10 total = 20 bits.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>3 symbols already compress from 20 to 15 bits - Huffman's advantage doesn't require large alphabets.</div>
<div class="takeaway"><span class="k">Key takeaway</span>A tie in frequency (AB=5, C=5) is resolved arbitrarily - either merge order still yields an optimal code, just a different one.</div>

---

<!-- Dense worked example, Huffman, moderate tier -->
<!-- _class: dense -->

<div class="eyebrow">Huffman coding · worked example 2 of 3 (moderate)</div>

# Six Symbols: Building the Tree and Decoding

<div class="wx-top">
<div class="lead">A=5, B=9, C=12, D=13, E=16, F=45 (100 total) - five merges down to one root.</div>
<div class="goalbox"><span class="k">Goal</span>Build the full tree, read off codes, and decode a message.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Merges 1-2</div>
<div class="wx-body">Smallest two: A(5)+B(9) &rarr; AB(14). Next smallest: C(12)+D(13) &rarr; CD(25).</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Merges 3-5</div>
<div class="wx-body">AB(14)+E(16) &rarr; ABE(30). CD(25)+ABE(30) &rarr; CDABE(55). F(45)+CDABE(55) &rarr; root(100).</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Codes</div>
<div class="wx-body">F=0(1bit), C=100(3bit), D=101(3bit), E=111(3bit), A=1100(4bit), B=1101(4bit).</div>
</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Decode FACE</div>
<div class="wx-body">0&rarr;F, 1100&rarr;A, 100&rarr;C, 111&rarr;E &rarr; "FACE". Weighted total: 224 bits, versus 300 at a fixed 3 bits/symbol.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>5 symbols merge to 1 root in n&minus;1 = 5 merges (always true for n symbols); FACE decodes unambiguously, left to right, no lookahead.</div>
<div class="takeaway"><span class="k">Key takeaway</span>The more frequent a symbol, the shorter its path from the root - by construction, not by tuning.</div>

---

<!-- Dense worked example, Huffman, harder tier (prefix-free proof, absorbs cut Check-Yourself) -->
<!-- _class: dense -->

<div class="eyebrow">Huffman coding · worked example 3 of 3 (harder)</div>

# A Second Message, Same Code Table

<div class="wx-top">
<div class="lead">Same codes as FACE. A different bitstring - and why decoding it never needs to look ahead.</div>
<div class="goalbox"><span class="k">Goal</span>Decode 10111111000 using F=0, C=100, D=101, E=111, A=1100, B=1101.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">New bitstring: 10111111000. Decode left to right, matching one full code at a time.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Trace</div>
<div class="wx-body">101&rarr;D, 111&rarr;E, 1100&rarr;A, 0&rarr;F &rarr; message: "DEAF".</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Why no lookahead</div>
<div class="wx-body">No code is a prefix of another (prefix-free). The instant read bits match one symbol's code, they cannot also be a partial prefix of a different, longer code.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why it's guaranteed</div>
<div class="wx-body">Every symbol sits at a distinct tree leaf; a root-to-leaf path can never be a strict prefix of another such path. Prefix-free falls out of the tree structure itself, not a rule checked afterward.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>DEAF decodes unambiguously with the same table that decoded FACE - one code table, many messages, zero ambiguity.</div>
<div class="takeaway"><span class="k">Key takeaway</span>Prefix-free isn't an extra rule bolted onto Huffman coding - it falls out of building the code from a tree's leaves for free.</div>

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

<!-- Dense worked example, campus-points counterexample, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Campus points · counterexample 1 of 2</div>

# Denominations {1, 3, 4}, Target = 6

<div class="wx-top">
<div class="lead">The obvious greedy rule: grab the largest token that still fits.</div>
<div class="goalbox"><span class="k">Goal</span>Compare greedy's token count to the true optimal, on target 6.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Greedy trace</div>
<div class="wx-body">Take 4 (remaining 2). 3 doesn't fit, take 1 (remaining 1). Take 1 (remaining 0). Total: 4+1+1 = 3 tokens.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Optimal</div>
<div class="wx-body">3 + 3 = 6, using only 2 tokens.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">The gap</div>
<div class="wx-body">Greedy uses 1 more token than necessary - silently, with no error or crash.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>Greedy: 3 tokens (4+1+1). Optimal: 2 tokens (3+3). One counterexample is enough to disprove "greedy always finds the optimal."</div>
<div class="takeaway"><span class="k">Key takeaway</span>Nothing about running the algorithm signals failure - it just quietly hands out one extra token, every time the balance is exactly 6.</div>

---

<!-- Dense worked example, campus-points counterexample, harder tier -->
<!-- _class: dense -->

<div class="eyebrow">Campus points · counterexample 2 of 2 (harder)</div>

# A Second Denomination Set: {1, 4, 5}, Target = 8

<div class="wx-top">
<div class="lead">One counterexample could be a fluke. Here's an independent second one.</div>
<div class="goalbox"><span class="k">Goal</span>Show a different denomination set fails the same way, and that passing a test proves nothing.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Greedy trace</div>
<div class="wx-body">Take 5 (remaining 3). Largest that fits is 1: take 1, 1, 1. Total: 5+1+1+1 = 4 tokens.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Optimal</div>
<div class="wx-body">4 + 4 = 8, using only 2 tokens - a different, independent counterexample.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Same shape of failure</div>
<div class="wx-body">Both counterexamples: greedy's "largest that fits" blocks a smaller-count pairing that would have worked.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Passing &ne; proof</div>
<div class="wx-body">The original {1,3,4} set, run at target 8 instead of 6: take 4, take 4 &rarr; 2 tokens, which happens to BE optimal. A failing example disproves "always" - but a passing example never proves it holds in general.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>{1,4,5} at target 8 fails the same way as {1,3,4} at target 6 - two independent counterexamples, not a fluke of one number.</div>
<div class="takeaway"><span class="k">Key takeaway</span>Testing more targets is not a proof: {1,3,4} at target 8 happens to succeed, but that success says nothing about target 6's failure.</div>

---

# Fairness Sidebar: Efficient Isn't the Same as Fair

<div class="thread">Even when greedy is provably optimal at its own goal, its goal might not be the only thing that matters.</div>

- The room-booking greedy rule is provably optimal at **one specific
  goal: maximizing the number of bookings granted.**
- But "earliest finish time" systematically favors **short** requests:
  a single 3-hour workshop request competes against three separate
  1-hour requests that fit around it, and the three short ones almost
  always win, because they free up the room sooner.
- Clubs that need long or complex bookings (a multi-hour rehearsal, a
  full-day competition prep) get **systematically deprioritized** -
  over a whole semester, the same handful of clubs see their requests
  rejected far more often, purely as a side effect of a rule that was
  never asked to consider fairness at all.

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
  non-overlapping bookings for Building A's shared seminar room - proof
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

<!-- Key Words Today, session 3 -->

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

<!-- CLRS reference slide, placed immediately before Summary -->

# Where This Week Lives in CLRS

<div class="thread">Everything this week touched, mapped to its exact section.</div>

| Topic | CLRS 4th ed section |
|---|---|
| Activity-selection / interval scheduling | §15.1 |
| Greedy-choice property, optimal substructure | §15.2 |
| Huffman codes | §15.3 |

<div class="why">
<strong>If you want to go deeper (not required this week):</strong>
fractional knapsack is a classic exercise for practicing exchange
arguments on a new problem; matroid theory (mentioned earlier today)
formalizes exactly which problems are guaranteed greedy-safe, beyond
checking case by case.
</div>

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
- **New: Week 10 Check** - a short graded exercise on today's two
  greedy techniques, released now, due before Week 11 begins,
  **separate from Assignment 3** (also released this week, due Week
  12) - see `materials/assignments/week10-check.html`.

---

# Summary, Continued

- **Reading:** CLRS, Chapter 15 (Greedy Algorithms), §15.1 (activity
  selection) and §15.3 (Huffman codes).
- **Prepare:** Assignment 3 is due Week 12 - start the exchange-argument
  write-up early. Think about what CampusNav's Tour Planner (Week 11)
  might need that neither last week's recursion nor this week's greedy
  choice can safely provide.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
