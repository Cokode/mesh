import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Button, FlatList, SafeAreaView } from "react-native";
import LostStash from "../components/lostStash";

// transport from below
import { ApiUrl, api, fetchProtectedData } from "../urls/Api";
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
     // Extracting token from Asycronous Store
     const token = await fetchProtectedData();

     if (!token) {
      console.log("Missing information in HomeScreen");
      return;
    }

    try {
      const response = await api.get(ApiUrl.getReport, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: token,
        },
        withCredentials: true,
      });

      if (response.status && response.data) {
        console.log(response.data[0]?.itemDesc);

        setDATA(response.data); // Update the state
      } else {
        console.log("No data found.");
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
      <Text>Loading... wait</Text>
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
