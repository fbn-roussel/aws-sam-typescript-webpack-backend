import 'source-map-support/register';

import xray from 'aws-xray-sdk';
import ddb from 'aws-sdk/clients/dynamodb';

const region = process.env.REGION;
const ddbClient = xray.captureAWSClient(new ddb({ region: region }));

export const handler = async () => {
  console.log('Hello serverless clouders !');

  return ddbClient.describeTable({ TableName: 'unknown-table' }).promise();
};
