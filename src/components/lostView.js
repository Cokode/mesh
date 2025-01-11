import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable, FlatList, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Spacer from "./spacer";
import InputSection from "./textInput";

const LostView = ({ item }) => {
  const { itemName, sp_Number, dateAdded, timeAdded, pictures, itemDesc } = item;
  const [expandList, setExpandList] = useState(true);

  const Empty = () => (
    <View>
      <Text>Empty</Text>
    </View>
  );

  return (
    <>
      {expandList ? (
        <Pressable onPress={() => setExpandList(!expandList)} style={styles.outStyle}>

          <View style={{justifyContent: "center", flexDirection: "row", paddingHorizontal: 10, marginHorizontal: 5}}>
            <Text style={{ fontSize: 12, color: "green", paddingRight: 20, fontWeight: 700}} >{itemName}</Text>
            <Text style={{ fontSize: 12, color: "green", paddingRight: 20, fontWeight: 700}}>{sp_Number}</Text>
            <Text style={{ fontSize: 12, color: "green", paddingRight: 20, fontWeight: 700}}>{`${dateAdded} ${timeAdded}`}</Text>
          </View>

          <View>
            <Text>{itemDesc}</Text>
            <AntDesign name="down" size={24} color="black" />
          </View> 

        </Pressable>
      ) : (
        <>
          <Pressable onPress={() => setExpandList(!expandList)} style={styles.touchable}>
            <View style={{ width: "100%", height: 50, backgroundColor: "white", borderColor: 'grey' }}>
             
            </View>
          </Pressable>

          <FlatList
            style={[styles.ListGroup, {  }]}
            horizontal
            data={pictures || []}
            keyExtractor={(item) => item.uri}
            renderItem={({ item }) => (
              <Image
                style={styles.imageStyle}
                source={{ uri: `data:image/png;base64,${item.base64}` }}
                alt="image"
              />
            )}
            ListEmptyComponent={<Empty />}
          />
          <InputSection CloseCard={ () => setExpandList(!expandList) } />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  touchable: {
    // marginBottom: 3,
    backgroundColor: "white",
    borderRadius: 10,
  },
  outStyle: {
    marginBottom: 4,
    marginVertical: 5,
    padding:10,
    backgroundColor: 'rgba(230, 235, 227, 0.71)',
    marginHorizontal: 10
  },
  imageStyle: {
    width: 150,
    height: 200,
    borderRadius: 5,
    marginRight: 2,
  },
  ListGroup: {
    // borderWidth: 1,
    // borderColor: "",
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 0.11
  },
  expandText: {
    color: "blue",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default LostView;
