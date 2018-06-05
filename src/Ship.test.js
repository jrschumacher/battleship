import Ship from './Ship.js';
import InvalidShipNameError from './errors/InvalidShipNameError.js';
import InvalidShipSizeError from './errors/InvalidShipSizeError.js';

describe('ship', () => {
  it('should throw invalid name error', () => {
    chai.expect(() => new Ship()).to.throw(InvalidShipNameError);
  });

  it('should throw invalid size error', () => {
    chai.expect(() => new Ship('test')).to.throw(InvalidShipSizeError);
  });

  it('should create new ship', () => {
    const name = 'test';
    const size = 10;
    const ship = new Ship(name, size);
    chai.expect(ship.name).to.equal(name);
    chai.expect(ship.position.length).to.equal(size);
    chai.expect(ship.hits.length).to.equal(size);
    chai.expect(ship.hits).to.deep.equal(Array(size).fill(false));
  });

  it('should return status of ship not sunk', () => {
    const name = 'test';
    const size = 10;
    const ship = new Ship(name, size);
    chai.expect(ship.isSunk()).to.be.false;
    ship.hits[0] = true;
    chai.expect(ship.isSunk()).to.be.false;
  });

  it('should return status of ship sunk', () => {
    const name = 'test';
    const size = 2;
    const ship = new Ship(name, size);
    ship.hits[0] = true;
    ship.hits[1] = true;
    chai.expect(ship.isSunk()).to.be.true;
  });
});
