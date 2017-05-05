#! /usr/bin/env node

const program = require('commander');

const pkg = require('../package.json');

program
	.version(pkg.version)
	.usage('<command> [option]')
	.command('init', 'init qls.config.js')
	.command('run [option]', 'start service [option]')
	.parse(process.argv);

