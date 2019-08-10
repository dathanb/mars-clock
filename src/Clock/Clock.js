import React from 'react';
import PropTypes from 'prop-types';

/**
 * Given a name and a time in props, displays it as a clock.
 */
class Clock extends React.Component {
    render() {
        const { clockName, clockTime } = this.props;
        return <div className={"clock"}>
            {`${clockName}: ${Clock.formatTime(clockTime)}`}
        </div>;
    }

    /**
     * Format a decimal representing the hours within the day into a clock string like 12:34:56
     * @param hours
     */
    static formatTime(hours) {
        const hoursPart = Math.floor(hours).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        const minutesPart = Math.floor((hours * 60)%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        const secondsPart = Math.floor((hours * 3600)%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        return `${hoursPart}:${minutesPart}:${secondsPart}`;
    }
}

Clock.propTypes = {
    clockName: PropTypes.string,
    clockTime: PropTypes.number
};

export { Clock };