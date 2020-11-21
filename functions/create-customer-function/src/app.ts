import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import xray from 'aws-xray-sdk';
import ddb from 'aws-sdk/clients/dynamodb';

import { handleEvent } from '@aws-sam-typescript-webpack-backend/shared';
import { CreateCustomerProcessor } from './application/create-customer-processor';
import { CreateCustomerService } from './domain/create-customer-service';
import { CreateCustomerDdbRepository } from './infrastructure/create-customer-ddb-repository';

const region = process.env.REGION;
const ddbClient = xray.captureAWSClient(new ddb({ region: region }));
const ddbMapper = new DataMapper({ client: ddbClient });

const createCustomerDdbRepository = new CreateCustomerDdbRepository(ddbMapper);
const createCustomerService = new CreateCustomerService(createCustomerDdbRepository);
const createCustomerProcessor = new CreateCustomerProcessor(createCustomerService);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await handleEvent(event, createCustomerProcessor.process);
};
