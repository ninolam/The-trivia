import React, { Component, createRef } from 'react';
import api from '../../helpers/api';
import Category from './Category';

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
    // stored response in the state;
    console.log(data);
    this.setState({
      category: data,
    });
  }

  handleSubmit = (e) => {
    // here I prevent the default bh of submitting form
    e.preventDefault();
    // write logic to handle good/bad answer
    var currentQuestionIndex = this.state.currentQuestion;

    const answerInput = this.answerInput.current.value.toLowerCase()
    const answerExpected = this.state.category.clues[currentQuestionIndex].answer.toLowerCase();
    const score = 0;

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
      this.setState(prevState => ({
        lives: prevState.lives - 1
      }));
      console.log(this.state.lives);
    }
  }
  handleScore = (e) => {
    e.preventDefault();
    console.log('uvgdjgv');
  }
  

  render() {
    const { category, currentQuestion } = this.state;
    // const categoryLength = this.state.category.clues_count;
    // at first render, category will be null so we need to wait
    // before using data.
    if (this.state.lives === 0) {
      return (
        <div>
          <p>Game Over!</p>
          <button type="button" onClick={this.resetCategory}>Reset category</button>
        </div>
      )
    }
    if(currentQuestion === 5){
      return (
        <div>
          <p> iduuasdi</p>
          <p>You win! You have {this.state.lives} lives left !</p>
          <button type="button" onClick={this.resetCategory}>Reset category</button>
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