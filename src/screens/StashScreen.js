import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import Spacer from "../components/spacer";
import { useNavigation } from "@react-navigation/native";
import StashView from "../components/stashView";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const StashScreen = () => {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <StashView />
      </ScrollView>
      </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20, // Optional: Add padding if needed
  },
});

export default StashScreen;
