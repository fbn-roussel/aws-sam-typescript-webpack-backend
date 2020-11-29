//import * as t from 'io-ts';
//import { isLeft } from 'fp-ts/lib/Either';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { logger } from './logger';
import { ProcessError } from './error';

export const handleEvent = async <I, O>(event: APIGatewayProxyEvent, processor: (input: I) => Promise<[O, number]>): Promise<APIGatewayProxyResult> => {
  let input: I;
  try {
    input = parseEvent(event);
  } catch (error) {
    logger.child({ err: error }).error('Unable to parse event');
    return {
      statusCode: 400,
      body: 'Client error',
    };
  }

  let output: [O, number];
  try {
    output = await processor(input);
  } catch (error) {
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
  }

  return {
    statusCode: output[1],
    body: output[0] ? JSON.stringify(output[0]) : '',
  };
};

/*
export const handleEventIoTs = async <I, O>(event: APIGatewayProxyEvent, decoder: t.Decoder<string, I>, processor: (input: I) => Promise<O>): Promise<APIGatewayProxyResult> => {
  let input;
  try {
    input = parseEventIoTs(event, decoder);
  } catch (error) {
    logger.child({ err: error }).error('Unable to parse event');
    return {
      statusCode: 400,
      body: 'Client error',
    };
  }

  let output;
  try {
    output = await processor(input);
  } catch (error) {
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
  }

  return {
    statusCode: 200,
    body: JSON.stringify(output),
  };
};
*/

const parseEvent = <I>(event: APIGatewayProxyEvent): I => {
  if (!event.body) {
    throw new Error('Event body cannot be null');
  }

  return JSON.parse(event.body);
};

/*
const parseEventIoTs = <I>(event: APIGatewayProxyEvent, decoder: t.Decoder<string, I>): I => {
  if (!event.body) {
    throw new Error('Event body cannot be null');
  }

  const input = decoder.decode(event.body);
  if (isLeft(input)) {
    throw new Error(JSON.stringify(input.left));
  }

  return input.right;
};
*/
