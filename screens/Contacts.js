import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image } from "react-native";
import styles from "../style/ContactsStyle";

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState([
    { id: "1", name: "John", image: require("../assets/Logo-.png") },
    { id: "2", name: "Alice", image: require("../assets/Logo-.png") },
    { id: "3", name: "Bob", image: require("../assets/Logo-.png") },
  ]);

  const renderFriendItem = ({ item }) => (
    <View style={styles.friendItem}>
      <Image source={item.image} style={styles.friendImage} />
      <Text>{item.name}</Text>
    </View>
  );

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for a friend</Text>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Text style={styles.title}>Your friends:</Text>
      <FlatList
        data={filteredFriends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Contacts;
