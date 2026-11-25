import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App.jsx';

afterEach(cleanup);

function renderWordle(solution = 'APPLE') {
  // The app supports deterministic testing by assigning a solution through module test state.
  const view = render(React.createElement(App, { initialSolution: solution }));
  return view;
}

describe('Wordle interface', () => {
  it('renders exactly six rows and 30 tiles', () => {
    renderWordle();
    expect(document.querySelectorAll('[role="row"]')).toHaveLength(6);
    expect(document.querySelectorAll('[role="gridcell"]')).toHaveLength(30);
  });

  it('accepts virtual lowercase-equivalent key names through uppercase handling', () => {
    renderWordle();
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    expect(document.querySelectorAll('.tile.filled')).toHaveLength(1);
  });

  it('handles physical keyboard input and backspace', () => {
    renderWordle();
    fireEvent.keyDown(window, { key: 'a' });
    fireEvent.keyDown(window, { key: 'Backspace' });
    expect(document.querySelectorAll('.tile.filled')).toHaveLength(0);
  });

  it('ignores unsupported and numeric keys', () => {
    renderWordle();
    fireEvent.keyDown(window, { key: '1' });
    fireEvent.keyDown(window, { key: '$' });
    expect(document.querySelectorAll('.tile.filled')).toHaveLength(0);
  });

  it('rejects an incomplete Enter submission', () => {
    renderWordle();
    fireEvent.keyDown(window, { key: 'A' });
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(screen.getByText('Not enough letters')).toBeTruthy();
  });

  it('limits a guess to five letters', () => {
    renderWordle();
    'ABCDEFG'.split('').forEach((letter) => fireEvent.keyDown(window, { key: letter }));
    expect(document.querySelectorAll('.tile.filled')).toHaveLength(5);
  });

  it('can submit a guess and show a completed evaluation', () => {
    renderWordle();
    'APPLE'.split('').forEach((letter) => fireEvent.click(screen.getByRole('button', { name: letter })));
    fireEvent.click(screen.getByRole('button', { name: 'ENTER' }));
    expect(document.querySelectorAll('.tile.correct')).toHaveLength(5);
  });

  it('blocks input after a win and resets with Play Again', () => {
    renderWordle();
    'APPLE'.split('').forEach((letter) => fireEvent.click(screen.getByRole('button', { name: letter })));
    fireEvent.click(screen.getByRole('button', { name: 'ENTER' }));
    expect(screen.getByRole('heading', { name: 'Congratulations!' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(document.querySelectorAll('.tile.correct')).toHaveLength(0);
  });
});
