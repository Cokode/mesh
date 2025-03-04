import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Pressable } from "react-native";
import { stashProp } from "../urls/stashObject";
import ImageModal from "../views/imageModal";
import Card from "./userCard";

const LostStash = (props) => {
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [showPicture, setShowPicture] = useState(false);

  const { pictures, item  } = props;

  const showFullImage = (value) => {
    console.log(value.assetId);
    console.log(value._id + " Image ID");
    setImage(value);
    setShowPicture(true);
  };

  return (
    <>
      <Card item={item} style={styles} image={image}/>
      <FlatList
        style={styles.imageWrapper}
          data={pictures}
          horizontal
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item, index) => `item-${index}-${item.assetId || 'fallback'}`}
          renderItem={({ item }) => (
            <Pressable onPress={() => showFullImage(item)}>
              <Image
                style={styles.imageStyle}
                source={{ uri: `data:image/png;base64,${item.base64}` }}
                alt="image"
              />
            </Pressable> )}
      />

      <View style={styles.pressAreaWrapper}>
        <Pressable  onPress={() => navigation.navigate('View', { stash: item })} style={({ pressed }) => (pressed ? styles.highlight : styles.pressable)} >
          <Image style={styles.infoStyle} source={require("../../assets/myIMGs/pan_tool.png")}/>
          <Text style={styles.labelStyle}>I Found it</Text>
        </Pressable>

      </View> 

      <ImageModal
        image={image}
        showPicture={showPicture}
        setShowPicture={() => setShowPicture(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  pressAreaWrapper: {
    borderBlockColor: '#CECECE',
    borderWidth: 1,
  },
  commenetExpandStyle: {
    display: "flex",
    width: "100%",
    borderBlockColor: '#CECECE',
    borderWidth: 1
  },
  commenetStyle: {
   display: "flex",
    width: "100%",
    height:"auto",
    backgroundColor: "white",
    borderBlockColor: '#CECECE',
    borderWidth: 1
  },
  labelStyle: {
    fontSize: 15,
  },
  imageWrapper: {
    backgroundColor: "#f5f5f5", 
    paddingVertical: 10
  },
  imageStyle: {
    width: 365,
    height: 250,
    // borderRadius: 10,
    marginRight: 1.5,
    marginBottom: 1.5,
    shadowColor: 'rgb(0, 0, 0)',
    shadowsideY: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  infoStyle: {
    height: 25,
    width: 25,
    paddingRight: 5
  },
  highlight: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    opacity: 0.4,
    padding: 5
  },
  pressable: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 5
  },
  imgeStyle: {
    width: 15, 
    height: 10,
    color: '#CECECE'
  },
  detailsWrapper: {display: "flex", flexDirection: "row", alignItems: "center"},
  imageMemeStyle: {width: 30, height: 30 , borderRadius: 20}
})


export default LostStash;