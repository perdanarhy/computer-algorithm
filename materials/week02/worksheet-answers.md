# Week 2 Worksheet - Answer Key (Instructor Only)

Computer Algorithms (506994-002). Do not hand out this page - it is
never built into the deployed course site.

## Part A

- **A1-A2.** Accept any pseudocode that: names `directory` and
  `target` on the signature line; loops with an explicit bound (e.g.
  `for i = 0 to length(directory) - 1`); uses a precise equality
  check (e.g. `directory[i].room == target`); and returns a
  well-defined "not found" result (e.g. a `NOT_FOUND` sentinel, not
  silence or a crash). Common student gaps to flag: off-by-one loop
  bounds (the same `MAX` bug pattern from earlier this session),
  forgetting the not-found return path, or using a vague verb like
  "search" without stating the comparison.
- **A3.** Step 1: r = 54 mod 24 = 6, so a=24, b=6. Step 2: r = 24 mod
  6 = 0, so a=6, b=0. Loop ends (b=0) after 2 steps. `GCD(54, 24) =
  6`.
- **A4.** Accept any answer that captures: `r = a mod b` is always
  strictly less than `b`, and can never be negative, so `b` forms a
  strictly decreasing sequence of non-negative integers across
  iterations - such a sequence must hit 0 within a finite number of
  steps, for any valid starting pair, not only the one just traced.

## Part B

- **B1.**
  1. **Effectiveness** (and finiteness is a reasonable secondary
     answer) - "feels right" is not a step that can be mechanically
     executed; there's also no stated bound guaranteeing it stops.
  2. **Input** - doesn't specify which collection of students, or
     sort by what key (name, grade, ID); the legal input values
     aren't pinned down.
  3. **Output** - "good" never states its required relationship to
     the input (shortest? fastest? scenic?); two correct-sounding
     answers could be completely different routes.
- **B2.** Open-ended; accept any rewrite that removes the specific
  violation named. Example fixes: (1) "repeat exactly 20 times,
  updating the guess by [precise rule] each time"; (2) "sort the list
  of students enrolled in [specific course], by last name,
  alphabetically (A-Z)"; (3) "find the route with the fewest total
  walking minutes."
- **B3.** Accept any answer that captures: the algorithm is the
  language-independent sequence of steps/logic; a program is one
  specific implementation of those steps in one specific programming
  language. `FIND_ROOM` written in Python and in Java are the same
  algorithm, different programs.
- **B4.** Open-ended; accept any reasonable everyday example paired
  with a correctly identified property and a genuinely more precise
  rewrite.
