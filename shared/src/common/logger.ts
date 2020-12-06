import pino from 'pino';

export const logger = pino({
  level: 'info',
  base: null,
  nestedKey: 'data',
  formatters: {
    level(label: string, number: number) {
      return { lvl: label };
    },
  },
});
