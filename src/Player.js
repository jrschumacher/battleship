import uuid from 'uuid';
import InvalidPlayerNameError from './errors/InvalidPlayerNameError';

class Player {
  constructor(name) {
    if (!name) throw new InvalidPlayerNameError();
    this.id = uuid();
    this.name = name;
    this.games = [];
  }
}

export default Player;
