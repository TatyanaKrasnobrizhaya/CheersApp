import { StyleSheet, Dimensions } from "react-native"; 
import Constants from "expo-constants"; 

export default StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - Constants.statusBarHeight,
  },
});
