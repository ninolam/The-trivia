import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

// Le compossant Home récupére les catégories provenant de HomeContainer passer en props et les affiches grâce à une boucle

Home.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      clues_count: PropTypes.number
    }),
  ),
}

// Crée un model d'affichage pour les différentes catégories

export default Home; // rend disponible le composant dans l'application
