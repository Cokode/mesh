import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Pressable, Dimensions } from "react-native";
import ImageModal from "../views/imageModal";
import Card from "./userCard";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width * 0.9; // 90% of screen width for better responsiveness
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.6; // Maintain aspect ratio

const LostStash = (props) => {
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [showPicture, setShowPicture] = useState(false);

  const { item } = props;

  const showFullImage = (value) => {
    setImage(value);
    setShowPicture(true);
  };

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
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
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