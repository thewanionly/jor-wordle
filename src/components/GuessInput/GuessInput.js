import React from 'react';

const MIN_INPUT_LENGTH = 5;

function GuessInput() {
  const [guess, setGuess] = React.useState('');

  const handleGuessInput = (event) => {
    setGuess(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(guess);
    setGuess('');
  };

  return (
    <form className='guess-input-wrapper' onSubmit={handleSubmit}>
      <label htmlFor='guess-input'>Enter guess:</label>
      <input
        id='guess-input'
        type='text'
        maxLength={MIN_INPUT_LENGTH}
        pattern={`^(?=.{${MIN_INPUT_LENGTH}}$)[A-Za-z]+$`}
        title={`Input must contain letters only and must be exactly ${MIN_INPUT_LENGTH} characters long`}
        value={guess}
        onChange={handleGuessInput}
        required
      />
    </form>
  );
}

export default GuessInput;
