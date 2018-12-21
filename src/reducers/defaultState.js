const defaultState = {
    auth: {
        signedIn: false,
        token: "",
        credentials: {
            _id: '',
            username: ""
        },
    },
    exercise: {
        list: [],
        selectedExercise: {}
    },

    error: {
        exists: false,
        message: ''
    }
}

export default defaultState