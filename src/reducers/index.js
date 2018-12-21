import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer';
import exerciseReducer from './exerciseReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth: authReducer,
    exercise: exerciseReducer,
    error: errorReducer,
    form: formReducer
})