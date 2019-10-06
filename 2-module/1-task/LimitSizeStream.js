const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    this.limit -= chunk.byteLength;
    if (this.limit < 0) throw new LimitExceededError();
    this.push(chunk);
    callback();
  }
}

module.exports = LimitSizeStream;
