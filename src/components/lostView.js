import React, { useState, useRef, useEffect } from "react";
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import useLoadReport from "../hooks/useLoadReport";
import { 
  Text, 
  StyleSheet, 
  View, 
  Pressable, 
  FlatList, Image,
   Modal, TouchableWithoutFeedback,
    Dimensions, TextInput,
    Keyboard,
  } from "react-native";
import InputSection from "./textInput";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withSpring,
  ReduceMotion,
  Easing
} from 'react-native-reanimated';

const screenHeight = Dimensions.get("screen").height;

const LostView = ({ item, handleReport }) => {
  const { itemName, sp_Number, dateAdded, timeAdded, pictures, itemDesc } = item;

  const [expandList, setExpandList] = useState(false);
  const [showPicture, setShowPicture] = useState(false);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState({});
  const [isModalDown, setIsModalDown] = useState(false);
  const { handleSubmit, loading, errorMessage } = useLoadReport();
  

  const sideY = useSharedValue(630);
  const inputRef = useRef(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener("keyboardWillHide", () => {
     // setShow(false); // Directly set to `false` to avoid potential state toggling issues
     setIsModalDown(true)

      const customEasing = (t) => 1 - Math.pow(1 - t, 3);
      sideY.value = withTiming(730, { 
      duration: 280, 
      easing: Easing.out(Easing.quad) }) 

    });
    // Clean up the listener when the component unmounts
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const printcomment = (value) => {
    // console.log("Comment Value: ", comment)
    // console.log("Param Value:    "+  value)

    if (!comment) {
      sideY.value = withTiming(800, { 
      duration: 10, 
       easing: Easing.out(Easing.quad) }) 
  

      setIsModalDown(true);
      setShow(false);
    }
  } 

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener("keyboardWillShow", () => {
     // setShow(false); // Directly set to `false` to avoid potential state toggling issues
     setIsModalDown(false)

     if (sideY.value >= 730) {
      sideY.value = withSpring(425, 
        {stiffness: 360, damping: 60, mass: 1,
          overshootClamping: true, restDisplacementThreshold: 0.01
        })
     }
    });
  
    // Clean up the listener when the component unmounts
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const FullImage = (value) => {
    console.log(value.assetId)
    console.log(image._id + " Image ID")
    setImage(value);
    setShowPicture(!showPicture);
  }

  const showModal = () => { 
    sideY.value = withTiming(425, { duration: 200 });
    setShow(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const hideModal = () => {
    sideY.value = withTiming(500, { duration: 200 });
    setShow(false);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: sideY.value } ],
    opacity: 1, 
  }));

  const panGesture = Gesture.Pan()

  const Empty = () => (
    <View>
      <Text></Text>
    </View>
  );

  const handleOutsidePress = (event) => {
    // Check if the target is not the TextInput or Pressable
    if (event.target !== inputRef?.current && event.target !== "submitButton") {
      Keyboard.dismiss();
    }
    Keyboard.focus()
  };

  const onSubmit = async () => {
    const result = await handleSubmit(comment, item._id, 2);
    console.log(result, " in onSubmit"); // Handle the result if needed
    setTimeout(()=> console.log("loading", loading), 300); // STATUS OF LOADING DOES NOT CHANGE. 
  };

  return (
    <>
      {!expandList ? (
        <Pressable onPress={ () => {  setExpandList(!expandList) } } style={ styles.outStyle }>
          <View style={{ justifyContent: "center", flexDirection: "row", paddingHorizontal: 10, marginHorizontal: 5}}>
            <Text style={{ fontSize: 12, color: "green", paddingRight: 20, fontWeight: 700}} >{itemName}</Text>
            <Text style={{ fontSize: 12, color: "green", paddingRight: 20, fontWeight: 700}}>{sp_Number}</Text>
          </View>

          <View>
            <Text>{ itemDesc }</Text>
          </View> 
        </Pressable>
      ) : (
        <>

          <FlatList   // FLATLIST  FOR DISPLAYING IMAGE OF A STASH.
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
          <InputSection CloseCard={ () => setExpandList(!expandList) } openModal={showModal} report={handleReport}/>

          <Modal
            animationType="none"
            transparent={true}
            visible={showPicture}
            // onRequestClose={showPicture}
            opacity={0.5}
            statusBarTranslucent={true}
          >
           <View onPress={() => setShowPicture(false)} style={{flex: 1, padding: 10, backgroundColor: "black", justifyContent: "center"}}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={{ uri: `data:image/png;base64,${image.base64}`}}
                resizeMode="contain"
                alt="image"
              />

              <Text onPress={() => setShowPicture(false)} style={{color:"white", position: "absolute",  top: 120, left: 30}} >X</Text>
            </View>  
          </Modal>
        </>
      )} 

      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => setShow(!show)}
      >
        <TouchableWithoutFeedback onPress={handleOutsidePress} >
          <GestureDetector gesture={panGesture}>
            <View style={styles.gestureContainer}>
              <Animated.View style={animatedStyle}> 
                <View onPress={hideModal} style={styles.animatedView}>
                    <View style={ styles.inputContainer}>
                      <TextInput 
                        style={styles.inputStyle} 
                        placeholder="Enter comment"
                        ref={inputRef}
                        multiline
                        scrollEnabled
                        value={comment}
                        onChangeText={(e) => setComment(e)}
                        showsHorizontalScrollIndicator
                        onBlur={() => printcomment(comment)}
                        onEndEditing={()=> setComment(comment? comment + "END OF COMMENT": comment)} // TODO: 
                      /> 
                    </View>
                  {true &&
                    <Pressable onPress={onSubmit} style={styles.submitStyle} hitSlop={10} testID="submitButton">
                        <Text style={{fontWeight: 400, fontSize: 14}}>{ isModalDown ? "Submit" : "Done" }</Text>
                    </Pressable> 
                  }
                </View>
              </Animated.View>
            </View>
          </GestureDetector>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 16,
    padding: 12,
  },
  submitStyle: {
    // backgroundColor: "red",
    flex: 1,
    padding: 10
  },
  inputContainer: {
    width: "78%",
    backgroundColor: "#d7dbdd",
    borderWidth: 0.2,
    borderColor: "rgb(191, 211, 211)",
    borderRadius: 20,
    height: 40,
    marginLeft: 10
  },
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
  gestureContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  animatedView: {
    flexDirection: "row",
    height: screenHeight / 2,
    backgroundColor : "rgb(233, 233, 235)",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    paddingVertical: 5,
    alignContent: "space-around",
    shadowColor: "#000",
    shadowsideY: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dragIndicator: {
    width: 50,
    height: 3,
    backgroundColor: "rgba(0, 0, 0, 0.64)",
    borderRadius: 2.5,
    marginBottom: 10,
  },
 
  imageStyle: {
    width: 350,
    height: 250,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 1.5,
    shadowColor: 'rgb(0, 0, 0)',
    shadowsideY: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  ListGroup: {
    paddingHorizontal: 0.11
  },
});

export default LostView;
