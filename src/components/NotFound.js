import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="not-found">
    <div className="not-found__content">
      <h2 className="not-found__text">
        <Link to="/">
          <i className="fas fa-arrow-left not-found__link"></i> Hmm... Page not found. Get me out of here!
        </Link>
      </h2>
    </div>
  </div>
);
