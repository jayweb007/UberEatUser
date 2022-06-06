import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";

import { Dish } from "../models";
import { useBasketContext } from "../../src/contexts/BasketContext";

const DishDetailScreen = () => {
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const { addDishToBasket } = useBasketContext();

  //
  useEffect(() => {
    //fetch the dish with the id
    if (id) {
      DataStore.query(Dish, id).then(setDish);
    }
  }, [id]);

  const addToBasket = async () => {
    await addDishToBasket(dish, quantity);
    navigation.goBack();
  };

  const onMinus = () => {
    if (quantity > 1) {
      return setQuantity(quantity - 1);
    }
  };
  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  //SCREEN LOADING
  if (!dish) {
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
    <View style={styles.menuContainer}>
      <View style={styles.menuDetails}>
        <Text style={styles.title}>{dish?.name}</Text>
        <Text style={styles.subtitle}>{dish?.description}</Text>
      </View>

      <View style={styles.bottomLine} />
      <View style={styles.quantityContainer}>
        <AntDesign
          onPress={onMinus}
          name="minuscircleo"
          size={50}
          color="black"
          style={{ fontWeight: "bold" }}
        />
        <Text style={styles.quantityNumber}> {quantity} </Text>
        <AntDesign
          onPress={onPlus}
          name="pluscircleo"
          size={50}
          color="black"
          style={{ fontWeight: "bold" }}
        />
      </View>
      <Pressable onPress={addToBasket} style={styles.basketButton}>
        <Text style={styles.buttonTitle}>Add {quantity} to basket</Text>
        <Text style={styles.price}>
          ${(dish?.price * quantity).toFixed(2)}{" "}
        </Text>
      </Pressable>
    </View>
  );
};

export default DishDetailScreen;

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    paddingVertical: 50,
  },
  menuDetails: {
    flexDirection: "column",
    marginHorizontal: 15,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#525252",
    marginVertical: 5,
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
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "auto",
  },
  basketButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 15,
    marginHorizontal: 10,
  },
});
