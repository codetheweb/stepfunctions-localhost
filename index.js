const ora = require('ora');

const {install, remove} = require('./lib/installer');
const {start} = require('./lib/starter');

let instance;

const stepFunctions = {
  install: (path = './.step-functions-local') => install(path),
  start: (options = {}) => {
    const spinner = ora('Starting Step Functions Local...');

    if (!options.path) {
      options.path = './.step-functions-local';
    }

    instance = start(options);

    instance.process.on('close', code => {
      if (code !== null && code !== 0) {
        console.log('Step Functions Local failed to start with code', code);
      }
    });

    spinner.succeed('Step Functions Local started: http://localhost:8083');
  },
  stop: () => {
    const spinner = ora('Stopping Step Functions Local...');

    if (typeof instance !== undefined) {
      instance.process.kill('SIGKILL');
      instance = undefined;
    }

    spinner.succeed('Step Functions Local stopped.');
  },
  remove: (path = './.step-functions-local') => remove(path)
};

module.exports = stepFunctions;
