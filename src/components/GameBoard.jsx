import React from 'react';
import Row from './Row.jsx';

export default function GameBoard({ pastGuesses, currentGuess, evaluatedGuesses, currentRow }) {
  return (
    <main className="board" role="grid" aria-label="Six row word guessing board">
      {Array.from({ length: 6 }, (_, rowIndex) => (
        <Row
          key={rowIndex}
          rowIndex={rowIndex}
          guess={rowIndex === currentRow ? currentGuess : pastGuesses[rowIndex] || ''}
          evaluation={evaluatedGuesses[rowIndex] || null}
          isCurrent={rowIndex === currentRow}
        />
      ))}
    </main>
  );
}
