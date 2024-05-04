import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { db, auth, storage } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { moderateScale } from "../Metrics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";

const UserScreen = ({
  userId,
  email,
  setEmail,
  password,
  setPassword,
  profileImage,
  setProfileImage,
}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [profileImageURL, setProfileImageURL] = useState(null);

  const userRef = collection(db, "user");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(userRef);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const currentUserData = data.filter((user) => user.id === userId);
        setUserData(currentUserData);
        setEditedUserData({
          ...currentUserData[0],
          profileImage: currentUserData[0].profileImage,
        });

        if (currentUserData[0].profileImage) {
          // Use the profile image URL from Firestore
          setProfileImageURL(currentUserData[0].profileImage);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleSave = async () => {
    try {
      const user = auth.currentUser; // Get the currently authenticated user

      // Check if the user is authenticated
      if (!user) {
        console.error("User is not authenticated.");
        return;
      }

      // Validate input fields
      if (!editedUserData.name.trim()) {
        Alert.alert("Name field is required. Please fill in your name.");
        return;
      }

      // Update user data in Firestore
      const userDocRef = doc(db, "user", editedUserData.id);
      await updateDoc(userDocRef, editedUserData);

      setUserData([editedUserData]);
      setEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error.code, error.message);
      // Provide more specific error messages based on the error code
      if (error.code === "auth/wrong-password") {
        Alert.alert("Invalid old password. Please try again.");
      } else {
        Alert.alert("Error updating user data. Please try again later.");
      }
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (key, value) => {
    setEditedUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContent}
        extraScrollHeight={Platform.select({ ios: 50, android: 0 })}
        enableOnAndroid={true}
      >
        <View style={styles.userContainer}>
          {loading ? (
            <Text>Loading user data...</Text>
          ) : userData && userData.length > 0 ? (
            <>
              <View style={styles.profileImageContainer}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: profileImageURL,
                  }}
                />
              </View>

              <Text style={styles.userInfo}>Name:</Text>
              <TextInput
                style={styles.userInfo1}
                value={editing ? editedUserData.name : userData[0].name}
                onChangeText={(text) => handleChange("name", text)}
                placeholder="Enter new name"
                editable={editing}
              />
              <Text style={styles.userInfo}>Age:</Text>
              <TextInput
                style={styles.userInfo1}
                value={
                  editing
                    ? editedUserData.age.toString()
                    : userData[0].age.toString()
                }
                onChangeText={(text) => handleChange("age", parseInt(text))}
                keyboardType="number-pad"
                placeholder="Enter new age"
                editable={editing}
              />

              <Text style={styles.userInfo}>Hobby:</Text>
              <TextInput
                style={styles.userInfo1}
                value={editing ? editedUserData.hobby : userData[0].hobby}
                onChangeText={(text) => handleChange("hobby", text)}
                placeholder="Enter new hobby"
                editable={editing}
              />

              <Text style={styles.userInfo}>Favorite Drink:</Text>
              <TextInput
                style={styles.userInfo1}
                value={
                  editing
                    ? editedUserData.favoriteDrink
                    : userData[0].favoriteDrink
                }
                onChangeText={(text) => handleChange("favoriteDrink", text)}
                placeholder="Enter new favorite drink"
                editable={editing}
              />
              {editing && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setEditing(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
              {!editing && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={handleEdit}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <Text>No user data found.</Text>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  userContainer: {
    marginBottom: moderateScale(5),
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: moderateScale(40),
  },
  button: {
    backgroundColor: "#f43f5e",
    width: moderateScale(200),
    borderWidth: moderateScale(1),
    borderColor: "#f43f5e",
    alignItems: "center",
    paddingVertical: moderateScale(7),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  userInfo: {
    marginBottom: moderateScale(5),
    marginTop: moderateScale(17),
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "#4b4545",
  },
  userInfo1: {
    height: moderateScale(35),
    width: moderateScale(250),
    borderColor: "#f5b5bf",
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(8),
    borderWidth: moderateScale(1),
    justifyContent: "center",
    borderRadius: moderateScale(10),
    color: "#4b4545",
  },
  profileImage: {
    width: moderateScale(85),
    height: moderateScale(85),
    borderRadius: moderateScale(50),
    marginBottom: moderateScale(10),
    marginTop: moderateScale(20),
  },
  profileImageContainer: {
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    marginBottom: moderateScale(20),
    marginTop: moderateScale(20),
  },
  scrollViewContent: {
    paddingTop: moderateScale(2),
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    alignSelf: "center",
  },
});

export default UserScreen;