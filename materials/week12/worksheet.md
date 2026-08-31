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
