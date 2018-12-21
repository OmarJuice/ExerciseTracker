import defaultState from './defaultState';
import { ERROR, CANCEL_ERROR } from '../actions/types';

export default (state = defaultState.error, action) => {
    switch (action.type) {
        case ERROR:
            return action.error;
        case CANCEL_ERROR:
            return action.error
        default:
            return state
    }
}