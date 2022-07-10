import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Basket, BasketDish } from "../../src/models";

import { useAuthContext } from "../contexts/AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();

  const [restaurant, setRestaurant] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketDishes, setBasketDishes] = useState([]);

  const totalPrice = basketDishes.reduce(
    (sum, basketDish) => sum + basketDish.quantity * basketDish.Dish.price,
    restaurant?.deliveryFee
  );

  useEffect(() => {
    //fetch Basket from DataStore and save in useState
    DataStore.query(Basket, (b) =>
      b.userID("eq", dbUser?.id).restaurantID("eq", restaurant?.id)
    ).then((baskets) => setBasket(baskets[0]));
  }, [dbUser, restaurant]);

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketDish, (bd) => bd.basketID("eq", basket.id)).then(
        setBasketDishes
      );
    }
  }, [basket]);

  const addDishToBasket = async (dish, quantity) => {
    // get the existing basket or create a new one
    const newBasket = basket || (await createNewBasket());

    // create a BasketDish Item and save to DataStore
    const result = await DataStore.save(
      new BasketDish({
        basketID: newBasket?.id,
        Dish: dish,
        quantity,
      })
    );
    setBasketDishes([...basketDishes, result]);
    return result;
  };

  const createNewBasket = async () => {
    const response = await DataStore.save(
      new Basket({
        userID: dbUser?.id,
        restaurantID: restaurant?.id,
      })
    );
    setBasket(response);
    return response;
  };

  const removeDishFromBasket = async (id) => {
    // reduce Quantity by 1
    const result = await DataStore.delete(BasketDish, (dish) =>
      dish.id("eq", id)
    );

    //updating basketDishes for fast UI display
    const updated = basketDishes.filter((res) => res.id !== id);
    setBasketDishes(updated);

    return result;
  };

  //
  return (
    <BasketContext.Provider
      value={{
        addDishToBasket,
        removeDishFromBasket,
        setRestaurant,
        restaurant,
        basketDishes,
        basket,
        totalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
