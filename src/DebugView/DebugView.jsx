import React from 'react';
import {connect} from 'react-redux';
import {getDeltaJ2000, getCoordinatedMarsTime} from '../marsCalendar';

class DebugView extends React.Component {
  render() {
    const { datetime } = this.props;
    const datetimeStr = String(datetime);
    const millis = datetime.getTime();

    return <div>
      <div>Date: {datetimeStr}</div>
      <div>Unix Epoch Millis: {millis}</div>
      <div>&Delta;J2000: {getDeltaJ2000(datetime)}</div>
      <div>Coordinated Mars Time: {getCoordinatedMarsTime(datetime)}</div>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    datetime: state.debugView.datetime
  }
}

const connectedDebugView = connect(mapStateToProps)(DebugView);

export {
  connectedDebugView as DebugView
};
