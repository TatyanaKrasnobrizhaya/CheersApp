import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./screens/Login";
import CreateAccount from "./screens/CreateAccount";
import Calculator from "./screens/Calculator";
import Selection from "./screens/Selection";
import Maps from "./screens/Maps";
import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "black",
    background: "white",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => null,
          tabBarActiveTintColor: "steelblue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Login"
          component={Login}
          options={{ tabBarStyle: { display: "none" } }}
        />
        <Tab.Screen
          name="Register"
          component={CreateAccount}
          options={{ tabBarStyle: { display: "none" } }}
        />
        <Tab.Screen name="Selection" component={Selection} />

        <Tab.Screen name="Calculator" component={Calculator} />
        <Tab.Screen name="Maps" component={Maps} />
        <Tab.Screen name="Contacts" component={Contacts} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
