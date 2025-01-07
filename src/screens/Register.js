import React from "react";
import { useNavigation } from "@react-navigation/native";
import {StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, Text } from "react-native";
import Spacer from "../components/spacer.js";
import InputText from "../components/signupField.js";
import { ApiUrl, api } from "../urls/Api";


const SignupScreen = () => {
  const navigator = useNavigation();

  const handleSubmit = async (formData) => {
    try {
      const response = await api.post(ApiUrl.register, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include this if credentials are involved
      });

      console.log("Server Response: ", response);
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
      style={ styles.mainContainer }>
      <SafeAreaView 
        style={ styles.container } >
        <Spacer>
          <InputText handleSubmit={handleSubmit}/>
        </Spacer>
        <Text onPress={()=> navigator.goBack()}>Login instead</Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent:'center',
    width: '100%',
    alignContent:"center",
    height: "100%"
  },
  mainContainer: {
    flex: 1
  },
  font: {
    fontSize: 50,
    fontWeight: 500,
    alignSelf: "center",
    paddingLeft: 20 // check to remove
  }
});

export default SignupScreen;