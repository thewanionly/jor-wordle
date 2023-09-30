import React from 'react';
import { range } from '../../utils';
import { GUESS_STR_LENGTH } from '../../constants';

function Cell({ letter, status }) {
  const className = !status ? 'cell' : `cell ${status}`;

  return <span className={className}>{letter}</span>;
}

function Guess({ value = [] }) {
  return (
    <p className='guess'>
      {range(GUESS_STR_LENGTH).map((colIndex) => (
        <Cell key={colIndex} letter={value[colIndex]?.letter} status={value[colIndex]?.status} />
      ))}
    </p>
  );
}

export default Guess;
