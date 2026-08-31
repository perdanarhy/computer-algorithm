# Week 7 Worksheet - Answer Key (Instructor Only)

Computer Algorithms (506994-002). Do not hand out this page - it is
never built into the deployed course site.

## Part A

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

## Part B

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
