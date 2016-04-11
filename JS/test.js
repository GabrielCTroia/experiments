const assert = require('assert');
const closeEnough = require('./index');

function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return true;   // Found it
        }
    }
    return false;   // Not found
}

describe('Index', () => {
  it('generates combinations', () => {
    const expectedCombinations = [
      [1, 1, 2], [9, 1, 2],
      [0, 2, 2], [0, 0, 2],
      [0, 1, 3], [0, 1, 1]
    ]
    const actualCombinations = closeEnough.generateCombinations([0, 1, 2, 3], 2);

    console.log('original set', [0, 1, 2, 3]);
    console.log('generated', actualCombinations, actualCombinations.length);
    // console.log('actual', actualCombinations);

    expectedCombinations.forEach((expected) => {
      // console.log('in array', actual);
      assert.equal(isItemInArray(actualCombinations, expected), true);
    });
  });

  it('knows a winner', () => {
    [
      // [[0, 1, 2], [0, 1, 3], true],
      // [[1, 2, 2], [1, 3, 2], true],
      // //[[3, 4, 7], [3, 4, 7], false],
      // [[9, 2, 6], [9, 2, 4], true],
      // [[9, 2, 6], [0, 2, 6], true],
      // [[4, 4, 4], [5, 5, 4], true],
      // [[4, 4, 4], [5, 4, 4], true],
      // [[9, 9, 9], [8, 9, 9], true],
      // [[9, 9, 9], [0, 9, 9], true],
      // [[3, 2, 1], [1, 2, 3], true],
      // [[7, 1, 7], [7, 0, 7], true],
      // [[7, 7, 7], [6, 8, 7], true],
      // [[7, 7, 7], [4, 8, 7], true],
      // [[7, 7, 7], [5, 5, 5], true],
      [[7, 7, 7, 7], [8, 6, 8, 6], true],
    ].forEach((row) => {
      assert.equal(closeEnough.isWinner(row[0], row[1], 4, 1), row[2]);
    })
  });
});
