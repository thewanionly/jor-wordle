import React, { useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import WonBanner from '../WonBanner';
import LostBanner from '../LostBanner';
import Keyboard from '../Keyboard';
import { checkGameState } from '../../game-helpers';
import { GAME_STATE } from '../../constants';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = useState([]);
  const gameState = checkGameState(guesses, answer);
  const gameOver = gameState === GAME_STATE.WON || gameState === GAME_STATE.LOST;

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
      {gameState === GAME_STATE.WON && <WonBanner numOfGuesses={guesses.length} />}
      {gameState === GAME_STATE.LOST && <LostBanner answer={answer} />}
      <Keyboard guesses={guesses} answer={answer} />
    </>
  );
}

export default Game;
