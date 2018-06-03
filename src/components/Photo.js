import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Photo = props => {
  const { description, urls } = props.location.state.image;
  console.log(props.location.state.image)
  return (
    <div className="photo">
      <figure>
        <header className="photo__header">
          { description && <p className="photo__description">{description}</p>}
          <Link className="photo__back-link" to="/">Back</Link>
        </header>
        <img
          alt={description ? description : 'Gallery Image'}
          className="photo__img"
          src={urls.full}
        />
      </figure>
    </div>
  );
}

export default Photo;