'use strict';

import {h, Component, Fragment} from 'ink';
import PropTypes from 'prop-types';
import importJsx from 'import-jsx';
import TextInput from 'ink-text-input';

class NewPlayer extends Component {

  state = {
    playerNumber: 0,
    playerName: '',
  }

  constructor(props, context) {
    super(props, context);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
  }

  handleNameChange(value) {
    if (value.match(/^\W$/)) return;
    this.setState({
      playerName: value,
    });
  }

  handleNameSubmit() {
    const {playerNumber, playerName} = this.state;
    if (playerName) this.props.onSubmit(playerName);
    this.setState({
      playerNumber: playerNumber + 1,
      playerName: '',
    });
  }

  render() {
    const {playerNumber} = this.state
    return (
      <div>
        <span>Player {playerNumber + 1} name: </span>
        <TextInput
          value={this.state.playerName}
          onChange={this.handleNameChange}
          onSubmit={this.handleNameSubmit}
        />
      </div>
    )
  }

}

module.exports = NewPlayer;
