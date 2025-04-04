import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Modal, SafeAreaView } from "react-native";
import { ApiUrl, api, fetchProtectedData, removeToken } from "../urls/Api";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import ProfileEdit from "../components/profileEdit";
import ImageModal from "../views/imageModal";
import selectImage from "../components/lib/imagePicker";
import FoundItemsList from "../components/foundComp";

const BoardScreen = () => {
    const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control
  const [showModal, setShowModal] = useState(false);
  const [showPic, setShowPic] = useState(false);
  const [boardData, setBoardData] = useState(null);
  const [showList, setShowList] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
    GetFoundStash();

    setTimeout(async () => {

      try {
        const response = await api.get(ApiUrl.getUser, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token,
          },
          withCredentials: true,
        });

        if (response.data) {
          console.log(response.data);
          setUser(response.data);
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

  const GetFoundStash = async () => {
    const token = await fetchProtectedData();

    if (!token) return;

    try {

      const response = await api.get(ApiUrl.getBoardData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },

        withCredentials: true
      });

      if (!response.status) {
        console.log("There is a problem fulfilling this requests");
        return;
      }

      console.log(response.data);
     setBoardData(response.data.data);

    } catch (error) {
      console.log(error)
    }
  }

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
    console.log("Fetching User and Baord Information.");
  }, []);

  const HandSubmit = async (finderID, itemID) => {
    console.log("HandSubmit called with:", finderID, itemID);
  
    const token = await fetchProtectedData(); 
    console.log("Token:", token);
  
   
    if (!token || !finderID || !itemID) {
      console.error("Missing required values: Token, finderID, or itemID");
      return;
    }
  
    try {
      const res = await api.post(
        ApiUrl.conclude,
        { finderID, itemID },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8", 
            "Authorization": token,
          },
          withCredentials: true,
        }
      );
  
      if (!res.status) {
        alert("We can't do this now, try again.");
        return;
      }
  
      alert("Yah! We are glad you got your stash back.");
      GetFoundStash()
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  
  return (
    <GestureHandlerRootView>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getUserInfo} />}
      >
        {/* Profile Section */}
        <TouchableOpacity onPress={() => setShowPic(true)} style={styles.profileContainer}>
          <Image source={{ uri: user?.itemOwner.profilePicture }} style={styles.profileImage} />
          <View>
            <Text style={styles.fullName}>{user?.itemOwner.firstName} {user?.itemOwner.lastName}</Text>
              {/* Update Profile Button */}
            <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>

        </TouchableOpacity>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>Registered Stashes: {boardData?.registeredStash}</Text>
          <Text style={styles.statText}>Found Stashes: {boardData?.foundItems}</Text>
          <Text style={styles.statText}>Lost Stashes: {boardData?.lostStash}</Text>
        </View>

        {/* Points Section */}
          <View style={[styles.pointsContainer, {backgroundColor: "#FFECA1"}]} >
            <Text style={styles.pointText}>Bonus Points: { boardData?.rewardPoints }</Text>
            <Text style={styles.pointText}>Points Used: { boardData?.pointsUsed }</Text>
          </View>

        {
          boardData?.foundItems > 0 ? (
            <TouchableOpacity style={[styles.pointsContainer, {backgroundColor: "#5DE2E7"}]} onPress={() => setShowList(!showList)}>
              <Text>You have discovered items</Text>
            </TouchableOpacity>
          ) : (
              <View style={styles.pointsContainer}>
                <Text>All your stash are safe</Text>
              </View>
          )
        }

        { showList && 
          <FoundItemsList items={boardData?.discoveredItems} onEndCase={HandSubmit} />
        }

        {
         boardData?.foundItems == 0 &&
          <TouchableOpacity 
            style={styles.logOutWrapper} 
            onPress={ () => {
               removeToken(); // Clear stored token

                navigation.reset({
                  index: 0,
                  routes: [{ name: 'LoginScreen' }], // This replaces the navigation stack with only the LoginScreen
                });
            }}
          >
          <Text>Logout</Text>
          </TouchableOpacity>

        }

        <Modal
          visible={showModal} 
          animationType="slide">
            <SafeAreaView style={styles.container}>
              <ProfileEdit style={styles} onClose={() => setShowModal(false)} user={user?.itemOwner} onSubmit={updateProfile}/>
            </SafeAreaView>
        </Modal>

        <ImageModal
         image={{pictureUrls: user?.itemOwner.profilePicture}}  
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

    elevation: 3, // Elevation for Android shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Offset: horizontal and vertical
    shadowOpacity: 0.03, // Shadow transparency
    shadowRadius: 3.5, // Blur radius for the shadow
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

    elevation: 3, // Elevation for Android shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Offset: horizontal and vertical
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 2.5, // Blur radius for the shadow
  },
  pointText: {
    fontSize: 16,
    color: "#007AFF",
  },
  button: {
    backgroundColor: "#E8E8E8",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },

  logOutWrapper: {
    backgroundColor: "#CECECE",
    padding: 10,
    borderRadius: 10,
    marginTop: 50,

    width: "80",
    alignSelf: "center",
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1,
    shadowRadius: 1,
  }
});

export default BoardScreen;
