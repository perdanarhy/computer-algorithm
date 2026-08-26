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
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
</div>

<!--
notes: Welcome the class. This session is the course contract: what this
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

# A Quick Taste: "Look Around Until You Find It"

<div class="thread">One example, then straight into the course contract.</div>

Imagine CampusNav's (fictional) team writes this instruction for a new
developer: *"To find a room, look around until you find it, and ask
someone if you're stuck."*

- Is that a real set of steps, or just a vague wish?
- Would two different developers, given only that sentence, build the
  same thing?

<!--
notes: A discussion prompt, not a lesson - do not answer it today.
Just let the class sit with the question for a moment. Week 2 opens
with exactly this scenario and answers it properly.
-->

---

<!-- SLOT 6: Driving question -->

<!-- _class: section -->

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

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: the course contract - what's covered, how you're graded, and what's expected of you.</div>

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

# Learning Objectives

<div class="thread">The official course objectives, from the syllabus - what you'll be able to do by Week 15.</div>

By the end of this course, you can:

1. Describe problem-solving procedures using pseudocode/flowcharts.
2. Analyze time and space complexity using asymptotic notation.
3. Apply divide-and-conquer, greedy, and dynamic programming
   techniques to new problems.
4. Compare and analyze sorting and searching algorithms.
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

# Textbooks

<div class="thread">One primary text. Everything else is optional support.</div>

- **Primary:** Cormen, Leiserson, Rivest, Stein, *Introduction to
  Algorithms*, MIT Press, 2022 ("CLRS" - every week's reading points here)
- **Secondary:** Kleinberg & Tardos, *Algorithm Design*, Pearson, 2005;
  Sedgewick & Wayne, *Algorithms*, 4th ed., Addison-Wesley, 2011
- **Reference:** Skiena, *The Algorithm Design Manual*, 3rd ed.,
  Springer, 2020
- **Also:** these lecture slides themselves are a listed course reference

---

# How This Course Runs

<div class="thread">What to expect from a 3-hour block, every week.</div>

Each session mixes short lectures with:

- **A warm-up** - a short, concrete question to start, before any
  jargon
- **A recap** - what last week delivered, and what it left unsolved
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

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: grading, assignments, and policy.</div>

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

<div class="why">
<strong>Grade distribution guideline:</strong> A ≤30%, B ≤40%, C-F ≤30%
of the class. This may shift after the add/drop period, based on final
enrollment.
</div>

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

# Feedback Policy

<div class="thread">From the syllabus, verbatim.</div>

> Assignments graded within one week with rubric and model answers;
> exam item-analysis shared with weak-topic guidance and individual
> review on request.

In plain terms: you will know what you got wrong, and why, quickly
enough for it to still matter for the next assignment or exam.

---

# Attendance & Academic Integrity

<div class="thread">Concrete rules, stated once, so nobody is surprised later.</div>

- **Attendance** is 10% of your grade and is recorded every session.
- **Late arrival:** arriving within 15 minutes of the start is on-time;
  after that, you're marked late. Three lates equal one absence.
- **Can't attend?** Email the instructor *before* the session to be
  marked excused - unexcused absences aren't eligible for makeup credit.
- **Late work:** loses 10% of that assignment's grade per day late, up
  to 3 days. No credit after 3 days, unless arranged with the
  instructor in advance.
- **Academic integrity:** submit your own work. Copying another
  student's work, having someone else complete it for you, or
  submitting unattributed AI-generated work as your own is a
  violation.
- **First violation:** zero credit on that assignment or exam, plus a
  formal report. **Repeat violation:** may result in failing the
  course, per university policy.
- If anything here is unclear, ask - now is the cheapest time to ask.

---

# Support for Students with Disabilities

<div class="thread">From the syllabus's accommodations section.</div>

- **Hearing-impaired:** front-row seating, lecture material files
  provided where possible, urgent notices given in writing
- **Mobility-impaired:** extended exam time
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
- Primary text: CLRS (2022). Contact: perdanarhy@deu.ac.kr.
- **Prepare:** skim CLRS Chapter 1 before Week 2. No exercises due.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
