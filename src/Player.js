import InvalidPlayerNameError from "./errors/InvalidPlayerNameError.js";

class Player {
  constructor(name) {
    if (!name) throw new InvalidPlayerNameError();
    this.id = window.uuid();
    this.name = name;
    this.games = [];
  }
}

export default Player;
