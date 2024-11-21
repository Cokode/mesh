import React, { useState } from "react";
import { Input, Button } from "@rneui/base";
import { StyleSheet, View, Text } from "react-native";

const InputText = ({handleSubmit}) => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [errorM, setErrorM] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style ={styles.textTittle}>
          Sign up for an account
        </Text>
      </View>
      <Input
        label="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        errorMessage={errorM}
        onFocus={() => setErrorM("")}
      />
      <Input
        label="Last Name"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        errorMessage={errorM}
        onFocus={() => setErrorM("")}
      />
      <Input
        label="Username"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
        errorMessage={errorM}
        onFocus={() => setErrorM("")}
      />
      <Input
        label="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        errorMessage={errorM}
        onFocus={() => setErrorM("")}
      />
      <Input
        label="Password"
        secureTextEntry={true}
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        errorMessage={errorM}
        onFocus={() => setErrorM("")}
      />
      <Button title="Submit" onPress={() => handleSubmit(formData)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  titleContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
    padding: 5,
    backgroundColor: 'orange'
  },
  textTittle: {
    fontSize: 35,
    color: 'black',
  }
});

export default InputText;