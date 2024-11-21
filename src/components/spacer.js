import React from "react";
import { View, StyleSheet } from "react-native";

const Spacer = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>
};

const styles = StyleSheet.create({
  spacer:{
    marginTop: 14,
    paddingHorizontal: 7,
    paddingVertical: 7
  }
});

export default Spacer;