import * as CoordinatedMarsTimeModule from './CoordinatedMarsTime';
import { combineReducers } from 'redux';

const composedReducer = combineReducers({coordinatedMarsTime: CoordinatedMarsTimeModule.reducer});

export default composedReducer;
