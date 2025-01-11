import React from "react";
import { Text, View, TextInput, StyleSheet, Pressable } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';



const InputSection = ({CloseCard}) => {


  return (
    <>
      <View style={{flexDirection: "row", alignContent: "space-around", paddingHorizontal: 20, paddingVertical: 8, marginBottom: 5, backgroundColor: "white" }}>
      
        <Pressable onPress={CloseCard} style={{paddingRight: 50, flexDirection: "row", alignItems: "center"}} >
          <AntDesign name="up" size={24} color="black" />
          <Text> Close </Text>
        </Pressable> 

        <Pressable style={{paddingRight: 50, flexDirection: "row", alignItems: "center"}}>
          <EvilIcons name="comment" size={24} color="black" />
          <Text> Comment </Text>
        </Pressable>

        <Pressable style={{flexDirection: "row", alignItems: "center"}} >
          <Octicons name="report" size={24} color="black" />
          <Text> Report </Text>
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({

});

export default InputSection;