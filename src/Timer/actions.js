const TIME_UPDATED = 'time_updated';

// action creator for TIME_UPDATED action
function timeUpdated(datetime) {
  return {
    type: TIME_UPDATED,
    payload: datetime
  }
}

export {
  TIME_UPDATED,
  timeUpdated
};
