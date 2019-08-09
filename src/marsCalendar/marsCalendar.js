
const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
const JULIAN_DATE_AT_EPOCH = 2440587.5;
const JULIAN_DATE_AT_JAN_1_2000 = 2451545;
const MARS_EARTH_DAY_RATIO = 1.027491252;
const MARS_SOL_DATE_ADJUSTMENT = 44796;
const MEAN_ANOMALY_AT_J2000 = 19.3870; // in degrees
const MARS_ORBIT_LENGTH_IN_EARTH_DAYS = 686.995696258211149;
const MEAN_DAILY_MOTION = 360 / MARS_ORBIT_LENGTH_IN_EARTH_DAYS; // in degrees
const PBS = 0.00409; // degrees

class MarsCalendar {
    constructor(date) {
        this.date = date;
        this.millis = date.getTime();
        // Julian DateTime Unix Epoch
        this.jut = this.millis / MILLIS_PER_DAY + JULIAN_DATE_AT_EPOCH;
        // Julian Terrestrial Time (adjusted for leap seconds)
        this.jtt = this.jut + (37 + 32.184) / 86400;
        this.deltaJ2000 = this.jtt - JULIAN_DATE_AT_JAN_1_2000;

        // at midnight on January 6, 2000 it was midnight at the Mars Prime Meridian
        const earthDaysSinceJan6 = this.deltaJ2000 - 4.5;
        const marsDaysSinceJan6 = earthDaysSinceJan6 / MARS_EARTH_DAY_RATIO;
        // By convention, to keep the MSD (Mars Sol Date) positive going back to middy December 29, 1873
        // we add those days
        this.marsSolDate = marsDaysSinceJan6 + MARS_SOL_DATE_ADJUSTMENT;

        this.mtc = (24 * this.marsSolDate) % 24;

        this.meanAnomaly = MEAN_ANOMALY_AT_J2000 + MEAN_DAILY_MOTION * this.deltaJ2000;

        // angle of the fictitious mean sun
        const ANGLE_AT_J2000 = 270.3863; // degrees
        const DAILY_ANGLE_CHANGE = 0.52403840; // degrees
        this.fms = ANGLE_AT_J2000 + DAILY_ANGLE_CHANGE * this.deltaJ2000;


        const ECCENTRICITY_AT_J2000 = 0.09340;
        const DAILY_DEVIATION = 2.477 * 0.000000001;
        this.eccentricity = ECCENTRICITY_AT_J2000 + DAILY_DEVIATION * this.deltaJ2000;


        const MEAN_ANOMALY = Math.sin(this.meanAnomaly);
        this.equationOfCenter = (10.691 + 3 * 0.0000001 * this.deltaJ2000) * MEAN_ANOMALY
                + 0.623 * Math.sin(2 * MEAN_ANOMALY)
                + 0.050 * Math.sin(3 * MEAN_ANOMALY)
                + 0.005 * Math.sin(4 * MEAN_ANOMALY)
                + 0.0005 * Math.sin(5 * MEAN_ANOMALY);

        this.trueAnomaly = this.equationOfCenter + MEAN_ANOMALY;

        this.aerocentricSolarLongitude = this.fms + this.equationOfCenter;
    }
}

export {
    MarsCalendar
};