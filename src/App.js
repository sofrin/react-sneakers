import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [searchValue, setsearchValue] = useState('');
  const [cardOpened, setCardOpened] = useState(false);
  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setsearchValue(event.target.value);
  };
  const onDeletefromCart = (id) => {
    //     axios.delete(`https://62eba861705264f263dd8ccf.mockapi.io/cart/${id}`);
    console.log(id);

    setCardItems((prev) => prev.filter((item) => item.id !== id));
  };
  const onAdToCard = (obj) => {
    axios.post('https://62eba861705264f263dd8ccf.mockapi.io/cart', obj);
    setCardItems((prev) => [...prev, obj]);
    console.log(obj);
  };

  useEffect(() => {
    axios
      .get('https://62eba861705264f263dd8ccf.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get('https://62eba861705264f263dd8ccf.mockapi.io/cart')
      .then((res) => {
        setCardItems(res.data);
      });
  }, []);

  return (
    <div className='wrapper clear'>
      {cardOpened && (
        <Drawer
          items={cardItems}
          onRemove={onDeletefromCart}
          onClose={() => setCardOpened(false)}
        />
      )}
      <Header onClickCart={() => setCardOpened(true)} />

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
        <div className='d-flex flex-wrap  ml-20'>
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase()),
            )
            .map((item) => (
              <Card
                key={item.imageURL}
                title={item.title}
                price={item.price}
                imageURL={item.imageURL}
                onPlus={(obj) => onAdToCard(obj)}
                onFavorite={() => console.log('Добавили в закладки')}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
