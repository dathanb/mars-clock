import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MarsClock extends React.Component {
    render() {
        const { name } = this.props;
        return <div>
            {name}: {this.marsTime()}
        </div>;
    }

    marsTime() {
        const { marsTime, longitude } = this.props;
        return marsTime.formatTime(marsTime.trueSolarTimeAtLongitude(longitude));
    }
}

MarsClock.propType = {
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