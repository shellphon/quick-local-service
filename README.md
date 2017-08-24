# quick-local-service

#### cli for static web page quick-start

[![Build Status](https://img.shields.io/travis/shellphon/quick-local-service.svg)](https://travis-ci.org/shellphon/quick-local-service)

When you programed a page name index.html\other.html, you can use quick-local-service to start web service to host the page, so you can get the page in the browser like http://127.0.0.1:10086/index.html (index.html is the default page)

### how to use

#### install

```bash
$ npm install quick-local-service -g
```

#### Arrive the page directory and run the service

```bash
$ cd demo
$ qls run
```

default port: 10086

You can set the port by option `-p 8989`. 

Also, you can set the dir by option `-d demo`.

```bash
$ cd demo
$ cd ..
$ qls run -d demo
```

### config file

`init` command for generating a config file for options setting named `qls.config.js`

This is the content of `qls.config.js`.

```javascript
module.exports = {
	port:10086,
	dir:"",
	proxy:{}
}
```

`init` sets the current path for the option `dir`.

Also, you can tell `qls` to use another custom config file by option '-c other.config.js' 

```bash
$ qls run -c other.config.js
```

### config file for proxy cross-domain interface

in `qls.config.js`

```
module.exports = {
	port: 10086,
	dir: '',
	proxy:{
		'/api':{
			host:'http://127.0.0.1:8910',
			pathRewrite:{
				'^/api': '/api'
			}
		}
	}
}
```

You can see the example directory. (html/proxy.html [qls run], service/other-proxy.js [node other-proxy.js]) 


### Todo:

1. Interface setting for the ajax request in the page.
2. [Done] Proxy the cross-domain interface.
3. [Done] Stop running if the port is used already.
