// Shared types for the bundled course (produced by pipeline/) and the
// runtime review system.

export interface Source {
  title: string;
  kind: 'textbook' | 'academic' | 'docs' | 'course' | 'web';
  ref: string;
}

/** Describes the MiniLesson data shape so future readers know what fields travel through the app. */
export interface MiniLesson {
  curated: boolean;
  explanation: string;
  how: string;
  why: string;
  workplace: string;
  workedExample: string;
  keyTerms: string[];
  mistakes: string[];
  related: string[];
  sources: Source[];
}

/** Describes the Concept data shape so future readers know what fields travel through the app. */
export interface Concept {
  id: string;
  term: string;
  displayTerm: string;
  rawTerm: string;
  excelRow: number;
  difficulty: 1 | 2 | 3;
  subdeckId: string;
  deckId: string;
  lessonId: string;
  cardIds: string[];
  mini: MiniLesson;
  vec: string; // base64 int8 embedding
}

/** Describes the CardVisual data shape so future readers know what fields travel through the app. */
export interface CardVisual {
  hue: number;
  glyph: string;
  pattern: string;
}

/** Describes the OcclusionSpec data shape so future readers know what fields travel through the app. */
export interface OcclusionSpec {
  diagramId: string;
  focusId: string;
  answer: string;
}

/** Describes the Card data shape so future readers know what fields travel through the app. */
export interface Card {
  id: string;
  conceptId: string;
  lessonId: string;
  subdeckId: string;
  deckId: string;
  type: 'cloze' | 'occlusion';
  kind: 'definition' | 'applied' | 'mistake' | 'occlusion';
  text?: string; // cloze text with {{c1::...}}
  prompt?: string;
  occlusion?: OcclusionSpec;
  evidence: Source[];
  visual: CardVisual;
  tags: string[];
}

/** Describes the Lesson data shape so future readers know what fields travel through the app. */
export interface Lesson {
  id: string;
  subdeckId: string;
  deckId: string;
  title: string;
  order: number;
  unlockIndex: number;
  conceptIds: string[];
  cardIds: string[];
}

/** Describes the Subdeck data shape so future readers know what fields travel through the app. */
export interface Subdeck {
  id: string;
  deckId: string;
  title: string;
  difficulty: number;
  sourceClass: string | null;
  domain: string;
  lessonIds: string[];
}

/** Describes the Deck data shape so future readers know what fields travel through the app. */
export interface Deck {
  id: string;
  title: string;
  tagline: string;
  order: number;
  subdeckIds: string[];
  subdecks: Subdeck[];
}

/** Describes the DiagramRegion data shape so future readers know what fields travel through the app. */
export interface DiagramRegion {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Describes the Diagram data shape so future readers know what fields travel through the app. */
export interface Diagram {
  id: string;
  title: string;
  svg: string;
  viewBox: string;
  regions: DiagramRegion[];
}

/** Describes the Course data shape so future readers know what fields travel through the app. */
export interface Course {
  meta: {
    name: string;
    generatedAt: string;
    embedDims: number;
    counts: Record<string, number>;
  };
  decks: Deck[];
  lessons: Lesson[];
  concepts: Concept[];
  cards: Card[];
  diagrams: Record<string, Diagram>;
}

// ---------------------------------------------------------------------------
// Review / scheduling
// ---------------------------------------------------------------------------

export type Rating = 'again' | 'hard' | 'good' | 'easy';
/** Describes the CardPhase data shape so future readers know what fields travel through the app. */
export type CardPhase = 'new' | 'learning' | 'review' | 'relearning';

/** Describes the CardState data shape so future readers know what fields travel through the app. */
export interface CardState {
  cardId: string;
  phase: CardPhase;
  due: number; // epoch ms
  intervalDays: number;
  ease: number;
  stepIndex: number;
  reps: number;
  lapses: number;
  correctStreak: number;
  answers: number; // total graded answers
  correct: number; // answers rated hard/good/easy
  lastReview: number | null;
  introducedOn: string | null; // YYYY-MM-DD the card left "new"
}

/** Describes the ReviewLogEntry data shape so future readers know what fields travel through the app. */
export interface ReviewLogEntry {
  cardId: string;
  rating: Rating;
  at: number;
  phaseBefore: CardPhase;
  intervalAfter: number;
}

/** A user-editable card in the AI Practice deck. */
export interface PracticeCard {
  id: string;
  text: string; // cloze text
  conceptId: string | null;
  topic: string;
  createdAt: number;
  evidence: Source[];
  visual: CardVisual;
}

// ---------------------------------------------------------------------------
// Coding worksheets
// ---------------------------------------------------------------------------

/** Supported worksheet languages; UI labels and syntax highlighting can branch on this value. */
export type WorksheetLanguage = 'python' | 'r' | 'sql' | 'dax';

/** One fill-in coding step inside a larger worksheet. */
export interface CodingWorksheetChunk {
  id: string;
  title: string;
  prompt: string;
  imports: string[];
  starterCode: string;
  solution: string;
  hints: string[];
  checks: string[];
}

/** A source-traced coding worksheet made of learner-controlled code chunks. */
export interface CodingWorksheet {
  type: 'coding-worksheet';
  version: number;
  id: string;
  title: string;
  language: WorksheetLanguage;
  difficulty: 1 | 2 | 3;
  topics: string[];
  sourceRefs: string[];
  chunks: CodingWorksheetChunk[];
}
