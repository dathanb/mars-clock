import React from 'react';
import { connect } from 'react-redux';
import { timeUpdated } from './actions';

class Timer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // set interval
    this.intervalId = setInterval(() => {
      const time = new Date();
      dispatch(timeUpdated(time));
    }, 0);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return "";
  }
}

const connectedTimer = connect()(Timer);

export { 
  connectedTimer as Timer
};
