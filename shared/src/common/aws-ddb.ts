import { DataMapper } from '@aws/dynamodb-data-mapper';

import xray from 'aws-xray-sdk';
import ddb from 'aws-sdk/clients/dynamodb';

const region = process.env.REGION;
const ddbClient = xray.captureAWSClient(new ddb({ region: region }));
const ddbMapper = new DataMapper({ client: ddbClient });

export const getItem = async <T>(item: T): Promise<T | null> => {
  return await ddbMapper.get(item).catch((error: Error) => {
    if (error.name === 'ItemNotFoundException') {
      return null;
    }
    throw error;
  });
};

export const saveItem = async <T>(item: T): Promise<void> => {
  await ddbMapper.put(item);
};
