const ora = require('ora');

const {install, remove} = require('./lib/installer');
const {start} = require('./lib/starter');

class StepFunctions {
  constructor({quiet = false, path = './.step-functions-local'} = {}) {
    this.quiet = quiet;
    this.path = path;
  }

  async install() {
    let spinner;

    if (!this.quiet) {
      spinner = ora('Downloading Step Functions Local...').start();
    }

    try {
      await install(this.path);
    } catch (error) {
      if (!this.quiet) {
        spinner.fail('Download failed.');
      }

      throw error;
    }

    if (!this.quiet) {
      spinner.succeed('Downloaded Step Functions Local.');
    }
  }

  remove() {
    return remove(this.path);
  }

  start(options = {}) {
    let spinner;

    if (!this.quiet) {
      spinner = ora('Starting Step Functions Local...').start();
    }

    this.instance = start({...options, path: this.path});

    this.instance.process.on('close', code => {
      if (code !== null && code !== 0 && !this.quiet) {
        console.log('Step Functions Local failed to start with code', code);
      }
    });

    if (!this.quiet) {
      spinner.succeed('Step Functions Local started: http://localhost:8083');
    }

    return this.instance.process.stdout;
  }

  stop() {
    if (!this.instance) {
      throw new Error('Step Functions Local instance not running');
    }

    let spinner;

    if (!this.quiet) {
      spinner = ora('Stopping Step Functions Local...').start();
    }

    this.instance.process.kill('SIGKILL');
    this.instance = undefined;

    if (!this.quiet) {
      spinner.succeed('Step Functions Local stopped.');
    }
  }
}

module.exports = StepFunctions;
