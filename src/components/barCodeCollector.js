import React, { useState } from 'react';
import { View, Text, TextInput, Image, Keyboard, StyleSheet, Pressable, Alert } from 'react-native';
import Spacer from './spacer';

export default function wrapper ({ onpress }) {
  const [inputValue, SetInputValue] = useState("");
  const placeholder = "Enter barcode number ...";

  const updateInput = (value) => {
    if (value.length < inputValue.length || inputValue.length < 10) {
      // Allow backspace or deleting characters
      SetInputValue(value);
    }
  };

  //calls onpress to verify barcode match,
  const onSubmit = () => {
    // SetInputValue(""); // set inpput value to default

    console.log("Hello, Pressed.", inputValue);
    onpress(inputValue);
  };

    return (
      <View style={styles.wrapper} >
        <Text style={styles.inputLabel}>Enter barcode number found on product</Text>
        <Spacer />

        <TextInput 
          style={styles.input}
          placeholder= {placeholder}
          value={inputValue}
          onChangeText={(data) => (updateInput(data))}
          inputMode="numeric"
        />

        <Pressable
          style={styles.btnHighlight}
        >
          <Text disabled={ inputValue.length <= 5 } style={ styles.btnTxt } onPress={ onSubmit }>
            Submit
          </Text>
        </Pressable>
      </View>
    );
};

const styles = StyleSheet.create({
   wrapper: {
    display:"flex",
    width: "100%", // Adjust width as needed
    borderWidth: 0.3,
    borderRadius: 12,
    borderColor: "black",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow effect
  },
  inputLabel: {
    fontSize: 14,
    alignSelf: 'center',
    paddingVertical: 10,
    color: '#000',
    fontWeight: "600",
    marginBottom: 1,
  },
  input: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 85,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#D4EBF8',
    fontWeight: '700',
    fontSize: 15
  },
  inputName: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#D4EBF8',
    fontWeight: '700',
    fontSize: 15
  },
  btnStyle: {
    padding: 20,
  },
  btnTxt : {
    fontSize: 20,
    color: "#007AFF",
    fontWeight: "500",
  },
  btnHighlight : {
    padding: 20,
    // backgroundColor: "orange"

  }
})

