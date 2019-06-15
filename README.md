# 🛠 stepfunctions-localhost

A package to install and run AWS's [Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html) locally.

## Usage

```javascript
const stepfunctionsLocal = require('stepfunctions-localhost');

(async () => {
  await stepfunctionsLocal.install();

  stepfunctionsLocal.start();

  stepfunctionsLocal.stop();

  stepfunctionsLocal.remove();
})();
```

This will download the files required to run step functions, start the step function server, stop the server, then clean up after itself.

## API

### `.install(path)`

Downloads files required to run step functions.  Path defaults to `./.step-functions-local`.

Returns Promise.

### `.start(options)`

Starts the local server.  Options match those of the actual step function server:

```bash
-account,--aws-account <Account>                               the AWS account used to create state machines, activities and executions,
                                                               this is also the account of your Lambda and other resources.
                                                               By Default, it is set to [123456789012], this is NOT a real account id.
-batchEndpoint,--batch-endpoint <Batch Endpoint>               the local endpoint of Batch.
                                                               e.g. http://localhost:4574
-dynamoDBEndpoint,--dynamodb-endpoint <DynamoDB Endpoint>      the local endpoint of DynamoDB.
                                                               e.g. http://localhost:4574
-ecsEndpoint,--ecs-endpoint <ECS Endpoint>                     the local endpoint of ECS.
                                                               e.g. http://localhost:4574
-glueEndpoint,--glue-endpoint <Glue Endpoint>                  the local endpoint of Glue.
                                                               e.g. http://localhost:4574
-h,--help                                                      Show this help information.
-lambdaEndpoint,--lambda-endpoint <Lambda Endpoint>            the local endpoint of Lambda.
                                                               e.g. http://localhost:4574
-region,--aws-region <Region>                                  the region where the state machines, activities and executions will be created,
                                                               this is also the region of other AWS resources referred in the state machine.
                                                               By Default, it is set to [us-east-1].
-sageMakerEndpoint,--sagemaker-endpoint <SageMaker Endpoint>   the local endpoint of SageMaker.
                                                               e.g. http://localhost:4574
-snsEndpoint,--sns-endpoint <SNS Endpoint>                     the local endpoint of SNS.
                                                               e.g. http://localhost:4574
-sqsEndpoint,--sqs-endpoint <SQS Endpoint>                     the local endpoint of SQS.
                                                               e.g. http://localhost:4574
-v,--version                                                   Show the version and build of Step Functions Local.
-waitTimeScale,--wait-time-scale <Wait Time Scale>             the scale of the wait time in the Wait state
                                                               e.g. 0.5 means cut the original wait time to half
                                                               e.g. 0 means no wait time
                                                               e.g. 2 means double the original wait time
```

For example, to set the account ID, the options object would be `{account: 'fake-account-id'}`.

In addition, the `options` object may contain a parameter called `path`, which points to the directory of the local installation.  Defaults to `./.step-functions-local`.

### `.stop()`

Stops the currently running instance.

### `.remove(path)`

Removes local files that have been downloaded.  Path defaults to `./.step-functions-local`.
