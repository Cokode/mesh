import React from "react";
import { StyleSheet, KeyboardAvoidingView, Platform} from "react-native";

const KeyboardAvoiding = ({children}) => {
  return <KeyboardAvoidingView
  behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
  keyboardVerticalOffset={10}
  style={ styles.container }
    >
      {children}
    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(7, 95, 209, 0.3)"
  }
});

export default KeyboardAvoiding;