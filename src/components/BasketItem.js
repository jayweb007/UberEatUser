import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useBasketContext } from "../contexts/BasketContext";

const BasketItem = ({ basketDish }) => {
  const { removeDishFromBasket, basketDishes } = useBasketContext();
  const navigation = useNavigation();

  const removeDish = async () => {
    await removeDishFromBasket(basketDish?.id);
    // navigation.goBack();
  };
  //
  return (
    <TouchableOpacity onPress={removeDish} style={styles.quantityContainer}>
      <View style={styles.titleBox}>
        <Text style={styles.subTitle}>{basketDish?.quantity}</Text>
        <Text style={styles.title}>{basketDish?.Dish?.name}</Text>
      </View>
      <Text style={styles.priceTotal}>
        ${basketDish?.Dish?.price.toFixed(2)}{" "}
      </Text>
    </TouchableOpacity>
  );
};

export default BasketItem;

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
  },
  titleBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "600",
    padding: 5,
    marginRight: 10,
    backgroundColor: "lightgrey",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#525252",
  },
  priceTotal: {
    fontSize: 16,
    fontWeight: "500",
    color: "#525252",
    marginVertical: 5,
  },
});
