"use strict";

var t = 10000; // 10 s


function throttle_qps(fn, qps) {
	var wait = t / qps;
	var touched = 0;
	var called = 0;
	var timer;

	function setNextCall(localWait) {
		console.log('going to be called in', localWait);

		let ts = now();
		let passedDeadline = ts - wait > called;
		let touchedRecently = touched > called;

		timer = setTimeout(() => {
			timer = null;
			let touchedRecently = touched > called;
			if (touchedRecently) {
				console.log('touched recently', (touched - called), 'ago', touched, called);
				if (called === 0) {
					setNextCall(wait);	
				} else {
					setNextCall(wait - (touched - called));	
				}
			}

			called = now();
			fn();
		}, localWait);
	}

	return function() {
		let ts = now();
		let passedDeadline = ts - wait > called;

		if (!timer && passedDeadline) {
			setNextCall(wait);	
		}
		
		touched = now();
	}

function now() {
	return new Date().getTime();
}


// >> = (now - wait > touched)
// min = Math.min(wait, now - touched)
// n | w | t | >>? | min

// 20 10 0     true w(10) - t:20, waited 
// 23 10 20 - false - 
// 26 10 20 - false - 
// ...
// 30 - fn(),
// ...
// 39 10 20 - false`
// 42 10 20 - true - t:42



	// return function() {
	// 	// if (touched > now() - wait) {
	// 	// console.log('starting');
	// 	interval = setInterval(function() {
	// 		console.log('in in terval', touched, now() - wait, touched > now() - wait);
	// 		if (touched > now() - wait) {
	// 			fn();
	// 		} else {
	// 			clearInterval(interval);
	// 		}
	// 	}, wait);

	// 	touched = now();
	// 	console.log('touched', touched);
	// }
}




var logNow = throttle_qps(function() {
	console.log('Called');
}, 2);


var c = 0;
var startInterval = function() {
	setInterval(() => {
		console.log('tic-tac:', ++c, 's');
	}, 1000);

	logNow();
	setInterval(logNow, 4000);

	// logNow();
}

// console.log(logNow);

// var logNow = function() {
// 	console.log('called every', 1000/6);
// }


// function start() {
// 	setInterval(logNow, 10);
// }

// console.log(now());

startInterval();

// start();

// console.log('yeahh')