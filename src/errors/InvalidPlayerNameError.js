class InvalidPlayerNameError extends Error {
  constructor(...params) {
    super(params);

    this.message = 'Invalid name';
  }
}

export default InvalidPlayerNameError;
