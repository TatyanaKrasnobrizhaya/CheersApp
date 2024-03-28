import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Platform,
  DatePickerAndroid,
  TimePickerAndroid,
} from "react-native";
import styles from "../style/SelectionStyle"; 
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Selection() {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("Pick start date and time");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedValue) => {
    const current = selectedValue || selectedDateTime;
    setShow(Platform.OS === "ios");
    if (mode === "date") {
      handleDate(current);
    } else {
      handleTime(current);
    }
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleDate = (current) => {
    let newDate =
      current.getDate() +
      "." +
      (current.getMonth() + 1) +
      "." +
      current.getFullYear();
    if (startDate === "") {
      setStartDate(newDate);
    } else {
      if (isValidEndDay(newDate)) {
        setEndDate(newDate);
      } else {
        setStatus("Ends must be before starts");
      }
    }
  };

  const handleTime = (current) => {
    let hours = current.getHours().toString();
    let minutes = current.getMinutes().toString();
    if (hours.length === 1) {
      hours = "0" + hours;
    }
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }
    let newTime = hours + ":" + minutes;
    if (startTime === "") {
      setStartTime(newTime);
      setStatus("Pick end day and time");
    } else {
      if (isValidEndTime(newTime)) {
        setEndTime(newTime);
        setStatus("Well done!");
      } else {
        setStatus("Ends must be after starts");
      }
    }
  };

  const clearAll = () => {
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setStatus("Pick start date and time");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const isValidEndDay = (newDate) => {
    let start = startDate.split(".");
    let end = newDate.split(".");
    if (parseInt(end[2]) < parseInt(start[2])) {
      return false;
    } else if (
      parseInt(end[2]) === parseInt(start[2]) &&
      parseInt(end[1]) < parseInt(start[1])
    ) {
      return false;
    } else if (
      parseInt(end[2]) === parseInt(start[2]) &&
      parseInt(end[1]) === parseInt(start[1]) &&
      parseInt(end[0]) < parseInt(start[0])
    ) {
      return false;
    } else {
      return true;
    }
  };

  const isValidEndTime = (newTime) => {
    if (startDate === endDate) {
      let start = startTime.split(":");
      let end = newTime.split(":");
      if (parseInt(end[0]) < parseInt(start[0])) {
        return false;
      } else if (
        parseInt(end[0]) === parseInt(start[0]) &&
        parseInt(end[1]) <= parseInt(start[1])
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  // click for photo
  const drinks = [
    { id: 1, image: require("../assets/logo.png") },
    { id: 2, image: require("../assets/logo.png") },
    { id: 3, image: require("../assets/logo.png") },
    { id: 4, image: require("../assets/logo.png") },
    { id: 5, image: require("../assets/logo.png") },
    { id: 6, image: require("../assets/logo.png") },
    { id: 7, image: require("../assets/logo.png") },
    { id: 8, image: require("../assets/logo.png") },
    { id: 9, image: require("../assets/logo.png") },
  ];

  // Function for processing the beverage selection
  const handleDrinkSelection = (drinkId) => {
    setSelectedDrink(drinkId);
  };

  // Function for processing the addition of a beverage
  const handleAddDrink = () => {
    // Ваш код для добавления напитка
    console.log("Selected drink:", selectedDrink);
    console.log("Selected date and time:", selectedDateTime);
    // save
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your drink</Text>
      <View style={styles.drinkContainer}>
        {drinks.map((drink) => (
          <TouchableOpacity
            key={drink.id}
            style={
              selectedDrink === drink.id
                ? [styles.drinkItem, styles.selectedDrink]
                : styles.drinkItem
            }
            onPress={() => handleDrinkSelection(drink.id)}
          >
            <Image source={drink.image} style={styles.drinkImage} />
          </TouchableOpacity>
        ))}
      </View>
      <Text>Planned drinking time:</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={selectedDateTime}
        mode="datetime"
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
      <Button title="Add my drink" onPress={handleAddDrink} />
    </View>
  );
}
