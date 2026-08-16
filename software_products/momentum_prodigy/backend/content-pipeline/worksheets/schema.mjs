/**
 * Worksheet content schema.
 *
 * These plain JavaScript objects are intentionally simple: each worksheet is a
 * sequence of fill-in code chunks. The UI can render one chunk at a time, and
 * you can split or merge chunks without changing the rest of the app.
 */

/** Creates a worksheet object with consistent defaults. */
export function worksheet(def) {
  return {
    type: 'coding-worksheet',
    version: 1,
    ...def,
  };
}

/** Creates one fill-in coding chunk. */
export function chunk({ id, title, prompt, imports = [], starterCode = '', solution, hints = [], checks = [] }) {
  return { id, title, prompt, imports, starterCode, solution, hints, checks };
}
