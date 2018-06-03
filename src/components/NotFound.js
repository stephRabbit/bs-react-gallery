import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="notFound">
    <h2>Hmm... Page not found!</h2>
    <Link to="/">Get me out of here!</Link>
  </div>
);
