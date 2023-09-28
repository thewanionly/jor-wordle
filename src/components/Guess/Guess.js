import React from 'react';
import { range } from '../../utils';
import { GUESS_STR_LENGTH } from '../../constants';

function Guess({ value = '' }) {
  return (
    <p className='guess'>
      {range(GUESS_STR_LENGTH).map((colIndex) => (
        <span className='cell' key={colIndex}>
          {value[colIndex]}
        </span>
      ))}
    </p>
  );
}

export default Guess;
