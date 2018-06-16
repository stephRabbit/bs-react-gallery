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
    message: '',
    page: 1,
    query: 'surfing',
    status: '',
  };

  /**
   * LifeCyle Methods
   */
  componentDidMount() {
    this.renderGallery();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * Static methods
   */
  renderGallery = () => {
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

    this.setState(() => ({ status: 'loading' }));

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

      const { results } = response.data;

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

  handleScroll = () => {
    const html = document.documentElement;
    let offset = html.scrollTop + window.innerHeight;
    let height = html.offsetHeight;

    if (offset === height) {
      setTimeout(this.getMoreItems, 1500);
    }
  };

  render() {
    const { images, status } = this.state;

    return (
      <div className="app">
        <div className="app-status">
          {this.renderStatusContent()}
        </div>
        <Header />
        <div className="grid">
          {images.map((image, index) => <Image image={image} key={`${image.id + index}`} />)}
        </div>
        {
          status === 'loading' && (
            <div className="app-loader">
              <Loader modifer={true} />
            </div>
          )
        }
      </div>
    );
  }
}

export default Grid;
