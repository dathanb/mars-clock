const TIME_UPDATED = 'time_updated';

// action creator for TIME_UPDATED action
function timeUpdated(datetime) {
  const millisInUtc = datetime.getTime();
  return {
    type: TIME_UPDATED,
    payload: millisInUtc
  }
}

export {
  TIME_UPDATED,
  timeUpdated
};
