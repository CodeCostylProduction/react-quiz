import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends React.Component {
    state = {
        activeQuestion: 0,
        quiz: [
            {
                id: 1,
                answerState: null,
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
        const question = this.state.quiz[this.state.activeQuestion]
        if (answerId === question.rightAnswerId) {
            this.setState({
                answerState: {[answerId]: 'success'}
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    console.log('finished.')
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
            this.setState({
                answerState: {[answerId]: 'error'}
            })

        }

    }
    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.ActiveQuiz}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz
                    answers = {this.state.quiz[this.state.activeQuestion].answers}
                    question = {this.state.quiz[this.state.activeQuestion].question}
                    onAnswerClick = {this.onAnswerClickHandler}
                    quizLength = {this.state.quiz.length}
                    questionNumber = {this.state.activeQuestion + 1}
                    answerState = {this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz