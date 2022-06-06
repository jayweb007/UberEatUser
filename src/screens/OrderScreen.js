import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import OrderList from "../components/OrderList";

import { useOrderContext } from "../contexts/OrderContext";

const OrderScreen = () => {
  const { orders } = useOrderContext();

  //
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderList order={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
