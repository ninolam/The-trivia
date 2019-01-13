import React, { Component } from 'react';
import Home from './Home';
import api from '../../helpers/api';

// save the categories in a state component
class HomeContainer extends Component {
  state = {
    categories: [],
  }

  // save the categories in the const data 
  async componentDidMount() {
    const data = await api.getCategories();
    // update the state with the data
    this.setState({
      categories: data,
    });
  }
  
  render() {
    return (
  // pass the data to the home component with a props
      <Home categories={this.state.categories} />
    );
  }
}

export default HomeContainer;
