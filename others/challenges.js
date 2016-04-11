// process.stdin.resume();
// process.stdin.setEncoding('utf8');

// var util = require('util');

// process.stdin.on('data', function (text) {
//     console.log('received data:', util.inspect(text));
//     if (text === 'quit\n') {
//       done();
//     }
//   });

//   function done() {
//     process.exit();
//   }


// This is the naive implementation, because it can go in O(n^2) due to the indexOf()
// function checkSubPermutation(letters, word) {
// 	if (word.length > letters.length) return false;

// 	if (typeof letters == 'string') 
// 		letters = letters.split('');

// 	for (c in word) {
// 		var index = letters.indexOf(word[c]);
// 		if (index != -1) {
// 			letters.splice(index, 1);
// 		} else
// 			return false;
// 	}

// 	return true;
// }


// A better aproach would be to sort the 2 strings and iterate over the letters
// This works in O(n log n) instead of O(n^2) i the worst case
function checkSubPermutation(letters, word) {
	if (word.length > letters.length) return false;

	letters = letters.split('');
	word = word.split('');

	letters.sort();
	word.sort();
	
	wordIndex = 0;

	for (var i in letters) {
		if (letters[i] > word[wordIndex]) return false;
		else if (letters[i] == word[wordIndex]) wordIndex++;
		
		if (wordIndex == word.length) return true;
	}

	return false;
}

// A even better one which performs in O(n) time and O(1) space
function checkSubPermutation(letters, word) {
	if (letters.length < word.length) return false;

	var arr = new Array(128);

	for (var i =0; i < arr.length; i++) arr[i] = 0;
	for (var i in letters) arr[letters[i].charCodeAt(0)]++;
	for (var i in word) if (--arr[word[i].charCodeAt(0)] < 0) return false;
	return true;
}
// But can I come up with a linear one???

console.log(checkSubPermutation('assoidha', 'aassodhai'));