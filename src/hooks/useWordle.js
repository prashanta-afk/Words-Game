import { useCallback, useEffect, useState } from 'react';
import { getRandomWord } from '../data/words.js';
import { checkGuess, mergeKeyboardStatus, normalizeWord } from '../utils/checkGuess.js';

export function useWordle(initialSolution) {
  const [solutionWord, setSolutionWord] = useState(() =>
    normalizeWord(initialSolution || getRandomWord()),
  );
  const [currentGuess, setCurrentGuess] = useState('');
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS');
  const [errorMessage, setErrorMessage] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState({});

  const resetGame = useCallback(() => {
    setSolutionWord(normalizeWord(getRandomWord()));
    setCurrentGuess('');
    setPastGuesses([]);
    setGameStatus('IN_PROGRESS');
    setErrorMessage('');
    setKeyboardStatus({});
  }, []);

  const submitGuess = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS') return;
    if (currentGuess.length !== 5) {
      setErrorMessage('Not enough letters');
      return;
    }

    const evaluated = checkGuess(currentGuess, solutionWord);
    const nextGuesses = [...pastGuesses, normalizeWord(currentGuess)];

    setPastGuesses(nextGuesses);
    setKeyboardStatus((previous) => mergeKeyboardStatus(previous, evaluated));
    setCurrentGuess('');
    setErrorMessage('');

    if (normalizeWord(currentGuess) === solutionWord) {
      setGameStatus('WON');
    } else if (nextGuesses.length >= 6) {
      setGameStatus('LOST');
    }
  }, [currentGuess, gameStatus, pastGuesses, solutionWord]);

  const handleInput = useCallback((key) => {
    if (gameStatus !== 'IN_PROGRESS') return;

    const normalized = String(key).toUpperCase();
    if (normalized === 'BACKSPACE') {
      setCurrentGuess((guess) => guess.slice(0, -1));
      setErrorMessage('');
      return;
    }
    if (normalized === 'ENTER') {
      submitGuess();
      return;
    }
    if (!/^[A-Z]$/.test(normalized)) return;

    setCurrentGuess((guess) => (guess.length < 5 ? guess + normalized : guess));
    setErrorMessage('');
  }, [gameStatus, submitGuess]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === 'Enter') handleInput('ENTER');
      else if (event.key === 'Backspace') handleInput('BACKSPACE');
      else if (/^[a-zA-Z]$/.test(event.key)) handleInput(event.key);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleInput]);

  const evaluatedGuesses = pastGuesses.map((guess) => checkGuess(guess, solutionWord));

  return {
    solutionWord,
    currentGuess,
    pastGuesses,
    gameStatus,
    errorMessage,
    keyboardStatus,
    evaluatedGuesses,
    currentRow: pastGuesses.length,
    attemptsUsed: pastGuesses.length,
    handleInput,
    resetGame,
  };
}
