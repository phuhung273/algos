const { assert } = require('console');

const SHAPE = 9;
const BOX_SHAPE = 3;
const EMPTY = '.';

/**
 * @param  {Array} state
 * @return {boolean}
 */
function isValidState(state) {
  return !state.includes(EMPTY);
}

/**
 * @param  {Array} state
 * @param  {Number} index
 */
function* getCandidatesGenerator(state, index){

  const x = index % SHAPE;
  const y = (index - x) / SHAPE;
  
  const row = getRow(state, y);
  const col = getColumn(state, x);
  const box = getBoxOfPoint(state, x, y);

  for (let i = 1; i <= SHAPE; i++) {
    const iString = i.toString();
    if (!row.includes(iString) && !col.includes(iString) && !box.includes(iString)) {
      yield iString;
    }
  }
}

/**
 * @param  {Array} state
 * @param  {Array} solutions
 */
function search(state, solutions){
  if (isValidState(state)){
    solutions.push(state);
    // console.log(solutions);
    // // If only require 1 solution, return immediately
    // return;
  }

  const index = state.findIndex(e => e === EMPTY);

  if (index === -1) {
    return;
  }

  for(let candidate of getCandidatesGenerator(state, index)){
    // console.log(candidate);
    state[index] = candidate.toString();
    // console.log(state);
    search(state.slice(), solutions)
    state[index] = EMPTY;
  }
}
/**
 * @param  {String} input
 */
function solve(input){
  input = input.split('');
  solutions = [];
  state = input;
  search(state, solutions);
  return solutions;
}

/**
 * @param  {Array} input
 * @param  {Number} n
 */
function getRow(input, n) {
  assert(-1 < n < SHAPE);
  return input.slice(n * SHAPE, (n + 1) * SHAPE);
}

/**
 * @param  {Array} input
 * @param  {Number} n
 */
function* getColumnGenerator(input, n) {
  assert(-1 < n < SHAPE);
  for (let i = 0; i < SHAPE; i++) {
    yield input[i * SHAPE + n];
  }
}

/**
 * @param  {Array} input
 * @param  {Number} n
 */
const getColumn = (input, n) => Array.from(getColumnGenerator(input, n));

/**
 * @param  {Array} input
 * @param  {Number} x
 * @param  {Number} y
 */
function* getBoxOfPointGenerator(input, x, y) {
  assert(-1 < x < SHAPE && -1 < y < SHAPE);

  const xTopLeft = x - (x % BOX_SHAPE);
  const yTopLeft = y - (y % BOX_SHAPE);

  for (let i = 0; i < BOX_SHAPE; i++) {
    for (let j = 0; j < BOX_SHAPE; j++) {
      yield input[(i + yTopLeft) * SHAPE + j + xTopLeft];
    }
  }
}

/**
 * @param  {Array} input
 * @param  {Number} x
 * @param  {Number} y
 */
const getBoxOfPoint = (input, x, y) => Array.from(getBoxOfPointGenerator(input, x, y));

const test = '..3.2.6..9..3.5..1..18.64....81.29..7..........67.82....26.95..8..2.3..9..5.1.3..';
const solution = '483921657967345821251876493548132976729564138136798245372689514814253769695417382';

// console.log(getBoxOfPoint(test.split(''), 1, 1));
// for (let i = 0; i < SHAPE; i++) {
//   console.log(getRow(test.split(''), i));
// }

const solutionsArray = solve(test);
const solutionString = solutionsArray[0].join('');
if (solutionString === solution) {
  console.log(solutionString);
  console.log('Success');
}