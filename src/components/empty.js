import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Empty = () => (
  <ImageBackground 
    source={{ uri: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?fit=crop&w=800&q=80' }} 
    style={styles.background}
  >
    <View style={styles.overlay} />
    <Text style={styles.title}>Hang Tight! 🌟</Text>
    <Text style={styles.subtitle}>We're preparing something amazing just for you...</Text>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Empty;
