import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Spacer from "../components/spacer";
import { useNavigation } from "@react-navigation/native";
import StashView from "../components/stashView";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const StashScreen = () => {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StashView />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20, // Optional: Add padding if needed
  },
});

export default StashScreen;
