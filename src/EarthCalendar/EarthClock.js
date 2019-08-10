import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EarthClock extends React.Component {
}

EarthClock.propTypes = {
    name: PropTypes.string,
    time: PropTypes.object
}

function mapStateToProps(state) {
    return {
        time: state.earthCalendar.time
    };
}

const ConnectedEarthClock = connect(mapStateToProps)(EarthClock);

export {
    ConnectedEarthClock as EarthClock
};