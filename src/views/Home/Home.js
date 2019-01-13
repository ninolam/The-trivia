import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Home.css';

// the home component retrieves categories from the HomeContainer and display them with a loop
const Home = ({ categories }) => (
  <section className="container-content">
    <header className="header-content">
      <h1> THE TRIVIA </h1>
    </header>
    <section className="container">
      <h2> Choisissez une catégorie </h2>
      {categories.length > 0 && (
        <section className="container-categories">
        {categories.map(category => (
          <Link className="categories" to={`/categories/${category.id}`} key={category.id}>
            {category.title}
          </Link>
        ))}
        </section>
      )}
    </section>
  </section>
);

// typechecking the categories with proptypyes
Home.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      clues_count: PropTypes.number
    }),
  ),
}

// makes the component available in the application
export default Home; 
