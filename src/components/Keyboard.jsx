import React from 'react';

const ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','BACKSPACE'],
];

export default function Keyboard({ keyboardStatus, onKey, disabled }) {
  return (
    <div className="keyboard" aria-label="On-screen keyboard">
      {ROWS.map((row) => (
        <div className="keyboard-row" key={row.join('-')}>
          {row.map((key) => {
            const status = /^[A-Z]$/.test(key) ? keyboardStatus[key] || 'unused' : 'unused';
            const label = key === 'BACKSPACE' ? 'Backspace' : key;
            return (
              <button
                type="button"
                key={key}
                className={`key ${status} ${key.length > 1 ? 'wide-key' : ''}`}
                onClick={() => onKey(key)}
                disabled={disabled}
                aria-label={label}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
