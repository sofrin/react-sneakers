/* eslint-disable react/prop-types */
import React from 'react';
import Card from '../components/Card/index';
export default function Home({
  items,
  searchValue,
  setsearchValue,
  onChangeSearchInput,
  onAdToFavorite,
  onAdToCard,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => onAdToCard(obj)}
        onFavorite={(obj) => onAdToFavorite(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };
  return (
    <div className='content p-40'>
      <div className='d-flex align-center mb-40 justify-between'>
        <h1>
          {searchValue ? `Поиск по запросу:"${searchValue}"` : 'Все кросовки'}
        </h1>
        <div className='search-block'>
          <img src='/img/search.svg' alt='Search' />
          {searchValue && (
            <img
              onClick={() => setsearchValue('')}
              className=' clear removeBtn cu-p'
              src='/img/btn-remove.svg'
              alt='clear'
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder='Поиск...'
          />
        </div>
      </div>
      <div className='d-flex flex-wrap  ml-20'>{renderItems()}</div>
    </div>
  );
}
