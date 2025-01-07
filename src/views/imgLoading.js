import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";

const ImageLoading = ({display}) => {


  return (
    <View 
      style={{flex: 1, height: '100%', width: '100%', backgroundColor: 'rgb(43, 45, 59)', }}>
 
        <Text style={{fontSize: 40}} onPress={display}>Loading...</Text>
        <Text style={{fontSize: 40}} onPress={display}>Loading...</Text>
        <Text style={{fontSize: 40}} onPress={display}>Loading...</Text>

   </View>
  );
}

const styles = StyleSheet.create({

});

export default ImageLoading;