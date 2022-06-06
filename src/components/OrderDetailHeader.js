import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const OrderDetailHeader = ({ order }) => {
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: order.Restaurant.image,
        }}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}> {order.Restaurant.name} </Text>
        <View style={styles.details}>
          <Text style={styles.subtitle}>
            {order.status} &#8226; {order.createdAt}{" "}
          </Text>
        </View>
        <Text style={styles.menu}>Your orders</Text>
      </View>
    </View>
  );
};

export default OrderDetailHeader;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
    marginHorizontal: 10,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },

  subtitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "grey",
    paddingVertical: 10,
  },
  menu: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    letterSpacing: 0.5,
    marginHorizontal: 10,
  },
});
