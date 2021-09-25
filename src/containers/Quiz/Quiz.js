import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends React.Component {
    state = {
        quiz: []
    }
    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.ActiveQuiz}>
                    <h1>Quiz</h1>
                    <ActiveQuiz />
                </div>
            </div>
        )
    }
}

export default Quiz