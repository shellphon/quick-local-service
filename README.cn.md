# quick-local-service

#### 快速启动静态web服务命令行程序

[![Build Status](https://img.shields.io/travis/shellphon/quick-local-service.svg)](https://travis-ci.org/shellphon/quick-local-service)

当你编码了一个页面 index.html\other.html, 可以通过quick-local-service为这个页面启动web服务，以便在浏览器中通过  http://127.0.0.1:10086/index.html  来访问页面 （默认index.html）。 这样可以避免遇到直接双击打开页面时可能出现的跨域问题。

### 安装和使用

#### 安装

```bash
$ npm install quick-local-service -g
```

#### 进入项目目录，并启动服务

```bash
$ cd demo
$ qls run
```

默认端口: 10086

可以通过命令参数 `-p 8989` 设定端口. 

另外，还可以使用命令参数 `-d demo`来指定项目路径.

```bash
$ cd demo
$ cd ..
$ qls run -d demo
```

### 配置文件

`init` 指令可以帮助在当前目录生成配置文件`qls.config.js`，这样`run`的时候会以配置文件为主，不再需要使用参数。

`qls.config.js`.

```javascript
module.exports = {
	port:10086,
	dir:""
}
```

`init`会设置dir为当前目录路径。

另外，还可以通过参数指定配置文件 '-c other.config.js' 

```bash
$ qls run -c other.config.js
```

### Todo:

1. 配置模拟接口
2. 代理跨域接口
3. 识别端口被占用的情况
