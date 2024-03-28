import { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Button, Pressable, Image } from 'react-native';
import { logout, signIn } from '../components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../style/style';
import { useNavigation } from '@react-navigation/native'; // useNavigation

export default function Login() {
  const navigation = useNavigation(); // Retrieving a navigation object
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handlePressLogin = () => {
    if (!email) {
      Alert.alert('Email is required');
    } else if (!password) {
      Alert.alert('Password is required');
    } else {
      signIn(email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setEmail('');
          setPassword('');
          navigation.navigate('Selection'); //screen  Selection
        }
      });
    }
  }

  const handlePressLogout = () => {
    logout();
  }

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.header}> Login</Text>
          <Pressable style={styles.logoutIcon} onPress={handlePressLogout}>
            <MaterialIcons name="logout" size={24} color="black" />
          </Pressable>
        </View>
        <Text style={styles.infoText}>
          You are logged in.
        </Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.header}>Login</Text>
        </View>
        <View style={styles.photoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.photo}
          />
        </View>
        <Text style={styles.infoText}>Login to your account</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email"
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Login"
            onPress={handlePressLogin}
          />
        </Pressable>
        <Text style={styles.infoText}>Not having account yet? Create your cheer with me account and start meeting your friend for a drink!</Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </Pressable>
      </View>
    )
  }
}
