import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";

const StashTemplate = ({ value, onpress }) => {
  const { itemName, timeAdded, sp_Number, dateAdded, itemDesc, pictures } = value;
  const base64 = pictures.length > 0 ? pictures[0].base64 : '';

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onpress}>
      <View style={styles.descView}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}>{itemName}</Text>
        <Text>{sp_Number}</Text>
        <Text>{dateAdded + ' ' + timeAdded}</Text>
        <Text style={{ color: 'grey' }}>{itemDesc}</Text>
      </View>

      <View style={styles.imageView}>
        {base64 ? (
          <Image style={styles.image} source={{ uri: `data:image/png;base64,${base64}` }} />
        ) : (
          <Text>No Image</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowOffset: {
      height: 1,
      width: .5
    },
    shadowOpacity: .2,
    shadowColor: '#0C0606',
    shadowRadius: 1,
    elevation: Platform.OS === "android" ? 5 : 0,
    marginBottom: 5
  },
  descView: {
    padding: 15,
    marginVertical: 10,
    flex: 1
  },
  imageView: {
    padding: 15,
    marginVertical: 10,
    alignSelf: 'center',
    flex: 1
  },
  image: {
    height: 100,
    width: 150,
    borderRadius: 10
  }

});

export default StashTemplate;