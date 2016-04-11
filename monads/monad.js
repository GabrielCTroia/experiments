'use strict';

function monad(unit) {

}

function bind(unit, fn) {
	if (unit === 'None') return 'None';
	return fn(unit);
}

function bindLists(units, fn) {
	var res = [];
	for (var u in units) {
		var rr = fn(units[u]);
		if (rr === 'None') {
			res.push('None');
			break;
		}

		for (var r in rr) {
			res.push(rr[r]);
		}
	}
	return res;
}

function unit(x) {
	return [x];
}

function monadDo(unit) {
	var fns = Array.prototype.splice.call(arguments, 1);
	var fnRes = unit;
	var result = [];
	for (var f in fns) {
		fnRes = fns[f](fnRes);
		result.push(fnRes);
		if (fnRes === 'None') {
			break;
		}
	}
	return res;
}


// examples

function divide(unit, by) {
	if (unit === 0) return 'None'; // just for the sake of proof
	return unit/by;
}

function sqrt2(unit) {
	if (unit < 0) return 'None';
	return Math.sqrt(unit);
}

function sqrt3(unit) {
	console.log('sqrt3 for:', unit);
	//console.log(unit)
	if (unit < 0) return 'None';
	else if (unit === 0) return [0];
	else return [Math.sqrt(unit), -Math.sqrt(unit)];
}

// var result = sqrt2(divide(sqrt2(-5), 5));
// var resultBind = bind(bind(bind(5, sqrt2), function(unit) {return divide(unit, 5)}), sqrt2);

//var resultSqrtComposable = sqrt3(sqrt3(81));
// var resultSqrtComposable = bindLists(bindLists(unit(9), sqrt3), sqrt3);

var resultDo = monadDo(unit(81),
	sqrt3,
	sqrt3,
	sqrt3);

console.log(resultDo);

/*// interface



 monad(68)(
	add(5),
	remove(10),

	)
*/