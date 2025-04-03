import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, Text } from "react-native";
import Spacer from "../components/spacer.js";
import InputText from "../components/signupField.js";
import { ApiUrl, api } from "../urls/Api";

const SignupScreen = () => {
  const navigator = useNavigation();

  const handleSubmit = async (formData) => {
    try {

      console.log(formData)
      const response = await api.post(ApiUrl.register, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log("Server Response: ", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.mainContainer}
    >
      <SafeAreaView style={styles.container}>
        <Spacer>
          <InputText handleSubmit={handleSubmit} />
        </Spacer>
        <Text style={styles.loginText} onPress={() => navigator.goBack()}>
          Already have an account? <Text style={styles.loginLink}>Login instead</Text>
        </Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1B6B93',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1B6B93',
  },
  loginText: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
  loginLink: {
    color: '#FFD700',
    fontWeight: 'bold',
  }
});

export default SignupScreen;
