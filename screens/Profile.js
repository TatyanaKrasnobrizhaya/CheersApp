import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "../style/ProfileStyle";
import { ImagePicker, Permissions } from "expo";
import { Picker } from "@react-native-picker/picker";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(null);
  const [hobbies, setHobbies] = useState("");
  const [favouriteDrinks, setFavouriteDrinks] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
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
    console.log("Favourite Drinks:", favouriteDrinks);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text>Add Photo</Text>
        )}
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
        <Text style={styles.label}>Age:</Text>
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
        <Text style={styles.label}>Favourite Drinks:</Text>
        <TextInput
          style={styles.input}
          value={favouriteDrinks}
          onChangeText={setFavouriteDrinks}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveData}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
