/*
 the service to be proxied
*/
var app = require('koa')();
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser');

app.use(bodyParser());


router.get(/^\/api(?:\/|$)/, function *(next){
	//console.log(this.request.url);
	this.body = this.request.url;
});
router.post(/^\/api(?:\/|$)/, function *(next){
	//console.log(this.request);
	//console.log(JSON.stringify(this.request.body));
	this.body = this.request.url + JSON.stringify(this.request.body);
});
router.get(/^\/kapi(?:\/|$)/, function *(next){
	//console.log(this.request.url);
	this.body = this.request.url;
});
router.post(/^\/kapi(?:\/|$)/, function *(next){
	//console.log(this.request);
	//console.log(JSON.stringify(this.request.body));
	this.body = this.request.url + JSON.stringify(this.request.body);
});

app.use(router.routes());

app.listen(8910);