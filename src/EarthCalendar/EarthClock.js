import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Clock } from '../Clock';

class EarthClock extends React.Component {
    render() {
        const { time } = this.props;
        const timeInHours = time.getHours() + time.getMinutes() / 60 + time.getSeconds() / 3600 + time.getMilliseconds() / 36000000;

        return <Clock
            clockName={"Local Time"}
            clockTime={timeInHours}
            />;
    }
}

EarthClock.propTypes = {
    name: PropTypes.string,
    time: PropTypes.object
};

function mapStateToProps(state) {
    return {
        time: state.earthCalendar.time
    };
}

const ConnectedEarthClock = connect(mapStateToProps)(EarthClock);

export {
    ConnectedEarthClock as EarthClock
};