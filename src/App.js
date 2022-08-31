//import Card from "./components/Card";
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FavoritesPage from './pages/Favorites';
import AppContext from './context';

function App() {
  const [items, setItems] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [searchValue, setsearchValue] = useState('');
  const [cardOpened, setCardOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setsearchValue(event.target.value);
  };
  const onDeletefromCart = (id) => {
    axios.delete(`https://62eba861705264f263dd8ccf.mockapi.io/cart/${id}`);
    console.log(id);
    setCardItems((prev) => prev.filter((item) => item.id !== id));
  };
  const onAdToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://62eba861705264f263dd8ccf.mockapi.io/favorites/${obj.id}`,
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          'https://62eba861705264f263dd8ccf.mockapi.io/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
        console.log(data);
      }
    } catch (error) {
      alert('Что-то пошло не так ', error);
    }
  };
  const onAdToCard = (obj) => {
    try {
      if (cardItems.find((item) => item.id === obj.id)) {
        axios.delete(
          `https://62eba861705264f263dd8ccf.mockapi.io/cart/${obj.id}`,
        );
        setCardItems((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        console.log(obj);

        axios.post('https://62eba861705264f263dd8ccf.mockapi.io/cart', obj);
        setCardItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cartOpener = () => {
    setCardOpened(true);
    //     axios
    //       .get('https://62eba861705264f263dd8ccf.mockapi.io/cart')
    //       .then((res) => {
    //         setCardItems(res.data);
    //       });
  };
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get(
        'https://62eba861705264f263dd8ccf.mockapi.io/cart',
      );
      const favoritesResponse = await axios.get(
        'https://62eba861705264f263dd8ccf.mockapi.io/favorites',
      );
      const itemsResponse = await axios.get(
        'https://62eba861705264f263dd8ccf.mockapi.io/items',
      );
      setIsLoading(false);
      setCardItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);
  const isItemAdded = (id) => {
    console.log(id);
    return cardItems.some((obj) => Number(obj.id) === Number(id));
  };
  return (
    <AppContext.Provider value={{ items, cardItems, favorites, isItemAdded }}>
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
            exact
            element={
              <Home
                cardItems={cardItems}
                items={items}
                searchValue={searchValue}
                setsearchValue={setsearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAdToFavorite={onAdToFavorite}
                onAdToCard={onAdToCard}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path='/favorites'
            exact
            element={<FavoritesPage onAdToFavorite={onAdToFavorite} />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
