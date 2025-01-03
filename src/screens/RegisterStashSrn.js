import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Modal, ScrollView, Text } from "react-native";
import { Input, Button } from "@rneui/themed";
import KeyboardAvoiding from "../components/keyBoardAvoidingView";
import RegisterInput from "../components/registerInput";
import QRCodeGenerator from "../components/qrCode";

const RegisterStashSrn = () => {
  const [padding, setPadding] = useState(0);
  const [show, setShow] = useState(false);

  const bottomPadding = height => {
    setPadding(height);
  }

  const hideModal = () => {
    setShow(!show); 
  };

  const dataToStore = "https://www.instagram.com/lordofnordic/"; // Replace with your data


  return (
    <KeyboardAvoiding
    >
      <ScrollView
        style={styles.scrollView}  
      >
        <RegisterInput bottomPad = {bottomPadding} showModal={hideModal}/>
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={() => setShow(!show)}  
        >
          <QRCodeGenerator url= {dataToStore} closeModal={hideModal}/>
        </Modal>
        <StatusBar 
          barStyle={'default'}
          showHideTransition={'slide'}
          translucent
        />
      {/* <View style={{ backgroundColor: 'orange', height: padding, marginTop: 20 }}>Hello </View> */}
    </ScrollView>
    
    </KeyboardAvoiding>
  );
}


const styles = StyleSheet.create({
  scrollView: {
    // padding: 10,
    backgroundColor: '#fff'
  }

});


export default RegisterStashSrn;