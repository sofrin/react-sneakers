//import Card from "./components/Card";
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  const [items, setItems] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [searchValue, setsearchValue] = useState('');
  const [cardOpened, setCardOpened] = useState(false);
  const [Favorites, setFavorites] = useState([]);
  Favorites;
  const onAdToFavorite = (obj) => {
    axios.post('https://62eba861705264f263dd8ccf.mockapi.io/favorites', obj);
    setFavorites((prev) => [...prev, obj]);
    console.log(obj);
  };
  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setsearchValue(event.target.value);
  };
  const onDeletefromCart = (id) => {
    axios.delete(`https://62eba861705264f263dd8ccf.mockapi.io/cart/${id}`);
    console.log(id);

    setCardItems((prev) => prev.filter((item) => item.id !== id));
  };
  const onAdToCard = (obj) => {
    axios.post('https://62eba861705264f263dd8ccf.mockapi.io/cart', obj);
    setCardItems((prev) => [...prev, obj]);
    console.log(obj);
  };
  const cartOpener = () => {
    setCardOpened(true);
    axios
      .get('https://62eba861705264f263dd8ccf.mockapi.io/cart')
      .then((res) => {
        setCardItems(res.data);
      });
  };
  useEffect(() => {
    axios
      .get('https://62eba861705264f263dd8ccf.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
      });
    //     axios
    //       .get('https://62eba861705264f263dd8ccf.mockapi.io/cart')
    //       .then((res) => {
    //         setCardItems(res.data);
    //       });
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
      <Header onClickCart={cartOpener} />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setsearchValue={setsearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAdToFavorite={onAdToFavorite}
              onAdToCard={onAdToCard}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
