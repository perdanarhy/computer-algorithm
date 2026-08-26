# Week 2 Worksheet - Algorithm Concepts

Computer Algorithms (506994-002). Work with your neighbor (pair work).
Write your names here:

Name 1: _______________________  Name 2: _______________________

---

## Worksheet Part A (~15 minutes)

**A1. Write it yourself.** CampusNav needs `FIND_ROOM(directory,
target)`: given an array of room records and a target room name,
return that room's location, or a clear "not found" result. Write
your own pseudocode for it below - don't just copy the slides. Use
the house rules from class: one operation per line, explicit loop
bounds, explicit index range, no vague verbs.

```text
FIND_ROOM(directory, target):




```

**A2. Check it against the five properties.** Fill in Yes/No and a
one-line reason for *your own* pseudocode above.

| Property | Yes / No | Why |
|---|---|---|
| Input |  |  |
| Output |  |  |
| Definiteness |  |  |
| Effectiveness |  |  |
| Finiteness |  |  |

**A3. Trace Euclid's GCD.** Using the algorithm from class:

```text
GCD(a, b):
    while b != 0:
        r = a mod b
        a = b
        b = r
    return a
```

Now trace `GCD(54, 24)` by hand. Fill in each step.

| Step | a | b | r = a mod b |
|---|---|---|---|
| Start | 54 | 24 | - |
| 1 |  |  |  |
| 2 |  |  |  |
| 3 (if needed) |  |  |  |

Final answer: `GCD(54, 24) = _______`

**A4. Prove it, don't assume it.** In one or two sentences, explain
*why* this loop is guaranteed to end for **every** valid pair `(a,
b)`, not just the pair you just traced.

_____________________________________________________________
_____________________________________________________________

---

## Worksheet Part B (~15 minutes)

**B1. Which property breaks?** In class, you already found the
violations in "print the next prime number" (finiteness) and "divide
the budget fairly" (definiteness) - that leaves three properties
untested. For each broken "algorithm" below, circle the **one**
property it most clearly violates, and write a one-line reason.

1. "Keep improving the guess until it feels right."
   Finiteness · Definiteness · Input · Output · Effectiveness
   Reason: _____________________________________________________

2. "Sort the students."
   Finiteness · Definiteness · Input · Output · Effectiveness
   Reason: _____________________________________________________

3. "Find a good route to the library."
   Finiteness · Definiteness · Input · Output · Effectiveness
   Reason: _____________________________________________________

**B2. Fix one.** Pick **one** broken "algorithm" from B1 and rewrite
its instruction so it no longer violates that property. It doesn't
need to be full pseudocode - just precise enough that the violation
is gone.

Which one: _______   Rewritten instruction:
_____________________________________________________________
_____________________________________________________________

**B3. Short answer.** In your own words (2-3 sentences), explain the
difference between "an algorithm" and "a program." Use `FIND_ROOM` as
your example.

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

**B4. Connect it back.** Think of one everyday instruction (a recipe
step, a game rule, directions someone gave you) that you now realize
is ambiguous. Which of the five properties does it violate, and how
would you rewrite it precisely?

Instruction: _______________________________________________
Property violated: _______________   Rewritten:
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Instructor Answer Key - do not hand out this section -->
<!-- ============================================================ -->

## Instructor Answer Key - do not hand out this section

### Part A

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

### Part B

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
