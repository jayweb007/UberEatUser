import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";

import { Restaurant, Dish } from "../../src/models";
import MenuItem from "../components/MenuItem";
import RestaurantDetailsHeader from "../components/RestaurantDetailsHeader";
import { useBasketContext } from "../contexts/BasketContext";

const RestaurantDetailScreen = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const {
    setRestaurant: setBasketRestaurant,
    basket,
    basketDishes,
  } = useBasketContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setBasketRestaurant(null);
    //fetch the restaurant with the id
    DataStore.query(Restaurant, id).then(setRestaurant);
    //fetch the dishes with the restaurantID
    DataStore.query(Dish, (dish) => dish.restaurantID("eq", id)).then(
      setDishes
    );
  }, [id]);

  useEffect(() => {
    setBasketRestaurant(restaurant);
  }, [restaurant]);

  //SCREEN LOADING
  if (!restaurant) {
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
        ListHeaderComponent={() => (
          <RestaurantDetailsHeader restaurant={restaurant} />
        )}
        data={dishes}
        renderItem={({ item }) => <MenuItem dish={item} />}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
      />
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={40}
        color="white"
        style={styles.arrow}
      />
      {basket && basketDishes.length > 0 ? (
        <Pressable
          onPress={() => navigation.navigate("Basket")}
          style={styles.basketButton}
        >
          <Text style={styles.buttonTitle}>
            Open basket &#8226; {basketDishes.length}
          </Text>
          {/* <Text style={styles.price}>{basketDishes?.length}</Text> */}
        </Pressable>
      ) : (
        <></>
      )}
    </View>
  );
};

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  restaurantContainer: {
    flex: 1,
    width: "100%",
  },
  arrow: {
    position: "absolute",
    top: 40,
    left: 10,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
  },

  price: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
    paddingLeft: 20,
  },
  buttonTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },

  basketButton: {
    alignItems: "center",
    padding: 20,
    marginTop: "auto",
    margin: 10,
    backgroundColor: "black",
  },
});
