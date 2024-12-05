import React, { useState } from "react";
import { StatusBar, SafeAreaView, StyleSheet, Text, Platform, View, TouchableOpacity, ScrollView } from "react-native";
import KeyboardAvoiding from "../components/keyBoardAvoidingView";
import LoginField from "../components/loginField";
import { ApiUrl } from "../urls/Api";
import axios from "axios";
import Spacer from "../components/spacer";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = (props) => {
  const navigation = useNavigation();

  const loginRequest = async (loginData) => {
    try {
      const response = await axios.post(ApiUrl['login'], loginData, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status) {
        return (<View> <Text>Hello </Text> </View>)
      } else {
      }
    
      console.log(response.data);
    } catch (error) {
      console.log({error: error.message});
    }
  }

  return (
    <KeyboardAvoiding>
      <SafeAreaView
        style={styles.container}
      >
        <ScrollView>
          <StatusBar
            animated={true}
            backgroundColor="black" // add othoer props
            translucent={true}
            showHideTransition ='fade'
          />
          <Text 
            style={{fontSize: 50, alignSelf: 'center', marginBottom: 50, color: 'orange' }}
          >
            Lira
          </Text>
          <Text 
            style={styles.font}>
            Sign in
          </Text>
          <Spacer>
            <LoginField onSubmit={loginRequest}/>
            <View style={styles.forgotPassword}>
              <TouchableOpacity
                onPress={() => alert("Forgot password?")}>
                 <Text style={ styles.smallFont}>Forgot password?</Text>
             </TouchableOpacity> 
             <TouchableOpacity
                onPress={() => navigation.navigate('Signup Screen')}>
                 <Text style={ styles.smallFont}>Create new account</Text>
             </TouchableOpacity>
          </View>
          </Spacer>
          </ScrollView>
      </SafeAreaView>
    </KeyboardAvoiding>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B6B93',
    justifyContent: 'center',
    width: '100%',
    alignContent:"center",
    // height: "100%"
  },
  font: {
    fontSize: 25,
    fontWeight: 500,
    alignSelf: "center",
    paddingLeft: 35, // check to remove
    marginBottom: 0
  },
  forgotPassword: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  smallFont: {
    fontSize: 14,
    color: '#0C356A',
    paddingRight: 5,
    fontWeight: 500
  }

});

export default LoginScreen;