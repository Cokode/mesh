import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Spacer from './spacer';

const NoStash = () => (
  <View style={styles.container}>
     <Spacer />
     <Spacer />
    <Spacer />
    <Spacer />
    
    <Text style={styles.title}>Nothing yet 🛂</Text>
    <Text style={styles.subtitle}>Start adding stash to see something..</Text>

    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
    <Spacer />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
    alignContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});

export default NoStash;
