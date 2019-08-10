import * as CoordinatedMarsTimeModule from './CoordinatedMarsTime';
import * as DebugViewModule from './DebugView';
import * as MarsCalendarModule from './MarsCalendar';
import { combineReducers } from 'redux';

const composedReducer = combineReducers({
  coordinatedMarsTime: CoordinatedMarsTimeModule.reducer,
  debugView: DebugViewModule.reducer,
  marsCalendar: MarsCalendarModule.reducer
});

export default composedReducer;
