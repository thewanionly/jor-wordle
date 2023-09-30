import React from 'react';
import { range } from '../../utils';
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

const KEYBOARD_KEYS_LAYOUT = {
  top: 'QWERTYUIOP',
  middle: 'ASDFGHJKL',
  bottom: 'ZXCVBNM'
};

const KEYBOARD_ROWS_COUNT = Object.keys(KEYBOARD_KEYS_LAYOUT).length;
const KEYBOARD_KEYS_LAYOUT_ARR = Object.values(KEYBOARD_KEYS_LAYOUT);

// Check the status of each letter that are already guessed
// Return one single array containing all letters that are already guessed
const getGuessedLettersStatus = (guesses, answer) =>
  guesses
    .flatMap((guess) => checkGuess(guess.value, answer))
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

const getAllKeysStatuses = (guesses, answer) => {
  // Genereate an object containing all key values and statuses
  const allKeys = Object.fromEntries(
    Object.values(KEYBOARD_KEYS_LAYOUT)
      .join('')
      .split('')
      .map((k) => [k, { letter: k, status: KEY_STATUS.unused.value }])
  );

  // Get all guessed letters and their statuses
  const guessedLetters = getGuessedLettersStatus(guesses, answer);

  // Loop over the guesses and determine the status of each key.
  // Update the corresponding key in `allKeys` object
  guessedLetters.forEach(({ letter, status }) => {
    allKeys[letter].status = status;
  });

  return allKeys;
};

const getKeyboardKeys = (guesses, answer) => {
  // Get all keys with their statuses
  const allKeys = getAllKeysStatuses(guesses, answer);

  // Loop over each row. In each row, transform `value` to contain an array of object
  // that containst the key's `letter` and `status`
  return KEYBOARD_KEYS_LAYOUT_ARR.map((value) =>
    value.split('').map((key) => ({ letter: key, status: allKeys[key].status }))
  );
};

function Key({ value, status }) {
  return <span className={`key ${status}`}>{value}</span>;
}

function Keyboard({ guesses, answer }) {
  const keys = getKeyboardKeys(guesses, answer);

  return (
    <div className='keyboard'>
      {range(KEYBOARD_ROWS_COUNT).map((rowIndex) => (
        <div className='keyboard-row' key={rowIndex}>
          {keys[rowIndex].map(({ letter, status }) => (
            <Key key={letter} value={letter} status={status} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
