import { h, Component } from 'ink';
import PropTypes from 'prop-types';
import alphaArray from '../utils/alphaArray';

class Grid extends Component {
  constructor(props, context) {
    super(props, context);

    this.alpha = alphaArray(this.props.game.boardSize);
  }

  shouldComponentUpdate(nextProps) {
    if (
      !nextProps.boardUpdated &&
      nextProps.boardUpdated === this.props.boardUpdated
    ) { return false; }
    this.props.onGridRender();
    return true;
  }

  renderHeaders(x, y) {
    let string = '';
    if (x === 0 && y === 0) string += '    ';
    else if (y === 0) string += `${this.alpha[x - 1]} `;
    else if (x === 0) string += ` ${(` ${y}`).slice(-2)} `;
    else return false;
    return string;
  }

  renderAttack(x, y) {
    const { game } = this.props;
    let string = '';
    if (game.hasPlayerHit(x - 1, y - 1)) {
      if (game.getNextPlayerShip(x - 1, y - 1)) string += '💥 ';
      else string += '💦 ';
    } else string += '🌊 ';
    return string;
  }

  renderShipPlacement(x, y) {
    const { game } = this.props;
    let string = '';
    if (game.getThisPlayerShip(x - 1, y - 1)) string += '🚢 ';
    else string += '🌊 ';
    return string;
  }

  render() {
    const { game, shipPlacement } = this.props;
    const boardSize = game.boardSize;
    const nextPlayer = game.getNextPlayer();
    return [...new Array(boardSize + 1)].map((o, y) => (
      <div>
        {[...new Array(boardSize + 1)].reduce((p, o, x) => {
            const headers = this.renderHeaders(x, y);
            if (headers) p += headers;
            else if (shipPlacement) p += this.renderShipPlacement(x, y);
            else p += this.renderAttack(x, y);
            return p;
          }, '')}
      </div>
    ));
  }
}

Grid.propTypes = {
  game: PropTypes.object.isRequired,
};

Grid.defaultProps = {};

module.exports = Grid;
