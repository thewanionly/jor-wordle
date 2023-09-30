import React from 'react';

import Banner from '../Banner';
import Button from '../Button';

function LostBanner({ answer, onGameRestart }) {
  return (
    <Banner variant='error'>
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
      <Button onClick={onGameRestart}>Restart Game</Button>
    </Banner>
  );
}

export default LostBanner;
