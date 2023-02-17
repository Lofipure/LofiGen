#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');

const run = async () => {
  // ! Init Version
  const version = require('../package.json').version;
  program.version(`Lofi Gen Version ${version}`);

  // ! Init Creator
  program
    .command('create <project-name>')
    .description('create a new project')
    .action(require('../lib/create').createKoaTs);

  program.parse(process.argv);
};

run().catch((e) => console.error(e));
