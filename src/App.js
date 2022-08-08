import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [cardItems, setCardItems] = useState([]);

  const onDeletefronCart = (obj) => {
    console.log(obj);

    setCardItems((prev) => {
      const index = prev.indexOf(obj);
      console.log(index);
      prev.splice(index, 1);
      console.log(prev);
      return [...prev];
    });
  };
  const onAdToCard = (obj) => {
    setCardItems((prev) => [...prev, obj]);
    console.log(obj);
  };

  useEffect(() => {
    fetch("https://62eba861705264f263dd8ccf.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => setItems(json));
  }, []);

  const [cardOpened, setCardOpened] = useState(false);

  return (
    <div className="wrapper clear">
      {cardOpened && (
        <Drawer
          items={cardItems}
          onRemove={(obj) => onDeletefronCart(obj)}
          onClose={() => setCardOpened(false)}
        />
      )}
      <Header onClickCart={() => setCardOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кросовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap  ml-20">
          {items.map((item) => (
            <Card
              key={item.imageURL}
              title={item.title}
              price={item.price}
              imageURL={item.imageURL}
              onPlus={(obj) => onAdToCard(obj)}
              onFavorite={() => console.log("Добавили в закладки")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
