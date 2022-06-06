import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BasketItem from "../components/BasketItem";
import { useBasketContext } from "../contexts/BasketContext";
import { useOrderContext } from "../contexts/OrderContext";

const MenuDetailScreen = () => {
  const { restaurant, basketDishes, totalPrice } = useBasketContext();
  const { createOrder } = useOrderContext();
  const navigation = useNavigation();

  const onCreateOrder = async () => {
    await createOrder();
    navigation.navigate("Your Orders");
  };

  const BasketHeader = () => {
    return (
      <>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>Your Items</Text>
      </>
    );
  };
  const BasketFooter = () => {
    return (
      <>
        <View style={styles.bottomLine} />
        <View style={styles.quantityContainer}>
          <Text style={{ ...styles.priceTotal, fontWeight: "700" }}>
            Subtotal
          </Text>
          <Text style={{ ...styles.priceTotal, fontWeight: "700" }}>
            ${(totalPrice - restaurant?.deliveryFee).toFixed(2)}{" "}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={{ ...styles.priceTotal, fontWeight: "700" }}>Total</Text>
          <Text style={{ ...styles.priceTotal, fontWeight: "700" }}>
            ${totalPrice.toFixed(2)}{" "}
          </Text>
        </View>
      </>
    );
  };

  //
  return (
    <View style={styles.menuContainer}>
      <FlatList
        ListHeaderComponent={() => <BasketHeader />}
        data={basketDishes}
        renderItem={({ item }) => <BasketItem basketDish={item} />}
        ListFooterComponent={() => <BasketFooter />}
      />

      <Pressable onPress={onCreateOrder} style={styles.basketButton}>
        <Text style={styles.buttonTitle}>Create Order</Text>
      </Pressable>
    </View>
  );
};

export default MenuDetailScreen;

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "700",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#525252",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  priceTotal: {
    fontSize: 16,
    fontWeight: "500",
    color: "#525252",
    marginVertical: 5,
  },
  price: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
  },
  buttonTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    paddingRight: 10,
  },
  quantityNumber: {
    fontSize: 25,
    fontWeight: "300",
    paddingHorizontal: 20,
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: "grey",
    opacity: 0.5,
    backgroundColor: "lightgrey",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  basketButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 15,
    marginHorizontal: 10,
    marginTop: "auto",
  },
});
