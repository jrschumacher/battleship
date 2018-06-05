import Player from "./Player.js";
import InvalidPlayerNameError from "./errors/InvalidPlayerNameError.js";

describe("player", () => {
  it("should throw invalid name", () => {
    chai.expect(() => new Player()).to.throw(InvalidPlayerNameError);
  });

  it("should have name and id", () => {
    const name = 'bob';
    const player = new Player(name);
    chai.expect(player.name).to.be.equal(name);
    chai.expect(player.id).to.not.be.empty;
  });
});
