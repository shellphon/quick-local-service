module.exports = {
	port:10086,
	dir:"D:\\githubs\\quick-local-service\\example\\html",
	proxy:{
		'/api':{
			host:'http://127.0.0.1:8910'
		},
		'/kik':{
			host:'http://127.0.0.1:8910',
			pathRewrite:{
				'^/kik':'/kapi'
			}
		}
	}
}