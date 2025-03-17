import { useState } from "react"
import { Image, View, Modal, StyleSheet, Text } from "react-native";


const ImageModal = ({ image, showPicture, setShowPicture }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={showPicture}
      onRequestClose={() => setShowPicture(false)}
      statusBarTranslucent={true}
    >
      <View style={styles.imgeWrapper}>
        <Image
          style={{ height: '100%', width: '100%' }}
          //source={{ uri: `data:image/png;base64,${image.base64}` }}
          source={{ uri: image.pictureUrls }}
          resizeMode="contain"
          alt="image"
        />
        <Text style={styles.closeTextStyle} onPress={() => setShowPicture(false)}>
          X
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({ 
  imgeWrapper: {
    flex: 1, 
    padding: 10, 
    backgroundColor: "black", 
    justifyContent: "center"
  },
  closeTextStyle: {
    fontSize: 30,
   color:"white", 
   position: "absolute",  
   top: 120, left: 30
  }
})


export default ImageModal;