// src http://www.codewars.com/kata/55ae997d1c40a199e6000018/train/javascript

console.log(pattern(17));

function pattern(n) {
	return getMatrix(n).join('\n');
}

function getMatrix(n) {
	return getRange(n).map(function(x, col) {
		return getRange(n).map(function(y, row) {
			return Math.max(n - col, n - row) % 10;
		}).join('');
	});
}

function getRange(n) {
  return (n < 1) ? [] : Array.apply(null, Array(n));
}


// ############ //

function getMatrix(n) {
	var res = [];
	for (var col = 0; col < n; col++) {
		res[col] = [];
		for (var row = 0; row < n; row++) {
			res[col][row] = Math.max(n - col, n - row) % 10;
		}
		res[col] = res[col].join('');
	}

	return res;
}



function invert(fn) {
	return function(n, i, array) {
		return fn(n, array.length - i - 1, array);
	}
}

function getRange(n) {
  return (n < 1) ? [] : Array.apply(null, Array(n));
}