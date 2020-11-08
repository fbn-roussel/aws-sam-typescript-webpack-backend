import 'source-map-support/register';

import { logger } from '@aws-sam-typescript-webpack-backend/shared';

export const handler = async () => {
  logger.info('Goodbye serverless clouders !');
};
