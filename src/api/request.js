import axios from 'axios';

export default axios.create({
    baseURL: 'https://exercise-tracker-oj.herokuapp.com/',
})