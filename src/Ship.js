import InvalidShipNameError from "./errors/InvalidShipNameError.js";
import InvalidShipSizeError from "./errors/InvalidShipSizeError.js";

class Ship {
  constructor(name, size) {
    if (!name) throw new InvalidShipNameError();
    if (!Number(size) || size <= 0) throw new InvalidShipSizeError();
    this.name = name;
    this.size = size;
    this.position = new Array(size);
    this.hits = new Array(size).fill(false);
  }

  isSunk() {
    return this.hits.reduce((hp, pos) => (pos && --hp) || hp, this.size) === 0;
  }

  status() {
    return this.hits.reduce(
      (hit, pos) => {
        hit[0] += pos ? 1 : 0;
      },
      [0, this.size]
    );
  }

  logHit(pos) {
    this.hits[pos] = true;
  }
}

export default Ship;
