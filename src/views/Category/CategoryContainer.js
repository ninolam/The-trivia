import React, { Component, createRef } from 'react';
import api from '../../helpers/api';
import Category from './Category';

class CategoryContainer extends Component {
  state = {
    category: null,
    currentQuestion: 0,
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

    if(answerInput === answerExpected && currentQuestionIndex <= this.state.category.clues_count - 2 ){
      console.log('good');
      currentQuestionIndex = currentQuestionIndex + 1;
      this.setState({
        currentQuestion: currentQuestionIndex 
      })
      this.answerInput.current.value = ""
      console.log(currentQuestionIndex);
      console.log(this.state.currentQuestion);
    }
    else{
      console.log('bad');
      console.log(currentQuestionIndex);
    }
    
    
    
    // increment currentQuestion
    // save in the storage the id of the question
    // if no more question, remove category from categories playable
    // increment score somewhere and redirect to /
    // check if answer is equal to the requested answer from the current question
  }

  render() {
    const { category, currentQuestion } = this.state;
    // at first render, category will be null so we need to wait
    // before using data.
    if (!category) return <div>is loading</div>

    return (
      <Category
        category={category}
        currentQuestionIndex={currentQuestion}
        handleSubmit={this.handleSubmit}
        // plug createRef to chidlren
        answerInput={this.answerInput}
      />
    );
  }
}

export default CategoryContainer;