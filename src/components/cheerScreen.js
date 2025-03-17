import React, { useState } from 'react';
import Spacer from './spacer';
import { View, StyleSheet, Text, Pressable, Button } from 'react-native';

// Re-usable component, offers a founder option 
// to contact owner of a lost item
export default function CheerScreen ({ item, itemName, styles }) {
  const { ownerInfo } = item;

  return (
    <View style={styles.validStyle}>
      <Spacer />
      <Text>Congratulations!</Text>
      <Text> You just found { ownerInfo.firstName }'s {item.itemName } </Text>

      <View>
        <Text>lets let { ownerInfo.firstName } know you have it.</Text>
      </View>

      <Spacer />
      <Spacer />
      <View style={[stylesInner.btnWrapper]}>
        <Pressable>
          <Text style={stylesInner.btnText}>Tell { ownerInfo.firstName } about it</Text>
        </Pressable>
      </View>
    </View>
  );
};

const stylesInner = StyleSheet.create({
  btnWrapper: {
    backgroundColor: "#2768B7",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow effect
  },
  btnText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
})
