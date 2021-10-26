import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {
    state = {
        isFinished: false,
        results: {},  // {[id]: 'success' 'error'}
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' 'error'}
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Желтый', id: 1},
                    {text: 'Голубой', id: 2},
                    {text: 'Черный', id: 3},
                    {text: 'Красный', id: 4},
                ]
            },
            {
                id: 2,
                question: 'В каком году основали Санкт-Петербург?',
                rightAnswerId: 3,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4},
                ]
            }
        ]
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
    componentDidMount() {
        console.log('quiz id=', this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.ActiveQuiz}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
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