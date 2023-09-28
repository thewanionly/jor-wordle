import React from 'react';
import { range } from '../../utils';
import { GUESS_STR_LENGTH } from '../../constants';
import { checkGuess } from '../../game-helpers';

function Guess({ value = '', answer }) {
  const cellStatus = checkGuess(value, answer)?.map(({ status }) => status) ?? [];

  return (
    <p className='guess'>
      {range(GUESS_STR_LENGTH).map((colIndex) => (
        <span className={`cell ${cellStatus[colIndex] ?? ''}`} key={colIndex}>
          {value[colIndex]}
        </span>
      ))}
    </p>
  );
}

export default Guess;
