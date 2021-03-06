const app = require('koa')();
const serve = require('koa-static');
const router = require('koa-router')();
const proxy = require('koa-proxy');
const Log = require('./util/log');

const prPortOccupied = require('./util/portOccupyPromise');

// const route = require('koa-router');
var QLS = function () { // eslint-disable-line
	return new QLS.fn.init(); // eslint-disable-line
};

function generateRegUrlPrefix(url) {
	return new RegExp('^'+url+'(.*?)(?:\/|$)');
}

QLS.fn = QLS.prototype;

QLS.fn.init = function(){}; // eslint-disable-line

QLS.fn.init.prototype = QLS.prototype;

QLS.prototype.run = function (option) {
	var urlPrefix,
		urlPrefixReg;
	var ctx = this;

	if (!option) {
		Log.error('Option required!');
		return;
	}

	prPortOccupied(option.port).then(function(){

		/*
			proxy:{
				'/api':{
					host: 'http://127.0.0.1:9999',
					pathRewrite:{
						'^/api':'/test'
					}
				}
			}
		*/
		//need to detect proxy
		if(option.proxy){
			for(urlPrefix in option.proxy){
				//option.proxy.hasOwnProperty(key))
				let pathRewrite = option.proxy[urlPrefix].pathRewrite;

				let proxyExample = [
					"proxy:{",
					"	'/api':{",
					"		host: 'http://127.0.0.1:9999',",
					"		pathRewrite:{",
					"			'^/api':'/test'",
					"		}",
					"	}",
					" }"].join('\n');

				if(!option.proxy[urlPrefix].host || !option.proxy[urlPrefix].pathRewrite){
					Log.warn('Proxy warnning: Option proxy need sub option of host and pathRewrite. e.g.\n',proxyExample);
					continue;
				}

				urlPrefixReg = generateRegUrlPrefix(urlPrefix);

				router.get(urlPrefixReg, proxy({
						host: option.proxy[urlPrefix].host,
						map: function(urlPath){
							var res = urlPath;
							if(pathRewrite){
								for(var org in pathRewrite){
									if(pathRewrite[org]=='/'){
										pathRewrite[org] = '';
									}
									res = res.replace(new RegExp(org), pathRewrite[org]);
								}
								return res;
							}
							return res;
						}
					})
				);

				router.post(urlPrefixReg, proxy({
						host: option.proxy[urlPrefix].host,
						map: function(urlPath){
							var res = urlPath;
							if(pathRewrite){
								for(var org in pathRewrite){
									if(pathRewrite[org]=='/'){
										pathRewrite[org] = '';
									}
									res = res.replace(new RegExp(org), pathRewrite[org]);
								}
								return res;
							}
							return res;
						}
					})
				);
				
			}
		}

		app.use(router.routes());
		// serve static file
		app.use(serve(option.dir));
		app.listen(option.port, function () {
			Log.log(`service started\n port: ${option.port} , dir:${option.dir}`);
			if(option.cbk && typeof option.cbk == 'function'){
				option.cbk.call(ctx, app);
			}
		});
	},function(res){
		res.status && Log.error(res.desc);
	});
};

module.exports = QLS;
