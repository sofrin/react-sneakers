/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import AppContext from '../context';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { onAdToFavorite } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      (async () => {
        const { data } = await axios.get(
          'https://62eba861705264f263dd8ccf.mockapi.io/orders',
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      })();
    } catch (error) {
      alert('Ошибка при запросе заказов');
      console.error(error);
    }
  }, []);

  return (
    <div className='content p-40'>
      <div className='d-flex align-center mb-40 justify-between'>
        <h1>Мои заказы</h1>
      </div>
      <div className='d-flex flex-wrap  ml-20'>
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            onFavorite={(obj) => onAdToFavorite(obj)}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
