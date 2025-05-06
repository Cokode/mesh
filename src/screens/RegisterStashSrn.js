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
import { api, ApiUrl, fetchProtectedData } from "../urls/Api";


const RegisterStashSrn = () => {
  const [padding, setPadding] = useState(0);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(show);
  const [formData, setFormData] = useState(null);
  const [barcode, setBarcode] = useState(null);;
  const [img, setImg] = useState(null);

  const handleSubmit = async (form) => {
    console.log("HandleSubmit called.");
  
    if (!form) {
      console.warn("Form data is missing.");
      return;
    }
  
    setShow(true); // Show loader
    console.log("Loader activated. show: ", show);
  
    const result = await useStashUpload(form);
    //console.log("Result from useStashUpload: ", result);
  
    if (!result) {
      console.error("Upload failed. Result is null.");
      setShow(false); // Hide loader
      alert("This stash already exist");
      return;
    }
  
    setFormData(result); // Set form data
    console.log("Form data updated with valid result.");
  };
  
  useEffect(() => {
    if (!formData) {
      console.warn("Form data is missing. Closing loader.");
      setShow(false); // Hide loader
      return;
    }
  
    setShow(false); // Hide loader after formData is available
    const timer = setTimeout(() => {
      setShowModal(true); // Show modal after timeout
    }, 400);

    setBarcode(formData?.barCodeNum); // Safe access with fallback message
  
    return () => clearTimeout(timer); // Cleanup timeout
  }, [formData]);  

  const bottomPadding = height => {
    setPadding(height);
  };

  const hideModal = () => {
    setShowModal(!showModal); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await fetchProtectedData();
  
        if (!token) {
          console.log("Missing information in RegisterStash: token not provided.");
          return; 
        }
  
        const userImage = await api.get(ApiUrl.getBoardData, {
          headers: { 
            "Content-Type": "application/json; charset=utf-8", 
            "Authorization": token,
          },
        });
  
        if (userImage) {
          console.log("\n\n");
          console.log(userImage.data);
          setImg(userImage.data.data.profilePicture);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [formData]);
  

  const iGUri = "https://www.instagram.com/lordofnordic/"; // Replace with your data

  return (
    <KeyboardAvoiding>

      <ScrollView style={styles.scrollView} >
        <RegisterInput bottomPad = {bottomPadding} showModal={hideModal} submitAction={handleSubmit}/>
          <Modal animationType="slide" transparent={true} visible={showModal} >
            <QRCodeGenerator url= {iGUri} closeModal={hideModal} barcode={barcode} picture={img? img : " "}/>
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