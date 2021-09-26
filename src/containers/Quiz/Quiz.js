import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends React.Component {
    state = {
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Желтый', id: 1},
                    {text: 'Голубой', id: 2},
                    {text: 'Черный', id: 3},
                    {text: 'Красный', id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log(answerId)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.ActiveQuiz}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz
                    answers = {this.state.quiz[0].answers}
                    question = {this.state.quiz[0].question}
                    onAnswerClick = {this.onAnswerClickHandler}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz