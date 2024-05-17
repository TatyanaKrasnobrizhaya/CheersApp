import { Alert } from 'react-native';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, USERS_REF } from '../firebase/Config';

export const signUp = async (nickname, email, password, photo, age, hobbies, favoriteDrink) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    await setDoc(doc(db, USERS_REF, userId), {
      nickname: nickname,
      email: email,
      photo: photo,
      age: age,
      hobbies: hobbies,
      favoriteDrink: favoriteDrink
    });

    console.log("User registered successfully.");
  } catch (error) {
    console.error("Registration failed.", error.message);
    Alert.alert("Registration failed. " + error.message);
  }
}

export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    console.log("Logged in successfully.");
  })
  .catch((error) => {
    console.log("Login failed. " + error.message);
    Alert.alert("Login failed. " + error.message);
  })
}

export const logout = async () => {
  await signOut(auth)
  .then(() => {
    console.log("Logged out successfully.");
  })
  .catch((error) => {
    console.log("Logout failed. " + error.message);
    Alert.alert("Logout failed. " + error.message);
  })
}