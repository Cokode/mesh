import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';


const SearchBar = () => {

  return (
    <View
      style={styles.container}
    >
      <AntDesign name="search1" size={24} color="grey" />
      <TextInput
        style={styles.inputStyle}
        placeholder='Search'
        placeholderTextColor={"grey"}
      >

      </TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // shadowOffset: { width: 0, height: 2 },
    elevation: 3, 
    height: 40,
    width: '90%',
    alignSelf: 'center'
  },
  inputStyle: {
    flex: 1, 
    marginLeft: 3, 
    fontSize: 16, 
    color: 'black',
    fontFamily: 'Arial',
  },
});

export default SearchBar;