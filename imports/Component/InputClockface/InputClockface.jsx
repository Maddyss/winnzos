import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class InputClockface extends Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  static hourFormat = 'H:mm'
  static eventName = 'pick.clockface'
  constructor(props) {
    super(props);
    this.input = null;
    this.state = { value: this.props.value };
  }
  componentDidMount() {
    // Linter for Meteor's jQuery
    /* eslint-disable */
    const $el = $(this.input);
    /* eslint-enable */
    $el.clockface();
    $el.on(InputClockface.eventName, (e, data) => {
      const { hour, minute } = data;
      const m = moment(new Date(this.state.value));
      let hasChanged = false;
      if (m.minute() !== minute) {
        m.minute(minute);
        hasChanged = true;
      }
      if (m.hour() !== hour) {
        m.hour(hour);
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
    $el.off(InputClockface.eventName);
  }
  render() {
    return (
      <input
        className="form-control"
        type="text"
        data-format={InputClockface.hourFormat}
        ref={input => (this.input = input)}
        value={moment(new Date(this.state.value)).format(InputClockface.hourFormat)}
        onChange={() => {}}
      />
    );
  }
}

export default InputClockface;
