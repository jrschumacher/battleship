import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

('use strict');

const {h, Component, Color} = require('ink');
const PropTypes = require('prop-types');
const importJsx = require('import-jsx');

class PostGame extends Component {
  render() {
    const {game} = this.props;
    const {player} = game.getCurrentPlayer();
    return (
      <div>
        <Gradient name="rainbow">
          <BigText text={`${player.name} Won!`} />
          <BigText text="Game Over" />
        </Gradient>
      </div>
    );
  }
}

module.exports = PostGame;
