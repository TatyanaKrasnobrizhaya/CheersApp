import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image } from "react-native";
import styles from "../style/CoctailsStyle";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FavoriteCoctails from "../screens/FavoriteCoctails";


const Coctails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coctails, setCoctails] = useState([
    { id: "1", name: "Mojito", image: require("../assets/Logo-.png") },
    { id: "2", name: "Martini", image: require("../assets/Logo-.png") },
    { id: "3", name: "Margarita", image: require("../assets/Logo-.png") },
  ]);

  const renderCoctailItem = ({ item }) => (
    <View style={styles.coctailItem}>
      <Image source={item.image} style={styles.coctailImage} />
      <Text>{item.name}</Text>
    </View>
  );

  const filteredCoctails = coctails.filter((coctail) =>
    coctail.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for a cocktail</Text>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredCoctails}
        renderItem={renderCoctailItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const CoctailsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Coctails" component={Coctails} />
      <Tab.Screen name="FavoriteCoctails" component={FavoriteCoctails} />
    </Tab.Navigator>
  );
};

export default CoctailsNavigator;




