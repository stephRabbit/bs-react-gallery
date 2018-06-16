import React from 'react';

const buildLoaderItems = () => {
  const items = [];
  for (let i = 0; i < 5; i++) {
    items.push(<div className={`loader__rect${i+1}`} key={i}></div>);
  }
  return items;
};

const LoadingPage = props => (
  <div className={`loader${props.modifer ? ' loader--custom' : ''}`}>
    <div className="loader__item">
      {buildLoaderItems()}
      {props.message && <h3 className="loader__message">{props.message}</h3>}
    </div>
  </div>
);

export default LoadingPage;