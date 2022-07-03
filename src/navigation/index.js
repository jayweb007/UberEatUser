import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Foundation, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import RestaurantDetailScreen from "../screens/RestaurantDetailScreen";
import OrderScreen from "../screens/OrderScreen";
import AccountScreen from "../screens/AccountScreen";
import BasketScreen from "../screens/BasketScreen";
import DishDetailScreen from "../screens/DishDetailScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import { useAuthContext } from "../contexts/AuthContext";
import OrderDetailsNavigator from "./OrderDetailsNavigator";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { dbUser } = useAuthContext();
  return (
    <Stack.Navigator>
      {dbUser ? (
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen name="Profile" component={AccountScreen} />
      )}
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Home"
        component={HomeStacks}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="home" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderStacks}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="list-alt" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStacks = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Restaurants" component={HomeScreen} />
      <HomeStack.Screen
        name="Restaurant"
        component={RestaurantDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Dish" component={DishDetailScreen} />
      <HomeStack.Screen name="Basket" component={BasketScreen} />
    </HomeStack.Navigator>
  );
};

const OrderStack = createNativeStackNavigator();

const OrderStacks = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen name="Orders" component={OrderScreen} />
      <OrderStack.Screen
        name="Order Details"
        component={OrderDetailsNavigator}
        options={{
          headerShown: true,
        }}
      />
    </OrderStack.Navigator>
  );
};

export default RootNavigator;
