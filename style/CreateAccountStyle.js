import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  headerItem: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  logoutIcon: {
    marginTop: 10,
    marginLeft: 25,
  },
  infoText: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 15,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    width: "90%", 
  },
});
