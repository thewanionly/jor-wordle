import { NUM_OF_GUESSES_ALLOWED, GAME_STATE } from './constants';

/**
 * Thanks to Github user dylano for supplying a more-accurate
 * solving algorithm!
 */

/**************************************/
/********* Josh's checkGuess **********/
/**************************************/
// export function checkGuess(guess, answer) {
//   // This constant is a placeholder that indicates we've successfully
//   // dealt with this character (it's correct, or misplaced).
//   const SOLVED_CHAR = '✓';

//   if (!guess) {
//     return null;
//   }

//   const guessChars = guess.toUpperCase().split('');
//   const answerChars = answer.split('');

//   const result = [];

//   // Step 1: Look for correct letters.
//   for (let i = 0; i < guessChars.length; i++) {
//     if (guessChars[i] === answerChars[i]) {
//       result[i] = {
//         letter: guessChars[i],
//         status: 'correct'
//       };
//       answerChars[i] = SOLVED_CHAR;
//       guessChars[i] = SOLVED_CHAR;
//     }
//   }

//   // Step 2: look for misplaced letters. If it's not misplaced,
//   // it must be incorrect.
//   for (let i = 0; i < guessChars.length; i++) {
//     if (guessChars[i] === SOLVED_CHAR) {
//       continue;
//     }

//     let status = 'incorrect';
//     const misplacedIndex = answerChars.findIndex((char) => char === guessChars[i]);
//     if (misplacedIndex >= 0) {
//       status = 'misplaced';
//       answerChars[misplacedIndex] = SOLVED_CHAR;
//     }

//     result[i] = {
//       letter: guessChars[i],
//       status
//     };
//   }

//   return result;
// }

/***************************************/
/************ My checkGuess ************/
/**************************************/
export const checkGuess = (value, answer) => {
  if (!value) return null;

  const letterArray = value.split('');
  const result = [];

  // Check for correct letters
  // Add correct letters in result at the correct index
  letterArray.forEach((letter, index) => {
    if (letter === answer[index]) {
      result[index] = {
        letter,
        status: 'correct'
      };
    }
  });

  // Check for misplaced letters
  for (const [index, letter] of Object.entries(letterArray)) {
    if (letter === answer[index]) continue;

    if (
      answer.includes(letter) && //  letter is in the answer; AND
      !result.some((res) => res.letter === letter) // letter is NOT yet in the result
    ) {
      result[index] = {
        letter,
        status: 'misplaced'
      };
      continue;
    }

    result[index] = {
      letter,
      status: 'incorrect'
    };
  }

  return result;
};

export function checkGameState(guesses, answer) {
  // User wins
  if (guesses.some(({ value }) => value === answer)) return GAME_STATE.WON;

  // User loses
  if (guesses.length === NUM_OF_GUESSES_ALLOWED) return GAME_STATE.LOST;

  // User is still playing
  return GAME_STATE.PLAYING;
}
