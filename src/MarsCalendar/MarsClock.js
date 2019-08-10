import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Clock} from '../Clock';

/**
 * A clock that displays MTC (Mars Coordinated Time).
 */
class MarsClock extends React.Component {
    render() {
        const { name, marsTime } = this.props;
        return <Clock
            clockName={name}
            clockTime={marsTime.mtc}
        />;
    }
}

MarsClock.propTypes = {
    marsTime: PropTypes.object,
    name: PropTypes.string,
    longitude: PropTypes.number
};

function mapStateToProps(state) {
    return {
        marsTime: state.marsCalendar.marsTime
    };
}

const ConnectedMarsClock = connect(mapStateToProps)(MarsClock);

export {
    ConnectedMarsClock as MarsClock
};