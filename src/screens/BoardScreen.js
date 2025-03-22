import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const BoardScreen = () => {
  // Sample data (replace with actual data from API or state)
  const user = {
    fullName: "John Doe",
    profilePicture: "https://via.placeholder.com/100", // Replace with actual image URL
    stashesRegistered: 50,
    stashesDiscovered: 30,
    stashesRecovered: 20,
    stashesRetrieved: 15,
    bonusPoints: 200,
    pointsUsed: 120,
    lostStashes: 23
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
        <Text style={styles.fullName}>{user.fullName}</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Registered Stashes: {user.stashesRegistered}</Text>
        <Text style={styles.statText}>Discovered Stashes: {user.stashesDiscovered}</Text>
        <Text style={styles.statText}>Retrieved Stashes: {user.stashesRetrieved}</Text>
        <Text style={styles.statText}>Found Stashes: {user.stashesRecovered}</Text>
        <Text style={styles.statText}>lost Stashes: {user.lostStashes}</Text>
      </View>

      {/* Points Section */}
      <View style={styles.pointsContainer}>
        <Text style={styles.pointText}>Bonus Points: {user.bonusPoints}</Text>
        <Text style={styles.pointText}>Points Used: {user.pointsUsed}</Text>
      </View>

      {/* Update Profile Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
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
