import InvalidBoardSize from './errors/InvalidBoardSize';
import InvalidPlayerError from './errors/InvalidPlayerError';
import Player from './player';
import Ship from './ship';
import alphaArray from './utils/alphaArray';
import {
  GAME_OPEN,
  GAME_STARTED,
  GAME_OVER,
  VALID_ATTACK_ACTIONS,
  ATTACK_HIT,
  ATTACK_INVALID,
  ATTACK_MISS,
  ATTACK_PREVIOUS,
  ATTACK_SUNK,
} from './constants';

export const BATTLESHIP_BOARD_SIZE = 10;
export const BATTLESHIP_FLEET = [
  {
    name: "Carrier",
    size: 5
  },
  {
    name: "Battleship",
    size: 4
  },
  {
    name: "Cruiser",
    size: 3
  },
  {
    name: "Submarine",
    size: 3
  },
  {
    name: 'Destroyer',
    size: 2,
  },
];

class Battleship {
  constructor(size = BATTLESHIP_BOARD_SIZE) {
    if (!Number(size) || size <= 0) {
      throw new InvalidBoardSize();
    }
    // Create board structure
    this.boardSize = size;
    this.board = null;
    this.gameState = GAME_OPEN;
    this.players = [];
    this.startingPlayer = null;
    this.currentPlayer = null;
    this.log = [];
    this.logEvent('initalize game board');
  }

  logEvent(action, player = null) {
    this.log.push({
      date: new Date(),
      action,
      player,
    });
  }

  /**
   * IsGameOpen
   *
   * Game is open to new players
   *
   * @returns boolean
   */
  isGameOpen() {
    return this.gameState === GAME_OPEN;
  }

  /**
   * IsGameStarted
   *
   * Has the game started.
   *    - players registered
   *    - placed ships
   *    - marked ready
   *
   * @returns boolean
   */
  isGameStarted() {
    return this.gameState === GAME_STARTED;
  }

  /**
   * IsGameOver
   *
   * Has the game completed
   *    - one player remains with unsunk ships
   *
   * @returns boolean
   */
  isGameOver() {
    return this.gameState === GAME_OVER;
  }

  /**
   * Register player
   *
   * Register a new player to the game and allocate ships
   *
   * @param {Player} player
   */
  registerPlayer(player) {
    if (!(player instanceof Player)) {
      throw new InvalidPlayerError();
    }
    this.players.push({
      num: this.players.length,
      player,
      ships: BATTLESHIP_FLEET.map(ship => new Ship(ship.name, ship.size)),
      shipsPlaced: 0,
    });
    this.logEvent('register new player', player);
  }

  /**
   * StartGameSetup
   *
   * Starts the game setup process
   *    - set the game state
   *    - initalize ships
   *    - set starting player
   *    - set currnt player
   */
  startGameSetup() {
    const numOfPlayers = this.players.length;
    if (numOfPlayers <= 0) return false;
    this.board = [...new Array(this.boardSize)].map(() =>
      [...new Array(this.boardSize)].map(() =>
        [...new Array(numOfPlayers)].map((x, i) => ({
          num: i,
          player: this.players[i],
          hit: false,
          ship: false,
        }))));
    this.startingPlayer = Math.floor(Math.random() * numOfPlayers);
    this.currentPlayer = this.startingPlayer;
    this.logEvent('game setup started');
    return true;
  }

  startGame() {
    if (this.players.length <= 0) return false;
    const shipsPlaced = this.players.reduce((sum, p) => sum + p.shipsPlaced, 0);
    if (shipsPlaced >= BATTLESHIP_FLEET.length * this.players.length) {
      this.gameState = GAME_STARTED;
      return true;
    }
    return false;
  }

