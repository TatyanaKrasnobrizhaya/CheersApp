import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "space-around",
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
  photoContainer: {
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoText: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 15,
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    width: "90%",
  },
});
