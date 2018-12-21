import defaultState from "./defaultState";
import { CREATE_ACCOUNT, LOGIN, LOGOUT } from "../actions/types";



export default (state = defaultState.auth, action) => {

    switch (action.type) {
        case CREATE_ACCOUNT:
            return action.auth
        case LOGIN:
            return action.auth
        case LOGOUT:
            return action.auth
        default:
            return state
    }
}