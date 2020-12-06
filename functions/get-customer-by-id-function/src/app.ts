import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { extractPathParameter, handleResult, handleError } from '@aws-sam-typescript-webpack-backend/shared';
import { GetCustomerByIdProcessor } from './application/get-customer-by-id-processor';
import { GetCustomerByIdService } from './domain/get-customer-by-id-service';
import { GetCustomerByIdDdbRepository } from './infrastructure/get-customer-by-id-ddb-repository';

const getCustomerByIdDdbRepository = new GetCustomerByIdDdbRepository();
const getCustomerByIdService = new GetCustomerByIdService(getCustomerByIdDdbRepository);
const getCustomerByIdProcessor = new GetCustomerByIdProcessor(getCustomerByIdService);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = extractPathParameter(event, 'customerId');
    const result = await getCustomerByIdProcessor.process(id);

    return handleResult(result);
  } catch (error) {
    return handleError(error);
  }
};
