import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Clock} from '../Clock';

/**
 * A clock that displays the local true solar time at the Curiosity Rover
 */
class CuriosityClock extends React.Component {
    render() {
        const { curiosityTime } = this.props;
        console.log("curiosityTime: " + curiosityTime)
        return <Clock
            clockName="Curiosity"
            clockTime={curiosityTime}
        />;
    }
}

CuriosityClock.propTypes = {
    curiosityTime: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        curiosityTime: state.marsCalendar.curiosityTime
    };
}

const ConnectedCuriosityClock = connect(mapStateToProps)(CuriosityClock);

export {
    ConnectedCuriosityClock as CuriosityClock
};
