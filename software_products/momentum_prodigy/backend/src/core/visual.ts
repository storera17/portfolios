// Deterministic Jarvis-style visual identity per card — mirrors the
// pipeline's cardVisual() so runtime-generated practice cards match the
// locked course aesthetic. Users cannot edit card themes (by design).
import type { CardVisual } from './types';
import { fnv1a } from './embedding';

/** Configuration or lookup table for HUES; keeping it named makes future tuning safer. */
const HUES = [187, 199, 168, 262, 305, 38, 142, 210];
/** Configuration or lookup table for GLYPHS; keeping it named makes future tuning safer. */
const GLYPHS = ['◬', '⬡', '◈', '⟁', '✦', '◉', '⌬', '⟐'];
/** Configuration or lookup table for PATTERNS; keeping it named makes future tuning safer. */
const PATTERNS = ['grid', 'rings', 'scan', 'hex', 'orbit', 'pulse'];

/** Deterministically assigns visual styling to runtime-generated practice cards. */
export function cardVisualFor(id: string): CardVisual {
  const h = fnv1a(id);
  return {
    hue: HUES[h % HUES.length],
    glyph: GLYPHS[(h >>> 3) % GLYPHS.length],
    pattern: PATTERNS[(h >>> 6) % PATTERNS.length],
  };
}
