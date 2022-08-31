/* eslint-disable react/prop-types */
import React from 'react';
import Card from '../components/Card';

export default function Favorites({ items, onAdToFavorite }) {
  return (
    <div className='content p-40'>
      <div className='d-flex align-center mb-40 justify-between'>
        <h1>Мои закладки</h1>
      </div>
      <div className='d-flex flex-wrap  ml-20'>
        {items.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={(obj) => onAdToFavorite(obj)}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
