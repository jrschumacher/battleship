

import { h, Component, Fragment } from 'ink';
import PropTypes from 'prop-types';
import importJsx from 'import-jsx';
import alphaArray from '../utils/alphaArray';
import {
  PLACEMENT_INVALID,
  PLACEMENT_SUCCESS,
} from '../constants';

const Separator = importJsx('./ui/Separator');
const Grid = importJsx('./Grid');
const UserAction = importJsx('./UserAction');


class PlaceShip extends Component {
  state = {
    shipsPlaced: 0,
    ship: null,
    player: null,
  }

  constructor(props, context) {
    super(props, context);

    this.alphaArray = alphaArray(this.props.game.boardSize);

    this.handleNextPlayer = this.handleNextPlayer.bind(this);
    this.handleShipPlaced = this.handleShipPlaced.bind(this);
    this.handlePlaceShip = this.handlePlaceShip.bind(this);
    this.handlePlaceShipFinal = this.handlePlaceShipFinal.bind(this);
  }

  componentWillMount() {
    this.handleNextPlayer();
  }

  handleNextPlayer() {
    this.props.game.endCurrentPlayer();
    if (this.props.game.startGame()) return this.props.onGameStart();

    const { player, ships } = this.props.game.getCurrentPlayer();
    this.setState({
      shipsPlaced: 0,
      ship: ships.slice(0, 1)[0],
      player,
    });
  }

  handleShipPlaced() {
    const { ships } = this.props.game.getCurrentPlayer();
    const { shipsPlaced } = this.state;
    if (shipsPlaced + 1 < ships.length) {
      this.setState({
        shipsPlaced: shipsPlaced + 1,
        ship: ships.slice(shipsPlaced + 1, 1)[0],
      });
    } else this.handleNextPlayer();
  }

  getCoordinates(coordinates) {
    const { board } = this.props.game;
    const coorMatch = coordinates.toUpperCase().match(/([A-Z]+)\s*(\d+)/);
    if (!coorMatch || coorMatch.length < 3) return {};
    const x = this.alphaArray.findIndex(alpha => alpha.localeCompare(coorMatch[1]) === 0);
    if (typeof x !== 'number' || x < 0 || x >= board.length) return {};
    const y = Number(coorMatch[2]) - 1;
    if (y < 0 || y >= board[x].length) return {};
    return { x, y, coords: `${coorMatch[1]}, ${coorMatch[2]}` };
  }

  handlePlaceShip(query) {
    const { x, y } = this.getCoordinates(query);
    const ship = this.props.game.getCurrentPlayer().ships[this.state.shipsPlaced];
    const placements = this.props.game.findPlacements(ship, x, y);
    if (placements.length) {
      this.setState({ originPosition: [x, y] });
      return this.placementOptions = placements;
    }
    return PLACEMENT_INVALID;
  }

  handlePlaceShipFinal([x1, y1]) {
    const [x, y] = this.state.originPosition;
    const ship = this.props.game.getCurrentPlayer().ships[this.state.shipsPlaced];
    const placements = this.props.game.placeShip(ship, x, y, x1, y1);
    this.setState({ originPosition: [] });
    this.handleShipPlaced();
    return PLACEMENT_SUCCESS;
  }

  render() {
    const { game } = this.props;
    const player = this.props.game.getCurrentPlayer().player;
    const ship = this.props.game.getCurrentPlayer().ships[this.state.shipsPlaced];
    return (
      <Fragment>
        <div>Hello {player.name}, please place your ships</div>
        <Separator />
        <Grid game={game} shipPlacement />
        <Separator />
        <div>Current ship: {ship.name} ({ship.size})</div>
        <Separator />
        <UserAction promptMsg={`place your ${ship.name} (${ship.size})`} onShipPlacement={this.handlePlaceShip} onShipFinalPlacement={this.handlePlaceShipFinal} />
      </Fragment>
    );
  }
}

PlaceShip.propTypes = {
  onGameStart: PropTypes.func.isRequired,
};

module.exports = PlaceShip;
