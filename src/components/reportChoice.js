import React, {useState} from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ReportChoice = (props) => {
  const { type } = props;
  const [choice, setChoice] = useState(true);

  const SetType = () => {
    const action = type();
    setChoice(action);
  }

  return (
    <>
      <TouchableOpacity style={ styles.pressView } onPress={ SetType } activeOpacity={ 0.4 }
      >
        <Text style={ styles.text } >
          { choice ? 'Report Registered Item ?' : 'Report Found Item ?' }
        </Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  pressView: {
    backgroundColor: '#f9f9f9', //'#fff',
    padding: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
    borderColor: '#1B6B93', // '#B3C8CF',
    borderWidth: 1,
    shadowOffset: {
      width: 10,
      height: 4
    },
    shadowColor: 'red',
  },
  text: {
    fontSize: 14,
    color: '#000',
    alignSelf: 'center'
  }
});


export default ReportChoice;