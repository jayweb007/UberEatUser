import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import OrderDetailsLiveUpdate from "../screens/OrderDetailsLiveUpdate";

const Tab = createMaterialTopTabNavigator();

const OrderDetailsNavigator = ({ route }) => {
  const id = route?.params?.id;

  //
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "lightgrey" },
      }}
    >
      <Tab.Screen name="Details">
        {() => <OrderDetailScreen id={id} />}
      </Tab.Screen>
      <Tab.Screen name="Updates">
        {() => <OrderDetailsLiveUpdate id={id} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default OrderDetailsNavigator;
