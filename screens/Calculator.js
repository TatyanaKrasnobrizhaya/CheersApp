import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import CalculatorStyle from "../style/CalculatorStyle";
import { Picker } from "@react-native-picker/picker";

const Calculator = () => {
  const [drink, setDrink] = useState("");
  const [amount, setAmount] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleCalculate = () => {
    // calculation logic
    // console.log(drink, amount, size, gender, weight);
  };

  return (
    <View style={CalculatorStyle.container}>
      <Text style={CalculatorStyle.title}>Calculator</Text>
      <View style={CalculatorStyle.inputRow}>
        <Text style={CalculatorStyle.label}>Drink:</Text>
        <TextInput
          style={CalculatorStyle.input}
          value={drink}
          onChangeText={setDrink}
          placeholder="Enter drink"
        />
      </View>
      <View style={CalculatorStyle.inputRow}>
        <Text style={CalculatorStyle.label}>Amount of drinks:</Text>
        <TextInput
          style={CalculatorStyle.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
        />
      </View>
      <View style={CalculatorStyle.inputRow}>
        <Text style={CalculatorStyle.label}>Size:</Text>
        <TextInput
          style={CalculatorStyle.input}
          value={size}
          onChangeText={setSize}
          placeholder="Enter size"
        />
      </View>
      <View style={CalculatorStyle.inputRow}>
        <Text style={CalculatorStyle.label}>Gender:</Text>
        <Button
          onPress={() => setPickerVisible(!pickerVisible)} // Switching the visibility of the Picker
          title={gender ? gender : "Select gender"} // Changing the button title depending on the selected gender
        />
        {pickerVisible && (
          <Picker
            style={CalculatorStyle.input}
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue);
              setPickerVisible(false); // Closing the Picker after selecting a value
            }}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        )}
      </View>
      <View style={CalculatorStyle.inputRow}>
        <Text style={CalculatorStyle.label}>Weight:</Text>
        <TextInput
          style={CalculatorStyle.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Enter weight"
          keyboardType="numeric"
        />
      </View>
      <Button title="Calculate" onPress={handleCalculate} />
      <Text style={CalculatorStyle.text}>
        Please note that, the calculation is a guide value - for detailed
        calculation additional aspects have to be included!
      </Text>
    </View>
  );
};

export default Calculator;
