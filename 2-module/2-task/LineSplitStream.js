const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.options = options;
    this.buffer = '';
  }

  _transform(chunk, encoding, callback) {
    const chStr = this.buffer + chunk.toString(this.options.encoding);
    const arr = chStr.split(os.EOL);
    if (chStr.charAt(chStr.length - 1) !== os.EOL) this.buffer = arr.pop();
    arr.forEach(el => {
      this.push(el);
    });
    callback();
  }

  _flush(callback) {
    if (this.buffer) this.push(this.buffer);
    callback();
  }
}

module.exports = LineSplitStream;
