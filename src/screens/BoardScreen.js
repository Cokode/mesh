import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import Spacer from "../components/spacer";
import { useNavigation } from "@react-navigation/native";


const BoardScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container} >
      <Spacer>
        <Button title="Go to Log in screen"
          onPress={()=> navigation.navigate('LoginScreen')} 
        />
      </Spacer>
      <Spacer>
        <Text style={{ fontSize: 60 }}>
          Hello I am BoardScreen
        </Text>
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B6B93'
  }
});

export default BoardScreen;