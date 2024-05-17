import React, { useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import styles from "../style/FavoriteCoctailsStyle";

const FavoriteCoctails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coctails, setCoctails] = useState([
    { id: "1", name: "Mojito", image: require("../assets/Logo-.png") },
    { id: "2", name: "Martini", image: require("../assets/Logo-.png") },
    { id: "3", name: "Margarita", image: require("../assets/Logo-.png") },
  ]);

  // Filter cocktails based on search query
  const filteredCoctails = coctails.filter(coctail =>
    coctail.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render individual cocktail item
  const renderCoctailItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My favourite cocktails</Text>
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

export default FavoriteCoctails;

