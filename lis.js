// https://www.youtube.com/watch?v=aPQY__2H3tE

/**
 * @param  {Array} input
 * @return {Number}
 */
function findLisLength(input) {
    let maxStep = 1;
    for (let i = 0; i < input.length - 1; i++) {
        
        let secondNodes = [];

        while(1) {
            let count = 1;
            let max = input[i];
            let found = false;
            let haveSecondNode = false;
            for (let j = i + 1; j < input.length; j++) {
                if (input[j] > max && !secondNodes.includes(j)) {
                    count++;
                    // console.log(`Next step at ${input[j]}`)
                    max = input[j];
                    found = true;

                    if (!haveSecondNode){
                        secondNodes = [...secondNodes, j];
                        haveSecondNode = true;
                    }
                }
            }
            maxStep = Math.max(maxStep, count);
            if (!found) {
                break;
            }
        }

        // console.log(`End ${i}: max ${maxStep}`)
    }
    return maxStep;
}

// const test = [1, 3, 9, 7, 5]
// const test = [5, 2, 8, 6, 3, 6, 9, 5]
const test = [9, 1, 4, 5, 2, 8, 30, 13, 20, 17, 6]
const lisLength = findLisLength(test);
console.log(lisLength);
