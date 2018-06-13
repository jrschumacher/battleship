#!/usr/bin/env node
'use strict';

const importJsx = require('import-jsx');
const {h, render} = require('ink');
const meow = require('meow');

const Ui = importJsx('./components/ui');

const cli = meow(`
	Usage
	  $ battleship
`);

render(h(Ui, cli.flags));
