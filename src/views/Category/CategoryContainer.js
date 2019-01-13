import React, { Component, createRef } from 'react';
import api from '../../helpers/api';
import Category from './Category';
import { Link } from 'react-router-dom';

//save the current category, question, score and lives
class CategoryContainer extends Component {
    state = {
      category: null,
      currentQuestion: 0,
      score: 0,
      lives: 3  
    }
  
  // createRef in order to bring back input value to its parent
  answerInput = createRef();

  // async needed when using promise
  async componentDidMount() {
    const data = await api.getCategoryById(this.props.match.params.id);

    this.setState({
      category: data,
    });

  }

  // save  the score, lives and category name in localStorage
  componentDidUpdate() {
    const{score, lives, category} = this.state
    localStorage.setItem('score', score )
    localStorage.setItem('lives', lives )
    localStorage.setItem('category', category.title )
  }

  handleSubmit = (e) => {
    // here I prevent the default bh of submitting form
    e.preventDefault();

    // handle good/bad answer
    var currentQuestionIndex = this.state.currentQuestion;
    const answerInput = this.answerInput.current.value.toLowerCase()
    const answerExpected = this.state.category.clues[currentQuestionIndex].answer.toLowerCase();

    if(answerInput === answerExpected ){
      currentQuestionIndex = currentQuestionIndex + 1;
      this.setState({
        currentQuestion: currentQuestionIndex,
        score: currentQuestionIndex
      })
      this.answerInput.current.value = ""
    }
    else{
      if(this.state.lives > 0) {
        this.setState(prevState => ({
          lives: prevState.lives - 1
        }));
      }  
    }
  }

  // function to reset the score and lives
  resetScoreAndLives() {
    this.setState({ lives : 3, score: 0})
  }

  render() {
    const { category, currentQuestion } = this.state;
    const categories = { ...this.state.category }
    const clues_count = Object.values(categories)

    if (this.state.lives === 0 ) {
      return (
        //display the game over page
        <div className="gameOverSection">
          <div className="pointsContainer">
            <div className="lives"> {this.state.lives} lives </div>
            <div className="score"> {this.state.score} points </div>
          </div>
          <div className="messageContainer">
            <span className="mark"> 0 / 10</span>
            <p className="messageContent">Game Over!</p>
            <span className="mark"> 0 / 10</span>
          </div>
          <p className="looserMessage">You are a looser &nbsp;</p>
          <button className="nextCategorieButton" type="button" onClick={this.resetScoreAndLives.bind(this)}>
          <Link to={'/'}>Back to categories</Link>
          </button>
        </div>
      )
    }
    if(currentQuestion === clues_count[2]){
      return (
        //display the winner page
        <div className="congratulationSection">
          <div className="pointsContainer">
            <div className="lives"> {this.state.lives} lives </div>
            <div className="score"> {this.state.score} points </div>
          </div>
          <div className="winnerMessageContainer">
            <p className="winnerMessageContent">Congratulations!</p>
          </div>
          <p className="winnerMessage">You are a winner &nbsp;</p>
          <button className="nextCategorieButton" type="button" onClick={this.initialState}>
          <Link to={'/'}>Back to categories</Link>
          </button>
        </div>
      )
    }
    // loading page
    if (!category) return <div>is loading</div>

    return (
      <Category
        category={category}
        score={this.state.score}
        lives={this.state.lives}
        currentQuestionIndex={currentQuestion}
        handleSubmit={this.handleSubmit}
        handleScore={this.handleScore}
        // plug createRef to chidlren
        answerInput={this.answerInput}
      />
    );
  }
}

export default CategoryContainer;