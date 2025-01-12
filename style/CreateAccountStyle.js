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
  header: {
    fontSize: 30,
    marginTop: 10,
    marginLeft: 10,
  },
  infoText: {
    flex: 1,
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

  textInput: {
    borderWidth: 1,
    borderColor: "#afafaf",
    width: "85%",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 10,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontWeight: "bold",
  },
  inputField: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});


