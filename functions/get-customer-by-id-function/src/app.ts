import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import xray from 'aws-xray-sdk';
import ddb from 'aws-sdk/clients/dynamodb';

import { handleEvent } from '@aws-sam-typescript-webpack-backend/shared';
import { GetCustomerByIdProcessor } from './application/get-customer-by-id-processor';
import { GetCustomerByIdService } from './domain/get-customer-by-id-service';
import { GetCustomerByIdDdbRepository } from './infrastructure/get-customer-by-id-ddb-repository';

const region = process.env.REGION;
const ddbClient = xray.captureAWSClient(new ddb({ region: region }));
const ddbMapper = new DataMapper({ client: ddbClient });

const getCustomerByIdDdbRepository = new GetCustomerByIdDdbRepository(ddbMapper);
const getCustomerByIdService = new GetCustomerByIdService(getCustomerByIdDdbRepository);
const getCustomerByIdProcessor = new GetCustomerByIdProcessor(getCustomerByIdService);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await handleEvent(event, getCustomerByIdProcessor.process);
};
