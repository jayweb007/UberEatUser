import React from "react";
import { StyleSheet, Text, View } from "react-native";

const OrderItem = ({ dish }) => {
  //
  return (
    <View style={styles.box}>
      <View style={styles.quantityContainer}>
        <View style={styles.titleBox}>
          <Text style={styles.subTitle}>{dish.quantity}</Text>
          <Text style={styles.title}>{dish.Dish.name}</Text>
        </View>
        <Text style={styles.priceTotal}>${dish.Dish.price.toFixed(2)} </Text>
      </View>
      <View style={styles.bottomLine} />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    flexDirection: "column",
    marginHorizontal: 20,
  },
  titleBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "600",
    padding: 8,
    marginRight: 10,
    backgroundColor: "lightgrey",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  priceTotal: {
    fontSize: 16,
    fontWeight: "500",
    color: "#525252",
    marginVertical: 5,
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: "grey",
    opacity: 0.2,
    backgroundColor: "lightgrey",
    marginVertical: 15,
  },
});
