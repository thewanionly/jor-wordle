import React from 'react';

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

// One single array containing all letters that are already guessed
// Sorted by priority indicated in KEY_STATUS object, removing low prio duplicates
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
    // remove duplicates. those duplicate with low prio will be removed
    .filter(
      (value, index, self) =>
        self.findIndex((selfValue) => selfValue.letter === value.letter) === index
    );

const getKeyboardRows = (guesses) => {
  // Get all guessed letters and their statuses
  const guessedLetters = getGuessedLettersStatus(guesses);

  // Create an object containing all guessed letters with letter as key and the status as value
  const keysStatus = Object.fromEntries(
    guessedLetters.map(({ letter, status }) => [letter, status])
  );

  // Create 2D array, similar to KEYBOARD_KEYS_LAYOUT.
  // In each top-level row, transform `value` to an array of objects that containst the key's `letter` and `status`
  return KEYBOARD_KEYS_LAYOUT.map((value) =>
    value.split('').map((key) => ({
      letter: key,
      status: keysStatus[key] ?? KEY_STATUS.unused.value
    }))
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
