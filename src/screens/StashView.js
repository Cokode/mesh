import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Platform, ScrollView, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import KeyboardAvoiding from '../components/keyBoardAvoidingView';

const StashView = ({route}) => {

  const [container, setContainer] = useState({
    flex: 1, 
    backgroundColor: '#1B6B93', 
    paddingBottom: 100,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    // marginBottom: 0
  }); // //#f9f9f9',

    const { ownerNames, picture, stashName, desc, SerialNum, date, timePosted, rewardEligibility, priorityStatus, lastKLoc, imageAddress } = route.params.stash;

    const setCon =(value) => {
      setContainer({...container, marginBottom: value});
    } 
 
    return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={container}
      >
          <ScrollView contentContainerStyle={styles.scrollView}>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Reported by</Text>
                  <Text style={styles.inputName}> {ownerNames} </Text>
              </View>
              <View style={styles.inputGroup}>
                  {/* <Text style={styles.label}>Picture</Text> */}
                  <Image source={require('../../assets/myIMGs/image.png' )} style={styles.image} />
              </View>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Stash Name</Text>
                  <Text style={styles.input}>{stashName}</Text>
              </View>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Description</Text>
                  <Text style={styles.textarea}>{desc}</Text>
              </View>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Serial / Product Number</Text>
                  <Text style={styles.input}>{SerialNum} </Text>
              </View>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Date Posted</Text>
                  <Text style={styles.input}>{date} {timePosted}</Text>
              </View>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Reward Eligibility</Text>
                  <Text style={styles.input} value='false' >{rewardEligibility} </Text>
              </View>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Priority Status</Text>
                  <Text style={styles.input}>{priorityStatus} </Text> 
              </View>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Last Known Location</Text>
                  <Text style={styles.input}>{lastKLoc} </Text>
              </View>
              <TouchableOpacity 
                style={styles.buttonGroup}
                activeOpacity={.6}
                
                >
                <Text style={styles.buttonText}> Start Recovery</Text>
              </TouchableOpacity>
          </ScrollView>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
      flexGrow: 1,
      backgroundColor: '#D4EBF8',
      padding: 25,
      borderRadius: 10,
  },

  buttonGroup: {
    backgroundColor: '#1B6B93',
    borderRadius: 10,
    padding: 15,
    borderColor: '#1B6B93',
    width: '50%',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 15,
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
      marginBottom: 5,
      fontWeight: '500',
      fontSize: 12
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#D4EBF8',
    fontWeight: '700',
    fontSize: 12
  },
  inputName: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#D4EBF8',
    fontWeight: '700',
    fontSize: 15
  },
  textarea: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      backgroundColor: '#D4EBF8',
      height: 'auto',
      fontSize: 12
  },
  image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
  },
});

export default StashView;