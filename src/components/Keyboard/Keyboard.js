import React from 'react';

import { checkGuess } from '../../game-helpers';

const KEY_STATUS = {
  correct: {
    value: 'correct',
    sortOrder: 1
  },
  misplaced: {
    value: 'misplaced',
    sortOrder: 2
  },
  incorrect: {
    value: 'incorrect',
    sortOrder: 3
  },
  unused: {
    value: 'unused',
    sortOrder: 4
  }
};

const KEYBOARD_KEYS_LAYOUT = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

// Check the status of each letter that are already guessed
// Return one single array containing all letters that are already guessed
const getGuessedLettersStatus = (guesses) =>
  guesses
    .flat()
    // sort by priority indicated in KEY_STATUS object
    .sort((a, b) => {
      const statusA = KEY_STATUS[a.status].sortOrder;
      const statusB = KEY_STATUS[b.status].sortOrder;

      if (statusA < statusB) return -1;
      if (statusA > statusB) return 1;

      return 0;
    })
    // remove duplicates
    .filter(
      (value, index, self) =>
        self.findIndex((selfValue) => selfValue.letter === value.letter) === index
    );

const getKeysStatuses = (guesses) => {
  // Get all guessed letters and their statuses
  const guessedLetters = getGuessedLettersStatus(guesses);

  // Return an object containing all key values and statuses
  return Object.fromEntries(guessedLetters.map((value) => [value.letter, value]));
};

const getKeyboardRows = (guesses) => {
  // Get all keys with their statuses
  const keyStatuses = getKeysStatuses(guesses);

  // Loop over each row. In each row, transform `value` to contain an array of object
  // that containst the key's `letter` and `status`
  return KEYBOARD_KEYS_LAYOUT.map((value) =>
    value
      .split('')
      .map((key) => ({ letter: key, status: keyStatuses[key]?.status ?? KEY_STATUS.unused.value }))
  );
};

function Key({ value, status }) {
  return <span className={`key ${status}`}>{value}</span>;
}

function Keyboard({ guesses }) {
  const rows = getKeyboardRows(guesses);

  return (
    <div className='keyboard'>
      {rows.map((row, index) => (
        <div className='keyboard-row' key={index}>
          {row.map(({ letter, status }) => (
            <Key key={letter} value={letter} status={status} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
