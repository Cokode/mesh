import React from "react";
import { Text, View, Image, TextInput, StyleSheet, Pressable } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';



const InputSection = ({CloseCard, openModal, report}) => {

  return (
    <>
      <View style={styles.inputWrapper}>
      
        <Pressable onPress={CloseCard} style={styles.closeStyle} >
        <Image style={{width: 25, height: 28, alignSelf: "center"}} source={require("../../assets/myIMGs/close.png")} />
          <Text> Close </Text>
        </Pressable>

        <Pressable onPress={openModal} style={styles.commentStle}>
        <Image style={styles.imgeStyle} source={require("../../assets/myIMGs/notes_24dp_000000.png")} />
          <Text> Comment </Text>
        </Pressable> 

        <Pressable onPress={report} hitSlop={20} pressRetentionOffset={10} style={ ({ pressed }) => (pressed ? styles.highlight : styles.pressable)}>
          <Image style={styles.imgeStyle} source={require("../../assets/myIMGs/add_photo_alternate_24dp_000000.png")} />
          <Text> Add image </Text>
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imgeStyle: {
    width: 25, 
    height: 25
  },
  highlight: {
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row", 
    alignItems: "center", 
  },
  closeStyle: {
    flexDirection: "row", 
    alignItems: "center" 
  },
  pressable: {
    flexDirection: "row", 
    alignItems: "center" 
  },
  commentStle: {
    flexDirection: "row", 
    alignItems: "center" 
  },
  inputWrapper : {
    flexDirection: "row", 
    alignContent: "space-around", 
    paddingHorizontal: 20, 
    paddingVertical: 8, 
    marginBottom: 5, 
    backgroundColor: "white", 
    gap: 40,

  }
});

export default InputSection;