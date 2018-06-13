class TooManyPlayers extends Error {
  constructor(...params) {
    super(params);

    this.message = 'Too many players';
  }
}

export default TooManyPlayers;
