import React, { Component } from 'react';
import { get } from 'axios';
import Utils from '../utils/Utils';

// Components
import Image from './Image';
import Loader from './Loader';
import Header from './Header';

class Grid extends Component {
  state = {
    images: [],
    remainPages: null,
    maxPage: false,
    page: 1,
    query: 'surfing',
    status: '',
  };

  // Lifecycle
  componentDidMount() {
    if (Utils.getItems('images').length === 0) {
      this.fetchImages(this.state.query)
    }
    else {
      let remainPageStored = localStorage.getItem('remainPages');
      this.setState(() => ({
        images: Utils.getItems('images'),
        remainPages: remainPageStored ? parseInt(remainPageStored) : null
      }));
    }
  }

  // Static methods
  fetchImages = async () => {
    this.setState(() => ({ status: 'loading' }));

    try {
      const response = await get(
        'https://api.unsplash.com/search/photos',
        {
          params: {
            client_id: process.env.CLIENT_ID,
            per_page: 30,
            page: this.state.page,
            query: this.state.query,
            orientation: 'squarish'
          }
        }
      );

      const { results, total_pages } = response.data;

      Utils.setItems('images', results);
      localStorage.setItem('remainPages', total_pages - 1);

      this.setState(() => ({
        status: 'done',
        images: results,
        remainPages: total_pages - 1
      }));
    }
    catch (error) {
      this.setState(() => ({ status: 'error' }));
    }
  };

  renderStatusContent = () => {
    switch (this.state.status) {
      case 'loading':
        return <Loader />
      case 'error':
        return <Loader message={'Sorry... an error has occurred!'} />
      default:
        return '';
    }
  };

  getMoreItems = async () => {
    if (!this.state.remainPages) {
      return this.setState(() => { maxPage: true });
    }

    try {
      const response = await get(
        'https://api.unsplash.com/search/photos',
        {
          params: {
            client_id: process.env.CLIENT_ID,
            per_page: 30,
            page: this.state.page + 1,
            query: this.state.query,
            orientation: 'squarish'
          }
        }
      );

      const { results, total_pages } = response.data;

      this.setState((prevState) => ({
        images: [ ...this.state.images, ...results ],
        remainPages: prevState.remainPages - 1,
        page: prevState.page + 1,
        status: 'done',
      }));
    }
    catch (error) {
      this.setState(() => ({ status: 'error' }));
    }
  };

  renderLoadMore = () => {
    return this.state.remainPages > 0 && (
      <div className="load-more">
        <button
          className="load-more__btn"
          onClick={this.getMoreItems}
        >
          Load more <i className="load-more__icon fas fa-arrow-down"></i>
        </button>
      </div>
    );
  };

  render() {
    const { images, status, remainPages } = this.state;

    return (
      <div className="app">
        <div className="app-status">
          {this.renderStatusContent()}
        </div>
        <Header />
        <div className="grid">
          {images.map((image, index) => <Image image={image} key={`${image.id + index}`} />)}
        </div>
        {this.renderLoadMore()}
      </div>
    );
  }
}

export default Grid;
