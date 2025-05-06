import React, { useState } from "react";
import { Input, Button } from "@rneui/themed";
import { StyleSheet, View, Text } from "react-native";

const InputText = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [errorM, setErrorM] = useState("");

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrorM("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Sign Up</Text>
      
      <View style={styles.formContainer}>
        {["firstName", "lastName", "email", "password"].map((field, index) => (
          <Input
            key={index}
            label={field === "password" ? "Password" : field.replace(/^\w/, c => c.toUpperCase())}
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}
            secureTextEntry={field === "password"}
            keyboardType={field === "email" ? "email-address" : "default"}
            value={formData[field]}
            onChangeText={(text) => handleChange(field, text)}
            errorMessage={errorM}
          />
        ))}
        <Button 
          title="Sign Up" 
          onPress={() => handleSubmit(formData)} 
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  textTitle: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  labelStyle: {
    color: '#1B6B93',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputStyle: {
    color: '#1B6B93',
  },
  buttonStyle: {
    backgroundColor: '#1B6B93',
    // backgroundColor: "#0C356A",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InputText;
