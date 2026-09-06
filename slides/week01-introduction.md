---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 1: Introduction

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703
</div>

<!--
notes: Welcome the class. Say this session is the course contract: what this
course covers, how it's graded, what's expected of you, and how the
semester runs. No algorithms yet - that starts next week.
-->

---

<!-- SLOT 2: Where we are -->

# Where We Are

<div class="roadmap">
<div class="wk now"><div class="n">Wk 1</div><div class="t">Introduction</div></div>
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
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Point at the row. Say: "Fifteen weeks. Today's the odd one out - it's about how this course works, not a technique. Weeks 8 and 15 are exams; the other twelve each add one new technique." -->

---

<!-- NEW: frames why the semester feels connected week to week -->

# The Semester Reads as One Argument

<div class="thread">Why weeks feel connected, not like fifteen separate talks.</div>

Every week (except this orientation week) opens by recapping what the
previous week delivered and what it left unsolved, and closes by
naming exactly what its own technique still cannot do. That "what this
week's technique cannot do" line becomes the very next week's opening
problem - not a new, unrelated topic, but the next chapter of the same
story.

CampusNav is the thread that carries this: every worked example is a
feature of the same fictional app, revisited from a new angle each
week, so the semester reads as one continuous build, not fifteen
independent lectures.

---

<!-- Course intro: why this course, briefly, before the contract -->

# Why This Course

<div class="thread">One sentence, from the syllabus itself.</div>

> "Algorithms are central to coding tests, interviews, and all advanced
> CS courses."

That's not a sales pitch - it's the instructor's own note on the course
plan. Every technique this semester (sorting, searching, the general
design strategies, graphs) is something you will be asked to use, by
name, in a technical interview or in a course that assumes you already
know it.

---

<!-- NEW: concrete real-world stakes, first of two -->

# Why Algorithms Matter, Concretely

<div class="thread">Not an abstract worry - a documented one.</div>

In 2016, Stack Overflow's own engineering team documented a site-wide
outage caused by a single regular expression whose matching cost blew
up on certain input - a shape of growth called "catastrophic
backtracking," effectively exponential instead of the near-instant
match every other input got. The code had worked correctly for years;
it simply had never been asked to run on the input that exposed its
real cost.

A "working" piece of code and a "fast enough, on every input" piece of
code are not the same claim - this course is about being able to tell
the difference before it ships, not after.

---

<!-- NEW: concrete real-world stakes, second of two -->

# Why Algorithms Matter, In Your Career

<div class="thread">Not only about outages.</div>

- **Technical interviews:** "state the time complexity of your
  solution" is one of the most common follow-up questions at every
  major tech company - a correct answer with no complexity analysis
  routinely does not pass.
- **Every later CS course** - databases, machine learning, systems -
  assumes you can already read code and state its growth rate on
  sight, the same way it assumes you can already write a loop.

Everything from pseudocode precision to Big-O to algorithm design
paradigms, later this semester, is in service of exactly these two
stakes.

---

# This Semester's Running Case Study

<div class="thread">Not software you build. A story every worked example borrows from.</div>

Throughout the semester, examples are drawn from **CampusNav**: a
made-up campus wayfinding-and-scheduling app, used as a running,
concrete illustration - the same fictional scenario, revisited from a
new angle each week, instead of a fresh unrelated word problem every
time.

- Week 1-7: CampusNav's room directory needs to be searched and sorted
- Week 9-12: scheduling, tour-planning, and matching problems
- Week 13-14: representing campus and finding routes across it

You are not building this app. It is a case study, chosen because a
map/schedule app gives every technique a concrete, familiar shape.

---

<!-- NEW: fleshes out the CampusNav premise itself, from _shared/case-study.md -->

# CampusNav: The Starting Point (v0)

<div class="thread">Before any algorithm exists, here's the problem it has to fix.</div>

New students at DEU get lost constantly: wrong building, wrong room,
missed the first ten minutes of class. In the story, a senior project
team sets out to build **CampusNav**, a campus assistant app - but
version 0 is nothing clever yet: a kiosk map, and a printed room list.
Finding anything still means scanning the list by eye, or asking a
stranger.

