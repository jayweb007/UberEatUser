import React, { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../src/models";
import { useAuthContext } from "../contexts/AuthContext";

const AccountScreen = () => {
  const { dbUser, setDbUser, sub } = useAuthContext();

  const [name, setName] = useState(dbUser?.name || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "0");
  const [lng, setLng] = useState(dbUser?.lng + "" || "0");

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
  };

  const updateUser = async () => {
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.name = name;
          updated.address = address;
          updated.sub = sub;
          updated.lat = parseFloat(lat);
          updated.lng = parseFloat(lng);
        })
      );

      setDbUser(user);

      Alert.alert("Profile Updated Successfully!");
    } catch (e) {
      Alert.alert("Oopss!", e.message);
    }
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(
        new User({
          name,
          address,
          sub,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        })
      );

      setDbUser(user);
    } catch (e) {
      Alert.alert("Oopss!", e.message);
    }
  };

  //SCREEN LOADING
  if (!dbUser) {
    return (
      <ActivityIndicator
        size={"large"}
        color="grey"
        style={{ paddingTop: 400 }}
      />
    );
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={lng}
        onChangeText={setLng}
        placeholder="Longitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <Button onPress={onSave} title="Save" />
      <Button onPress={() => Auth.signOut()} title="Sign Out" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
});

export default AccountScreen;
