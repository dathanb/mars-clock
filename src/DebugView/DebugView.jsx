import React from 'react';
import {connect} from 'react-redux';

class DebugView extends React.Component {
  render() {
    return "";
  }
}

const connectedDebugView = connect()(DebugView);

export {
  connectedDebugView as DebugView
};
