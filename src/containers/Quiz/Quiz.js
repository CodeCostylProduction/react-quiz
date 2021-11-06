import React from 'react'
import classes from './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/loader/loader";
import {connect} from "react-redux";
import {fetchQuizById} from "../../store/actions/quiz";

class Quiz extends React.Component {

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
        this.props.fetchQuizById(this.props.match.params.id)
    }

    render() {
        console.log(this.props)
        return (
            <div className={classes.Quiz}>
                <div className={classes.ActiveQuiz}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.props.loading || !this.props.quiz
                        ? <Loader/>
                         : this.props.isFinished
                            ?   <FinishedQuiz
                                results = {this.props.results}
                                quiz = {this.props.quiz}
                                onRetry = {this.retryHandler}
                            />
                            :   <ActiveQuiz
                                // id = {this.props.quiz[this.props.activeQuestion].id}
                                answers = {this.props.quiz[this.props.activeQuestion].answers}
                                question = {this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick = {this.onAnswerClickHandler}
                                quizLength = {this.props.quiz.length}
                                questionNumber = {this.props.activeQuestion + 1}
                                answerState = {this.props.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
        return {
            loading: state.quiz.loading,
            isFinished: state.quiz.isFinished,
            results: state.quiz.results,
            activeQuestion: state.quiz.activeQuestion,
            answerState: state.quiz.answerState,
            quiz: state.quiz.quiz
        }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)