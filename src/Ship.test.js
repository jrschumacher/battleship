import Ship from './ship';

test('should throw invalid name error', () => {
  expect(() => new Ship()).toThrow();
});

test('should throw invalid size error', () => {
  expect(() => new Ship('test')).toThrow();
});

test('should create new ship', () => {
  const name = 'test';
  const size = 10;
  const ship = new Ship(name, size);
  expect(ship.name).toEqual(name);
  expect(Array.isArray(ship.position)).toEqual(true);
  expect(Array.isArray(ship.hits)).toEqual(true);
});

test('should return status of ship not sunk', () => {
  const name = 'test';
  const size = 10;
  const ship = new Ship(name, size);
  expect(ship.isSunk()).toBeFalsy();
  ship.hits[0] = true;
  expect(ship.isSunk()).toBeFalsy();
});

test('should return status of ship sunk', () => {
  const name = 'test';
  const size = 2;
  const ship = new Ship(name, size);
  ship.hits[0] = true;
  ship.hits[1] = true;
  expect(ship.isSunk()).toBeTruthy();
});
