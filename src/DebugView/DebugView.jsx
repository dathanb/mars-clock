import React from 'react';
import {connect} from 'react-redux';
import {MarsTime} from '../MarsCalendar';

class DebugView extends React.Component {
  render() {
    const { datetime } = this.props;
    const marsTime = new MarsTime(datetime);
    const datetimeStr = String(datetime);
    const millis = datetime.getTime();

    return <div>
      <div>Date: {String(marsTime.date)}</div>
      <div>Unix Epoch Millis: {marsTime.millis}</div>
      <div>JD<sub>UT</sub>: {DebugView.formatNumber(marsTime.jut)}</div>
      <div>JD<sub>TT</sub>: {DebugView.formatNumber(marsTime.jtt)}</div>
      <div>&Delta;J2000: {DebugView.formatNumber(marsTime.deltaJ2000)}</div>
      <div>Coordinated Mars Time: {DebugView.formatTimeFromHours(marsTime.mtc)}</div>
      <div>M: {DebugView.formatNumber(marsTime.meanAnomaly)}&deg;</div>
      <div>&alpha;<sub>FMS</sub>: {DebugView.formatNumber(marsTime.fms)}&deg;</div>
      <div><i>e</i>: {DebugView.formatNumber(marsTime.eccentricity)}</div>
      <div>PBS: {DebugView.formatNumber(marsTime.perturbers)}&deg;</div>
      <div>v - M: {DebugView.formatNumber(marsTime.equationOfCenter)}&deg;</div>
      <div>v: {DebugView.formatNumber(marsTime.trueAnomaly)}&deg;</div>
      <div>L<sub>S</sub>: {DebugView.formatNumber(marsTime.aerocentricSolarLongitude)}&deg;</div>
      <div>EOT = {DebugView.formatNumber(marsTime.equationOfTimeDegrees)}&deg; = {DebugView.formatTimeFromHours(marsTime.eotTime)}</div>
      <div><b>Curiosity</b></div>
      <div>137.4&deg;E longitude</div>
      <div>LMST: {DebugView.formatTimeFromHours(marsTime.meanSolarTimeAtLongitude(360-137.4))}</div>
      <div>LTST: {DebugView.formatTimeFromHours(marsTime.trueSolarTimeAtLongitude(360-137.4))}</div>
    </div>;
  }

  static formatNumber(n) {
      return n.toLocaleString('en-US', {minimumFractionDigits: 5, maximumFractionDigits:5, useGrouping:true});
  }

  static formatTimeFromHours(hours) {
    const hoursPart = Math.floor(hours).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const minutesPart = Math.floor((hours * 60)%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const secondsPart = Math.floor((hours * 3600)%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    return `${hoursPart}:${minutesPart}:${secondsPart}`;
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
