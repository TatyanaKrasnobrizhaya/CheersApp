import React from "react";
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
import Coctails from "./screens/Coctails"; 

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

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Selection"
          component={MainTabs}
          options={{ headerShown: false }} // Hiding the navigation header
        />
        <Stack.Screen name="Cocktails" component={Coctails} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabs = () => {
  return (
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
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Tab.Screen
        name="Register"
        component={CreateAccount}
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Tab.Screen name="Selection" component={Selection} options={{ headerShown: false }}/>
      <Tab.Screen name="Calculator" component={Calculator} options={{ headerShown: false }}/>
      <Tab.Screen name="Maps" component={Maps} options={{ headerShown: false }}/>
      <Tab.Screen name="Contacts" component={Contacts} options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

export default App;
