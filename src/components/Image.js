import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Image extends Component {
  randomNumber = num => Math.floor(Math.random() * num) + 1;

  render() {
    const { image } = this.props;

    return (
      <div className={`grid__item grid__item--h${this.randomNumber(4)} grid__item--v${this.randomNumber(2)} grid__item--bg${this.randomNumber(4)}`}>
          <img
            alt={image.description ? image.description : 'Surfing'}
            className={`grid__img grid__img--fade${this.randomNumber(4)}`}
            src={image.urls.small}
          />
          <div className="grid__overlay">
            <Link
              className="grid__link"
              to={{pathname: `/photo/${image.id}`, state: {image}}}
            >
              View <i className="grid__link-icon fas fa-arrow-right"></i>
            </Link>
          </div>
      </div>
    );
  };
}

export default Image;