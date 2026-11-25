import React from 'react';

export default function GameOverModal({ status, solutionWord, attemptsUsed, onPlayAgain }) {
  if (status === 'IN_PROGRESS') return null;
  const won = status === 'WON';

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="game-over-title">
        <div className={`modal-icon ${won ? 'won' : 'lost'}`} aria-hidden="true">
          {won ? '✓' : '!'}
        </div>
        <h2 id="game-over-title">{won ? 'Congratulations!' : 'Game over'}</h2>
        {won ? (
          <p>You found the word in <strong>{attemptsUsed} {attemptsUsed === 1 ? 'attempt' : 'attempts'}</strong>.</p>
        ) : (
          <p>The hidden word was <strong className="solution-word">{solutionWord}</strong>.</p>
        )}
        <button type="button" className="play-again" onClick={onPlayAgain}>Play Again</button>
      </section>
    </div>
  );
}
