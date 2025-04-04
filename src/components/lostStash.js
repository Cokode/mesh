import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Pressable, Dimensions } from "react-native";
import ImageModal from "../views/imageModal";
import Card from "./userCard";
import { ApiUrl, api, fetchProtectedData } from "../urls/Api";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width * 0.9; // 90% of screen width for better responsiveness
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.6; // Maintain aspect ratio

const LostStash = (props) => {
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [showPicture, setShowPicture] = useState(false);
  const [userID, setUserID] =  useState("");

  const { item } = props;

  const showFullImage = (value) => {
    setImage(value);
    setShowPicture(true);
  };

  useEffect(() => { 
    GetUserInfo();
  }, []);

  const GetUserInfo = async () =>  {
    const token = await fetchProtectedData();

    if (!token) {
      console.log("Missing information in BoardScreen");
      return;
    }

    setTimeout(async () => {

      try {
        const response = await api.get(ApiUrl.getUser, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token,
          },
          withCredentials: true,
        });
        console.log(response.data);

        if (response.data && response.status) {
          const owner = response.data.itemOwner;

          let myID = owner._id;
          console.log(myID);
          setUserID(myID);
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
  
  const Check =  () => {
    return userID === item?.ownerID;
  }

  return (
    <View style={styles.container}>
      <Card item={item} style={styles} />
      <FlatList
        style={styles.imageWrapper}
        data={item.pictures}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `item-${index}-${item.assetId || 'fallback'}`}
        renderItem={({ item }) => (
          <Pressable onPress={() => showFullImage(item)}>
            <Image style={styles.imageStyle} source={{ uri: item.pictureUrls }} />
          </Pressable>
        )}
      />

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => navigation.navigate('View', { stash: item })}
          style={({ pressed }) => [
            styles.button, pressed && styles.buttonPressed,
            userID === item.ownerID && styles.disabledButton ||  item.FoundStatus && styles.disabledButton
          ]}
          disabled={userID === item.ownerID || item.FoundStatus === true}
        >
          <Image style={styles.infoIcon} source={require("../../assets/myIMGs/pan_tool.png")} />
          <Text style={styles.buttonText}>I Found it</Text>
        </Pressable>
      </View>

      <ImageModal image={image} showPicture={showPicture} setShowPicture={() => setShowPicture(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 15,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  imageWrapper: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    borderRadius: 10,
  },
  imageStyle: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  disabledButton: {
    backgroundColor: '#ccc', // Gray out the button
    opacity: 0.6,
  },
  disabledText: {
    color: '#999', // Light text color for disabled state
  },  
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  buttonPressed: {
    opacity: 0.6,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LostStash;