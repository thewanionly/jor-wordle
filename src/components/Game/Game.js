import React, { useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import WonBanner from '../WonBanner';
import LostBanner from '../LostBanner';
import Keyboard from '../Keyboard';
import { checkGameState, checkGuess } from '../../game-helpers';
import { GAME_STATE } from '../../constants';

function Game() {
  const [answer, setAnswer] = useState(() => sample(WORDS));
  const [guesses, setGuesses] = useState([]);
  const gameState = checkGameState(guesses, answer);
  const gameOver = gameState === GAME_STATE.WON || gameState === GAME_STATE.LOST;

  const checkedGuesses = guesses.map(({ value }) => checkGuess(value, answer));

  const handleSaveGuess = (guess) => {
    setGuesses([
      ...guesses,
      {
        id: crypto.randomUUID(),
        value: guess
      }
    ]);
  };

  const handleRestartGame = () => {
    setGuesses([]);
    setAnswer(sample(WORDS));
  };

  return (
    <>
      <GuessResults guesses={checkedGuesses} />
      <GuessInput onSaveGuess={handleSaveGuess} disabled={gameOver} />
      {gameState === GAME_STATE.WON && (
        <WonBanner numOfGuesses={guesses.length} onGameRestart={handleRestartGame} />
      )}
      {gameState === GAME_STATE.LOST && (
        <LostBanner answer={answer} onGameRestart={handleRestartGame} />
      )}
      <Keyboard guesses={checkedGuesses} />
    </>
  );
}

export default Game;
