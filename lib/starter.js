const {spawn} = require('child_process');
const pathFS = require('path');

const {jar} = require('./config');

const start = options => {
  const args = [];

  args.push('-jar');
  args.push(pathFS.resolve(pathFS.join(options.path, jar)));

  if (options.accountId) {
    args.push(`-account ${options.accountId}`);
  }

  if (options.batchEndpoint) {
    args.push(`-batchEndpoint ${options.batchEndpoint}`);
  }

  if (options.dynamoDBEndpoint) {
    args.push(`-dynamoDBEndpoint ${options.dynamoDBEndpoint}`);
  }

  if (options.ecsEndpoint) {
    args.push(`-ecsEndpoint ${options.ecsEndpoint}`);
  }

  if (options.glueEndpoint) {
    args.push(`-glueEndpoint ${options.glueEndpoint}`);
  }

  if (options.lambdaEndpoint) {
    args.push(`-lambdaEndpoint ${options.lambdaEndpoint}`);
  }

  if (options.sageMakerEndpoint) {
    args.push(`-sageMakerEndpoint ${options.sageMakerEndpoint}`);
  }

  if (options.snsEndpoint) {
    args.push(`-snsEndpoint ${options.snsEndpoint}`);
  }

  if (options.sqsEndpoint) {
    args.push(`-sqsEndpoint ${options.sqsEndpoint}`);
  }

  if (options.region) {
    args.push(`-region ${options.region}`);
  }

  if (options.waitTimeScale) {
    args.push(`-waitTimeScale ${options.waitTimeScale}`);
  }

  const child = spawn('java', args, {
    cwd: options.path,
    env: process.env,
    stdio: ['pipe', 'pipe', process.stderr]
  });

  if (!child.pid) {
    throw new Error('Unable to start Step Functions Local process.');
  }

  child.on('error', code => {
    throw new Error(code);
  });

  return {process: child};
};

module.exports = {start};
