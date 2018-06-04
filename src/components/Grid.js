import React, { Component } from 'react';
import { get } from 'axios';
import Utils from '../utils/Utils';

import Image from './Image';
import Loader from './Loader';
import Header from './Header';

class Grid extends Component {
  state = {
    images: [],
    status: ''
  };

  componentDidMount() {
    (Utils.getItems('images').length === 0)
      ? this.fetchImages('surfing')
      : this.setState(() => ({ images: Utils.getItems('images') }));
  }

  fetchImages = async term => {
    this.setState(() => ({
      images: [],
      status: 'loading'
    }));

    try {
      const response = await get(
        'https://api.unsplash.com/search/photos',
        {
          params: {
            client_id: process.env.CLIENT_ID,
            per_page: 30,
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
          {status === 'loading' && <Loader />}
          {status === 'error' && <Loader message={'Sorry... an error has occurred!'}/>}
        </div>
        <Header />
        <div className="grid">
          {images.map(image => <Image image={image} key={image.id} />)}
        </div>
      </div>
    );
  }
}

export default Grid;
