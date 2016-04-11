var util = require('util');

console.log(pattern(90));

function pattern(n){
  if (!n) return '';

  return getPyramid(n).join('\n');
}

function getPyramid(n) {
  return getRange(n - 1).reduce(function(result) {
    return [' ' + getNextRow(result[0]) + ' '].concat(result);
  }, [getBase(n)]);
}

function getBase(level) {
  if (level < 1) return '';

  return getRange(level - 1).reduce(function(result, n, i, array) {  
    var num = String((array.length - i)).substr(-1);
    
    return num + result + num;
  }, String(level).substr(-1));
}

/**
 * Remvoes the n/2 of the row and 
 * Merges the m/2 - 1 and n/2 + 1
 */
function getNextRow(row) {
  return row.substr(0, row.length/2 - 1) + row.substr(row.length/2 + 1);
}

function getRange(n) {
  return (n < 1) ? [] : Array.apply(null, Array(n));
}