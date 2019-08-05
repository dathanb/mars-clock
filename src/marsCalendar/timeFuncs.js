/*
 * This library provides functions for converting Earth dates and times to Mars dates and times.
 *
 * Most of the math and notes about it cribbed from <https://jtauber.github.io/mars-clock/>
 */

const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
const JULIAN_DATE_AT_EOPCH = 2_440_587.5;
const JULIAN_DATE_AT_JAN_1_2000 = 2_451_545;
const MARS_EARTH_DAY_RATIO = 1.027491252;
const MARS_SOL_DATE_ADJUSTMENT = 44_796;
const MEAN_ANOMALY_AT_J2000 = 19.3870; // in degrees
const MARS_ORBIT_LENGTH_IN_EARTH_DAYS = 686.995696258211149;
const MEAN_DAILY_MOTION = 360 / MARS_ORBIT_LENGTH_IN_EARTH_DAYS; // in degrees
const PBS = 0.00409; // degrees

function getCoordinatedMarsTime(date) {
  const millis = getMillis(date);
  console.log(`millis: $millis`);
  const jut = getJulianDateUnixTime(millis);
  console.log(`jut: $jut`);
  const jtt = getJulianDateTerrestrialTime(jut);
  console.log(`jtt: $jtt`);
  const j2000Days = getEarthDaysSinceJ2000Epoch(jtt);
  console.log(`j2000Days: $j2000Days`);
}

function getMillis(date) {
  return date.getTime();
}

function getJulianDateUnixTime(millis) {
  return millis / MILLIS_PER_DAY + JULIAN_DATE_AT_EPOCH;
}

function getJulianDateTerrestrialTime(julianDate) {
  // TODO: calculate leap seconds instead of using this constant
  return julianDate + (37 + 32.184) / 86400;
}

function getEarthDaysSinceJ2000Epoch(julianTerrestrialDate) {
  return julianTerrestrialDate - JULIAN_DATE_AT_JAN_1_2000;
}

// earthDays is Earth Julian Days since Jan 1, 2000
function getMarsSolDate(earthDays) {
  // at midnight on January 6, 2000 it was midnight at the Mars Prime Meridian
  const earthDaysSinceJan6 = earthDays - 4.5;
  const marsDaysSinceJan6 = earthDaysSinceJan6 / MARS_EARTH_DAY_RATIO;
  // By convention, to keep the MSD (Mars Sol Date) positive going back to middy December 29, 1873
  // we add those days
  return marsDaysSinceJan6 + MARS_SOL_DATE_ADJUSTMENT;
}

function getCoordinatedMarsTime(marsSolDate) {
  return Math.floor(24 * marsSolDate) % 24;
}

function getMarsMeanAnomaly(earthDaysSinceJ2000) {
  return MEAN_ANOMALY_AT_J2000 + MEAN_DAILY_MOTION * earthDaysSinceJ2000;
}

function getAngleOfFictitiousMeanSun(earthDaysSinceJ2000) {
  const ANGLE_AT_J2000 = 270.3863; // degrees
  const DAILY_ANGLE_CHANGE = 0.52403840; // degrees
  return ANGLE_AT_J2000 + DAILY_ANGLE_CHANGE * earthDaysSinceJ2000;
}

function getEccentricity(earthDaysSinceJ2000) {
  const ECCENTRICITY_AT_J2000 = 0.09340;
  const DAILY_DEVIATION = 2.477 * 0.000000001;
  return ECCENTRICITY_AT_J2000 + DAILY_DEVIATION * earthDaysSinceJ2000;
}

function getEquationOfCenter(earthDaysSinceJ2000) {
  const MEAN_ANOMALY = Math.sin(getMarsMeanAnomaly(earthDaysSinceJ2000));
  return (10.691 + 3 * 0.0000001 * earthDaysSinceJ2000) * MEAN_ANOMALY
    + 0.623 * Math.sin(2 * MEAN_ANOMALY)
    + 0.050 * Math.sin(3 * MEAN_ANOMALY)
    + 0.005 * Math.sin(4 * MEAN_ANOMALY)
    + 0.0005 * Math.sin(5 * MEAN_ANOMALY);
}

function getTrueAnomaly(earthDaysSinceJ2000) {
  const MEAN_ANOMALY = getMarsMeanAnomaly(earthDaysSinceJ2000);
  return getEquationOfCenter(earthDaysSinceJ2000) + MEAN_ANOMALY;
}

function getAerocentricSolarLangitude(earthDaysSinceJ2000) {
  return getAngleOfFictitiousMeanSun(earthDaysSinceJ2000) + getEquationOfCenter(earthDaysSinceJ2000);
}

export {
  getCoordinatedMarsTime,
  getMillis,
  getJulianDateUnixTime,
  getJulianDateTerrestrialTime,
  getEarthDaysSinceJ2000Epoch,
  getMarsSolDate,
  getCoordinatedMarsTime
};
