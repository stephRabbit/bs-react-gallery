import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Photo = props => {
  const { description, urls } = props.location.state.image;

  return (
    <div className="photo">
      <figure>
        <header className="photo__header">
          <Link className="photo__back-link" to="/">
            <i className="fas fa-arrow-left"></i> Gallery
          </Link>
          <p className="photo__description">
            <i>
              {
                description
                  ? description
                  : 'Hope you enjoy my photo... Thanks for your interest!'
              }
            </i>
          </p>
        </header>
        <picture className="photo_picture">
          <source media="(max-width: 799px)" srcSet={urls.small} />
          <source media="(min-width: 800px)" srcSet={urls.regular} />
          <img
            alt={description ? description : 'Gallery Image'}
            className="photo__img"
            src={urls.regular}
          />
        </picture>
      </figure>
    </div>
  );
}

export default Photo;