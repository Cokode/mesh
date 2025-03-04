import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import BarCodeCollector from '../components/barCodeCollector';
import ModalView from '../components/modal';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const StashView = ({ route }) => {
  const [showModal, setShowModal] = useState(false);

  const data = route.params.stash;

  const isValideData = (value) => {
    let match = data.barcodeNumber == value;

    console.log("Product Num    Input Value     Match?");
    console.log(data.barcodeNumber? data.barcodeNumber : "         ", "  ", value, "  ", match);

    setShowModal(true);
  }

  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={ styles.scrollView }>
        <View style={ styles.centeredContainer }>
          <BarCodeCollector onpress={ isValideData }/>
        </View>

        <View>

        {showModal && 
          <ModalView visible={ showModal } onClose={() => setShowModal(false)}>
            <ChildComponent />
          </ModalView> 
        }
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const ChildComponent = ({ closeModal }) => (
  <View style={{ width: "100%", height: "100%", backgroundColor: "orange", paddingTop: 50 }}>
    <Text>This is the content of the modal.</Text>
    <Button title="Close Modal" onPress={ closeModal } />
  </View>
);

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#D4EBF8',
    padding: 20,
    justifyContent: "center",
    alignItems: "center", 
  },
  centeredContainer: {
    width: "100%", // Ensures proper centering
    alignItems: "center",
    justifyContent: "center",
    flex: 1, 
  },
});

export default StashView;