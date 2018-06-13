import {h, Component, Fragment, Color} from 'ink';
import PropTypes from 'prop-types';
import TextInput from 'ink-text-input';
import importJsx from 'import-jsx';
import {
  ALERT_COLORS,
  ALERT_ERROR,
  ALERT_SUCCESS,
  ALERT_WARN,
  ATTACK_HIT,
  ATTACK_INVALID,
  ATTACK_MISS,
  ATTACK_PREVIOUS,
  ATTACK_SUNK,
  PLACEMENT_INVALID,
  PLACEMENT_SUCCESS,
} from '../constants';
import SelectInput from './lib/ink-select-input';

const Separator = importJsx('./ui/Separator');

class UserAction extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      query: '',
      options: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAttack = this.handleAttack.bind(this);
    this.handleShipPlacement = this.handleShipPlacement.bind(this);
    this.handleShipFinalPlacement = this.handleShipFinalPlacement.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearAlert = this.handleClearAlert.bind(this);
  }

  handleChange(value) {
    if (value === '' || value.match(/^[a-zA-Z]+(\d+)?$/)) {
      this.setState({query: value.toUpperCase()});
    }
  }

  handleShipPlacement() {
    const result = this.props.onShipPlacement(this.state.query);
    if (result === PLACEMENT_INVALID) {
      this.setState({
        alert: "Capt'n...those are invalid coordinates.",
        alertType: ALERT_ERROR,
      });
    } else {
      this.setState({
        options: result.map(([x, y]) => ({
          label: `(${x}, ${y})`,
          value: [x, y],
        })),
      });
    }
  }

  handleShipFinalPlacement(option) {
    const result = this.props.onShipFinalPlacement(option.value);
    if (result === PLACEMENT_SUCCESS) {
      this.setState({
        alert: `Capt'n we've positioned the ship!`,
        alertType: ALERT_SUCCESS,
      });
    }
    this.setState({
      options: null,
    });
  }

  handleAttack() {
    const result = this.props.onAttack(this.state.query);
    if (result === ATTACK_INVALID) {
      this.setState({
        alert: "Capt'n...those are invalid coordinates.",
        alertType: ALERT_ERROR,
      });
    } else if (result === ATTACK_PREVIOUS) {
      this.setState({
        alert: "Capt'n... you already attacked those coordinates.",
        alertType: ALERT_ERROR,
      });
    } else if (result === ATTACK_MISS) {
      this.setState({
        alert: "Capt'n we missed the enemy.",
        alertLevel: ALERT_WARN,
      });
    } else if (result === ATTACK_HIT) {
      this.setState({
        alert: `Capt'n we've hit the enemy!`,
        alertType: ALERT_SUCCESS,
      });
    } else if (result === ATTACK_SUNK) {
      this.setState({
        alert: `Capt'n we've sunk the enemy!`,
        alertType: ALERT_SUCCESS,
      });
    }
  }

  handleSelect(option) {
    if (this.props.onShipFinalPlacement) this.handleShipFinalPlacement(option);
  }

  handleSubmit(select) {
    if (this.props.onShipPlacement) this.handleShipPlacement();
    if (this.props.onAttack) this.handleAttack();
  }

  handleClearAlert() {
    this.setState({query: '', alert: null, alertType: null});
  }

  render() {
    const {promptMsg} = this.props;
    const {options} = this.state;

    return (
      <div>
        {this.state.alert ? (
          <Fragment>
            <Color rgb={ALERT_COLORS[this.state.alertType]}>
              {this.state.alert}
            </Color>
            <span> [Press Enter]</span>
            <TextInput value="" onSubmit={this.handleClearAlert} />
          </Fragment>
        ) : (
          <Fragment>
            <Color green>
              Which coordinates do you want to {promptMsg} Capt'n?{' '}
            </Color>
            {Array.isArray(options) && options.length ? (
              <SelectInput items={options} onSelect={this.handleSelect} />
            ) : (
              <TextInput
                value={this.state.query}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

UserAction.propTypes = {
  onAttack: PropTypes.func,
  onShipPlacement: PropTypes.func,
};

module.exports = UserAction;
