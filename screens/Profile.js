import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../style/ProfileStyle";
import { Permissions } from "expo";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"; // Importing a swipeable navigation component
import Journey from "../screens/Journey";
import * as ImagePicker from 'expo-image-picker';


const Tab = createMaterialTopTabNavigator(); // Creating a swipeable navigation component

const Profile = () => {
  const navigation = useNavigation(); // Using the navigation function

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(null);
  const [hobbies, setHobbies] = useState("");
  const [favoriteDrink, setFavoriteDrink] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Permission to access camera roll is required!');
      }
    };

    getPermission();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const saveData = () => {
    // save data
    console.log("Name:", name);
    console.log("Password:", password);
    console.log("Age:", age);
    console.log("Hobbies:", hobbies);
    console.log("Favorite Drinks:", favoriteDrink);
    // Navigating to the Journey screen
    navigation.navigate("Journey");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text>Add Photo</Text>
        )}
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={image ? selectImage : pickImage}>
        <Text>{image ? "Choose Another Photo" : "Choose Photo"}</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.ageLabel}>Age:</Text>
        <Picker
          selectedValue={age}
          style={styles.picker}
          onValueChange={(itemValue) => setAge(itemValue)}
        >
          <Picker.Item label="Select your age" value={null} />
          {Array.from({ length: 83 }, (_, i) => i + 18).map((age) => (
            <Picker.Item key={age} label={`${age}`} value={age} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hobbies:</Text>
        <TextInput
          style={styles.input}
          value={hobbies}
          onChangeText={setHobbies}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Favorite Drinks:</Text>
        <TextInput
          style={styles.input}
          value={favoriteDrink}
          onChangeText={setFavoriteDrink}
        />
      </View>
    </View>
  );
};

const ProfileWithTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true,
      }}
    >
      <Tab.Screen name="ViewProfile" component={Profile} />
      <Tab.Screen name="Journey" component={Journey} />
    </Tab.Navigator>
  );
};

export default ProfileWithTabs;
