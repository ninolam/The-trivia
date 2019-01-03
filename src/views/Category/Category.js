import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Category = ({ category, currentQuestionIndex, handleSubmit, answerInput, score, lives }) => {
  const currentQuestion = category.clues[currentQuestionIndex];
  return (
    <section>
      <form onSubmit={ handleSubmit}>
      {/* currentQuestionIndex === category.clues_count -1 ? handleScore : */}
        <h1>You choosed: {category.title}</h1>
        <div className="question">
          <h3 className="question__title">
            {currentQuestion.question}
          </h3>
          <div className="question__answerInput">
            {/* We give the ref below in order check the value */}
            <input ref={answerInput} />
          </div>
          <button className="question__submit" type="submit">
            Next
          </button>
        </div>
        <div className="score_value">
        score is:{score}
        </div>
        <div className="live_value">
        lives is:{lives}
        </div>
        <button id="HomeButton" type="button">
          <Link to={"/"}>Back To Home</Link>
        </button>
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