Each week's technique becomes the next chapter of this same story -
the actual algorithms behind CampusNav, starting next week with the
very first question: is "look around until you find it" even a real
set of steps?

---

# A Quick Taste: "Look Around Until You Find It"

<div class="thread">One example, then straight into the course contract.</div>

Imagine CampusNav's (fictional) team writes this instruction for a new
developer: *"To find a room, look around until you find it, and ask
someone if you're stuck."*

- Is that a real set of steps, or just a vague wish?

<!--
notes: A discussion prompt, not a lesson - do not answer it today.
Just let the class sit with the question for a moment. Week 2 opens
with exactly this scenario and answers it properly.
-->

---

<!-- NEW: continues the quick-taste discussion prompt -->

# A Quick Taste, Continued

<div class="thread">Two more questions before we move on.</div>

- Would two different developers, given only that sentence, build the
  same thing?
- If they built two different things, which one is *wrong* - and how
  would you even argue that?

<!--
notes: A discussion prompt, not a lesson - do not answer it today.
Just let the class sit with the question for a moment. Week 2 opens
with exactly this scenario and answers it properly.
-->

---

<!-- SLOT 6: Driving question -->

# This Course's Question

<div class="driving-q">"What separates a method that just happens to work from one we can trust, measure, and reuse?"</div>

---

# This Course's Three Goals

<div class="thread">Not just today's goals. This is the whole course, in three lines.</div>

| # | Goal (from the syllabus) | Where |
|---|---|---|
| 1 | Analyze correctness and efficiency precisely | Weeks 2-3, 5, 7 |
| 2 | Design algorithms with general paradigms (divide-and-conquer, greedy, DP) | Weeks 4, 9-12 |
| 3 | Apply classic algorithms (sorting, searching, graphs) and reason about P vs. NP | Weeks 5-7, 13-14 |

Every one of these three goals gets built, piece by piece, using
CampusNav as the running illustration - not as an abstract exercise.

---

<!-- NEW: unpacks Goal 1 from the table above -->

# Goal 1 in Practice: Analyze, Precisely

<div class="thread">The first of the three goals, unpacked.</div>

"Analyze correctness and efficiency precisely" means, concretely:

- Write an algorithm precise enough that two people tracing it by
  hand reach the identical conclusion (**Week 2**).
- Prove - not guess - how its cost grows as input size grows
  (**Week 3**).
- Do the same for algorithms that call themselves (**Week 4**), and
  for the classic sorting and searching methods later in the
  semester (**Weeks 5, 7**).

---

<!-- NEW: unpacks Goal 2 -->

# Goal 2 in Practice: Design With General Paradigms

<div class="thread">The second goal, unpacked.</div>

"Design algorithms with general paradigms" means, concretely: instead
of inventing a brand-new trick for every new problem, recognize which
of a small number of proven strategies applies.

