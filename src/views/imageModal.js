import { useState } from "react"
import { Image, View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import Feather from '@expo/vector-icons/Feather';


const ImageModal = ({ image, showPicture, setShowPicture, uploadImg }) => {
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

        {uploadImg && 
          <TouchableOpacity style={styles.uploadTextStyle} onPress={() => setShowPicture(false)}>
             <Feather name="share" size={33} color="white" onPress={uploadImg} />
          </TouchableOpacity>
        }
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
  uploadTextStyle: {
    fontSize: 30,
    color:"white", 
    position: "absolute",  
    top: 120, right: 300
  },
  closeTextStyle: {
    fontSize: 30,
   color:"white", 
   position: "absolute",  
   top: 120, left: 300
  }
})


export default ImageModal;