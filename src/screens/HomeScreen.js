import React from "react";
import { Text, StyleSheet, View, Button, FlatList, SafeAreaView } from "react-native";
import Spacer from "../components/spacer";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/searchBar";
import LostStash from "../components/lostStash";
import { items } from "../urls/stashObject";
import { ScrollView } from "react-native-web";

const HomeScreen = () => {
  const renderItems = ({ item }) => {
    return (
      <LostStash 
        ownerNames={item.ownerNames}
        stashName={item.stashName}
        desc={item.desc}
        SerialNum={item.SerialNum}
      />
    );
  };

  const Empty = () => {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.container}>
        <SearchBar />
        <FlatList 
          data={items}
          renderItem={renderItems}
          keyExtractor={(item) => item.SerialNum}
          ItemSeparatorComponent={() => 
          <View 
          style={{ 
            height: 3, 
            backgroundColor: 'white',
            }} />}
          ListEmptyComponent={<Empty />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default HomeScreen;
