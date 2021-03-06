import React from 'react';
import './app.scss';
import { Choices } from './components/choices/choices.components';
import { NextQuestionBtn } from './components/nextQuestionBtn/btn.components';
import { QuizQuestion } from './components/quiz-questions.components';
import { ResetQuiz } from './components/reset-quiz/reset-quiz-components';
import { Results } from './components/results/results.components';
import QuizData from './quiz-data/quiz-data';

class App extends React.Component{
    state = {
        QuizData,
        currentQustion : 0,
        currentChoice: 0,
        score: 0,
        isChecked: '',
        answersLeft:7
    }

    handleRadio = (e) => {
        const value = e.target.value
        const {quiz} = this.state.QuizData
        let isAttr = false
        if(!isAttr){
            isAttr = true
            this.setState({
                isChecked : 'checked'
            })
        }

        if(parseInt(value) === quiz[this.state.currentQustion].answer){
            this.setState(prevScore => ({
                score: prevScore.score + 1
            }))
        }else{
                
            this.setState(prevScore => ({
                score: prevScore.currentChoice + 0
            }))
        }
    }

    handleClick = (e) => {
        const id = e.target.getAttribute('id');
        if(id === ''){
            alert('Choose your answer')
        }else{
            this.setState((prev) => ({
                currentQustion: prev.currentQustion + 1,
                currentChoice: prev.currentQustion + 1,
                answersLeft: prev.answersLeft - 1
            }))
        }
    
    }

    resetQuiz= () => {
        this.setState({
            currentQustion : 0,
            currentChoice: 0,
            score: 0,
        isChecked: '',
        answersLeft:7
        })
    }

    render(){ 
        const {quiz} = this.state.QuizData;

        return(
            <div className ='page-wrap' style = {{textAlign : 'center'}}>  
             {
             this.state.currentQustion === 7? null: <span className = "questions-left">{this.state.answersLeft} Answers Left</span>
         }
         <div className = "quiz-container">
          {this.state.currentQustion !== quiz.length?<QuizQuestion question = {quiz[this.state.currentQustion].question}/>:null}
           {this.state.currentChoice != quiz.length? <Choices choice = {quiz[this.state.currentChoice].choices} test = {this.handleRadio}/> : null} 
            {this.state.currentQustion === 7?null:<NextQuestionBtn props = {this.handleClick} id = {this.state.isChecked}/>}
         </div>
         {
             this.state.currentQustion === 7? (
                 <div className = "reset-quiz">
                     <Results score = {this.state.score} questions = {quiz.length}/>
                     <ResetQuiz props = {this.resetQuiz} />
                 </div>
             ) : null
         }
                </div>
        )
    }
}

export default App