import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import OrderItem from "../components/OrderItem";
import OrderDetailHeader from "../components/OrderDetailHeader";
import { useOrderContext } from "../contexts/OrderContext";

const OrderDetailScreen = ({ id }) => {
  const [order, setOrder] = useState();
  const { getOrder } = useOrderContext();

  const navigation = useNavigation();

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, []);

  //SCREEN LOADING
  if (!order) {
    return (
      <ActivityIndicator
        size={"large"}
        color="grey"
        style={{ paddingTop: 400 }}
      />
    );
  }

  //
  return (
    <View style={styles.restaurantContainer}>
      <FlatList
        ListHeaderComponent={() => <OrderDetailHeader order={order} />}
        data={order.dishes}
        renderItem={({ item }) => <OrderItem dish={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={40}
        color="white"
        style={styles.arrow}
      />
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  restaurantContainer: {
    width: "100%",
    // marginVertical: 10,
  },
  arrow: {
    position: "absolute",
    top: 40,
    left: 10,
  },
});
