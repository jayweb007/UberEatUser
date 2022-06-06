import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

import {useNavigation} from "@react-navigation/native";
const MenuItem = ({ dish }) => {
  const navigation = useNavigation()

  const onPress = ()=>{
    navigation.navigate("Dish", {id: dish?.id })
  }

  //
  return (
    <View style={styles.menuContainer}>
      <Pressable onPress={onPress} style={{ flexDirection: "row" }}>
        <View style={styles.menuDetails}>
          <Text style={styles.title}>{dish?.name}</Text>
          <Text style={styles.subtitle}>{dish?.description}</Text>
          <Text style={styles.price}>${dish?.price.toFixed(2)}</Text>
        </View>
        {dish?.image && <Image
          style={styles.image}
          source={{
            uri: dish?.image,
          }}
        />}
      </Pressable>
      <View style={styles.bottomLine} />
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "column",
    marginHorizontal: 15,
  },
  menuDetails: {
    flexDirection: "column",
    marginRight: "auto",
    paddingRight: 90
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "#525252",
    marginVertical: 5,
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
  },
  image: {
    width: 80,
    height: 80,
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: "grey",
    opacity: 0.3,
    backgroundColor: "lightgrey",
    marginVertical: 20,
  },
});
