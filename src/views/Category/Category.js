import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Category.css';

const Category = ({ category, currentQuestionIndex, handleSubmit, answerInput, score, lives }) => {
  const currentQuestion = category.clues[currentQuestionIndex];
  const totalQuestion = category.clues_count;
  const actualQuestionIndex = currentQuestionIndex + 1;

  return (
    <section>
      <form onSubmit={ handleSubmit} className="categoryContainer">
        <section className="questionContainer">
          <div className="questionContent">
          <div className="currentQuestion">
            <h1 className="categoryTitle">{category.title}</h1>
            <h3 className="questionTitle">{currentQuestion.question}</h3>
          </div>
              {totalQuestion < 10 ?(
                <p className="questionNumbers">0{actualQuestionIndex} / 0{totalQuestion} </p>
              ) :
              (
                <p className="questionNumbers">{actualQuestionIndex} / {totalQuestion}</p>
              )
              }
          </div>
        </section>
        <div className="answerInput">
            {/* We give the ref below in order check the value */}
          <input ref={answerInput} placeholder="Your answer" />
          <button className="answerSubmit" type="submit">Validate</button>
          <button className="homeButton" type="button">
            <Link to={"/"}>Back To Home</Link>
          </button>
        </div>
        <div className="pointsContainer">
          <div className="liveValue">
          {lives} lives
          </div>
          <div className="scoreValue">
          {score} points
          </div>
        </div>
      </form>
    </section>
  );
}

Category.propTypes = {
  category: PropTypes.shape({}).isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  answerInput: PropTypes.shape({
    value: PropTypes.instanceOf(HTMLInputElement)
  }),
};

export default Category;
