const {h, Component} = require('ink');
const PropTypes = require('prop-types');

const Player = ({player}) => <div>Welcome {player.name}, it's your turn!</div>;

Player.propTypes = {
  player: PropTypes.object
};

module.exports = Player;
