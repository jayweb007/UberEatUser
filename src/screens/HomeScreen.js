import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { DataStore } from "aws-amplify";

import { Restaurant } from "../../src/models";
import RestaurantItem from "../components/RestaurantItem";

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    DataStore.query(Restaurant).then(setRestaurants);
    // DataStore.query(Restaurant).then((result) => setRestaurants(result))
  }, []);

  //SCREEN LOADING
  if (!restaurants) {
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
    <FlatList
      data={restaurants}
      renderItem={({ item }) => <RestaurantItem restaurant={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator="false"
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
