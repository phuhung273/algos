/**
 * @param  {Array} state
 * @param  {Number} n
 * @return {boolean}
 */
function isValidState(state, n) {
  return state.length === n;
}

/**
 * @param  {Array} state
 * @param  {Number} number
 * @return {Array}
 */
function getCandidates(state, number){
  const candidates = [];
  const y = state.length;

  for (let x = 0; x < number; x++) {
    if (!state.includes(x)) {
      // Not the same column

      if (y === 0) {
        candidates.push(x);
      } else {

        let notDiagonal = true;
        for (let yState = 0; yState < y; yState++) {
          xState = state[yState];
          // console.log(yState + " " + xState + " " + y + " " + x);
          if (Math.abs(y - yState) === Math.abs(x - xState)) {
            notDiagonal = false;
            break;
          }
        }

        if (notDiagonal) {
          // console.log('Found ' + x);
          candidates.push(x);
        }
      }

    }
  }

  return candidates;
}

/**
 * @param  {Array} state
 * @param  {Array} solutions
 * @param  {Number} solutions
 */
function search(state, solutions, number){
  if (isValidState(state, number)) {
    solutions.push(state);
    // console.log(solutions);
    // // If only require 1 solution, return immediately
    // return;
  }

  for(let candidate of getCandidates(state, number)){
    // console.log(candidate);
    state.push(candidate);
    // console.log(`Before search ${state}`);
    search(state.slice(), solutions, number);
    // console.log(`Finish candidate ${candidate} for state: ${state}`);
    state.pop();
    // console.log(`After search ${state}`);
  }

  // console.log(`Finish all state ${state}`);
}
/**
 * @param  {Number} number
 */
function solve(number){
  solutions = [];
  state = [];
  search(state, solutions, number);
  return solutions;
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Type n: ', number => {
  number = parseInt(number);

  console.time('test');
  console.log(solve(number));
  console.timeEnd('test');
  readline.close();
});