# Week 7 Worksheet - Searching Algorithms

Computer Algorithms (506994-002). Work with your neighbor (pair work).
Write your names here:

Name 1: _______________________  Name 2: _______________________

---

## Worksheet Part A (~15 minutes)

Below is a 15-element sorted array (think of it as a compact sample of
CampusNav's sorted room-code directory). Indices run 0-14.

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Value | 3 | 8 | 14 | 19 | 23 | 27 | 31 | 36 | 42 | 47 | 53 | 58 | 61 | 67 | 72 |

Use this pseudocode (closed convention: `hi = length(A) - 1`,
`hi = mid - 1`, `lo = mid + 1`, `while lo <= hi`):

```text
BINARY-SEARCH(A, target):
    lo = 0
    hi = length(A) - 1
    while lo <= hi:
        mid = floor((lo + hi) / 2)
        if A[mid] == target:
            return mid
        elif A[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return NOT-FOUND
```

**A1. Trace a found target.** Search for **target = 47**. Fill in
every row until the loop returns.

| Step | `lo` | `hi` | `mid` | `A[mid]` | Comparison | Action |
|---|---|---|---|---|---|---|
| 1 | 0 | 14 | ___ | ___ | ___ | ___ |
| 2 | ___ | ___ | ___ | ___ | ___ | ___ |
| 3 | ___ | ___ | ___ | ___ | ___ | ___ |

Final answer - index returned: _______

**A2. Trace a not-found target.** Search for **target = 50** (not in
the array). Fill in every row until the loop exits with `NOT-FOUND`.

| Step | `lo` | `hi` | `mid` | `A[mid]` | Comparison | Action |
|---|---|---|---|---|---|---|
| 1 | 0 | 14 | ___ | ___ | ___ | ___ |
| 2 | ___ | ___ | ___ | ___ | ___ | ___ |
| 3 | ___ | ___ | ___ | ___ | ___ | ___ |
| 4 | ___ | ___ | ___ | ___ | ___ | ___ |

How does the algorithm "know" to stop and report `NOT-FOUND`? Answer
in terms of `lo` and `hi`:

_____________________________________________________________

**A3. Connect to the invariant.** In one sentence, explain why the
result of A2 does *not* violate the loop invariant ("if target is
present, it lies within `A[lo..hi]`") even though the loop ends
without finding 50.

_____________________________________________________________
_____________________________________________________________

---

## Worksheet Part B (~15 minutes)

Below are three buggy binary-search implementations. Each one differs
from the correct version above in exactly one line (**bolded**). For
each: (1) identify what's wrong, (2) describe a concrete input on
which it fails, and (3) state the fix.

**B1.**

```text
BINARY-SEARCH-BUG1(A, target):
    lo = 0
    hi = length(A)              <-- **changed from length(A) - 1**
    while lo <= hi:
        mid = floor((lo + hi) / 2)
        if A[mid] == target:
            return mid
        elif A[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return NOT-FOUND
```

What's wrong: ___________________________________________________

Fails on (describe an input / target): __________________________

Fix: _____________________________________________________________

**B2.**

```text
BINARY-SEARCH-BUG2(A, target):
    lo = 0
    hi = length(A) - 1
    while lo <= hi:
        mid = floor((lo + hi) / 2)
        if A[mid] == target:
            return mid
        elif A[mid] < target:
            lo = mid                 <-- **changed from mid + 1**
        else:
            hi = mid - 1
    return NOT-FOUND
```

What's wrong: ___________________________________________________

Fails on (describe an input / target, and what actually happens):

_____________________________________________________________

Fix: _____________________________________________________________

**B3.**

```text
BINARY-SEARCH-BUG3(A, target):
    lo = 0
    hi = length(A) - 1
    while lo < hi:                   <-- **changed from lo <= hi**
        mid = floor((lo + hi) / 2)
        if A[mid] == target:
            return mid
        elif A[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return NOT-FOUND
```

What's wrong: ___________________________________________________

Fails on (describe an input / target): __________________________

Fix: _____________________________________________________________

**B4. Which bug is worse?** Between B1/B3 (produce a wrong answer or
crash) and B2 (infinite loop), which failure mode would you rather
have in a shipped product, and why? There's no single right answer -
justify your choice.

_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Instructor Answer Key - do not hand out this section -->
<!-- ============================================================ -->

## Instructor Answer Key - do not hand out this section

### Part A

- **A1.** Target = 47.
  - Step 1: `lo=0, hi=14, mid=7`, `A[7]=36`, `36 < 47` → `lo = 8`.
  - Step 2: `lo=8, hi=14, mid=11`, `A[11]=58`, `58 > 47` → `hi = 10`.
  - Step 3: `lo=8, hi=10, mid=9`, `A[9]=47`, `47 == 47` → **return 9**.
  - Final answer: index **9**.
- **A2.** Target = 50 (not present).
  - Step 1: `lo=0, hi=14, mid=7`, `A[7]=36 < 50` → `lo=8`.
  - Step 2: `lo=8, hi=14, mid=11`, `A[11]=58 > 50` → `hi=10`.
  - Step 3: `lo=8, hi=10, mid=9`, `A[9]=47 < 50` → `lo=10`.
  - Step 4: `lo=10, hi=10, mid=10`, `A[10]=53 > 50` → `hi=9`.
  - Now `lo=10 > hi=9`, loop condition `lo <= hi` is false → returns
    `NOT-FOUND`.
  - The algorithm stops because `lo` has crossed past `hi` - the
    search range `A[lo..hi]` has become empty.
- **A3.** The invariant only claims the target is in `A[lo..hi]` *if
  it is present at all*. When the range becomes empty (`lo > hi`),
  the invariant is still technically true - it just means "if present,
  it's in the empty range," which forces the conclusion that it is
  *not* present. No contradiction; this is exactly how the proof's
  termination argument works.

### Part B

- **B1.** `hi` starts at `length(A)` (index 15, out of bounds for a
  15-element array with valid indices 0-14) instead of `length(A) -
  1`. This mixes the half-open convention (for `hi`'s start) with the
  closed convention (for the `hi = mid - 1` update and `lo <= hi`
  condition). It fails whenever the search narrows so that `lo` and
  `hi` both climb up to `length(A)` - e.g. searching for a target
  larger than every element (like 100) eventually computes
  `mid = length(A) = 15`, reading `A[15]`, out of bounds. **Fix:**
  initialize `hi = length(A) - 1`.
- **B2.** `lo = mid` instead of `lo = mid + 1` on the "too low"
  branch. Whenever the range narrows to two adjacent indices (`hi =
  lo + 1`), `mid` computes to `lo` itself; if `A[mid] < target`, `lo`
  is reassigned to its own current value and never advances - an
  **infinite loop**. E.g. on the worksheet's array searching for
  target = 55 (not present, between indices 10 and 11): the range
  eventually narrows to `lo=10, hi=11`, `mid=10`, `A[10]=53 < 55` →
  buggy code sets `lo = mid = 10` (unchanged) → `lo=10, hi=11` again,
  forever. **Fix:** `lo = mid + 1`.
- **B3.** Loop condition changed to `lo < hi` (half-open style) while
  everything else (`hi = length(A) - 1`, `hi = mid - 1`) stays closed.
  This drops the case where the search range still contains exactly
  one element (`lo == hi`) - the loop exits one iteration too early
  and never checks that last remaining candidate. Fails on any target
  that happens to be the single element left when `lo == hi`, e.g.
  searching for 3 (index 0) can narrow down to `lo=hi=0` and exit
  without ever comparing `A[0]` to the target, incorrectly returning
  `NOT-FOUND` even though 3 is in the array. **Fix:** use
  `while lo <= hi`.
- **B4.** Open-ended. Accept any well-justified answer - common
  positions: a wrong-answer/crash bug (B1, B3) is arguably worse
  because it can silently corrupt behavior or crash in production
  with no warning, while an infinite loop (B2) at least hangs
  visibly and gets noticed (e.g. as a timeout) rather than returning
  a plausible-looking wrong answer. Accept the opposite position too
  if well-argued (e.g. a hang can still cause a production outage,
  which is its own serious cost).
