import { TIME_UPDATED } from '../Timer';

const INITIAL_STATE = {
  time: new Date().getTime()
};

function reducer(state, action) {
  if (state == null) {
    return INITIAL_STATE;
  }
  switch(action.type) {
    case TIME_UPDATED:
      return { time: action.payload };
    default:
      return state;
  }
}

export { reducer };
