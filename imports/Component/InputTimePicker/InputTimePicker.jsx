import React, { Component, PropTypes } from 'react';
import moment from 'moment';

const hourFormat = 'H:mm';

class InputTimePicker extends Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    disabled: false,
  }
  static eventName = 'changeTime.timepicker';
  constructor(props) {
    super(props);
    this.input = null;
    this.state = { value: this.props.value };
  }
  componentDidMount() {
    const settings = {
      maxHours: 24,
      showInputs: false,
      showMeridian: false,
    };
    // Linter for Meteor's jQuery
    /* eslint-disable */
    const $el = $(this.input);
    /* eslint-enable */
    $el.timepicker(settings);
    $el.on(InputTimePicker.eventName, (e) => {
      const { hours, minutes } = e.time;
      const m = moment(new Date(this.state.value));
      let hasChanged = false;
      if (m.minute() !== minutes) {
        m.minute(minutes);
        hasChanged = true;
      }
      if (m.hour() !== hours) {
        m.hour(hours);
        hasChanged = true;
      }
      if (hasChanged) {
        this.props.onChange(m.toDate());
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }
  componentWillUnmount() {
    // Linter for Meteor's jQuery
    /* eslint-disable */
    const $el = $(this.input);
    /* eslint-enable */
    $el.off(InputTimePicker.eventName);
  }
  render() {
    const { disabled } = this.props;
    return (
      <input
        className="form-control"
        type="text"
        data-format={hourFormat}
        ref={input => (this.input = input)}
        value={moment(new Date(this.state.value)).format(hourFormat)}
        disabled={disabled}
        onChange={() => {}}
      />
    );
  }
}

export default InputTimePicker;
