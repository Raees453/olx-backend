class Exception extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.isOperational = true;
    this.status = `${code}`.startsWith('4') ? 'failed' : 'success';
  }
}

module.exports = Exception;
