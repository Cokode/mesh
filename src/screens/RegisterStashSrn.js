import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Image, ScrollView } from "react-native";
import { Input, Button } from "@rneui/themed";
import KeyboardAvoiding from "../components/keyBoardAvoidingView";
import RegisterInput from "../components/registerInput";





const RegisterStashSrn = () => {
  const [padding, setPadding] = useState(0);

  const bottomPadding = height => {
    setPadding(height);
  }




  return (
    <KeyboardAvoiding
    >
      <ScrollView
        style={styles.scrollView}  
      >
        <RegisterInput bottomPad = {bottomPadding}/>
        <StatusBar 
          barStyle={'default'}
          showHideTransition={'slide'}
          translucent
        />


      <View style={{ backgroundColor: 'orange', height: padding, marginTop: 20 }}></View>
    </ScrollView>
    
    </KeyboardAvoiding>
  );
}


const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
    backgroundColor: '#fff'
  }

});


export default RegisterStashSrn;