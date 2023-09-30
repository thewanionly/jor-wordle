import React from 'react';

import Banner from '../Banner';
import Button from '../Button';

function WonBanner({ numOfGuesses, onGameRestart }) {
  return (
    <Banner variant='success'>
      <p>
        <strong>Congratulations!</strong> Got it in{' '}
        <strong>
          {numOfGuesses} {numOfGuesses > 1 ? 'guesses' : 'guess'}
        </strong>
        .
      </p>
      <Button onClick={onGameRestart}>Restart Game</Button>
    </Banner>
  );
}

export default WonBanner;
