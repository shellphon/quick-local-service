const path = require('path');
const program = require('commander');

const QLS = require('../index.js')();

var options = {}; // eslint-disable-line

var error = false; // eslint-disable-line

const cwd = process.cwd();
// console.log(cwd)

const defConf = path.resolve(cwd, 'qls.config.js');

program
	.option('-p, --port <n>', 'use port', parseInt)
	.option('-d, --dir <value>', 'set root directory')
	.option('-c, --config <value>', 'use config file')
	.parse(process.argv);

/*
	default find the qls.config.js file in cwd.
	if not , find command options or use default port and dir
*/

function moduleAvailable(name) {
    try {
        require.resolve(name);
        return true;
    } catch (e) {} // eslint-disable-line
    return false;
}


if (program.config) {
	options = require(path.resolve(cwd, program.config)); // eslint-disable-line
	if (!options.port || !options.dir) {
		console.error('Your custom config file ', program.config, ' need setting port and dir');
		error = true;
	}
} else if (moduleAvailable(defConf)) {
	options = require(defConf); // eslint-disable-line
	if (!options.port || !options.dir) {
		console.error('qls.config.js need setting port and dir');
		error = true;
	}
} else {
	options.port = program.port || 10086;
	options.dir = program.dir || cwd;
}
if (!error) {
	QLS.run(options);
}
