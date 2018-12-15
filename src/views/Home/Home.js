import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = ({ categories }) => (
  <section>
    <h1>Homepage</h1>
    {categories.length > 0 && (
      <section>
        {categories.map(category => (
          <Link to={`/categories/${category.id}`} key={category.id}>
            {category.title}
          </Link>
        ))}
      </section>
    )}
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

