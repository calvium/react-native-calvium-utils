// @flow

class ExtendableError {
  name:string;
  message:string;
  stack:any;
  constructor(message:string) {
    this.name = 'ExtendableError';
    this.message = message;
    this.stack = new Error().stack;
  }
}

ExtendableError.prototype = Object.create(Error.prototype);

export default ExtendableError;
