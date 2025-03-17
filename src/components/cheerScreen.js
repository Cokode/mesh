import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Button } from 'react-native';

// Re-usable component, offers a founder option 
// to contact owner of a lost item
export default function CheerScreen ({ owner, itemName, styles }) {

  return (
    <View>
      <Text>Congratulations! You just found {owner} {itemName } </Text>

      <View>
        <Text>lets let { owner } know you have it</Text>
      </View>

      <View>
        <Pressable>
          <Text>Send retrieval notification</Text>
        </Pressable>
      </View>
    </View>
  );
};
