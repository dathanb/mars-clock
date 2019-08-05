import React from 'react';

class Timer extends React.Component {
  componentDidMount() {
    // set interval
    this.intervalId = setInterval(() => console.log(new Date().getTime()), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return "";
  }
}

export { 
  Timer
};
