var ns = {
  0: 2,
  1: 1
}

var prev1;
var prev2;

function lucasnum(n){
  if (ns[n]) {
    return ns[n];
  }
  else if (n < 0) {
    ns[n] = lucasnum(n + 2) - lucasnum(n + 1);
    return ns[n];
  }
  else {
    ns[n] = lucasnum(n - 1) + lucasnum(n - 2);
    return ns[n];
  }
}

console.log(lucasnum(4));