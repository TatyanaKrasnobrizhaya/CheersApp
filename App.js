<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CalculatorScreen from "./components/CalculatorScreen";
import SelectScreen from "./components/SelectScreen";
import MapsScreen from "./components/MapsScreen";
import UserScreen from "./components/UserScreen";
import ContactScreen from "./components/ContactScreen";
import LoginScreen from "./components/LoginScreen";
import CreateAccountScreen from "./components/CreateAccountScreen";
import RecipeScreen from "./components/RecipeTabNavigator";
import initializeCocktails from "./initializeCocktails";
import { View, Text } from "react-native";
=======
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
>>>>>>> 263df93ab4008336b5454c0d0ccead5c7dbbd356

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

<<<<<<< HEAD
const App = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hobby, setHobby] = useState("");
  const [favoriteDrink, setFavoriteDrink] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    initializeCocktails();
  }, []);

  const handleUserId = (userCredential) => {
    const userId = userCredential.user.uid; // Initialize userId after successful login
    console.log("User ID:", userId);
    setUserId(userId);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => (
            <LoginScreen
              {...props}
              handleUserId={handleUserId}
              userId={userId}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="CreateAccount" options={{ headerShown: false }}>
          {(props) => (
            <CreateAccountScreen
              {...props}
              handleUserId={handleUserId}
              userId={userId}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              name={name}
              setName={setName}
              age={age}
              setAge={setAge}
              hobby={hobby}
              setHobby={setHobby}
              favoriteDrink={favoriteDrink}
              setFavoriteDrink={setFavoriteDrink}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Main"
          options={{
            headerShown: false,
            headerTintColor: "#f43f5e", // Change header text color to pink
          }}
        >
          {(props) => (
            <MainTabNavigator
              {...props}
              userId={userId}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              name={name}
              setName={setName}
              age={age}
              setAge={setAge}
              hobby={hobby}
              setHobby={setHobby}
              favoriteDrink={favoriteDrink}
              setFavoriteDrink={setFavoriteDrink}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="COCKTAILS"
          component={RecipeScreen}
          options={{
            headerTitle: null,
            headerTintColor: "#000000",
          }}
        />
=======
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
>>>>>>> 263df93ab4008336b5454c0d0ccead5c7dbbd356
      </Stack.Navigator>
    </NavigationContainer>
  );
};

<<<<<<< HEAD
const MainTabNavigator = ({
  userId,
  email,
  setEmail,
  setPassword,
  password,
  profileImage,
  setProfileImage,
}) => (
  <Tab.Navigator
    initialRouteName="Select"
    screenOptions={({ route }) => ({
      // tabBarLabel: getTabLabel(route.name),
      tabBarVisible: route.state && route.state.index === 0,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Calculator") {
          iconName = focused ? "calculator" : "calculator-outline";
        } else if (route.name === "User") {
          iconName = focused ? "person" : "person-outline";
        } else if (route.name === "Contact") {
          iconName = focused ? "people" : "people-outline";
        } else if (route.name === "Maps") {
          iconName = focused ? "locate" : "locate-outline";
        } else if (route.name === "Select") {
          iconName = focused ? "apps" : "apps-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#f43f5e",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Calculator" component={CalculatorScreen} />
    <Tab.Screen
    options={{unmountOnBlur: true}} name="Select" component={SelectScreen} />
    <Tab.Screen name="Maps" component={MapsScreen} />
    <Tab.Screen name="Contact">
      {(props) => <ContactScreen {...props} userId={userId} />}
    </Tab.Screen>
    <Tab.Screen name="User">
      {(props) => (
        <UserScreen
          {...props}
          userId={userId}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
      )}
    </Tab.Screen>
  </Tab.Navigator>
);

export default App;
=======
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
>>>>>>> 263df93ab4008336b5454c0d0ccead5c7dbbd356
