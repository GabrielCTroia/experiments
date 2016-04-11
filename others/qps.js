
function qps(q, cb) {
	if (!this.called) {
		cb();
		this.called = {
				left: --q,
				at: new Date().getTime()
				}
	} else if (this.called.at + 1000 > new Date().getTime() && this.called.left > 0) {
		cb();
		this.called.left--;
	} else if (this.called.at + 1000 < new Date().getTime()) {
		this.called = null;
		qps(q, cb);
	}
}

qps.called = null

var x = 0;

	for(var i = 0; i < 50000000; i++) {
		qps(1, function() {
			x++;
			//console.log(i)
			//console.log(qps.called)
		});
	}
	console.log(x);
