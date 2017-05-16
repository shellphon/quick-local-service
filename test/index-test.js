var QLS = require('../index.js');

var expect = require('chai').expect,
	qls = QLS();

var superagent = require('supertest');

var path = require('path');

var autoPort = {
	port:10086,
	getPort:function(){
		return this.port++;
	}
};

describe("quick local service", function() {
	
	it("QLS() should be instance of QLS", function() {
		expect(qls).to.be.an.instanceof(QLS);
	});

	it("QLS().run() with option port and dir should run the service", function(done) {
		var port = autoPort.getPort();
		qls.run({
			port: port,
			dir: path.resolve(__dirname, '../example/html'),
			cbk: function(app){
				superagent('http://127.0.0.1:'+port)
					.get('/')
					.expect(200)
					.end(function(){
						done();
						app.close();
					});
			}
		})
	});
});

describe("quick local service proxy",function(){
	
	it("QLS().run() with proxy should proxy the post request", function(done) {
		var proxyPort = autoPort.getPort(),
			serverPort = autoPort.getPort();
		var app = require('koa')();
		var router = require('koa-router')();
		router.post('/api/hello', function *(next){
			this.body = {"res":1};
		});

		router.get('/api/test',function *(next){
			this.body = {"result":1};
		});
		app.use(router.routes());

		var interface = new Promise(function(resolve,reject){
			app.listen(proxyPort, function(){
				console.log('proxy server start:'+proxyPort);
				resolve();
			});
		});

		interface.then(function(){
			qls.run({
				port: serverPort,
				dir: path.resolve(__dirname, '../example/html'),
				proxy:{
					'/api':{
						host:'http://127.0.0.1:' + proxyPort,
						pathRewrite:{
							'^/api':'/api'
						}
					}
				},
				cbk: function(){
					
					superagent('http://127.0.0.1:' + serverPort)
						.post('/api/hello')
						//.get('/api/test')
						.expect(200, done);
				}
			});
		}).catch(function(){
			done();
		});
	});

	it("proxy get request", function(done) {
		var proxyPort = autoPort.getPort(),
			serverPort = autoPort.getPort();
		var app = require('koa')();
		var router = require('koa-router')();

		router.get('/api/test',function *(next){
			this.body = {"result":1};
		});
		app.use(router.routes());

		var interface = new Promise(function(resolve,reject){
			app.listen(proxyPort, function(){
				console.log('proxy server start:'+proxyPort);
				resolve();
			});
		});
		interface.then(function(){
			qls.run({
				port: serverPort,
				dir: path.resolve(__dirname, '../example/html'),
				proxy:{
					'/api':{
						host:'http://127.0.0.1:' + proxyPort,
						pathRewrite:{
							'^/api':'/api'
						}
					}
				},
				cbk: function(){
					superagent('http://127.0.0.1:' + serverPort)
						.get('/api/test')
						.expect(200, done);
				}
			});
		});
	});
});
