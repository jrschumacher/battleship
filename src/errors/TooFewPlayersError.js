class TooFewPlayers extends Error {
  constructor(...params) {
    super(params);

    this.message = 'Too few players';
  }
}

export default TooFewPlayers;
