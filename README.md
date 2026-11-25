# Wordle React

A complete, responsive five-letter word guessing game built with React and Vite. The player has six attempts to discover a randomly selected hidden word.

## Project objectives

- Demonstrate reusable React functional components and hooks.
- Separate UI presentation, game state, word data, and letter evaluation.
- Implement physical and virtual keyboard input without duplicated logic.
- Apply a reliable two-pass algorithm for duplicate-letter handling.
- Include automated tests for the game logic and interface.

## Features

- Exactly six rows and 30 letter tiles
- Physical and clickable QWERTY keyboards
- Uppercase, five-character input
- Input validation and visible feedback
- Correct, present, and absent tile evaluation
- Duplicate-letter-safe scoring
- Priority-preserving keyboard colors
- Win and loss modals with solution reveal
- Reset/play-again functionality
- Responsive desktop and mobile layout
- Accessible labels and focus indicators

## Technologies

- React 19
- Vite 8
- JavaScript and JSX
- Plain CSS
- Vitest and Testing Library
- ESLint

## Folder structure

```text
src/
  components/  Reusable board, row, tile, keyboard, header, and modal UI
  data/        Five-letter word list and random solution selection
  hooks/       Centralized useWordle game state and event handling
  utils/       Pure letter evaluation and keyboard priority functions
  App.jsx      Application composition
  App.css      Application styles
  index.css    Global reset and root styles
  main.jsx     React entry point
```

## Installation

1. Install Node.js and npm.
2. Open a terminal in this project directory.
3. Run `npm install`.

## Running the application

- Development: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Testing and quality checks

- Run tests: `npm test`
- Run lint: `npm run lint`
- Build: `npm run build`

The tests cover the board structure, input behavior, evaluation utility, keyboard status priority, winning state, and reset behavior.

## Evaluation algorithm

`checkGuess` performs two passes. The first pass marks exact-position matches as `correct` and counts only unmatched solution letters. The second pass checks remaining guessed letters against those counts, marking an occurrence `present` and decrementing the count. Every remaining letter is `absent`. This ensures duplicate letters can never receive more matches than exist in the solution.

For example, solution `APPLE` and guess `ALLEY` produce: correct, present, absent, present, absent.

## State management

`useWordle` owns the solution, current guess, completed guesses, status, validation message, and keyboard status. The board derives submitted and active rows from these values. State updates are immutable, and submitted guesses are stored in a new array rather than modified in place.

## Keyboard handling

One `handleInput` function supports both physical and virtual keys. A window `keydown` listener normalizes letters, handles Backspace and Enter, and is removed during effect cleanup. Virtual buttons call the same handler, preventing duplicated input rules.

## Win and loss rules

The game becomes WON immediately when the submitted guess equals the solution. It becomes LOST after six incorrect guesses. A matching sixth guess is handled as a win because the winning check runs first. Both statuses block further input and show a modal.

## Known limitations

- The local word list is not a complete dictionary; not every English five-letter word is accepted as a submission.
- No server, account, or persistent score system is used.
- Game words are randomized on first load and reset.

## References and acknowledgments

- Aaditya Dulal, “How Wordle Works: Building the Game with React,” July 28, 2026.
- Reference repository: https://github.com/aaditya-prog/wordle-react
- React `useState`: https://react.dev/reference/react/useState
- React `useEffect`: https://react.dev/reference/react/useEffect
- React documentation: https://react.dev/
- Vite documentation: https://vite.dev/
- Vitest documentation: https://vitest.dev/

This implementation is an original, purpose-built React project inspired by the supplied architectural references.
