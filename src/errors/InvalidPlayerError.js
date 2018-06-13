class InvalidPlayerError extends Error {
  constructor(...params) {
    super(params);

    this.message = 'Invalid player';
  }
}

export default InvalidPlayerError;
