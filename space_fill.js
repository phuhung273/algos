// https://youtu.be/ngCos392W4w?t=734

const { assert } = require('console');

/**
 * @param  {Number} n
 * @param  {Number} m
 */
function findNumberOfSolutions(n, m) {
  if (n === 1) return 1;
  if (m === 1) return 1;

  let solutions = 0;
  for (let i = 0; i < m; i++) {
    const spaceLeft = n - m + i
    const max = m - i;

    if (spaceLeft >= 1) {
      solutions += findNumberOfSolutions(spaceLeft, max);
    } else if (spaceLeft == 0) {
      solutions += 1;
    }
  }

  return solutions;
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Type n and m, separated by space: ', input => {
  let [n, m] = input.split(' ').map(e => parseInt(e.trim()));
  assert(m <= n);
  console.time('test');
  console.log(findNumberOfSolutions(n, m));
  console.timeEnd('test');
  readline.close();
});