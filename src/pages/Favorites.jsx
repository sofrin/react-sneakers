/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import Card from '../components/Card';
import AppContext from '../context';

export default function Favorites({ onAdToFavorite }) {
  const { favorites } = useContext(AppContext);
  console.log(favorites);
  return (
    <div className='content p-40'>
      <div className='d-flex align-center mb-40 justify-between'>
        <h1>Мои закладки</h1>
      </div>
      <div className='d-flex flex-wrap  ml-20'>
        {favorites.map((item, index) => (
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
