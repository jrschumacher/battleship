'use strict';

import {h, Component} from 'ink';
import PropTypes from 'prop-types';
import importJsx from 'import-jsx';
import Battleship from '../battleship';

const Game = importJsx('./Game');
const PreGame = importJsx('./PreGame');
const PostGame = importJsx('./PostGame');

// ---UI------------------------------------
class UI extends Component {
  constructor(props, context) {
    super(props, context);
    this.state.game = new Battleship();
  }

  handleGameStart() {
    // Console.log('Game started');
  }

  handleGameOver() {}

  render() {
    const {game} = this.state;
    return (
      <div>
        {game.isGameOpen() && (
          <PreGame game={game} onGameStart={this.handleGameStart} />
        )}
        {game.isGameStarted() && (
          <Game game={game} onGameOver={this.handleGameOver} />
        )}
        {game.isGameOver() && <PostGame game={game} />}
      </div>
    );
  }
}

UI.Separator = importJsx('./ui/Separator');

UI.propTypes = {
  boardSize: PropTypes.number,
};

UI.defaultProps = {
  boardSize: 10,
};

module.exports = UI;
