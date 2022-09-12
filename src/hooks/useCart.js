import { useContext } from 'react';
import AppContext from '../context';

export const useCart = () => {
  const { setCartItems, cartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce(
    (sum, obj) => parseInt(obj.price) + sum,
    0,
  );
  return { setCartItems, cartItems, totalPrice };
};
