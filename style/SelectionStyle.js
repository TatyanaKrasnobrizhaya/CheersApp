import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  drinkContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  drinkItem: {
    width: 80,
    height: 80,
    margin: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  selectedDrink: {
    borderColor: "blue",
  },
  drinkImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dateTimeLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: 'silver',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 20,
  },
});
