# Week 12 Worksheet - Dynamic Programming II (Longest Common Subsequence)

Computer Algorithms (506994-002). Work with your neighbor (pair work).
Write your names here:

Name 1: _______________________  Name 2: _______________________

---

## Worksheet Part A: Build the Table (~15 minutes)

You will build an LCS table by hand for a fresh pair of short
strings - **not** the CampusNav example from the slides.

$$
X = \texttt{BCDB} \qquad (m = 4) \qquad\qquad Y = \texttt{ABCBD} \qquad (n = 5)
$$

**A1. Quick check, before you build anything.** Is "BD" a substring
of $Y = $ "ABCBD"? Is "BD" a subsequence of $Y$? Circle one for each,
and briefly say why they can have different answers.

Substring: YES / NO - because: _______________________________

Subsequence: YES / NO - because: _______________________________

**A2. Fill in the table.** Row 0 and column 0 (the empty-prefix
baseline) are already filled in with 0. Using the recurrence from
class - match: diagonal + 1; no match: max of the neighbor above and
the neighbor to the left - fill in every blank cell.

| | ε | A | B | C | B | D |
|---|---|---|---|---|---|---|
| **ε** | 0 | 0 | 0 | 0 | 0 | 0 |
| **B** | 0 | | | | | |
| **C** | 0 | | | | | |
| **D** | 0 | | | | | |
| **B** | 0 | | | | | |

**A3. Read off the answer.** What is the LCS length - the value in
the bottom-right cell?

LCS length: _______

**A4. Spot the misconception.** A classmate says: "X and Y don't
share any 3-letter run in a row, so their LCS length must be less
than 3." Is your classmate right or wrong? Use your table from A2 to
explain your answer in 1-2 sentences.

_____________________________________________________________
_____________________________________________________________

---

## Worksheet Part B: Trace It Back (~15 minutes)

**B1. Perform the traceback.** Starting at the bottom-right cell of
your Part A table, apply the traceback procedure from class: if the
characters match, record the character and move diagonally; if not,
move toward whichever neighbor (up or left) has the larger value.
Write down each cell you visit, in order, and whether you recorded a
character there.

| Step | Cell (i,j) | Match? | Character recorded |
|---|---|---|---|
| 1 | (4,5) | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |

**B2. The reconstructed LCS.** Reverse the characters you recorded
in B1. What is the actual longest common subsequence string?

LCS string: _______________________

**B3. Find the tie.** Somewhere in your traceback, you should hit a
step where the two neighboring cells are *equal* - a genuine tie in
which direction to move. Which step number (from your B1 table) was
it?

Step number: _______

Now redo the traceback from that point onward, choosing the
*other* direction at the tie. Do you still get a valid common
subsequence of the same length? Write the alternate string you find:

Alternate LCS string: _______________________

**B4. Short reflection.** In 2-3 sentences, explain why the
traceback procedure has to move *backward*, starting from the
bottom-right corner $(m,n)$, rather than forward from $(0,0)$.

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Instructor Answer Key - do not hand out this section -->
<!-- ============================================================ -->

## Instructor Answer Key - do not hand out this section

### Part A

- **A1.** Substring: **NO** - B and D are not adjacent in "ABCBD"
  (C sits between the B at position 3 and the D at position 5).
  Subsequence: **YES** - delete A and C, and B, D remain in order.
  They differ because substring requires contiguity; subsequence
  does not.
- **A2.** Completed table:

  | | ε | A | B | C | B | D |
  |---|---|---|---|---|---|---|
  | **ε** | 0 | 0 | 0 | 0 | 0 | 0 |
  | **B** | 0 | 0 | 1 | 1 | 1 | 1 |
  | **C** | 0 | 0 | 1 | 2 | 2 | 2 |
  | **D** | 0 | 0 | 1 | 2 | 2 | 3 |
  | **B** | 0 | 0 | 1 | 2 | 3 | 3 |

- **A3.** LCS length: **3**.
- **A4.** The classmate is **wrong**. LCS length only requires the
  shared elements to appear *in order*, not consecutively - the
  table shows a length-3 common subsequence (e.g. "BCD," found via
  B at $X$'s position 1 / $Y$'s position 2, C at $X$'s position 2 /
  $Y$'s position 3, D at $X$'s position 3 / $Y$'s position 5) even
  though no 3 letters appear together as a block in both strings.
  This is exactly the substring-vs-subsequence distinction from A1.

### Part B

- **B1.** One valid full trace (starting at (4,5), value 3):

  | Step | Cell (i,j) | Match? | Character recorded |
  |---|---|---|---|
  | 1 | (4,5) | no (B vs D); tie: L(3,5)=3, L(4,4)=3 - move up | - |
  | 2 | (3,5) | yes (D = D) | D |
  | 3 | (2,4) | no (C vs B); L(1,4)=1, L(2,3)=2 - move left | - |
  | 4 | (2,3) | yes (C = C) | C |
  | 5 | (1,2) | yes (B = B) | B |
  | 6 | (0,1) | stop (row 0) | - |

- **B2.** Recorded backward: D, C, B → reversed: **"BCD"**.
- **B3.** The tie is at **step 1**, cell (4,5): $L(3,5) = 3$ and
  $L(4,4) = 3$ are equal. Taking the *other* direction (move left to
  (4,4) instead of up to (3,5)) gives: (4,4) match B=B → record B →
  (3,3) no match (D vs C), $L(2,3)=2$ vs $L(3,2)=1$, move up → (2,3)
  match C=C → record C → (1,2) match B=B → record B → (0,1) stop.
  Recorded backward: B, C, B → reversed: **"BCB"**. Both "BCD" and
  "BCB" are valid, correct, length-3 common subsequences of X="BCDB"
  and Y="ABCBD" - accept either (or both) from students. This is the
  intended teaching moment: **LCS is not always unique.**
- **B4.** Accept any answer capturing: each cell's value was derived
  from the values of the cells before it (above, left, or
  diagonal), so the *reasons* for a cell's value only become visible
  by looking at what it was built from - which means retracing the
  construction requires starting at the last cell computed (the
  bottom-right corner) and working back toward the base case, not
  the other way around. Forward from $(0,0)$, you'd only be
  re-deriving values you already have, with no way to know which
  path the *final* maximum actually took.
