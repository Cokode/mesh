import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Platform, ScrollView, Button, KeyboardAvoidingView, TouchableOpacity, Pressable, Alert } from 'react-native';
import Spacer from './spacer';

export default function wrapper ({ onpress }) {
  const [inputValue, SetinputValue] = useState("");
  const placeholder = "...";

  const updateInput = (value) => {
    SetinputValue(value);
  };

  const onSubmit = () => {
    // SetinputValue(""); // set inpput value to default

    console.log("Hello, Pressed.")
    onpress(inputValue);
  };

    return (
      <View style={styles.wrapper} >
        <Text style={styles.inputLabel}>Enter full barcode number found on product</Text>
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
          <Text disabled={ inputValue.length <= 9 } style={ styles.btnTxt } onPress={ onSubmit }>
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
    alignItems: "center"
  },
  inputLabel: {
    fontSize: 14,
    alignSelf: 'center',
    paddingVertical: 10,
    color: '#000',
    fontWeight: "400",
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 20,
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

