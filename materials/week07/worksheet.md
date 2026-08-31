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
