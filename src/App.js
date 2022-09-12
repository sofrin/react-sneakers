//import Card from "./components/Card";
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FavoritesPage from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setsearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeSearchInput = (event) => {
    setsearchValue(event.target.value);
  };
  const onDeletefromCart = async (id) => {
    try {
      axios.delete(`https://62eba861705264f263dd8ccf.mockapi.io/cart/${id}`);

      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id)),
      );
    } catch (error) {
      alert('Ошибка при удалении из корзины');
    }
  };
  const onAdToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        await axios.delete(
          `https://62eba861705264f263dd8ccf.mockapi.io/favorites/${obj.id}`,
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          'https://62eba861705264f263dd8ccf.mockapi.io/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Что-то пошло не так ', error);
    }
  };
  const onAdToCard = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id),
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id)),
        );
        await axios.delete(
          `https://62eba861705264f263dd8ccf.mockapi.io/cart/${findItem.id}`,
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          'https://62eba861705264f263dd8ccf.mockapi.io/cart',
          obj,
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: item.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cartOpener = () => {
    setCartOpened(true);
    //     axios
    //       .get('https://62eba861705264f263dd8ccf.mockapi.io/cart')
    //       .then((res) => {
    //         setCartItems(res.data);
    //       });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get('https://62eba861705264f263dd8ccf.mockapi.io/cart'),
            axios.get('https://62eba861705264f263dd8ccf.mockapi.io/favorites'),
            axios.get('https://62eba861705264f263dd8ccf.mockapi.io/items'),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка загрузки товаров');
        console.error(error);
      }
    }
    fetchData();
  }, []);
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };
  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        setCartOpened,
        setCartItems,
        onAdToCard,
      }}
    >
      <div className='wrapper clear'>
        <Drawer
          items={cartItems}
          onRemove={onDeletefromCart}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />
        <Header onClickCart={cartOpener} />
        <Routes>
          <Route
            path='/'
            exact
            element={
              <Home
                cartItems={cartItems}
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
          <Route path='/orders' exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
