const {spawn} = require('child_process');
const pathFS = require('path');

const {jar} = require('./config');

const start = options => {
  const args = [];

  args.push('-jar');
  args.push(pathFS.resolve(pathFS.join(options.path, jar)));

  if (options.account) {
    args.push('-account');
    args.push(options.account);
  }

  if (options.batchEndpoint) {
    args.push('-batchEndpoint');
    args.push(options.batchEndpoint);
  }

  if (options.dynamoDBEndpoint) {
    args.push('-dynamoDBEndpoint');
    args.push(options.dynamoDBEndpoint);
  }

  if (options.ecsEndpoint) {
    args.push('-ecsEndpoint');
    args.push(options.ecsEndpoint);
  }

  if (options.glueEndpoint) {
    args.push('-glueEndpoint');
    args.push(options.glueEndpoint);
  }

  if (options.lambdaEndpoint) {
    args.push('-lambdaEndpoint');
    args.push(options.lambdaEndpoint);
  }

  if (options.sageMakerEndpoint) {
    args.push('-sageMakerEndpoint');
    args.push(options.sageMakerEndpoint);
  }

  if (options.snsEndpoint) {
    args.push('-snsEndpoint');
    args.push(options.snsEndpoint);
  }

  if (options.sqsEndpoint) {
    args.push('-sqsEndpoint');
    args.push(options.sqsEndpoint);
  }

  if (options.region) {
    args.push('-region');
    args.push(options.region);
  }

  if (options.waitTimeScale) {
    args.push('-waitTimeScale');
    args.push(options.waitTimeScale);
  }

  const child = spawn('java', args, {
    cwd: options.path,
    env: process.env
    // Stdio: ['inherit', 'inherit', 'inherit']
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
