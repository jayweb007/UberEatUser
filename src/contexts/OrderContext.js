import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderDish, Basket } from "../../src/models";
import { useBasketContext } from "./BasketContext";
import { useAuthContext } from "./AuthContext";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const { totalPrice, restaurant, basketDishes, basket } = useBasketContext();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    DataStore.query(Order, (o) => o.userID("eq", dbUser?.id)).then(setOrders);
  }, [dbUser]);

  const createOrder = async () => {
    // create order
    const newOrder = await DataStore.save(
      new Order({
        userID: dbUser?.id,
        total: totalPrice,
        status: "NEW",
        Restaurant: restaurant,
      })
    );

    // add all basketDishes to the order
    await Promise.all(
      basketDishes.map((basketDish) =>
        DataStore.save(
          new OrderDish({
            orderID: newOrder.id,
            quantity: basketDish.quantity,
            Dish: basketDish.Dish,
          })
        )
      )
    );

    // delete basket
    await DataStore.delete(basket);

    setOrders([...orders, newOrder]);
  };

  const getOrder = async (id) => {
    const order = await DataStore.query(Order, id);
    const orderDishes = await DataStore.query(OrderDish, (od) =>
      od.orderID("eq", id)
    );

    return { ...order, dishes: orderDishes };
  };

  //
  return (
    <OrderContext.Provider value={{ createOrder, orders, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
