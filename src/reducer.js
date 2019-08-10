import { reducer as coordinatedMarsTimeReducer } from './CoordinatedMarsTime';
import { reducer as debugViewReducer } from './DebugView';
import { reducer as marsCalendarReducer } from './MarsCalendar';
import { reducer as earthCalendarReducer } from './EarthCalendar';
import { combineReducers } from 'redux';

const composedReducer = combineReducers({
  coordinatedMarsTime: coordinatedMarsTimeReducer,
  debugView: debugViewReducer,
  marsCalendar: marsCalendarReducer,
  earthCalendar: earthCalendarReducer
});

export default composedReducer;
