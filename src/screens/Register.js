import React from "react";
import {StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import Spacer from "../components/spacer.js";
import InputText from "../components/signupField.js";
import axios from "axios";
import { ApiUrl } from "../urls/Api";


const SignupScreen = () => {
  const handleSubmit = async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post(ApiUrl["register"], formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzNhNGE1OTlkMzJlNGRhNjNhNTkxMWIiLCJlbWFpbCI6InN0ZXZlbkB5YWhvby5jb20iLCJpYXQiOjE3MzE4NzM0ODEsImV4cCI6MTczMjQ3ODI4MX0.4FYsxKcsvBDJncejVKRFXEAGODQuGTfL0tNUaPKTco0"
        }
      });
      console.log("Server Response:", response.data);
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