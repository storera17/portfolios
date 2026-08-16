// XP, levels, streaks, and badges — secondary to learning, deterministic,
// and fully local.
import type { Rating } from './types';

/** Learner motivation state: XP, streaks, badges, review totals, and boss wins. */
export interface GamificationState {
  xp: number;
  streakDays: number;
  lastStudyDay: string | null; // YYYY-MM-DD
  badges: string[];
  reviewsTotal: number;
  bossWins: number;
}

/** Creates the starting gamification record for a new profile. */
export const initialGamification = (): GamificationState => ({
  xp: 0, streakDays: 0, lastStudyDay: null, badges: [], reviewsTotal: 0, bossWins: 0,
});

/** XP rewards for each review rating; intentionally modest so learning stays central. */
export const XP_BY_RATING: Record<Rating, number> = { again: 2, hard: 6, good: 10, easy: 8 };

/** Level curve: level n needs 100·n(n+1)/2 cumulative XP (gentle quadratic). */
export function levelForXp(xp: number): { level: number; into: number; needed: number } {
  let level = 1;
  let threshold = 0;
  /** Performs the while operation for this class. */
  while (xp >= threshold + level * 100) {
    threshold += level * 100;
    level += 1;
  }
  return { level, into: xp - threshold, needed: level * 100 };
}

/** Definition of one badge and the condition that earns it. */
export interface BadgeDef {
  id: string;
  title: string;
  desc: string;
  test: (g: GamificationState, ctx: BadgeCtx) => boolean;
}

/** Review-session context needed to evaluate badge conditions. */
export interface BadgeCtx {
  lessonsCompleted: number;
  decksCompleted: number;
  reviewsToday: number;
}

/** Badge catalog used by both gamification logic and the dashboard display. */
export const BADGES: BadgeDef[] = [
  { id: 'first-light', title: 'First Light', desc: 'Complete your first review.', test: (g) => g.reviewsTotal >= 1 },
  { id: 'century', title: 'Century Core', desc: '100 total reviews.', test: (g) => g.reviewsTotal >= 100 },
  { id: 'kilo', title: 'Kilo Matrix', desc: '1,000 total reviews.', test: (g) => g.reviewsTotal >= 1000 },
  { id: 'streak-7', title: 'Seven Cycles', desc: '7-day study streak.', test: (g) => g.streakDays >= 7 },
  { id: 'streak-30', title: 'Orbital Month', desc: '30-day study streak.', test: (g) => g.streakDays >= 30 },
  { id: 'lesson-1', title: 'Node Online', desc: 'Master your first lesson.', test: (_g, c) => c.lessonsCompleted >= 1 },
  { id: 'lesson-25', title: 'Sector Sweep', desc: 'Master 25 lessons.', test: (_g, c) => c.lessonsCompleted >= 25 },
  { id: 'deck-1', title: 'Branch Complete', desc: 'Master every lesson in a deck.', test: (_g, c) => c.decksCompleted >= 1 },
  { id: 'boss-1', title: 'Boss Protocol', desc: 'Win a boss review.', test: (g) => g.bossWins >= 1 },
  { id: 'marathon', title: 'Deep Focus', desc: '100 reviews in one day.', test: (_g, c) => c.reviewsToday >= 100 },
];

/** Apply one graded review; returns updated state + any newly earned badges. */
export function recordReview(
  g: GamificationState,
  rating: Rating,
  todayKey: string,
  ctx: BadgeCtx,
): { state: GamificationState; newBadges: BadgeDef[] } {
  const next: GamificationState = { ...g, badges: [...g.badges] };
  next.xp += XP_BY_RATING[rating];
  next.reviewsTotal += 1;
  /** Performs the if operation for this class. */
  if (next.lastStudyDay !== todayKey) {
    const yesterday = new Date(new Date(todayKey).getTime() - 86400000);
    const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    next.streakDays = next.lastStudyDay === yKey ? next.streakDays + 1 : 1;
    next.lastStudyDay = todayKey;
  }
  const newBadges = BADGES.filter((b) => !next.badges.includes(b.id) && b.test(next, ctx));
  for (const b of newBadges) next.badges.push(b.id);
  return { state: next, newBadges };
}
