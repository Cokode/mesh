import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Modal, SafeAreaView } from "react-native";
import { ApiUrl, api, fetchProtectedData } from "../urls/Api";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProfileEdit from "../components/profileEdit";
import ImageModal from "../views/imageModal";
import selectImage from "../components/lib/imagePicker";

const BoardScreen = () => {
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control
  const [showModal, setShowModal] = useState(false);
  const [showPic, setShowPic] = useState(false);

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

  const updateImage = async () => {
    const results = await selectImage(1);

    // Extracting token from Asycronous Store
      const token = await fetchProtectedData();

      if (!token) {
      console.log("Missing information in Board Screen.");
      return;
    }

    try {

      let imgData = results.assets[0].base64;

      let response = await api.post(ApiUrl.updatePic, { "img": imgData }, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: token,
        },
        withCredentials: true,
      });

      if (response.data) {
        getUserInfo();
        alert("Profile picture updated.");
      } else {
       alert("An error occured, try again!");
      }
    } catch (error ) {
      console.log(error);
    }
  }

  const getUserInfo = async () =>  {
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

        if (data.data) {
          console.log(data.data);
          setUser(data.data);
        } else {
          console.log("No data found");
        }

      } catch (error) {
        console.log(error);
      } finally {
        setRefreshing(false); // Stop refreshing after API call
      }

    }, 400);
  };

  const updateProfile = async ( body ) => {
    if (!body) return;

    const token = await fetchProtectedData();

    if (!token) {
      console.log("No token, cannot make this request");
      return;
    }
    
    try {

      const res = await api.put(ApiUrl.updateProfile, body, 
        {
          headers : {
            "Content-Type": "Application/json",
            "Authorization": token
          },

          withCredentials: true,
      });

      console.log("Response:  ", res);
      if (!res.status) {
        alert('Not possible this time, Try again');
        console.log("Invalid request.");
        return;
      }

      getUserInfo();
      alert('Profile updated successfully!');

    } catch (error) {
      console.log(error);
    } finally {
      // 
    }
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
        <TouchableOpacity onPress={() => setShowPic(true)} style={styles.profileContainer}>
          <Image source={{ uri: user?.body.profilePicture }} style={styles.profileImage} />
          <Text style={styles.fullName}>{user?.body.user.firstName} {user?.body.user.lastName}</Text>
        </TouchableOpacity>

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
        <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>

        <Modal
          visible={showModal} 
          animationType="slide">
            <SafeAreaView style={styles.container}>
            <ProfileEdit style={styles} onClose={() => setShowModal(false)} user={user?.body.user} onSubmit={updateProfile}/>
            </SafeAreaView>
        </Modal>

        <ImageModal
         image={{pictureUrls: user?.body.profilePicture}}  
         showPicture={showPic} 
         setShowPicture={() => setShowPic(false)} 
         uploadImg={() => updateImage()}
        />
      
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
