import { TIME_UPDATED } from '../Timer';
import { MarsTime } from './MarsTime';

const INITIAL_STATE = {
    marsTime: new MarsTime(new Date()),
    curiosityTime: 0
};

function reducer(state, action) {
    if (state == null) {
        return INITIAL_STATE;
    }
    switch(action.type) {
        case TIME_UPDATED:
            let marsTime = new MarsTime(action.payload);
            return {
                marsTime: marsTime,
                mtc: marsTime.mtc,
                curiosityTime: marsTime.trueSolarTimeAtLongitude(-137.4)
            };
        default:
            return state;
    }
}

export { reducer };
