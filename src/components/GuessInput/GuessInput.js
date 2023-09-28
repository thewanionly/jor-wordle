import React from 'react';

import { GUESS_STR_LENGTH } from '../../constants';

function GuessInput({ onSaveGuess }) {
  const [guess, setGuess] = React.useState('');

  const handleGuessInput = (event) => {
    setGuess(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSaveGuess(guess);
    setGuess('');
  };

  return (
    <form className='guess-input-wrapper' onSubmit={handleSubmit}>
      <label htmlFor='guess-input'>Enter guess:</label>
      <input
        id='guess-input'
        type='text'
        minLength={GUESS_STR_LENGTH}
        maxLength={GUESS_STR_LENGTH}
        pattern={`^(?=.{${GUESS_STR_LENGTH}}$)[A-Za-z]+$`}
        title={`Input must contain letters only and must be exactly ${GUESS_STR_LENGTH} characters long`}
        value={guess}
        onChange={handleGuessInput}
        required
        autoComplete='off'
      />
    </form>
  );
}

export default GuessInput;
