import InvalidShipNameError from './errors/InvalidShipNameError';
import InvalidShipSizeError from './errors/InvalidShipSizeError';

class Ship {
  constructor(name, size) {
    if (!name) throw new InvalidShipNameError();
    if (!Number(size) || size <= 0) throw new InvalidShipSizeError();
    this.name = name;
    this.size = size;
    this.position = [];
    this.hits = [];
  }

  isSunk() {
    return this.hits.length >= this.size;
  }

  status() {
    return this.hits.reduce(
      (hit, pos) => [hit[0] + pos ? 1 : 0, hit[1]],
      [0, this.size],
    );
  }

  attack(x, y) {
    this.hits.push([x, y]);
  }

  setPosition(x, y) {
    this.position.push([x, y]);
  }
}

export default Ship;
