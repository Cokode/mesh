import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable, FlatList, Image } from "react-native";
import Spacer from "./spacer";

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

          <View style={{justifyContent: "center", flexDirection: "row"}}>
            <Text>{itemName}</Text>
            <Text>{sp_Number}</Text>
            <Text>{`${dateAdded} ${timeAdded}`}</Text>
          </View>

          <View>
            <Text>{itemDesc}</Text>
            <Text style={styles.expandText}>Expand</Text>
          </View> 

        </Pressable>
      ) : (
        <>
          <Pressable onPress={() => setExpandList(!expandList)} style={styles.touchable}>
            <View style={{ width: "100%", height: 50, backgroundColor: "orange" }}>
              <Text style={styles.expandText}>Collapse</Text>
            </View>
          </Pressable>

          <FlatList
            style={[styles.ListGroup, { paddingHorizontal: 10 }]}
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
          <Spacer />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 3,
    backgroundColor: "white",
    borderRadius: 10,
  },
  outStyle: {
    marginBottom: 4,
    marginVertical: 3,
    padding: 10,
    backgroundColor: 'rgba(230, 235, 227, 0.71)'
  },
  imageStyle: {
    width: 150,
    height: 200,
    borderRadius: 5,
    marginRight: 10,
  },
  ListGroup: {
    marginBottom: 3,
    borderWidth: 1,
    borderColor: "orange",
  },
  expandText: {
    color: "blue",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default LostView;
