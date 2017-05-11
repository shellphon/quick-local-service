var QLS = require('../index.js');

var expect = require('chai').expect,
	qls = QLS();

var superagent = require('supertest');

var path = require('path');

describe("quick local service", function() {
	
	it("QLS() should be instance of QLS", function() {
		expect(qls).to.be.an.instanceof(QLS);
	});

	it("QLS().run() with option port and dir should run the service", function(done) {
		qls.run({
			port:10086,
			dir: path.resolve(__dirname, '../example/html'),
			cbk: function(){
				superagent('http://127.0.0.1:10086')
					.get('/')
					.expect(200, done);
			}
		})
	});

	it("QLS().run() with proxy should run the service", function(done) {
		var interface = new Promise(function(resolve, reject){
			try {

				QLS().run({
					port:10087,
					dir: path.resolve(__dirname, '../example/json'),
					cbk:function(){
						//console.log('resolve');
						resolve();
					}
				});
			}catch(err){
				done();
			}
		});

		interface.then(function(){
			qls.run({
				port:10085,
				dir: path.resolve(__dirname, '../example/html'),
				proxy:{
					'/api':{
						host:'http://127.0.0.1:10087',
						pathRewrite:{
							'^/api':'/'
						}
					}
				},
				cbk: function(){
					superagent('http://127.0.0.1:10085')
						.get('/api/test.json')
						.expect(200, done);
				}
			});
		});
	});

});