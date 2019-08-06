import { TIME_UPDATED } from '../Timer';

const INITIAL_STATE = {
  datetime: new Date(),
  time: new Date().getTime()
};

function reducer(state, action) {
  if (state == null) {
    return INITIAL_STATE;
  }
  switch(action.type) {
    case TIME_UPDATED:
      return { 
        datetime: action.payload,
        time: action.payload.getTime()
      };
    default:
      return state;
  }
}

export { reducer };
