import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Button, FlatList, SafeAreaView } from "react-native";
import Spacer from "../components/spacer";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/searchBar";
import LostStash from "../components/lostStash";
import { items } from "../urls/stashObject";
import { ScrollView } from "react-native-web";
// transport from below
import { ApiUrl, api } from "../urls/Api";
import { AUTH_TOKEN } from "@env";
import { RefreshControl, GestureHandlerRootView } from 'react-native-gesture-handler';



const HomeScreen = () => {
  const [DATA, setDATA] = useState([]); // Initialize as an empty array
  const [refreshing, setRefreshing] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const fetchData = async () => {
    try {
      const response = await api.get(ApiUrl.getReport, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: AUTH_TOKEN,
        },
        withCredentials: true,
      });

      if (response && response.data) {
        console.log(response.data[0]?.itemDesc);
        setDATA(response.data); // Update the state
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderItems = ({ item }) => (
    <LostStash
      itemName={item.itemName}
      stashName={item.dateAdded}
      desc={item.itemDesc}
      SerialNum={item.sp_Number}
      lost_comment={item.lost_comment}
      pictures={item.pictures}
      item={item}
    />
  );

  const Empty = () => (
    <View>
      <Text>Loading...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        
        <FlatList
          style={{flex: 1, flexDirection: "column", backgroundColor: "fffff"}}
          data={ DATA }
          renderItem={renderItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.sp_Number || index.toString()} // Ensure unique keys
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 3,
                marginTop: 10,
                backgroundColor: "rgb(206, 206, 206)",
              }}
            />
          )}
          ListEmptyComponent={<Empty />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
    
      </GestureHandlerRootView>
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
