import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { parseBody, handleResult, handleError, CreateCustomerResource } from '@aws-sam-typescript-webpack-backend/shared';
import { CreateCustomerProcessor } from './application/create-customer-processor';
import { CreateCustomerService } from './domain/create-customer-service';
import { CreateCustomerDdbRepository } from './infrastructure/create-customer-ddb-repository';

const createCustomerDdbRepository = new CreateCustomerDdbRepository();
const createCustomerService = new CreateCustomerService(createCustomerDdbRepository);
const createCustomerProcessor = new CreateCustomerProcessor(createCustomerService);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const createCustomerResource = parseBody<CreateCustomerResource>(event);
    const result = await createCustomerProcessor.process(createCustomerResource);

    return handleResult(result);
  } catch (error) {
    return handleError(error);
  }
};
