import 'source-map-support/register';

import { logger } from '@aws-sam-typescript-webpack-backend/shared';

import xray from 'aws-xray-sdk';
import ddb from 'aws-sdk/clients/dynamodb';

const region = process.env.REGION;
const ddbClient = xray.captureAWSClient(new ddb({ region: region }));

export const handler = async () => {
  logger.info('Hello serverless clouders !');

  return ddbClient.describeTable({ TableName: 'unknown-table' }).promise();
};
