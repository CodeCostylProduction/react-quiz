import React, {Component} from 'react';
import classes from './QuizList.css'
import {NavLink} from "react-router-dom";
import axios from 'axios'

export default class QuizList extends Component {
    state = {
        quizes: [],
    }

    renderQuizes() {
        return this.state.quizes.map(quiz => {
            return (
                <li
                key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const responce = await axios.get('https://react-quiz-64a0d-default-rtdb.firebaseio.com/quizes.json')
            const quizes = []
            Object.keys(responce.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест № ${index + 1}`
                })
                console.log(responce.data)
                this.setState({
                    quizes
                })
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    <ul>
                        {this.renderQuizes() }
                    </ul>
                </div>
            </div>
        );
    }
}

