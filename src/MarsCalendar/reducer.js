import { TIME_UPDATED } from '../Timer';
import { MarsTime } from './MarsTime';

const INITIAL_STATE = {
    marsTime: new MarsTime(new Date())
};

function reducer(state, action) {
    if (state == null) {
        return INITIAL_STATE;
    }
    switch(action.type) {
        case TIME_UPDATED:
            return {
                marsTime: new MarsTime(action.payload)
            };
        default:
            return state;
    }
}

export { reducer };
