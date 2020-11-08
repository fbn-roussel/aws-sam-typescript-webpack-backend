import pino from 'pino';

export const logger = pino({
  level: 'info',
  base: null,
  timestamp: () => ',"timestamp":' + Date.now(),
  messageKey: 'message',
  nestedKey: 'metadata',
  formatters: {
    level(label: string, number: number) {
      return { level: label.toUpperCase() };
    },
  },
});
