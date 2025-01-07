import React from "react";
import { Image, Pressable, View, StyleSheet, Text } from "react-native";

const renderItem = ({ item, imageUpdater, onDelete }) => {
  return (
    <View style={styles.imageWrapper}>
      {item.uri === "uploader" ? (
        <Pressable onPress={imageUpdater}>
          <Image
            style={styles.uploadImage}
            source={require("../../assets/myIMGs/2094736.png")}
          />
        </Pressable>
      ) : (
        <>
          <Image style={styles.uploadImage} source={{ uri: item.uri }} />
          <Pressable
            pressRetentionOffset= {{bottom: 200, left: 300, right: 100, top: 200}}
            style={styles.deleteButton} 
            onPress={() => onDelete(item)}>
            <Text style={styles.deleteText}>x</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const ListEmptyComponent = ({imageUpdater}) => {
  return (
    <View style={styles.imageWrapper}>
      <Pressable onPress={imageUpdater}>
        <Image
          style={styles.uploadImage}
          source={require("../../assets/myIMGs/2094736.png")}
        />
      </Pressable>
    </View>
   )
}

const styles = StyleSheet.create({
  imageWrapper: {
    position: "relative",
    margin: 1.5,
    justifyContent: 'center'
  },
  uploadImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    position: 'relative'
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export { renderItem, ListEmptyComponent };
