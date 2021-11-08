import React from 'react'
import classes from './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/loader/loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends React.Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }
    componentWillUnmount() {
        this.props.retryQuiz()
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
                                onRetry = {this.props.retryQuiz}
                            />
                            :   <ActiveQuiz
                                // id = {this.props.quiz[this.props.activeQuestion].id}
                                answers = {this.props.quiz[this.props.activeQuestion].answers}
                                question = {this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick = {(answerId) => this.props.quizAnswerClick(answerId)}
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
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)