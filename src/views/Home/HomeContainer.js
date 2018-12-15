import React, { Component } from 'react';
import Home from './Home';
import api from '../../helpers/api';

class HomeContainer extends Component {
  state = {
    categories: [],
  }
  async componentDidMount() {
    const data = await api.getCategories();
    this.setState({
      categories: data,
    });
  }
  render() {
    return (
      <Home categories={this.state.categories} />
    );
  }
}

export default HomeContainer;


// Cette page récupére les données de l'api et les stock dans une variable data, 
// le state des catégorie est ensuite mit à jour avec les nouvelles data,
// Puis toutes les catégories sont stocké grâce et passer en props à la Home pour que celle-ci les affiches.