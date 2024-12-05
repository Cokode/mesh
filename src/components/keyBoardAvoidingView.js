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
    backgroundColor: '#1B6B93',
  }
});

export default KeyboardAvoiding;