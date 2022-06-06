import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

const RestaurantDetailsHeader = ({ restaurant }) => {
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: restaurant?.image,
        }}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}> {restaurant?.name} </Text>

        <View style={styles.detailsBox}>
          <View style={styles.details}>
            <Text style={styles.subtitle}>
              ${restaurant?.deliveryFee.toFixed(2)} &#8226; {""}
              {restaurant?.minDeliveryTime}-{restaurant?.maxDeliveryTime} mins.
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.subtitle}>{restaurant?.rating.toFixed(1)}</Text>
            <Entypo name="star" size={14} color="gold" />
          </View>
        </View>
        <View style={styles.bottomLine} />
        <Text style={styles.menu}>MENU</Text>
      </View>
    </View>
  );
};

export default RestaurantDetailsHeader;

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
    fontSize: 35,
    fontWeight: "600",
    marginHorizontal: 10,
  },
  detailsBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#525252",
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: "grey",
    opacity: 0.4,
    backgroundColor: "lightgrey",
    marginVertical: 20,
  },
  menu: {
    color: "grey",
    fontWeight: "700",
    marginBottom: 20,
    letterSpacing: 0.5,
    marginHorizontal: 10,
  },
});
