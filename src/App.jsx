import React from 'react'
import Header from './components/Header.jsx'
import GameBoard from './components/GameBoard.jsx'
import Keyboard from './components/Keyboard.jsx'
import GameOverModal from './components/GameOverModal.jsx'
import { useWordle } from './hooks/useWordle.js'
import './App.css'

function App({ initialSolution }) {
  const {
    solutionWord,
    currentGuess,
    pastGuesses,
    gameStatus,
    errorMessage,
    keyboardStatus,
    evaluatedGuesses,
    currentRow,
    attemptsUsed,
    handleInput,
    resetGame,
  } = useWordle(initialSolution)

  return (
    <div className="app-shell">
      <Header />

      <div className="game-area">
        <div className="message-space" aria-live="polite">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <GameBoard
          pastGuesses={pastGuesses}
          currentGuess={currentGuess}
          evaluatedGuesses={evaluatedGuesses}
          currentRow={currentRow}
        />

        <Keyboard
          keyboardStatus={keyboardStatus}
          onKey={handleInput}
          disabled={gameStatus !== 'IN_PROGRESS'}
        />

        <section className="instructions" aria-label="Tile color instructions">
          <h2>Tile guide</h2>
          <div className="instruction-list">
            <span><i className="sample correct">A</i> Correct position</span>
            <span><i className="sample present">A</i> Wrong position</span>
            <span><i className="sample absent">A</i> Not in the word</span>
          </div>
        </section>
      </div>

      <GameOverModal
        status={gameStatus}
        solutionWord={solutionWord}
        attemptsUsed={attemptsUsed}
        onPlayAgain={resetGame}
      />
    </div>
  )
}

export default App