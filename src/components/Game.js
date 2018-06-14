'use strict';

import {h, Component} from 'ink';
import PropTypes from 'prop-types';
import importJsx from 'import-jsx';
import alphaArray from '../utils/alphaArray';
import {
  ATTACK_HIT,
  ATTACK_INVALID,
  ATTACK_MISS,
  ATTACK_PREVIOUS,
  ATTACK_SUNK
} from '../constants';

const Separator = importJsx('./ui/Separator');
const Grid = importJsx('./Grid');
const Player = importJsx('./Player');
const UserAction = importJsx('./UserAction');

class Game extends Component {
  constructor(props, context) {
    super(props, context);
    this.alphaArray = alphaArray(this.props.game.boardSize);
    this.logAction = this.logAction.bind(this);
    this.handleAttack = this.handleAttack.bind(this);
    this.handleGridRender = this.handleGridRender.bind(this);
    this.updateBoard = this.updateBoard.bind(this);

    this.state = {
      boardUpdated: false
    };
    this.state.currentPlayer = 0;
    this.state.actionLog = [
      {action: 'GAME_STARTED', message: 'game has started'}
    ];
    // // TODO: Use battleship logic
    // this.state.board = [...new Array(this.props.boardSize)].map(() =>
    //   [...new Array(this.props.boardSize)].map(() =>
    //     [...new Array(this.state.players.length)].map((x, i) => ({
    //       player: this.state.players[i],
    //       hit: false,
    //       ship:
    //         Math.random() * 4 > 3
    //           ? {
    //               name: 'blah',
    //               attack: () => {},
    //               isSunk: () => Math.random() * 8 > 6,
    //             }
    //           : null,
    //     }))
    //   )
    // );
  }

  logAction(action, player, message) {
    this.setState({
      actionLog: [].concat(this.state.actionLog, {
        action,
        player,
        message
      })
    });
  }

  getCoordinates(coordinates) {
    const {board} = this.props.game;
    const coorMatch = coordinates.toUpperCase().match(/([A-Z]+)\s*(\d+)/);
    if (!coorMatch || coorMatch.length < 3) return {};
    const x = this.alphaArray.findIndex(
      alpha => alpha.localeCompare(coorMatch[1]) === 0
    );
    if (typeof x !== 'number' || x < 0 || x >= board.length) return {};
    const y = Number(coorMatch[2]) - 1;
    if (y < 0 || y >= board[x].length) return {};
    return {x, y, coords: `${coorMatch[1]}, ${coorMatch[2]}`};
  }

  handleAttack(coordinates) {
    const {game} = this.props;
    const {board, currentPlayer} = game;
    const {x, y, coords} = this.getCoordinates(coordinates);
    const action = game.attackPosition(x, y);
    this.updateBoard(x, y, coords, action);
    return action;
  }

  updateBoard(x, y, coords, action) {
    const {game} = this.props;
    const {board} = game;
    const currentPlayer = game.getCurrentPlayer().player;
    const nextPlayer = game.getNextPlayer().player;
    let message = '';
    switch (action) {
      case ATTACK_INVALID:
        message = `${
          currentPlayer.name
        } tried to attack, but gave invalid coordinates`;
        break;
      case ATTACK_MISS:
        message = `${currentPlayer.name} attacked (${coords}), but missed`;
        break;
      case ATTACK_PREVIOUS:
        message = `${
          currentPlayer.name
        } tried to attack (${coords}), but already attacked there`;
        break;
      case ATTACK_HIT: {
        const ship = game.getNextPlayerShip(x, y);
        message = `${currentPlayer.name} attacked (${coords}) and hit ${
          nextPlayer.name
        }'s ${ship.name}`;
        break;
      }
      case ATTACK_SUNK: {
        if (game.isGameOver()) this.props.onGameOver();
        const ship = game.getNextPlayerShip(x, y);
        message = `${currentPlayer.name} attacked (${coords}) and sunk ${
          nextPlayer.name
        }'s ${ship.name}`;
        break;
      }
      default:
        break;
    }

    this.logAction(action, game.currentPlayer, message);

    if (game.validAttackActions(action)) {
      game.endCurrentPlayer();
      this.setState({
        boardUpdated: true
      });
    }
  }

  handleGridRender() {
    this.setState({
      boardUpdated: false
    });
  }

  render() {
    const {game} = this.props;
    const {board} = game;
    const actionLog = this.state.actionLog.slice(-1)[0] || {};
    return (
      <div>
        <Player player={game.getCurrentPlayer().player} />
        <Separator />
        <Grid
          boardUpdated={this.state.boardUpdated}
          onGridRender={this.handleGridRender}
          game={game}
          alpha={this.alphaArray}
        />
        <Separator />
        <div>
          $ {actionLog.message} [{actionLog.action}]
        </div>
        <Separator />
        <UserAction promptMsg="attack" onAttack={this.handleAttack} />
      </div>
    );
  }
}

Game.PropTypes = {
  game: PropTypes.object.isRequired
};

module.exports = Game;
