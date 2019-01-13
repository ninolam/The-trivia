import React, { Component, createRef } from 'react';
import api from '../../helpers/api';
import Category from './Category';
import { Link } from 'react-router-dom';

//save the current categorie, question, score and lives
class CategoryContainer extends Component {
    state = {
      category: null,
      currentQuestion: 0,
      score: 0,
      lives: 3  
    }
     baseState = this.state.lives;

  
  // createRef in order to bring back input value to its parent
  answerInput = createRef();

  // async needed when using promise
  async componentDidMount() {
    const data = await api.getCategoryById(this.props.match.params.id);

    // stored response in the state;
    console.log(data);
    const score = localStorage.getItem('score')
    const lives = localStorage.getItem('lives')

    // const currentCategory =this.state.category.title; 
    // console.log(currentCategory)
    

    //if(score > 0) {this.setState({score})}

 /**
  * this conditions about the score is notworking when trying to reset the score on the page "game",
 but it still keep the informations in localStorage
  */

    // if ( score > 0 ) {
    //   this.setState({ score })
    // }
    // else {
    //   this.setState({score: 0})
    // }



// Those conditions about the lives are not working when i try to reset the score on the page "game over"
    // if ( lives == null || lives === 0 ) {
    //   this.setState({ lives  : 3})
    // }
    // else {
    //   this.setState({lives})
    // }

    // if (lives < 3) {
    //   this.setState({lives})
    // }

    //if(previousCategory != category.id )


    this.setState({
      category: data,
    });

  }

 // if(previousCategory === )


  componentDidUpdate() {
    const{score, lives, category} = this.state
    localStorage.setItem('score', score )
    localStorage.setItem('lives', lives )
    localStorage.setItem('category', category.title )
    const previousCategory = localStorage.getItem('category')
    console.log(previousCategory)

// this condition is not working when i try to reset the score on the page "game over"
    // if (this.state.lives === 0) {
    //   this.setState({
    //     lives: 3
    //  });
    // }
  }

  handleSubmit = (e) => {
    // here I prevent the default bh of submitting form
    e.preventDefault();
    // write logic to handle good/bad answer
    var currentQuestionIndex = this.state.currentQuestion;

    const answerInput = this.answerInput.current.value.toLowerCase()
    const answerExpected = this.state.category.clues[currentQuestionIndex].answer.toLowerCase();

    if(answerInput === answerExpected ){
      console.log('good');
      currentQuestionIndex = currentQuestionIndex + 1;
      this.setState({
        currentQuestion: currentQuestionIndex,
        score: currentQuestionIndex
      })
      this.answerInput.current.value = ""
      console.log(currentQuestionIndex);
      console.log(this.state.currentQuestion);
      console.log(this.state.category.clues_count);
    }
    else{
      console.log('bad');
      console.log(currentQuestionIndex);
      if(this.state.lives > 0) {
      this.setState(prevState => ({
        lives: prevState.lives - 1
      }));
     }

    
    }
  }

  resetScoreAndLives() {
    this.setState({ lives : 3, score: 0})
  }

  render() {
    const { category, currentQuestion } = this.state;

    const categories = { ...this.state.category }
    console.log(categories)


    const clues_count = Object.values(categories)
    // const categoryLength = this.state.category;
    // category.map(category => category)
   // const clues_count = category.clues_count;
    //console.log(clues_count);


    // at first render, category will be null so we need to wait
    // before using data.
    if (this.state.lives === 0 ) {
      return (
        <div className="gameOverSection">
          <div className="pointsContainer">
            <div className="lives"> {this.state.lives} lives </div>
            <div className="score"> {this.state.score} points </div>
          </div>
          <div class="messageContainer">
            <span class="mark"> 0 / 10</span>
            <p className="messageContent">Game Over!</p>
            <span className="mark"> 0 / 10</span>
          </div>
          <p className="looserMessage">You are a looser &nbsp;</p>
          <button className="nextCategorieButton" type="button" onClick={this.resetScoreAndLives.bind(this)}>
          <Link to={'/'}>
          Back to categories
          </Link>
          </button>
        </div>
      )
    }
    if(currentQuestion === clues_count[2]){
      return (
        <div className="congratulationSection">
          <div className="pointsContainer">
            <div className="lives"> {this.state.lives} lives </div>
            <div className="score"> {this.state.score} points </div>
          </div>
          <div class="winnerMessageContainer">
            <p className="winnerMessageContent">Congratulations!</p>
          </div>
          <p className="winnerMessage">You are a winner &nbsp;</p>
          <button className="nextCategorieButton" type="button" onClick={this.initialState}>
          <Link to={'/'}>
          Back to categories
          </Link>
          </button>
        </div>
      )
    }
    // console.log(categoryLength);
    
    
    // if(currentQuestion === category){
    //   return (
    //     <div>
    //       <p> iduuasdi</p>
    //       {/* <p>You win! You have {this.state.lives} left !</p> */}
    //       {/* <button type="button" onClick={this.resetCategory}>Reset category</button> */}
    //     </div>
    //   )
    // }

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