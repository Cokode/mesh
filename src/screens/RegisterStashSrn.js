import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Modal, ScrollView, Text } from "react-native";
import { Input, Button } from "@rneui/themed";
import KeyboardAvoiding from "../components/keyBoardAvoidingView";
import RegisterInput from "../components/registerInput";
import QRCodeGenerator from "../components/qrCode";
import ImageLoading from "../views/imgLoading";
import ValidSRN from "../components/validSRN";
import useStashUpload from "../hooks/useStashUpload";
import { AUTH_TOKEN } from "@env";


const RegisterStashSrn = () => {
  const [padding, setPadding] = useState(0);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(null)

  const {uploadForm, errorMessage, loading, data} = useStashUpload(formData)


  const handleSubmit = (form) => { 

    // ValidSRN             check product doesn't exit already.

  
    setTimeout(() => setShow(!show), 1000)
    setFormData(form);
    setTimeout(() => uploadForm, 2000);
    console.log([loading, data, errorMessage]);

  }

  const bottomPadding = height => {
    setPadding(height);
  }

  const hideModal = () => {
    setShow(!show); 
  };

  const dataToStore = "https://www.instagram.com/lordofnordic/"; // Replace with your data

  return (
    <KeyboardAvoiding>

      <ScrollView style={styles.scrollView} >
        <RegisterInput bottomPad = {bottomPadding} showModal={hideModal} submitAction={handleSubmit}/>
          <Modal animationType="slide" transparent={true} visible={false} >
            <QRCodeGenerator url= {dataToStore} closeModal={hideModal} />
          </Modal>

          <Modal animationType="slide" transparent={false} visible={show} >
            <ImageLoading display={hideModal} />
          </Modal>
        <StatusBar barStyle={'default'} showHideTransition={'slide'} translucent />
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