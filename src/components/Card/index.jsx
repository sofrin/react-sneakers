/* eslint-disable react/prop-types */
import React from "react";

import styles from "./Card.module.scss";
export default function Card({ imageURL, title, price, onPlus, onFavorite }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const onClickPlus = () => {
    setIsAdded(!isAdded);
    onPlus({ imageURL, title, price });
  };
  const onClickFavorite = () => {
    setIsLiked(!isLiked);
    onFavorite({ imageURL, title, price });
  };
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={onClickFavorite}
          src={isLiked ? '/img/heart-1.svg' : '/img/heart-0.svg'}
          alt='unliked'
        />
      </div>
      <img height={112} width={133} src={imageURL} alt='' />
      <h5>{title}</h5>
      <div className='d-flex justify-between align-center'>
        <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>{price}</b>
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
