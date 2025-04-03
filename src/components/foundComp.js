import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const FoundItemsList = ({ items, onEndCase }) => {
  const [count, setCount] = useState(0);

  const HandleSubmit = (finderID, itemID) => {
    console.log(finderID, " ", itemID);
    // Check whether the count is less than 1
    if (count === 0) {
      setCount(1); // Increment the count
      alert("Please ensure you have received the item before ending the case.");
      return;
    }

    // Reset the count and call the passed function
    setCount(0);
    onEndCase(finderID, itemID);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemName}>📦 Stash: {item.stashName}</Text>
      <Text style={styles.text}>👤 Founder: {item.founderName}</Text>
      <Text style={styles.text}>📱 Number: {item.contactInfo}</Text>
      <TouchableOpacity
        style={[styles.endCaseButton, count >= 1 && { backgroundColor: "#5DE2E7" }]}
        onPress={() => {
          //console.log(item.finderID, " ", item.itemID);
          HandleSubmit(item.finderID, item.itemID)
        
        }}
      >
        <Text style={styles.buttonText}>
          {count === 0 ? "End Case" : "Confirm"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id || item.stashName} // Fallback keyExtractor
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
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
