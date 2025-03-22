import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { ApiUrl, api, fetchProtectedData } from "../urls/Api";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BoardScreen = () => {
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  const demoUser = {
    fullName: "John Doe",
    profilePicture: "https://via.placeholder.com/100",
    stashesRegistered: 50,
    stashesDiscovered: 30,
    stashesRecovered: 20,
    stashesRetrieved: 15,
    bonusPoints: 200,
    pointsUsed: 120,
    lostStashes: 23,
  };

  async function getUserInfo() {
    const token = await fetchProtectedData();

    if (!token) {
      console.log("Missing information in BoardScreen");
      return;
    }

    setRefreshing(true); // Start refreshing AFTER 400ms delay

    setTimeout(async () => {
      try {
    
        const data = await api.get(ApiUrl.getUser, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token,
          },
          withCredentials: true,
        });
    
        console.log(data.data);
        if (data.data) {
          setUser(data.data);
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setRefreshing(false); // Stop refreshing after API call
      }
    }, 3000);
  }

  useEffect(() => { 
    getUserInfo();
    console.log("Fetching User Information.");
  }, []);

  return (
    <GestureHandlerRootView>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getUserInfo} />}
      >
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: user?.body.profilePicture }} style={styles.profileImage} />
          <Text style={styles.fullName}>{user?.body.user.firstName} {user?.body.user.lastName }</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>Registered Stashes: {user?.body.reg_stash}</Text>
          <Text style={styles.statText}>Found Stashes: {demoUser.stashesDiscovered}</Text>
          <Text style={styles.statText}>Retrieved Stashes: {demoUser.stashesRetrieved}</Text>
          <Text style={styles.statText}>Lost Stashes: {user?.body.lost_stash}</Text>
        </View>

        {/* Points Section */}
        <View style={styles.pointsContainer}>
          <Text style={styles.pointText}>Bonus Points: {demoUser.bonusPoints}</Text>
          <Text style={styles.pointText}>Points Used: {demoUser.pointsUsed}</Text>
        </View>

        {/* Update Profile Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  fullName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  statText: {
    fontSize: 16,
    marginBottom: 5,
  },
  pointsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  pointText: {
    fontSize: 16,
    color: "#007AFF",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BoardScreen;
