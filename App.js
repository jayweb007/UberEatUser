import * as React from "react";
import { StyleSheet, View } from "react-native";
import RootNavigator from "./src/navigation";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";

import config from "./src/aws-exports";
import AuthContextProvider from "./src/contexts/AuthContext";
import BasketContextProvider from "./src/contexts/BasketContext";
import OrderContextProvider from "./src/contexts/OrderContext";

Amplify.configure({ ...config, Analytics: { disabled: true } });

function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <AuthContextProvider>
          <BasketContextProvider>
            <OrderContextProvider>
              <RootNavigator />
            </OrderContextProvider>
          </BasketContextProvider>
        </AuthContextProvider>

        <StatusBar style="light" />
      </View>
    </NavigationContainer>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // margin: 10,
  },
});
