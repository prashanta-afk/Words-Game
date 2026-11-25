import React from 'react';

export default function Tile({ letter = '', status = 'empty', isSubmitted = false }) {
  const label = letter ? `${letter}, ${status === 'empty' ? 'unrevealed' : status}` : 'Empty';
  return (
    <div
      className={`tile ${status !== 'empty' ? status : ''} ${letter && status === 'empty' ? 'filled' : ''} ${isSubmitted ? 'revealed' : ''}`}
      role="gridcell"
      aria-label={label}
    >
      {letter}
    </div>
  );
}
