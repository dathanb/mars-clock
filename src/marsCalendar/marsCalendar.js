
function toRad(deg) {
    return deg / 180 * Math.PI;
}

class MarsCalendar {
    constructor(date) {
        this.date = date;
        this.millis = date.getTime();
        // Julian DateTime Unix Epoch
        const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
        const JULIAN_DATE_AT_EPOCH = 2440587.5;
        this.jut = this.millis / MILLIS_PER_DAY + JULIAN_DATE_AT_EPOCH;

        // Julian Terrestrial Time (adjusted for leap seconds)
        // TODO: find an API that gives access to this information so we're future-proofed against new leap seconds
        // TODO: support calculations of JTT prior to UNIX epoch; this equation is only accurate for post-epoch datetimes
        this.jtt = this.jut + (37 + 32.184) / 86400;

        const JULIAN_DATE_AT_JAN_1_2000 = 2451545;
        this.deltaJ2000 = this.jtt - JULIAN_DATE_AT_JAN_1_2000;

        // at midnight on January 6, 2000 it was midnight at the Mars Prime Meridian
        const EARTH_DAYS_SINCE_JAN_6 = this.deltaJ2000 - 4.5;
        const MARS_EARTH_DAY_RATIO = 1.027491252;
        const MARS_DAYS_SINCE_JAN_6 = EARTH_DAYS_SINCE_JAN_6 / MARS_EARTH_DAY_RATIO;
        // By convention, to keep the MSD (Mars Sol Date) positive going back to middy December 29, 1873
        // we add those days
        const MARS_SOL_DATE_ADJUSTMENT = 44796;
        const MARS_SOL_DATE_ERROR_ADJUSTMENT = 0.00096
        this.marsSolDate = MARS_DAYS_SINCE_JAN_6 + MARS_SOL_DATE_ADJUSTMENT - MARS_SOL_DATE_ERROR_ADJUSTMENT;

        this.mtc = (24 * this.marsSolDate) % 24;

        const MEAN_ANOMALY_AT_J2000 = 19.3870; // in degrees
        // in theory this should give 0.52402074; but just in case, we're hard-coding the value given by Allison & McEwen (2000)
        // const MARS_ORBIT_LENGTH_IN_EARTH_DAYS = 686.995696258211149;
        // const MEAN_DAILY_MOTION = 360 / MARS_ORBIT_LENGTH_IN_EARTH_DAYS; // in degrees
        const MEAN_DAILY_MOTION =  0.52402075; // in degrees
        this.meanAnomaly = (MEAN_ANOMALY_AT_J2000 + MEAN_DAILY_MOTION * this.deltaJ2000) % 360;

        // angle of the fictitious mean sun
        const ANGLE_AT_J2000 = 270.3863; // degrees
        const DAILY_ANGLE_CHANGE = 0.52403840; // degrees
        this.fms = (ANGLE_AT_J2000 + DAILY_ANGLE_CHANGE * this.deltaJ2000) % 360;

        const ECCENTRICITY_AT_J2000 = 0.09340;
        const DAILY_DEVIATION = 2.477E-9;
        this.eccentricity = ECCENTRICITY_AT_J2000 + DAILY_DEVIATION * this.deltaJ2000;

        this.perturbers = 0.0071 * Math.cos(toRad(0.985626) * this.deltaJ2000 / 2.2353 + toRad(49.409))
                        + 0.0057 * Math.cos(toRad(0.985626) * this.deltaJ2000 / 2.7543 + toRad(168.173))
                        + 0.0039 * Math.cos(toRad(0.985626) * this.deltaJ2000 / 1.1177 + toRad(191.837))
                        + 0.0037 * Math.cos(toRad(0.985626) * this.deltaJ2000 / 15.7866 + toRad(21.736))
                        + 0.0021 * Math.cos(toRad(0.985626) * this.deltaJ2000 / 2.1354 + toRad(15.704))
                        + 0.0020 * Math.cos(toRad(0.985626) * this.deltaJ2000 / 2.4694 + toRad(95.528))
                        + 0.0018 * Math.cos(toRad(0.985626) * this.deltaJ2000 / 32.8493 + toRad(49.095));

        this.equationOfCenter = (10.691 + 3E-7 * this.deltaJ2000) * Math.sin(toRad(this.meanAnomaly))
                + 0.623 * Math.sin(2 * toRad(this.meanAnomaly))
                + 0.050 * Math.sin(3 * toRad(this.meanAnomaly))
                + 0.005 * Math.sin(4 * toRad(this.meanAnomaly))
                + 0.0005 * Math.sin(5 * toRad(this.meanAnomaly))
                + this.perturbers;
        this.nu_m = this.equationOfCenter;

        this.trueAnomaly = this.equationOfCenter + this.meanAnomaly;

        this.aerocentricSolarLongitude = this.fms + this.equationOfCenter;
        this.ls = this.aerocentricSolarLongitude;

        //EOT = 2.861° sin 2Ls - 0.071° sin 4Ls + 0.002° sin 6Ls - (ν - M)


        this.equationOfTimeDegrees = 2.861 * Math.sin(2 * toRad(this.ls))
                            - 0.071 * Math.sin(4 * toRad(this.ls))
                            + 0.002 * Math.sin(6 * toRad(this.ls))
                            - this.equationOfCenter;
        this.eotTime = this.equationOfTimeDegrees * 24 / 360;
    }

    meanSolarTimeAtLongitude(long) {
        // add 24 so we don't have to deal with negative numbers
        // and use (long % 360) to adjust longitude to a legal range
        return (this.mtc + 24 - (long % 360)* 24 / 360) % 24;
    }

    trueSolarTimeAtLongitude(long) {
        return this.meanSolarTimeAtLongitude(long) + this.eotTime;
    }
}

export {
    MarsCalendar
};