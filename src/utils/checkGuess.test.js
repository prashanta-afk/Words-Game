import { describe, expect, it } from 'vitest';
import { checkGuess, mergeKeyboardStatus } from './checkGuess.js';

describe('checkGuess', () => {
  it('marks exact matches green', () => {
    expect(checkGuess('APPLE', 'APPLE').map((tile) => tile.status)).toEqual([
      'correct', 'correct', 'correct', 'correct', 'correct',
    ]);
  });

  it('handles mixed present and absent matches', () => {
    expect(checkGuess('ALLEY', 'APPLE').map((tile) => tile.status)).toEqual([
      'correct', 'present', 'absent', 'present', 'absent',
    ]);
  });

  it('handles duplicate letters without overmatching', () => {
    expect(checkGuess('LLAMA', 'APPLE').map((tile) => tile.status)).toEqual([
      'present', 'absent', 'present', 'absent', 'absent',
    ]);
  });

  it('preserves keyboard color priority', () => {
    let keyboard = mergeKeyboardStatus({}, checkGuess('SALLY', 'APPLE'));
    keyboard = mergeKeyboardStatus(keyboard, [
      { letter: 'A', status: 'correct' },
      { letter: 'S', status: 'absent' },
    ]);
    expect(keyboard.A).toBe('correct');
    expect(keyboard.S).toBe('absent');
  });
});
