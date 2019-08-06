import * as CoordinatedMarsTimeModule from './CoordinatedMarsTime';
import * as DebugViewModule from './DebugView';
import { combineReducers } from 'redux';

const composedReducer = combineReducers({
  coordinatedMarsTime: CoordinatedMarsTimeModule.reducer,
  debugView: DebugViewModule.reducer
});

export default composedReducer;
