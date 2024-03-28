import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCl_18oHGS77Gl5xD-DYgEB5y0HxVPDFaM",
    authDomain: "cheers-5f321.firebaseapp.com",
    projectId: "cheers-5f321",
    storageBucket: "cheers-5f321.appspot.com",
    messagingSenderId: "1078943311982",
    appId: "1:1078943311982:web:43564adcb535e7032e1e7f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = getAuth();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export { auth };

export const db = getFirestore(app);
export const USERS_REF = 'users';
export const TODOS_REF = 'todos';