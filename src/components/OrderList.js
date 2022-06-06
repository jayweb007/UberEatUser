import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useOrderContext } from "../contexts/OrderContext";

const OrderList = ({ order }) => {
  const [totalItems, setTotalItems] = useState();
  const { getOrder } = useOrderContext();

  const navigation = useNavigation();

  useEffect(() => {
    getOrder(order?.id).then(setTotalItems);
  }, []);

  const onPress = () => {
    navigation.navigate("Order Details", { id: order.id });
  };
  return (
    <Pressable onPress={onPress} style={styles.orderBox}>
      <View style={styles.orderContainer}>
        <Image
          style={styles.image}
          source={{
            uri: order.Restaurant.image,
          }}
        />
        <View style={styles.contentBox}>
          <Text style={styles.title}> {order.Restaurant.name} </Text>
          <Text style={styles.subTitle}>
            {totalItems?.dishes.length} items &#8226; ${order.total.toFixed(2)}
          </Text>
          <Text style={styles.dateTime}>
            {order.createdAt} &#8226; {order.status}
          </Text>
        </View>
      </View>
      <View style={styles.bottomLine} />
    </Pressable>
  );
  ress;
};

export default OrderList;

const styles = StyleSheet.create({
  orderBox: {
    flexDirection: "column",
    // marginVertical: 15,
  },
  orderContainer: {
    flexDirection: "row",
  },
  contentBox: {
    flexDirection: "column",
    marginLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  subTitle: {
    flexDirection: "row",
    paddingVertical: 10,
    color: "grey",
    fontWeight: "600",
  },
  dateTime: {
    flexDirection: "row",
    color: "grey",
    fontWeight: "600",
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: "grey",
    opacity: 0.3,
    backgroundColor: "lightgrey",
    marginVertical: 20,
    // marginHorizontal: 20
  },
});