- **Divide-and-conquer** - split, solve independently, combine
  (**Week 9**, previewed in Week 4's recursion trees).
- **Greedy** - make the locally best choice, and know when that's
  actually safe (**Week 10**).
- **Dynamic programming** - avoid re-solving the same subproblem
  twice (**Weeks 11-12**).

---

<!-- NEW: unpacks Goal 3 -->

# Goal 3 in Practice: Apply and Compare

<div class="thread">The third goal, unpacked.</div>

"Apply classic algorithms... and reason about P vs. NP" means,
concretely:

- Compare sorting and searching algorithms, not just implement one of
  each (**Weeks 5-7**).
- Represent a real network as a graph, and find shortest paths across
  it (**Weeks 13-14**).
- Recognize when a problem has no known efficient algorithm at all -
  and explain, precisely, why that's a different claim than "nobody's
  found one yet" (**Week 14**).

---

<!-- NEW: visual synthesis of the three goals / weekly schedule, no new facts -->

# This Course in One Picture

<div class="thread">Four stages, in the order the semester builds them.</div>

<div class="pipeline">
<div class="stage"><div class="h">Foundations</div><div class="s">What's an algorithm, how do we measure its cost (Wks 1-4)</div></div>
<div class="arrow">&rarr;</div>
<div class="stage"><div class="h">Classic Toolkit</div><div class="s">Sorting and searching, provably correct (Wks 5-7)</div></div>
<div class="arrow">&rarr;</div>
<div class="stage"><div class="h">Design Paradigms</div><div class="s">Divide-and-conquer, greedy, DP (Wks 9-12)</div></div>
<div class="arrow">&rarr;</div>
<div class="stage"><div class="h">Graphs &amp; Limits</div><div class="s">Networks, shortest paths, P vs NP (Wks 13-14)</div></div>
</div>

---

# Course Description

<div class="thread">From the official syllabus.</div>

This course covers algorithm representation, functions and processing
procedures, complexity analysis, correctness and fairness. Building on
this, it addresses techniques for designing efficient algorithms -
divide-and-conquer, greedy methods, dynamic programming - and their
applications, and studies established algorithms (sorting, searching,
graph algorithms) organized by topic.

---

# Learning Objectives (1-4)

<div class="thread">The official course objectives, from the syllabus - what you'll be able to do by Week 15.</div>

By the end of this course, you can:

1. Describe problem-solving procedures using pseudocode/flowcharts.
2. Analyze time and space complexity using asymptotic notation.
3. Apply divide-and-conquer, greedy, and dynamic programming
   techniques to new problems.
4. Compare and analyze sorting and searching algorithms.

---

<!-- NEW: continuation of Learning Objectives -->

# Learning Objectives (5-7)

<div class="thread">The rest of the official course objectives.</div>

5. Apply graph algorithms to real problems.
6. Verify correctness and explain P, NP, and NP-completeness.
7. Select, implement, and justify an appropriate algorithm for a
   given problem.

---

# Prerequisites

<div class="thread">What this course assumes you already have.</div>

- **Computer Programming I**
- **Computer Programming II**
- **Discrete Mathematics**

We do not start from zero. If any of loops, functions, recursion
basics, or set/function notation feel shaky, say so early - it
compounds fast otherwise.

---

<!-- NEW: turns the courses above into concrete, checkable skills -->

# Prerequisites: What You Should Already Be Able to Do

<div class="thread">Not just course titles - the actual skills behind them.</div>

- **Loops:** write and trace a `for`/`while` loop by hand, on paper,
  without running it.
- **Functions:** write and call a function with parameters and a
  return value.
- **Recursion (basic familiarity):** explain, in your own words, what
  a function calling itself does - even if you've only used one, not
  written one.
- **Discrete math notation:** read basic set notation ($\in$,
  $\subseteq$) and function notation ($f: A \to B$).

If any of these feels shaky, say so in the first two weeks - every one
of them becomes load-bearing starting Week 2.

---

# Textbooks: The Primary Text

<div class="thread">One primary text. Everything else is optional support.</div>

- **Primary:** Cormen, Leiserson, Rivest, Stein, *Introduction to
  Algorithms*, 4th ed., MIT Press, 2022 ("CLRS" - every week's reading
  points here)

Every citation in this course's slides, starting this week's own CLRS
roadmap, uses this exact 4th edition's chapter and section numbers -
not an older edition's.

---

<!-- NEW: continuation of Textbooks -->

# Textbooks: Secondary, Reference, and These Slides

<div class="thread">Optional support, if CLRS alone isn't enough for you.</div>

- **Secondary:** Kleinberg & Tardos, *Algorithm Design*, Pearson, 2005;
  Sedgewick & Wayne, *Algorithms*, 4th ed., Addison-Wesley, 2011
- **Reference:** Skiena, *The Algorithm Design Manual*, 3rd ed.,
  Springer, 2020
- **Also:** these lecture slides themselves are a listed course
  reference

---

# How This Course Runs

<div class="thread">What to expect from a 3-hour block, every week.</div>

Each session mixes short lectures with:

- **A warm-up** - a short, concrete question to start, before any
  jargon
- **A recap** - what last week delivered, and what it left unsolved

Two more pieces make up the rest of the session - continued next slide.

---

<!-- NEW: continuation of How This Course Runs -->

# How This Course Runs, Continued

<div class="thread">The other half of a typical session.</div>

- **Pair activities** - trace an algorithm, spot the bug, fix a broken
  example, with the answer discussed right after
- **A self-check quiz** - ungraded, just for you, at the end

You will talk in this class, not just listen.

---

# Weekly Schedule

<div class="thread">One line per week - the full walkthrough.</div>

| Wk | Topic | Wk | Topic |
|---|---|---|---|
| 1 | Introduction (today) | 9 | Divide and Conquer |
| 2 | Algorithm Concepts | 10 | Greedy Algorithms - **Assignment 3** |
| 3 | Complexity Analysis - **Assignment 1** | 11 | Dynamic Programming I |
| 4 | Recursion & Recurrence | 12 | Dynamic Programming II |
| 5 | Basic Sorting | 13 | Graph Representation - **Assignment 4** |
| 6 | Advanced Sorting - **Assignment 2** | 14 | Shortest Path |
| 7 | Searching | 15 | **Final Exam** (Wks 9-14) |
| 8 | **Midterm Exam** (Wks 1-7) | | |

---

<!-- NEW: expands the schedule with a "why this week" rationale, Weeks 1-4 -->

# Weekly Schedule: Weeks 1-4, Why Each Matters

<div class="thread">Same table as before, with the reasoning made explicit.</div>

| Wk | Topic | Why this week |
|---|---|---|
| 1 | Introduction | Sets up how the course runs, and what the whole semester is building toward. |
| 2 | Algorithm Concepts | Establishes what even counts as a real algorithm, so later weeks have something precise to measure. |
| 3 | Complexity Analysis | Gives a rigorous way to say one correct algorithm is actually better than another. |
| 4 | Recursion & Recurrence | Many later algorithms call themselves - this is how we bound their cost. |

---

<!-- NEW: Weeks 5-8 -->

# Weekly Schedule: Weeks 5-8, Why Each Matters

| Wk | Topic | Why this week |
|---|---|---|
| 5 | Basic Sorting | First real technique toolkit, traced and proven correct on CampusNav's directory. |
| 6 | Advanced Sorting | Week 5's sorts collapse at scale - these are built not to. |
| 7 | Searching | A sorted directory unlocks binary search, cutting lookup from linear to logarithmic. |
| 8 | Midterm Exam | Checkpoint on Weeks 1-7, before the design paradigms begin. |

---

<!-- NEW: Weeks 9-12 -->

# Weekly Schedule: Weeks 9-12, Why Each Matters

| Wk | Topic | Why this week |
|---|---|---|
| 9 | Divide & Conquer | The first general strategy for inventing new algorithms, not just analyzing given ones. |
| 10 | Greedy Algorithms | A faster strategy for problems where local choices are safe - and a look at when they aren't. |
| 11 | Dynamic Programming I | Fixes the exponential blow-up from Week 4's brute-force counting, by never re-solving the same subproblem twice. |
| 12 | Dynamic Programming II | Extends dynamic programming to problems that compare two sequences at once. |

---

<!-- NEW: Weeks 13-15 -->

# Weekly Schedule: Weeks 13-15, Why Each Matters

| Wk | Topic | Why this week |
|---|---|---|
| 13 | Graph Representation | Real systems are networks, not lists - this is how we represent them. |
| 14 | Shortest Path | CampusNav's flagship "Get Directions" feature, and where P vs. NP first becomes concrete. |
| 15 | Final Exam | Checkpoint on Weeks 9-14. |

---

<!-- NEW: CLRS roadmap mini-section, intro. Folds in the "Where This Week Lives in CLRS" slide for Week 1 per SPINE.md's instruction. -->

# CLRS 4th Edition: What We'll Actually Read

<div class="thread">The book itself has a shape - seeing it now saves you from feeling lost later.</div>

CLRS (Cormen, Leiserson, Rivest, Stein, *Introduction to Algorithms*,
4th ed., MIT Press, 2022) organizes its material into Parts, each a
family of related ideas. This course visits four of them, roughly in
the book's own order - not the whole book, but the shape of it.

- **Part I: Foundations** - what an algorithm even is, and how to measure it.
- **Part II: Sorting and Order Statistics** - the classic sorting/searching toolkit.
- **Part IV: Advanced Design and Analysis Techniques** - divide-and-conquer, greedy, dynamic programming.
- **Part VI: Graph Algorithms** - representing and searching networks.

---

<!-- NEW: CLRS roadmap, Weeks 2-4 -->

# CLRS Roadmap: Part I - Foundations (Weeks 2-4)

| Wk | Topic | CLRS 4th ed |
|---|---|---|
| 2 | Algorithm Concepts | Ch 1; §2.1-2.2 (pseudocode style); §31.2 (Euclid's GCD) |
| 3 | Complexity Analysis | Ch 3 |
| 4 | Recursion & Recurrence | §4.3-4.5 |

---

<!-- NEW: CLRS roadmap, Weeks 5-8 -->

# CLRS Roadmap: Part I/II - Sorting Toolkit (Weeks 5-8)

| Wk | Topic | CLRS 4th ed |
|---|---|---|
| 5 | Basic Sorting | §2.1-2.2 |
| 6 | Advanced Sorting | §2.3, Ch 7 |
| 7 | Searching | §2.1, Ex 2.3-6 |
| 8 | Midterm Exam | review only - Weeks 1-7 |

---

<!-- NEW: CLRS roadmap, Weeks 9-12 -->

# CLRS Roadmap: Part IV - Advanced Design (Weeks 9-12)

| Wk | Topic | CLRS 4th ed |
|---|---|---|
| 9 | Divide & Conquer | §4.1-4.2, 4.5, §31.6 |
| 10 | Greedy Algorithms | Ch 15 |
| 11 | Dynamic Programming I | §14.1, 14.3 |
| 12 | Dynamic Programming II | §14.4 |

---

<!-- NEW: CLRS roadmap, Weeks 13-15 -->

# CLRS Roadmap: Part VI - Graph Algorithms (Weeks 13-15)

| Wk | Topic | CLRS 4th ed |
|---|---|---|
| 13 | Graph Representation | Ch 20, §10.1, §6.5 |
| 14 | Shortest Path | Ch 22, §34.1-34.2 |
| 15 | Final Exam | review only - Weeks 9-14 |

---

<!-- NEW: CLRS roadmap, going-deeper pointers -->

# CLRS Roadmap: Going Deeper

<div class="thread">Not required this semester - for anyone who wants to keep reading past the syllabus.</div>

- Week 4 stops at the standard Master Theorem; CLRS §4.6-4.7 covers
  the continuous Master theorem and Akra-Bazzi recurrences, for
  recurrences that don't fit the standard shape.
- Week 9's §31.6 (modular exponentiation) sits inside CLRS's broader
  Chapter 31 on number-theoretic algorithms (primality testing, RSA) -
  not required, but the natural next stop.
- Week 14 previews P vs. NP; CLRS §34.3 onward works through the
  actual NP-completeness proofs and reductions in full.

---

# Grading

<div class="thread">Five components, 100% total.</div>

| Component | Weight |
|---|---|
| Attendance | 10% |
| Midterm (Wk 8) | 25% |
| Final (Wk 15) | 25% |
| Assignments (×4) | 20% |
| Presentation | 20% |

---

<!-- NEW: Grading component breakdown, 1 of 6 -->

# Grading: Midterm (25%)

<div class="thread">The single largest component, together with the Final.</div>

- Held in **Week 8**, covering **Weeks 1-7**: algorithm properties,
  Big-O, recursion and recurrences, basic sorting, advanced sorting,
  and searching.
- Worth **25%** of your final grade - the same weight as the Final.
- Week 8 is a review-only session (see the Weekly Schedule) - no new
  technique is introduced that week.

---

<!-- NEW: Grading component breakdown, 2 of 6 -->

# Grading: Final (25%)

<div class="thread">The second 25%, covering the second half of the semester.</div>

- Held in **Week 15**, covering **Weeks 9-14**: divide-and-conquer,
  greedy algorithms, dynamic programming, graph representation, and
  shortest path.
- Worth **25%** of your final grade.
- Like Week 8, Week 15 is a review-only session - no new technique
  that week either.

---

<!-- NEW: Grading component breakdown, 3 of 6 -->

# Grading: Attendance (10%)

<div class="thread">The smallest component, but recorded every single session.</div>

- Worth **10%** of your final grade, tracked every session all
  semester - not just at the exams.
- See **Attendance Policy**, a few slides ahead, for exactly how
  lateness and excused absences are handled.

---

<!-- NEW: Grading component breakdown, 4 of 6 -->

# Grading: Assignments (20%)

<div class="thread">Four assignments, worth 20% combined.</div>

- Four assignments, spaced across the semester (see the
  **Assignments** table ahead), together worth **20%** of your final
  grade.
- Graded within one week, with a rubric and model answers - see
  **Feedback Policy** ahead.

---

<!-- NEW: Grading component breakdown, 5 of 6 -->

# Grading: Presentation (20%)

<div class="thread">Worth as much as all four assignments combined.</div>

- Worth **20%** of your final grade - format and topic assignment
  announced separately in class, but the weight alone tells you it is
  not a minor add-on.
- Treat it with the same seriousness as an exam, not as an
  afterthought late in the semester.

---

<!-- NEW: Grading component breakdown, 6 of 6 - the distribution guideline, split out of the old Grading slide -->

# Grade Distribution Guideline

<div class="why">
<strong>Grade distribution guideline:</strong> A ≤30%, B ≤40%, C-F ≤30%
of the class. This may shift after the add/drop period, based on final
enrollment.
</div>

This is a guideline for the overall class distribution, not a curve
applied component-by-component to your individual score.

---

# Assignments

<div class="thread">Four assignments, spaced across the semester.</div>

| # | Released | Due | Topics |
|---|---|---|---|
| 1 | Wk 3 | Wk 5 | Pseudocode, Big-O proofs, growth-rate ordering |
| 2 | Wk 6 | Wk 8 | Sorting: basic + advanced, empirical vs. theoretical |
| 3 | Wk 10 | Wk 12 | Greedy proof sketch, a divide-and-conquer analysis |
| 4 | Wk 13 | Wk 15 | LCS with traceback, Dijkstra, a short P/NP question |

---

<!-- NEW: connects the Assignments table to the weeks that feed each one -->

# Assignments, In Context

<div class="thread">Same four assignments table. Here's how each one lines up with what you'll have just learned.</div>

- **Assignment 1** (released Wk 3, due Wk 5): covers Big-O proofs and
  growth-rate ordering - released right after Week 3 teaches them,
  plus the pseudocode conventions from Week 2.
- **Assignment 2** (released Wk 6, due Wk 8): released right after
  both sorting weeks, comparing basic and advanced sorts empirically
  and theoretically.
- **Assignment 3** (released Wk 10, due Wk 12): follows Greedy
  Algorithms, and reaches back to Week 9's divide-and-conquer analysis.
- **Assignment 4** (released Wk 13, due Wk 15): due the same week as
  the Final Exam, covering LCS, Dijkstra, and a P/NP question -
  everything from Weeks 11-14 at once.

---

# Feedback Policy

<div class="thread">From the syllabus, verbatim.</div>

> Assignments graded within one week with rubric and model answers;
> exam item-analysis shared with weak-topic guidance and individual
> review on request.

In plain terms: you will know what you got wrong, and why, quickly
enough for it to still matter for the next assignment or exam.

---

<!-- NEW: split of Attendance & Late Work, part 1 -->

# Attendance Policy

<div class="thread">Concrete rules, stated once, so nobody is surprised later.</div>

- **Attendance** is 10% of your grade and is recorded every session.
- **Late arrival:** arriving within 15 minutes of the start is
  on-time; after that, you're marked late. Three lates equal one
  absence.
- **Can't attend?** Email the professor *before* the session to be
  marked excused - unexcused absences aren't eligible for makeup
  credit.

---

<!-- NEW: split of Attendance & Late Work, part 2 -->

# Late Work Policy

<div class="thread">Same principle, applied to assignments instead of attendance.</div>

- **Late work:** loses 10% of that assignment's grade per day late,
  up to 3 days. No credit after 3 days, unless arranged with the
  professor in advance.
- This rewards submitting something on time over holding out for a
  perfect, very late submission.

---

<!-- NEW: split of Academic Integrity, part 1 -->

# Academic Integrity: What Counts as a Violation

<div class="thread">Same principle as attendance: stated once, plainly.</div>

- **Academic integrity:** submit your own work. Copying another
  student's work, having someone else complete it for you, or
  submitting unattributed AI-generated work as your own is a
  violation.

---

<!-- NEW: split of Academic Integrity, part 2 -->

# Academic Integrity: Consequences

<div class="thread">What happens if the line above gets crossed.</div>

- **First violation:** zero credit on that assignment or exam, plus a
  formal report. **Repeat violation:** may result in failing the
  course, per university policy.
- If anything here is unclear, ask - now is the cheapest time to ask.

---

<!-- NEW: split of Support for Students with Disabilities, part 1 -->

# Support: Hearing- and Mobility-Impairment

<div class="thread">From the syllabus's accommodations section.</div>

- **Hearing-impaired:** front-row seating, lecture material files
  provided where possible, urgent notices given in writing
- **Mobility-impaired:** extended exam time

---

<!-- NEW: split of Support for Students with Disabilities, part 2 -->

# Support: Other Conditions & Getting Started

<div class="thread">The rest of the accommodations section, and how to begin.</div>

- **Other documented conditions:** extended exam time, materials
  provided in advance, enlarged exam copies, or other reasonable
  accommodation based on need

Contact the instructor early, and the Disability Student Support
Center or Academic Affairs Team, so accommodations are ready before
you need them.

---

# Contact

<div class="thread">How to reach the instructor.</div>

- **Email:** perdanarhy@deu.ac.kr
- **Office hours:** by email appointment
- Email is the fastest way to reach the instructor outside of class.

---

<!-- NEW: practical, non-policy tips for using office hours/email well -->

# Getting the Most Out of Office Hours

<div class="thread">Practical tips, not new policy.</div>

- Put "Computer Algorithms" (or the week number) in your email
  subject line - it gets triaged faster.
- Come with a specific question ready: "I don't understand step 3 of
  GCD's finiteness proof" gets a faster, more useful answer than "I
  don't get recursion."
- If you're stuck on a worksheet or quiz question, note which one
  before you email - it saves a full round-trip.

---

<!-- NEW: study-skill tips, part 1 -->

# How to Succeed in This Course (1)

<div class="thread">Tips, not requirements - but every one of them is earned from how this course is built.</div>

- **Do the worksheet every week**, even though it's ungraded - it's
  the only place you practice before an assignment or exam does.
- **Don't skip the proof steps** to get to "the answer" - Big-O
  proofs, correctness arguments, and recurrence solutions are graded
  on the argument, not just the final bound.

---

<!-- NEW: study-skill tips, part 2 -->

# How to Succeed in This Course (2)

<div class="thread">The rest of the tips.</div>

- **Ask early** - "now is the cheapest time to ask" applies to
  concepts, not just academic integrity.
- **Find one classmate to compare pseudocode with** - two people
  tracing the same algorithm and disagreeing is usually exactly where
  the real bug, or the real misunderstanding, is hiding.

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), reused verbatim in Week 2's slot 3 recap and echoed in its slot 4 pain slide - see SPINE.md's orientation-variant note -->

# What Today Doesn't Give You Yet

<div class="limits">
You now know how this course runs, how you're graded, and what's
expected of you. We still do not have a rigorous way to check whether
a written-down procedure even qualifies as a real algorithm -
"look around until you find it" still sounds like a perfectly
reasonable instruction. Knowing the rules of the course is not the
same as having the rules for what makes an algorithm correct.
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 1 leaves **what actually counts as an algorithm, precisely**
unsolved. **Week 2, Algorithm Concepts**, answers it: the five
properties every real algorithm must satisfy, and how to write
pseudocode precise enough that "look around until you find it" is
disqualified on sight.

---

<!-- SLOT N+3: Summary -->

# Summary

- This course: correctness and efficiency, general design paradigms,
  and classic algorithms - grounded in one running case study,
  CampusNav.
- Grading: Attendance 10%, Midterm 25%, Final 25%, Assignments 20%,
  Presentation 20%.
- Assignments due Weeks 5, 8, 12, 15. Graded within one week, with a
  rubric and model answers.
- Primary text: CLRS, 4th ed. (2022). Contact: perdanarhy@deu.ac.kr.
- **Prepare:** skim CLRS Chapter 1 before Week 2. No exercises due.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
