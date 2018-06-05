import Battleship from "./Battleship.js";
import InvalidBoardSizeError from "./errors/InvalidBoardSize.js";

describe("battleship", () => {
  let game;

  beforeEach(() => {
    game = new Battleship();
  });

  it("should create new game", () => {
    chai.expect(game.board).to.have.length(10);
    chai.expect(game.board[0]).to.have.length(10);
    chai
      .expect(game.players)
      .to.be.an("array")
      .and.to.have.length(0);
    chai.expect(game.startingPlayer).to.be.null;
    chai.expect(game.currentPlayer).to.be.null;
  });

  it("should throw error on invalid size", () => {
    chai.expect(() => new Battleship(0)).to.throw(InvalidBoardSizeError);
    chai.expect(() => new Battleship('nope')).to.throw(InvalidBoardSizeError);
  });
});
