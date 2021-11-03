import React from 'react'
import classes from './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/loader/loader";

class Quiz extends React.Component {
    state = {
        isFinished: false,
        results: {},  // {[id]: 'success' 'error'}
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' 'error'}
        quiz: [],
        loading: true
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion]
        const result = this.state.results
        if (answerId === question.rightAnswerId) {
            if (!result[question.id]) {
                result[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results: result
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    })
                }
                else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        }
        else {
            result[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: result

            })

        }

    }
    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    retryHandler = () => {
        this.setState({
            isFinished: false,
            results: {},  // {[id]: 'success' 'error'}
            activeQuestion: 0,
            answerState: null, // {[id]: 'success' 'error'}
            }
        )
    }
    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data
            this.setState({
                quiz,
                loading: false
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.ActiveQuiz}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.loading
                        ? <Loader/>
                         : this.state.isFinished
                            ?   <FinishedQuiz
                                results = {this.state.results}
                                quiz = {this.state.quiz}
                                onRetry = {this.retryHandler}
                            />
                            :   <ActiveQuiz
                                id = {this.state.quiz[this.state.activeQuestion].id}
                                answers = {this.state.quiz[this.state.activeQuestion].answers}
                                question = {this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick = {this.onAnswerClickHandler}
                                quizLength = {this.state.quiz.length}
                                questionNumber = {this.state.activeQuestion + 1}
                                answerState = {this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz