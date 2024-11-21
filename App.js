import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet } from 'react-native';
import SignupScreen from './src/screens/Register.js';
import LoginScreen from './src/screens/LoginScreen.js';

export default function App() {
  return (
    <>  
    {/* <SignupScreen /> */}
    <LoginScreen />
     <StatusBar hidden={false} style="auto" barStyle="red"/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
