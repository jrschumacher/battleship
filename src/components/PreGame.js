'use strict';

import {h, Component, Fragment} from 'ink';
import PropTypes from 'prop-types';
import importJsx from 'import-jsx';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import Player from '../player';
import {GAME_STARTED} from '../Battleship';

const NewPlayer = importJsx('./NewPlayer');
const PlaceShip = importJsx('./PlaceShip');

class PreGame extends Component {
  constructor(props, context) {
    super(props, context);
    this.registerPlayer = this.registerPlayer.bind(this);
  }

  registerPlayer(name) {
    const {game} = this.props;
    const player = new Player(name);
    game.registerPlayer(player);
    if (game.players.length === 2) game.startGameSetup();
  }

  render() {
    const {game} = this.props;
    const {startingPlayer} = game;

    return (
      <Fragment>
        {startingPlayer === null ? (
          <Fragment>
            <div>
              <Gradient name="rainbow">
                <BigText text="Battleship" />
              </Gradient>
            </div>
            <NewPlayer onSubmit={this.registerPlayer} />
          </Fragment>
        ) : (
          <PlaceShip game={game} onGameStart={this.props.onGameStart} />
        )}
      </Fragment>
    );
  }
}

PreGame.propTypes = {
  game: PropTypes.object.isRequired,
  onGameStart: PropTypes.func.isRequired,
};

module.exports = PreGame;
