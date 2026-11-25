export function normalizeWord(word) {
  return String(word ?? '').trim().toUpperCase();
}

// Two-pass letter evaluation prevents duplicate letters from receiving extra matches.
export function checkGuess(guess, solution) {
  const guessed = normalizeWord(guess);
  const answer = normalizeWord(solution);
  const result = Array.from({ length: 5 }, (_, index) => ({
    letter: guessed[index] || '',
    status: 'absent',
  }));
  const remaining = {};

  // Count unmatched occurrences, and mark exact-position matches first.
  for (let index = 0; index < 5; index += 1) {
    if (guessed[index] === answer[index]) {
      result[index].status = 'correct';
    } else {
      const letter = answer[index];
      remaining[letter] = (remaining[letter] || 0) + 1;
    }
  }

  // Mark remaining letters present only while an occurrence is still available.
  for (let index = 0; index < 5; index += 1) {
    if (result[index].status === 'correct') continue;
    const letter = guessed[index];
    if (letter && remaining[letter] > 0) {
      result[index].status = 'present';
      remaining[letter] -= 1;
    }
  }

  return result;
}

export function mergeKeyboardStatus(previous, evaluated) {
  const priority = { unused: 0, absent: 1, present: 2, correct: 3 };
  const next = { ...previous };

  evaluated.forEach(({ letter, status }) => {
    if (!letter) return;
    const current = next[letter] || 'unused';
    if (priority[status] > priority[current]) next[letter] = status;
  });

  return next;
}
