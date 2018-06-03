import React, { Component } from 'react';
import { get } from 'axios';
import Utils from '../utils/Utils';

import Image from './Image';

class Grid extends Component {
  state = {
    images: [],
    status: 'intial',
    term: ''
  };

  // Life Cycle
  componentDidMount() {
    (Utils.getItems('images').length === 0)
      ? this.fetchImages('music')
      : this.setState(() => ({ images: Utils.getItems('images') }));
  }

  // Static methods
  fetchImages = async term => {
    this.setState(() => ({
      images: [],
      status: 'searching',
      term: term,
    }));

    try {
      const response = await get(
        'https://api.unsplash.com/search/photos',
        {
          params: {
            client_id: '',
            per_page: 50,
            query: term,
            orientation: 'squarish'
          }
        }
      );

      Utils.setItems('images', response.data.results);
      this.setState(() => ({
        status: 'done',
        images: response.data.results
      }));
    }
    catch (error) {
      this.setState(() => ({ status: 'error' }));
    }
  };

  render() {
    const { images, status, term } = this.state;

    return (
      <div className="app">
        <div className="app-status">
          {status === 'searching' && <h3>Searching for {term}</h3>}
          {status === 'error' && <h3>Sorry... an error has occurred!</h3>}
        </div>
        <div className="grid">
          {images.map(image => <Image image={image} key={image.id} />)}
        </div>
      </div>
    );
  }
}

export default Grid;
