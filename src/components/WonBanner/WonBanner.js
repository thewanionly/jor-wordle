import React from 'react';

import Banner from '../Banner';

function WonBanner({ numOfGuesses }) {
  return (
    <Banner variant='success'>
      <p>
        <strong>Congratulations!</strong> Got it in{' '}
        <strong>
          {numOfGuesses} {numOfGuesses > 1 ? 'guesses' : 'guess'}
        </strong>
        .
      </p>
    </Banner>
  );
}

export default WonBanner;
