import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable, FlatList, Image, Modal } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Spacer from "./spacer";
import InputSection from "./textInput";

const LostView = ({ item, openModal }) => {
  const { itemName, sp_Number, dateAdded, timeAdded, pictures, itemDesc } = item;
  const [expandList, setExpandList] = useState(true);

  const [showPicture, setShowPicture] = useState(false);
  const [image, setImage] = useState({});

  const Empty = () => (
    <View>
      <Text></Text>
    </View>
  );

  const FullImage = (value) => {
    console.log(value.assetId)
    setImage(value);
    setShowPicture(!showPicture);
  }

  return (
    <>
      {expandList ? (
        <Pressable onPress={() => { 
           setExpandList(!expandList)
          }
          } style={styles.outStyle}>

          <View style={{justifyContent: "center", flexDirection: "row", paddingHorizontal: 10, marginHorizontal: 5}}>
            <Text style={{ fontSize: 12, color: "green", paddingRight: 20, fontWeight: 700}} >{itemName}</Text>
            <Text style={{ fontSize: 12, color: "green", paddingRight: 20, fontWeight: 700}}>{sp_Number}</Text>
            {/* <Text style={{ fontSize: 12, color: "green", paddingRight: 20, fontWeight: 700}}>{`${dateAdded} ${timeAdded}`}</Text> */}
          </View>

          <View>
            <Text>{itemDesc}</Text>
          </View> 

        </Pressable>
      ) : (
        <>
          {/* <Pressable onPress={() => setExpandList(!expandList)} style={styles.touchable}>
            <View style={{ width: "100%", height: 50, backgroundColor: "white", borderColor: 'grey' }}>
             
            </View>
          </Pressable> */}

          <FlatList
            style={styles.ListGroup}
            horizontal
            data={pictures || []}
            keyExtractor={(item) => item.uri}
            renderItem={({ item }) => (
             <Pressable onPress={() => FullImage(item)}>
               <Image
                style={styles.imageStyle}
                source={{ uri: `data:image/png;base64,${item.base64}` }}
                alt="image"
              />
             </Pressable>
            )}
            ListEmptyComponent={<Empty />}
            showsHorizontalScrollIndicator={false}
          />
          <InputSection CloseCard={ () => setExpandList(!expandList) } openModal={openModal}/>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showPicture}
            // onRequestClose={showPicture}
            opacity={0.5}
            statusBarTranslucent={true}
          >
           <View onPress={() => setShowPicture(false)} style={{flex: 1, padding: 10, backgroundColor: "black", justifyContent: "center"}}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={{uri: image.uri}}
                resizeMode="contain"
                alt="image"
              />

              <Text onPress={() => setShowPicture(false)} style={{color:"white", position: "absolute",  top: 120, left: 30}} >X</Text>
            </View>  
          </Modal>
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
    width: 350,
    height: 250,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 3,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  ListGroup: {
    // borderWidth: 1,
    // borderColor: "",
    // backgroundColor: "white",
    // paddingVertical: 5,
    paddingHorizontal: 0.11
  },
  expandText: {
    color: "blue",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default LostView;
