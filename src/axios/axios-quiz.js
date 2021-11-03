import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-64a0d-default-rtdb.firebaseio.com/'
})