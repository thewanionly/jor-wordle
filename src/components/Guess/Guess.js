import React from 'react';
import { range } from '../../utils';
import { GUESS_STR_LENGTH } from '../../constants';
import { checkGuess } from '../../game-helpers';

function Cell({ letter, status }) {
  const className = !status ? 'cell' : `cell ${status}`;

  return <span className={className}>{letter}</span>;
}

function Guess({ value = '', answer }) {
  const result = checkGuess(value, answer) ?? [];

  return (
    <p className='guess'>
      {range(GUESS_STR_LENGTH).map((colIndex) => (
        <Cell key={colIndex} letter={result[colIndex]?.letter} status={result[colIndex]?.status} />
      ))}
    </p>
  );
}

export default Guess;
