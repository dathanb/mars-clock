import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CoordinatedMarsTime extends React.Component {
  render() {
    const { time } = this.props;
    return <p>{time}</p>
  }
}

CoordinatedMarsTime.propTypes = {
  time: PropTypes.number
};

function mapStateToProps(state) {
  return {
    time: state.time
  };
}

export default connect(mapStateToProps)(CoordinatedMarsTime);
