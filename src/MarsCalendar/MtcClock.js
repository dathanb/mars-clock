import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Clock} from '../Clock';

/**
 * A clock that displays MTC (Mars Coordinated Time).
 */
class MtcClock extends React.Component {
    render() {
        const { mtc } = this.props;
        return <Clock
            clockName="MTC"
            clockTime={mtc}
        />;
    }
}

MtcClock.propTypes = {
    curiosityTime: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        mtc: state.marsCalendar.mtc
    };
}

const ConnectedMtcClock = connect(mapStateToProps)(MtcClock);

export {
    ConnectedMtcClock as MtcClock
};
