# Week 10 Worksheet - Answer Key (Instructor Only)

Computer Algorithms (506994-002). Do not hand out this page - it is
never built into the deployed course site.

## Part A

- **A1.** Accept any valid construction. Canonical example: a =
  Coding Club, 09:15-10:00; b = Debate Society, 10:15-11:30; c = Chess
  Club, 13:00-14:00. All three fit inside 09:00-17:00 (so each
  conflicts with X) and are pairwise non-overlapping.
- **A2.** "Earliest start time first" grabs X first (starts 09:00,
  earliest of all four). X spans 09:00-17:00, so it conflicts with a,
  b, and c - all three are skipped. **Total granted: 1.**
- **A3.** Sorted by end time: a (10:00), b (11:30), c (14:00), X
  (17:00). Grant a (lastEnd 10:00); b starts 10:15 ≥ 10:00, grant
  (lastEnd 11:30); c starts 13:00 ≥ 11:30, grant (lastEnd 14:00); X
  starts 09:00 < 14:00, skip. **Requests granted: a, b, c. Total: 3.**
- **A4.** Accept any answer that identifies: starting earliest says
  nothing about how *long* a request holds the room, so "earliest
  start time first" can lock in one long request that blocks many
  short, otherwise-compatible ones - exactly the failure mode
  earliest-finish-time is designed to avoid, since finishing soonest
  is what actually leaves the most room open for what comes next.

## Part B

- **B1.** Sorted by end time: **1** (10:00), **3** (10:30), **2**
  (11:00), **5** (11:30), **4** (12:00), **7** (12:30), **6** (13:00),
  **8** (14:00).
- **B2 / B3.** Full trace, in sorted order:

  | # | Club | GRANT or SKIP | lastEnd after this step |
  |---|---|---|---|
  | 1 | Coding Club (09:00-10:00) | GRANT | 10:00 |
  | 3 | Debate Society (10:00-10:30) | GRANT (10:00 ≥ 10:00) | 10:30 |
  | 2 | Dance Crew (09:30-11:00) | SKIP (09:30 < 10:30) | 10:30 |
  | 5 | Chess Club (10:30-11:30) | GRANT (10:30 ≥ 10:30) | 11:30 |
  | 4 | Robotics Team (10:15-12:00) | SKIP (10:15 < 11:30) | 11:30 |
  | 7 | Book Club (11:30-12:30) | GRANT (11:30 ≥ 11:30) | 12:30 |
  | 6 | Photography Club (11:00-13:00) | SKIP (11:00 < 12:30) | 12:30 |
  | 8 | Volunteer Corps (12:30-14:00) | GRANT (12:30 ≥ 12:30) | 14:00 |

  **Granted: Coding Club, Debate Society, Chess Club, Book Club,
  Volunteer Corps. Total granted: 5 of 8.**

- **B4.** Sorted position for Guest Lecture (12:00-13:30, end 13:30)
  falls between Photography Club (13:00) and Volunteer Corps (14:00).
  At that point `lastEnd = 12:30` (set by Book Club, the last request
  granted before it). Guest Lecture starts at 12:00, which is **before**
  12:30 - **it is SKIPPED.** It is blocked by **Book Club**
  (11:30-12:30), the most recently granted booking at the time Guest
  Lecture is considered.
