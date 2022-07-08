import React from 'react';

import styles from './Card.module.scss';
export default function Card(props) {
  const [isAdded, setIsAdded] = React.useState(false);
  const onClickPlus = () => {
    setIsAdded(!isAdded);
  };
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src='/img/heart-0.svg' alt='unliked' />
      </div>
      <img height={112} width={133} src='/img/image5.png' alt='' />
      <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
      <div className='d-flex justify-between align-center'>
        <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>12999руб.</b>
        </div>

        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? '/img/btn-cheked.svg' : '/img/btn-plus.svg'}
          alt=''
        />
      </div>
    </div>
  );
}
