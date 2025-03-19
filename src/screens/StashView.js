import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import BarCodeCollector from '../components/barCodeCollector';
import ModalView from '../components/modal';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CheerScreen from '../components/cheerScreen';
import Spacer from '../components/spacer';

const StashView = ({ route }) => {
  const [showModal, setShowModal] = useState(false);
  const [valid, setValid] = useState(false);

  const data = route.params.stash;

  const isValidBarcode = (value) => {
    let match = data.barcodeNumber == value;

    match ? setValid(true) : setValid(false);
    console.log(data.barcodeNumber? data.barcodeNumber : "         ", "  ", value, "  ", match);

    setShowModal(true);
  }

  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={ styles.scrollView }>
        <View style={ styles.centeredContainer }>
          <BarCodeCollector onpress={ isValidBarcode }/>
        </View>

        <View>
          {
            showModal && 
            <ModalView visible={ showModal } valid={ valid } item={ data } onClose={() => setShowModal(false)}>
              <ChildComponent/>
            </ModalView> 
          }
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

  const handleSubmit = (value) => {
    // code goes here.
  }

const ChildComponent = ({ closeModal, data, item }) => (
  <View style={{ width: "100%", height: "100%",  backgroundColor: "#f5f5f5", paddingTop: 50 }}>
    <Spacer />
   
    <Button title="Close" onPress={ closeModal } />
    <View style={{width: "40%", height: 2.5, borderRadius: 10, marginBottom: 10, backgroundColor: "grey", alignSelf: "center"}}></View>
    { data ? 
    
      (
        <CheerScreen item={ item } styles={styles}  onClick={handleSubmit}/>
      ) : 

      <View style={styles.validStyle}>
        <Spacer />
        <Text> Invalid barcode number! </Text>

        <Text> The barcode number you inserted is not valid.</Text>
      </View>
}
   
  </View>
);

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    // backgroundColor: '#D4EBF8',
    padding: 20,
    justifyContent: "center",
    alignItems: "center", 
  },
  centeredContainer: {
    width: "100%", // Ensures proper centering
    alignItems: "center",
    justifyContent: "center",
    flex: 1, 
    // backgroundColor: "orange"
  },
  validStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  }


});

export default StashView;