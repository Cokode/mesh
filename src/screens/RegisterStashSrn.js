import React, { useState, useEffect } from "react";
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
  const [showModal, setShowModal] = useState(show);
  const [formData, setFormData] = useState(null);
  const [barcode, setBarcode] = useState(null);

  const {uploadForm, errorMessage, loading, data} = useStashUpload(formData);

  const handleSubmit = async (form) => { 
    console.log("HandleSubmit called.");
    if (!form) return;
    setShow(!show);
    setFormData(form);
    
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>")
  }
  useEffect(() => {
    if (!data) {
      setShow(false);
      return;
    }
  
    setShow(false);
  
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 400);
  
    setBarcode(data?.barCodeNum ?? ""); // Ensure safe access to data
  
    return () => clearTimeout(timer); // Cleanup timeout to prevent memory leaks
  }, [data]);
  

  const bottomPadding = height => {
    setPadding(height);
  };

  const hideModal = () => {
    setShowModal(!showModal); 
  };

  const dataToStore = "https://www.instagram.com/lordofnordic/"; // Replace with your data

  return (
    <KeyboardAvoiding>

      <ScrollView style={styles.scrollView} >
        <RegisterInput bottomPad = {bottomPadding} showModal={hideModal} submitAction={handleSubmit}/>
          <Modal animationType="slide" transparent={true} visible={showModal} >
            <QRCodeGenerator url= {dataToStore} closeModal={hideModal} barcode={barcode}/>
          </Modal>

          <Modal animationType="slide" transparent={false} visible={show} >
            <ImageLoading display={()=> setShow(false)} />
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