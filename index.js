const app = require('koa')();
const serve = require('koa-static');

const prPortOccupied = require('./util/portOccupyPromise');

// const route = require('koa-router');
var QLS = function () { // eslint-disable-line
	return new QLS.fn.init(); // eslint-disable-line
};

QLS.fn = QLS.prototype;

QLS.fn.init = function(){}; // eslint-disable-line

QLS.fn.init.prototype = QLS.prototype;

QLS.prototype.run = function (option) {
	if (!option) {
		console.error('Option required!');
		return;
	}

	prPortOccupied(option.port).then(function(){
		app.use(serve(option.dir));
		app.listen(option.port, function () {
			console.log(`service started\n port: ${option.port} , dir:${option.dir}`);
		});
	},function(res){
		res.status && console.error(res.desc);
	});
};

module.exports = QLS;
