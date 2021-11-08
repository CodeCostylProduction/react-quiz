import axios from '../../axios/axios-quiz';
import {FETCH_QUIZES_ERROR,
        FETCH_QUIZES_START,
        FETCH_QUIZES_SUCCESS,
        FETCH_QUIZ_SUCCESS,
        FETCH_QUIZ_SETSTATE,
        FINISH_QUIZ,
        NEXT_QUESTION,
        RETRY_QUIZ
        } from "./actionTypes";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const responce = await axios.get('quizes.json')
            const quizes = []
            Object.keys(responce.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест № ${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(QuizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${QuizId}.json`)
            const quiz = response.data
            dispatch(fetchQuizSuccess(quiz))
        }
        catch (e) {
            dispatch(fetchQuizesError(e))
        }


    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }
        const question = state.quiz[state.activeQuestion]
        const results = state.results
        if (answerId === question.rightAnswerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerId]: 'success'}, results))
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                }
                else {
                    dispatch(nextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)
        }
        else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))

        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR
    }}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizSetState(answerState, results) {
    return {
        type: FETCH_QUIZ_SETSTATE,
        answerState, results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }

}

export function nextQuestion(activeQuestion) {
    return {
        type: NEXT_QUESTION,
        activeQuestion
    }
}

export function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}