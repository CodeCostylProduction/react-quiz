import React from 'react'
import classes from './FinishedQuiz.css'

const FinishedQuiz = props => {
    let successTotal = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]
                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>. &nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <p>Вы ответили правильно на {successTotal} из {props.quiz.length} вопросов.</p>
            <div>
                <button onClick={props.onRetry}>Повторить</button>
            </div>
        </div>
    )
}

export default FinishedQuiz