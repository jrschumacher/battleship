#!/usr/bin/env node
'use strict';

const importJsx = require('import-jsx');
const {h, render} = require('ink');
const meow = require('meow');

const Ui = importJsx('./components/ui');

const cli = meow(`
	Usage
	  $ battleship

	Options
	  --emoji [Default: true]

	Examples
	  $ battleship
	  Welcome to Battleship 🌊⚓️💣 [Press Enter]
	  $ jrscumacher-battleship-ink --emoji=false
	  Welcome to Battleship [Press Enter]
`);

render(h(Ui, cli.flags));
