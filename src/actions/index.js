import {
    LOGIN,
    LOGOUT,
    CREATE_ACCOUNT,
    CREATE_EXERCISE,
    FETCH_EXERCISES,
    GET_EXERCISE,
    UPDATE_EXERCISE,
    DELETE_EXERCISE,
    ERROR,
    CANCEL_ERROR,
} from './types'

import requestServer from '../api/request'
import history from '../history';

const authenticate = (getState) => {
    return {
        headers: {
            'x-auth': getState().auth.token
        }
    }
}

export const createAccount = credentials => dispatch => {
    return requestServer.post('/users', {
        username: credentials.username,
        password: credentials.password
    }).then((res) => {
        dispatch({
            type: CREATE_ACCOUNT,
            auth: {
                signedIn: true,
                token: res.headers['x-auth'],
                credentials: res.data
            }
        })
        history.push('/ExerciseTracker')

    }).catch((e) => {
        console.log((e.response.data))
        dispatch({
            type: ERROR,
            error: {
                exists: true,
                message: e.response.data
            }
        })
    })
}
export const login = credentials => (dispatch, getState) => {
    if (getState().auth.signedIn) {
        return history.push('/ExerciseTracker')
    }

    return requestServer.post('/users/login', {
        username: credentials.username,
        password: credentials.password
    }).then((res) => {
        dispatch({
            type: LOGIN,
            credentials: res.data,
            auth: {
                signedIn: true,
                token: res.headers['x-auth'],
                credentials: res.data
            }
        })
        history.push('/ExerciseTracker')
    }).catch((e) => {
        dispatch({
            type: ERROR,
            error: {
                exists: true,
                message: 'Invalid username or password'
            }
        })
    })
}
export const logout = () => (dispatch, getState) => {
    return requestServer.delete('/users/logout', authenticate(getState))
        .then(() => {
            dispatch({
                type: LOGOUT,
                auth: {
                    signedIn: false,
                    token: '',
                    credentials: {
                        _id: '',
                        username: ''
                    }
                }
            })
            history.push('/ExerciseTracker')
        }).catch((e) => {
            dispatch({
                type: ERROR,
                error: {
                    exists: true,
                    message: 'Logout failed'
                }
            })
        })
}
export const createExercise = details => (dispatch, getState) => {
    return requestServer.post('/exercise', details, authenticate(getState))
        .then((res) => {
            dispatch({
                type: CREATE_EXERCISE,
                payload: res.data
            })
        }).catch((e) => {
            console.log(e)
            dispatch({
                type: ERROR,
                error: {
                    exists: true,
                    message: 'There was an error'
                }
            })
        })
}
export const getExercise = id => (dispatch, getState) => {
    return requestServer.get(`/exercise/${id}`, authenticate(getState))
        .then((res) => {
            dispatch({
                type: GET_EXERCISE,
                payload: res.data
            })
        }).catch((e) => {
            dispatch({
                type: ERROR,
                error: {
                    exists: true,
                    message: 'Could not get exercise'
                }
            })
        })
}
export const fetchExercises = () => (dispatch, getState) => {
    return requestServer.get('/exercise', authenticate(getState))
        .then((res) => {
            dispatch({
                type: FETCH_EXERCISES,
                payload: res.data.exercises
            })
        }).catch((e) => {
            dispatch({
                type: ERROR,
                error: {
                    exists: true,
                    message: 'Could not get exercises'
                }
            })
        })
}

export const updateExercise = (id, update) => (dispatch, getState) => {
    return requestServer.patch(`/exercise/${id}`, update, authenticate(getState))
        .then((res) => {
            dispatch({
                type: UPDATE_EXERCISE,
                payload: res.data
            })
        }).catch((e) => {
            dispatch({
                type: ERROR,
                error: {
                    exists: true,
                    message: 'Could not update exercise'
                }
            })
        })
}
export const deleteExercise = (id) => (dispatch, getState) => {
    return requestServer.delete(`/exercise/${id}`, authenticate(getState))
        .then((res) => {
            dispatch({
                type: DELETE_EXERCISE,
                deleted: id
            })
        }).catch((e) => {
            dispatch({
                type: ERROR,
                error: {
                    exists: true,
                    message: 'Could not delete exercise'
                }
            })
        })
}
export const cancelError = () => dispatch => {
    return dispatch({
        type: CANCEL_ERROR,
        error: {
            exists: false,
            message: ''
        }
    })
}