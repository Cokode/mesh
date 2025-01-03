import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

const ListEmptyComponent = () => (
  <View style={styles.uploadImage}>
    <Image
      style={styles.uploadImage}
      source={require("../../assets/myIMGs/2094736.png")}
    />
  </View>
);

const renderItem = ({ item, imageUpdater, greyout }) => {
  if (item.imgUrl === "uploader") {
    return (
      <Pressable onPress={imageUpdater}>
        <Image
          style={[styles.uploadImage, {opacity: greyout ? 0.2 : 1}]}
          source={require("../../assets/myIMGs/2094736.png")}
        />
      </Pressable>
    );
  }
  return <Image style={styles.uploadImage} source={{ uri: item.imgUrl }} />;
};

const styles = StyleSheet.create({
  uploadImage: {
    width: 100,
    height: 100,
    padding: 1,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: .5,
    margin: 1.5
  },
});

export { ListEmptyComponent, renderItem };