  incrementPlayer() {
    const { currentPlayer, players } = this;
    const nextPlayer = currentPlayer + 1;
    return nextPlayer % players.length ? nextPlayer : 0;
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayer];
  }

  getNextPlayer() {
    return this.players[this.incrementPlayer()];
  }

  endCurrentPlayer() {
    this.currentPlayer = this.incrementPlayer();
  }

  /**
   * filterShipCollisions
   *
   * Get a ships positions unless collision is detected
   *
   * @param {array} shipSize
   * @param {integer} x
   * @param {integer} y
   * @param {integer} x1
   * @param {integer} y1
   * @return {Array} Returns an array positions or an empty array
   */
  filterShipCollisions = (shipSize, x, y, x1, y1) => [...new Array(shipSize)].reduce((p, o, i) => {
    if (Array.isArray(p)) {
      // No difference
      if (y === y1 && x === x1) return false;

      let n;
      let m;
      if (y === y1) { // Compute x diff
        n = x < x1 ? x + i : x - i;
        m = y;
      } else { // Compute y diff
        n = x;
        m = y < y1 ? y + i : y - i;
      }

      // If no ship exists else bail
      if (this.board[m][n][this.currentPlayer].ship === false) return [].concat(p, [[n, m]]);
      return false;
    } return false;
  }, []) || []

  findPlacements(ship, x, y) {
    if (x >= 0 && y >= 0 && x < this.boardSize && y < this.boardSize) {
      const { size } = ship;
      return [x, y]
        .reduce((p, i, j) => {
          // left of i
          const leftOf = i - size;
          if (leftOf >= 0) p.push(j ? [x, leftOf] : [leftOf, y]);
          // right of i
          const rightOf = i + size;
          if (rightOf < this.boardSize) p.push(j ? [x, rightOf] : [rightOf, y]);
          return p;
        }, [])
        .filter(([x1, y1]) => this.filterShipCollisions(size, x, y, x1, y1).length || false);
    }
    return [];
  }

  placeShip(ship, x, y, x1, y1) {
    if (!(ship instanceof Ship)) throw new InvalidShipError();

    const positions = this.filterShipCollisions(ship.size, x, y, x1, y1);
    if (positions.length) { // Can place ship
      positions.forEach(([x, y]) => {
        this.board[y][x][this.currentPlayer].ship = ship;
        ship.setPosition(x, y);
      });
      this.getCurrentPlayer().shipsPlaced += 1;
      return true;
    } return false;
  }

  // Game has started

  validAttackActions(action) {
    return VALID_ATTACK_ACTIONS.includes(action);
  }

  hasPlayerHit(x, y) {
    return (this.validCoordinates(x, y) && this.board[y][x][this.currentPlayer].hit) || false;
  }

  // TODO: Fix this
  getThisPlayerShip(x, y) {
    return (this.validCoordinates(x, y) && this.board[y][x][this.currentPlayer].ship) || false;
  }

  getNextPlayerShip(x, y) {
    return (this.validCoordinates(x, y) && this.board[y][x][this.incrementPlayer()].ship) || false;
  }

  validCoordinates(x, y) {
    return (
      typeof x === 'number' &&
      typeof y === 'number' &&
      x >= 0 &&
      y >= 0 &&
      x < this.boardSize &&
      y < this.boardSize
    );
  }

  updateGameOverState() {
    if (this.getNextPlayer().ships.reduce((sunk, ship) => sunk + ship.isSunk(), true)) {
      this.gameState = GAME_OVER;
    }
  }

  attackPosition(x, y) {
    const { board } = this;
    let action;
    if (this.validCoordinates(x, y)) {
      const alreadyHit = this.hasPlayerHit(x, y);
      const ship = this.getNextPlayerShip(x, y);
      if (alreadyHit) action = ATTACK_PREVIOUS;
      else if (ship) {
        ship.attack(x, y);
        if (ship.isSunk()) action = ATTACK_SUNK;
        else action = ATTACK_HIT;
      } else action = ATTACK_MISS;
    } else action = ATTACK_INVALID;
    if (this.validAttackActions(action)) {
      board[y][x][this.currentPlayer].hit = true;
      this.board = board;
    }
    if (action === ATTACK_SUNK) this.updateGameOverState();
    return action;
  }
}

export default Battleship;
