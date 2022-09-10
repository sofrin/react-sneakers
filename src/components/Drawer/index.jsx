/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import AppContext from '../../context';
import Info from '../info';
import styles from './Drawer.module.scss';

export default function Drawer({ onRemove, onClose, items = [] }) {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderID, setOrderID] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { setCartItems, cartItems } = useContext(AppContext);

  const onClickOrder = async () => {
    try {
      setisLoading(true);
      const { data } = await axios.post(
        'https://62eba861705264f263dd8ccf.mockapi.io/orders',
        { items: cartItems },
      );
      await axios.put(
        'https://62eba861705264f263dd8ccf.mockapi.io/items/1/cart/1',
        {},
      );
      setOrderID(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
    } catch (error) {
      alert(error);
    }
    setisLoading(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className='mb-30 d-flex justify-between '>
          Корзина
          <img
            onClick={onClose}
            className={styles.removeBtn}
            src='/img/btn-remove.svg'
            alt='remove'
          />
        </h2>
        {items.length > 0 ? (
          <div className='d-flex flex-column flex'>
            <div className={styles.items}>
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className='cartItem d-flex align-center mb-20'
                >
                  <img
                    height={70}
                    width={70}
                    className={styles.cartItemImg}
                    src={obj.imageURL}
                    alt='image'
                  ></img>

                  <div className='mr-20 flex'>
                    <p className='mb-5'>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className={styles.removeBtn}
                    src='/img/btn-remove.svg'
                    alt='Remove'
                  />
                </div>
              ))}
            </div>
            <div className='cartTotalBlock'>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className='greenButton'
              >
                Оформить заказ <img src='/img/arrow.svg' alt='Arrow' />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderID} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={
              isOrderComplete
                ? '/img/complete-order.jpg'
                : '/img/empty-cart.jpg'
            }
          />
        )}
      </div>
    </div>
  );
}
