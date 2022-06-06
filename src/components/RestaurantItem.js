import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation} from "@react-navigation/native";


const RestaurantItem = ({ restaurant }) => {
  const navigation = useNavigation()
  const onPress = ()=>{
    navigation.navigate("Restaurant", {id: restaurant?.id})
  }
  //
  return (
    <Pressable onPress={onPress} style={styles.restaurantContainer}> 
      <Image
        style={styles.image}
        source={{
          uri: restaurant.image,
        }}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>${(restaurant.deliveryFee).toFixed(2)} &#8226; {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} mins.</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{(restaurant.rating).toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
  restaurantContainer:{
    width: "100%",
    marginBottom: 20
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    marginHorizontal: 10
  },
  details: {
    flexDirection: "column",
    marginRight: "auto",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 17,
    color: "#525252",
  },
  rating: {
    fontSize: 14,
    fontWeight: "500",
  },
  ratingContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: "lightgrey",
  },
});
