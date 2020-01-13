import React, { Component, PropTypes } from 'react';

const style = {
  fontFamily: 'Arial,sans-serif',
  fontSize: 14,
  width: '100%',
  lineHeight: '30px',
  border: '1px solid rgba(0,0,0,.07)',
  marginBottom: 10,
};

class InputHourPicker extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    position: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    const settings = {
      theme: 'bootstrap',
      position: this.props.position || 'top left',
      change: (color) => this.props.onChange(color),
    };
    // Linter for Meteor's jQuery
    /* eslint-disable */
    const $el = $(this.input);
    /* eslint-enable */
    $el.minicolors(settings);
  }
  render() {
    return (
      <input
        type="hidden"
        ref={input => (this.input = input)}
        style={style}
        value={this.props.value}
      />
    );
  }
}

export default InputHourPicker;
