/* globals test expect beforeEach */

import Player from './player';

test('should throw invalid name', () => {
  expect(() => new Player()).toThrow();
});

test('should have name and id', () => {
  const name = 'bob';
  const player = new Player(name);
  expect(player.name).toEqual(name);
  expect(player.id).toBeDefined();
});
