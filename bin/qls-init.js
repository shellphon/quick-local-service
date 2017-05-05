const path = require('path');
const fs = require('fs');
// const program = require('commander');

const cwd = process.cwd();
// console.log(cwd)

const defConf = path.resolve(cwd, 'qls.config.js');

function pathString(str) {
	return str.replace(/(\\)/g, '$1$1');
}

fs.writeFile(defConf, `module.exports = {
	port:10086,
	dir:"${pathString(cwd)}"
}`, function (err) {
	if (err) {
		console.error(err);
		return;
	}
	console.log(defConf, ' generated');
});
