export class ProcessError extends Error {
  cause: Error;
  statusCode: number;
  body: string;

  constructor(cause: Error, statusCode: number) {
    super();
    this.cause = cause;
    this.statusCode = statusCode;
    this.body = statusCode >= 400 && statusCode < 500 ? 'Client error' : 'Server error';
  }
}
