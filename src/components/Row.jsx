import React from 'react';
import Tile from './Tile.jsx';

export default function Row({ guess = '', evaluation = null, isCurrent = false, rowIndex }) {
  return (
    <div className="board-row" role="row" aria-label={`Guess row ${rowIndex + 1}`}>
      {Array.from({ length: 5 }, (_, index) => {
        const letter = guess[index] || '';
        const status = evaluation?.[index]?.status || 'empty';
        return (
          <Tile
            key={index}
            letter={letter}
            status={status}
            isSubmitted={!isCurrent && Boolean(evaluation)}
          />
        );
      })}
    </div>
  );
}
