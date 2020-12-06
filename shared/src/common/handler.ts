import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { logger } from './logger';
import { ProcessError } from './error';

export const parseBody = <B>(event: APIGatewayProxyEvent): B => {
  try {
    if (!event.body) {
      throw new Error('Event body cannot be null');
    }

    return JSON.parse(event.body) as B;
  } catch (error) {
    throw new ProcessError(error, 400);
  }
};

export const extractPathParameter = (event: APIGatewayProxyEvent, name: string): string => {
  if (!event.pathParameters || !event.pathParameters[name]) {
    throw new Error('Unable to find path parameter ' + name);
  }
  return event.pathParameters[name];
};

export const handleResult = <R>(response: [R, number]): APIGatewayProxyResult => {
  return {
    statusCode: response[1],
    body: response[0] ? JSON.stringify(response[0]) : '',
  };
};

export const handleError = (error: Error): APIGatewayProxyResult => {
  if (error instanceof ProcessError) {
    logger.child({ err: error.cause }).error('Unable to process event');

    return {
      statusCode: error.statusCode,
      body: error.body,
    };
  } else {
    logger.child({ err: error }).error('Unable to process event');

    return {
      statusCode: 500,
      body: 'Server error',
    };
  }
};
