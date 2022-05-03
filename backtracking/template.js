// https://www.youtube.com/watch?v=A80YzvNwqXA

/**
 * @param  {any} state
 * @return {boolean}
 */
function isValidState(state) {
  return true;
}

/**
 * @param  {any} state
 * @return {Array}
 */
function getCandidates(state){
  return [];
}

/**
 * @param  {any} state
 * @param  {Array} solutions
 */
function search(state, solutions){
  if (isValidState(state)){
    solutions.push(state);
    // console.log(solutions);
    // // If only require 1 solution, return immediately
    // return;
  }

  for(let candidate of getCandidates(state)){
    // console.log(candidate);
    state.push(candidate);
    // console.log(state);
    search(state, solutions)
    state.pop();
  }
}

function solve(){
  solutions = [];
  state = [];
  search(state, solutions);
  return solutions;
}