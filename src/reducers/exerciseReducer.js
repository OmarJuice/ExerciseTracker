import defaultState from './defaultState';
import { GET_EXERCISE, FETCH_EXERCISES, CREATE_EXERCISE, UPDATE_EXERCISE, DELETE_EXERCISE } from '../actions/types';

export default (state = defaultState.exercise, action) => {
    switch (action.type) {
        case GET_EXERCISE:
            return { list: [...state.list], selectedExercise: action.payload }
        case FETCH_EXERCISES:
            return { ...state, list: action.payload };
        case CREATE_EXERCISE:
            return { ...state, list: [...state.list, action.payload] };
        case UPDATE_EXERCISE:
            return {
                ...state, list: [...state.list.map((ex) => {
                    if (ex._id === action.payload._id) {
                        return action.payload
                    }
                    return ex
                })], selectedExercise: {}
            }
        case DELETE_EXERCISE:
            return { ...state, list: [...state.list.filter((ex) => ex._id !== action.deleted)] };
        default:
            return state
    }
}