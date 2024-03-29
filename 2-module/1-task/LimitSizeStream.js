const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    this.limit -= chunk.byteLength;
    if (this.limit < 0) callback(new LimitExceededError());
    else callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
