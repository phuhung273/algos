function drawLinearMatrix(number) {

  for (let y = 0; y < number; y++) {
    for (let x = 0; x < number; x++) {
      drawCell(y * number + x + 1);
    }
    process.stdout.write('\n');
  }
}

function drawCrossMatrix(number) {
  number = parseInt(number);
  
  let max = number ** 2;
  let count = 1;

  const queue = [{
    value: 1,
    x: 0,
    y: 0,
  }];

  const positions = [];

  let shouldGoDown = false;

  while (queue.length) {
    const current = queue.shift();

    const { x, y } = current;

    positions.push(current);

    if (count < max) {
      if(x < number - 1 && !shouldGoDown) {
        count++;

        queue.push({
          value: count,
          x: x + 1,
          y
        });
      }

      if(y < number - 1) {
        count++;
        queue.push({
          value: count,
          x,
          y: y + 1,
        });

        shouldGoDown = x !== 0;
      }
    }
  }

  const result = [];
  positions.forEach(({ value, x, y }) => {
    const row = result[y] ?? new Array(number).fill(0);
    row[x] = value;
    result[y] = row;
  });

  for (let y = 0; y < number; y++) {
    for (let x = 0; x < number; x++) {
      drawCell(result[y][x]);
    }
    process.stdout.write('\n');
  }
}

const CELL_WIDTH = 4;

/**
 * @param {number} number
 */
function drawCell(number) {
  const numberLength = number.toString().length;
  const spaceLength = CELL_WIDTH - numberLength;
  const cell = `${Array(spaceLength).fill(' ').join('')}${number}`
  process.stdout.write(`|${cell}`);
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`Type input number: `, number => {
  console.time('test');
  drawLinearMatrix(number);
  process.stdout.write('\n\n');
  drawCrossMatrix(number);
  console.timeEnd('test');
  readline.close();
});