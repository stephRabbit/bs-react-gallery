import React from 'react';

const LoadingPage = props => (
  <div className="loader">
    <div className="loader__item">
      <div className="loader__rect1"></div>
      <div className="loader__rect2"></div>
      <div className="loader__rect3"></div>
      <div className="loader__rect4"></div>
      <div className="loader__rect5"></div>
      {props.message && <h3 className="loader__message">{props.message}</h3>}
    </div>
  </div>
);

export default LoadingPage;