/* globals test expect beforeEach */

import Battleship from './battleship';
import Player from './player';
import Ship from './ship';
import {
  ATTACK_INVALID,
  ATTACK_MISS,
  ATTACK_HIT,
  ATTACK_SUNK,
  ATTACK_PREVIOUS,
  GAME_STARTED,
  GAME_OVER,
} from './constants';

let game;

const gameSetup = () => {
  const game = new Battleship();
  game.registerPlayer(new Player('bob'));
  game.registerPlayer(new Player('bob2'));
  game.startGameSetup();
  return game;
};

beforeEach(() => {
  game = new Battleship();
});

test('should create new game', () => {
  expect(game.boardSize).toEqual(10);
  expect(game.players).toHaveLength(0);
  expect(game.startingPlayer).toBeNull();
  expect(game.currentPlayer).toBeNull();
});

test('should throw error on invalid size', () => {
  expect(() => new Battleship(0)).toThrow();
  expect(() => new Battleship('nope')).toThrow();
});

test('should log all actions', () => {
  expect(game.log).toHaveLength(1);
  const action = 'some action';
  game.logEvent(action);
  expect(game.log).toHaveLength(2);
  expect(game.log[1]).toMatchObject({
    action,
  });
});

test('should check if game open state', () => {
  expect(game.isGameOpen()).toBeTruthy();
  expect(game.isGameStarted()).toBeFalsy();
  expect(game.isGameOver()).toBeFalsy();
});

test('should check if game started state', () => {
  game.gameState = GAME_STARTED;
  expect(game.isGameOpen()).toBeFalsy();
  expect(game.isGameStarted()).toBeTruthy();
  expect(game.isGameOver()).toBeFalsy();
});

test('should check if game over state', () => {
  game.gameState = GAME_OVER;
  expect(game.isGameOpen()).toBeFalsy();
  expect(game.isGameStarted()).toBeFalsy();
  expect(game.isGameOver()).toBeTruthy();
});

test('should throw error on invalid player', () => {
  expect(() => game.registerPlayer()).toThrow();
});

test('should register a new player', () => {
  const player1 = new Player('bob');
  game.registerPlayer(player1);
  expect(game.players[0]).toMatchObject({ player: player1 });
  const player2 = new Player('bob');
  game.registerPlayer(player2);
  expect(game.players[0]).toMatchObject({ player: player1 });
  expect(game.players[1]).toMatchObject({ player: player2 });
});

test('should not start game setup', () => {
  expect(game.startGameSetup()).toEqual(false);
});

test('should start game setup', () => {
  game.registerPlayer(new Player('bob'));
  game.registerPlayer(new Player('bob2'));
  game.startGameSetup();
  expect(game.players).toHaveLength(2);
  expect(game.board).toHaveLength(10);
  expect(game.board[0]).toHaveLength(10);
  expect(game.startingPlayer).toBeGreaterThanOrEqual(0);
  expect(game.startingPlayer).toBeLessThanOrEqual(game.players.length - 1);
  expect(game.currentPlayer).toBe(game.startingPlayer);
});

test('should get values', () => {
  const game = gameSetup();
  const ship = new Ship('test', 2);
  expect(game.findPlacements(ship, 0, 0)).toEqual([
    [ship.size, 0],
    [0, ship.size],
  ]);
  expect(game.findPlacements(ship, 0, 9)).toEqual([
    [ship.size, 9],
    [0, 9 - ship.size],
  ]);
  expect(game.findPlacements(ship, 9, 0)).toEqual([
    [9 - ship.size, 0],
    [9, ship.size],
  ]);
  expect(game.findPlacements(ship, 9, 9)).toEqual([
    [9 - ship.size, 9],
    [9, 9 - ship.size],
  ]);
  expect(game.findPlacements(ship, 2, 2)).toEqual([
    [2 - ship.size, 2],
    [ship.size + 2, 2],
    [2, 2 - ship.size],
    [2, ship.size + 2],
  ]);
  expect(game.findPlacements(ship, 5, 3)).toEqual([
    [5 - ship.size, 3],
    [ship.size + 5, 3],
    [5, 3 - ship.size],
    [5, ship.size + 3],
  ]);
});

test('should place on grid', () => {
  const game = gameSetup();
  const ship = new Ship('test', 2);
  expect(game.placeShip(ship, 0, 0, 1, 0)).toEqual(true);
  expect(game.placeShip(ship, 0, 0, 2, 0)).toEqual(false);
  expect(game.placeShip(ship, 1, 0, 0, 0)).toEqual(false);
  expect(game.placeShip(ship, 1, 1, 2, 2)).toEqual(true);
  expect(game.placeShip(ship, 4, 4, 4, 3)).toEqual(true);
});

test('should attack should be invalid', () => {
  const game = gameSetup();
  [
    [-1, -1],
    [-1, 0],
    [0, -1],
    [11, 11],
    [11, 0],
    [0, 11],
    [null, null],
    [undefined, undefined],
  ].forEach(({ x, y }) =>
    expect(game.attackPosition(x, y)).toEqual(ATTACK_INVALID));
});

test('should attack should be miss', () => {
  const game = gameSetup();
  [...new Array(game.boardSize)].forEach((x, i) => {
    expect(game.attackPosition(i, i)).toEqual(ATTACK_MISS);
  });
});

test('should attack be previous', () => {
  const game = gameSetup();
  [...new Array(game.boardSize)].forEach((x, i) => {
    game.attackPosition(i, i);
    expect(game.attackPosition(i, i)).toEqual(ATTACK_PREVIOUS);
  });
});

// Test('should allocate ships to player', () => {
//   console.log(typeof game.allocateShips)
//   expect(typeof game.allocateShips).toBe('function');
// });

// test('should place ship on board', () => {
//   expect(typeof game.placeShip).toBe('function');
// });

// test('should check if all ships are placed', () => {
//   expect(typeof game.areShipsPlaced).toBe('function');
// });

// test('should set player ready', () => {
//   expect(typeof game.setPlayerAsReady).toBe('function');
// });

// test('should check if game is ready', () => {
//   expect(typeof game.isGameReady).toBe('function');
// });

// test('should check if it is players turn', () => {
//   expect(typeof game.isPlayersTurn).toBe('function');
// });

// test('should check if move is valid', () => {
//   expect(typeof game.isMoveValid).toBe('function');
// });

// test('should make move', () => {
//   expect(typeof game.makeMove).toBe('function');
// });

// test('should check if ship is hit', () => {
//   expect(typeof game.isShipHit).toBe('function');
// });

// test('should check if a player is out', () => {
//   expect(typeof game.isPlayerOut).toBe('function');
// });

// test('should check if a player has one', () => {
//   expect(typeof game.hasPlayerWon).toBe('function');
// });
