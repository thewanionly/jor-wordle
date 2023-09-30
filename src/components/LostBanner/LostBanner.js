import React from 'react';

import Banner from '../Banner';

function LostBanner({ answer }) {
  return (
    <Banner variant='error'>
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </Banner>
  );
}

export default LostBanner;