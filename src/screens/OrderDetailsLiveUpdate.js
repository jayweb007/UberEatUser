import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { DataStore } from "aws-amplify";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import { Driver, Order } from "../models";

const OrderDetailsLiveUpdate = ({ id }) => {
  const [order, setOrder] = useState(null);
  const [driver, setDriver] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    if (!id) {
      return;
    }
    DataStore.query(Order, id).then(setOrder);
  }, [id]);

  useEffect(() => {
    if (!order) {
      return;
    }
    const subscription = DataStore.observe(Order, order.id).subscribe((msg) => {
      if (msg.opType === "UPDATE") {
        setOrder(msg.element);
      }
    });

    return () => subscription.unsubscribe();
  }, [order]);

  useEffect(() => {
    if (!order?.orderDriverId) {
      return;
    }
    DataStore.query(Driver, order?.orderDriverId).then(setDriver);
  }, [order?.orderDriverId]);

  useEffect(() => {
    if (driver?.lat && driver?.lng) {
      mapRef.current?.animateToRegion({
        latitude: driver?.lat,
        longitude: driver?.lng,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      });
    }
  }, [driver?.lat, driver?.lng]);

  useEffect(() => {
    if (!driver) {
      return;
    }
    const subscription = DataStore.observe(Driver, driver.id).subscribe(
      (msg) => {
        if (msg.opType === "UPDATE") {
          setDriver(msg.element);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [driver]);

  //SCREEN LOADING
  if (!order) {
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
    <View>
      <Text style={{}}> Status: {order.status || "loading"} </Text>
      <MapView style={styles.map} ref={mapRef} showsUserLocation>
        {driver?.lat && (
          <Marker
            title={`Courier:  ${driver.name}`}
            description={`Transportation Mode:  ${driver.transportationMode}`}
            coordinate={{
              latitude: driver.lat,
              longitude: driver.lng,
            }}
          >
            {driver.transportationMode === "BIKE" ? (
              <View
                style={{
                  backgroundColor: "green",
                  padding: 5,
                  borderRadius: 20,
                }}
              >
                <FontAwesome5 name="motorcycle" size={24} color="white" />
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: "green",
                  padding: 5,
                  borderRadius: 20,
                }}
              >
                <FontAwesome name="automobile" size={24} color="white" />
              </View>
            )}
          </Marker>
        )}
      </MapView>
    </View>
  );
};

export default OrderDetailsLiveUpdate;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
