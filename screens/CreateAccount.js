import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Button,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { logout, signUp } from "../components/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../style/CreateAccountStyle";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";  //An age selection table can be made later. Where we will not enter the age but will SELECT it.

export default function Register({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [age, setAge] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [favoriteDrink, setFavoriteDrink] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const selectImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission to access media library is required!");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.cancelled && pickerResult.assets.length > 0) {
        const selectedAsset = pickerResult.assets[0]; // Get the first selected resource
        setPhoto(selectedAsset.uri); // Set the uri of the selected resource
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Failed to pick an image");
    }
  };

  const handlePressRegister = () => {
    if (!name) {
      Alert.alert("Name is required");
    } else if (!email) {
      Alert.alert("Email is required");
    } else if (!password) {
      Alert.alert("Password is required");
    } else if (!confirmPassword) {
      setPassword("");
      Alert.alert("Confirmation of password is required");
    } else if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
    } else {
      signUp(name, email, password, photo, age, hobbies, favoriteDrink);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setPhoto("");
          setAge("");
          setHobbies("");
          setFavoriteDrink("");
          // Navigation
        }
      });
    }
  };

  const handlePressLogout = () => {
    logout();
  };

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.header}> Create Account</Text>
          <Pressable style={styles.logoutIcon} onPress={handlePressLogout}>
            <MaterialIcons name="logout" size={24} color="black" />
          </Pressable>
        </View>
        <Text style={styles.infoText}>
          You are logged in. Go to your profile...
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.header}>Create Account</Text>
        </View>
        {photo ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: photo }} style={styles.image} />
          </View>
        ) : null}
        <TouchableOpacity style={styles.buttonStyle} onPress={selectImage}>
          <Text>Choose Photo</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              value={name}
              onChangeText={(name) => setName(name.trim())}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              value={email}
              onChangeText={(email) => setEmail(email.trim())}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.textInput}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(confirmPassword) =>
                setConfirmPassword(confirmPassword)
              }
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Age</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your age"
              value={age}
              onChangeText={(age) => setAge(age.trim())}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Hobbies</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your hobbies"
              value={hobbies}
              onChangeText={(hobbies) => setHobbies(hobbies)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Favorite Drink</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your favorite drink"
              value={favoriteDrink}
              onChangeText={(favoriteDrink) => setFavoriteDrink(favoriteDrink)}
            />
          </View>
        </View>

        <Pressable style={styles.buttonStyle}>
          <Button title="Register" onPress={handlePressRegister} />
        </Pressable>
        <Text style={styles.infoText}>Already have an account?</Text>
        <Pressable style={styles.buttonStyle}>
          <Button title="Login" onPress={() => navigation.navigate("Login")} />
        </Pressable>
      </View>
    );
  }
}
