import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const FoundItemsList = ({ items, onEndCase }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemName}>📦 Stash: {item.itemName}</Text>
      <Text style={styles.text}>👤 Founder: {item.founder}</Text>
      <Text style={styles.text}>📱 Founder Number: {item.founderNumber}</Text>
      <TouchableOpacity style={styles.endCaseButton} onPress={() => onEndCase(item.id)}>
        <Text style={styles.buttonText}>End Case</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  endCaseButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoundItemsList;
