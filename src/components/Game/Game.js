import React, { useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import { checkGameState } from '../../game-helpers';
import { GAME_STATE } from '../../constants';
import Banner from '../Banner';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = useState([]);
  const gameState = checkGameState(guesses, answer);
  const gameOver = gameState === GAME_STATE.WINS || gameState === GAME_STATE.LOSES;

  const handleSaveGuess = (guess) => {
    setGuesses([
      ...guesses,
      {
        id: crypto.randomUUID(),
        value: guess
      }
    ]);
  };

  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <GuessInput onSaveGuess={handleSaveGuess} disabled={gameOver} />
      {gameState === GAME_STATE.WINS && (
        <Banner variant='success'>
          <p>
            <strong>Congratulations!</strong> Got it in{' '}
            <strong>
              {guesses.length} {guesses.length > 1 ? 'guesses' : 'guess'}
            </strong>
            .
          </p>
        </Banner>
      )}
      {gameState === GAME_STATE.LOSES && (
        <Banner variant='error'>
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        </Banner>
      )}
    </>
  );
}

export default Game;
