import InvalidBoardSize from "./errors/InvalidBoardSize.js";
import InvalidMoveError from "./errors/InvalidMoveError.js";
import TooFewPlayersError from "./errors/TooFewPlayersError.js";
import TooManyPlayersError from "./errors/TooManyPlayersError.js";

export const BATTLESHIP_BOARD_SIZE = 10;

class Battleship {
  constructor(size = BATTLESHIP_BOARD_SIZE) {
    if (!Number(size) || size <= 0) throw new InvalidBoardSize();
    // Create board structure
    this.board = Array(size).fill(Array(size).fill([]))
    this.players = [];
    this.startingPlayer = null;
    this.currentPlayer = null;
  }
}

export default Battleship;
