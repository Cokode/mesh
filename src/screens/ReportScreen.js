import React, { useRef, useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, View, FlatList, Modal, Dimensions, TouchableWithoutFeedback} from "react-native";
import Spacer from "../components/spacer"; 
import KeyboardAvoiding from "../components/keyBoardAvoidingView";
import { RefreshControl, GestureHandlerRootView,  GestureDetector, Gesture, Pressable } from 'react-native-gesture-handler';
import useFetchStashes from "../hooks/useFetchData";
import ReportChoice from "../components/reportChoice";
import ReportComp from "../components/reportComp";
import { items } from "../urls/stashObject";
import LostView from "../components/lostView";
import { StatusBar } from "expo-status-bar";
import { clamp } from 'react-native-redash';
import Entypo from '@expo/vector-icons/Entypo';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const screenHeight = Dimensions.get("screen").height;

const ReportScreen = () => {
  const inputRef = useRef(null);

  const [padding, setPadding] = useState(0);
  const [show, setShow] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [reportDecision, setReportDecision] = useState(false);
 
  const { fetchStashes, errorMessage, stashes } = useFetchStashes();

  const [comment, setComment] = useState("");

  const bottomPadding = height => {
    setPadding(height);
  };

  const reportType = () => {
    setReportDecision(!reportDecision);
    console.log("choice is: " + reportDecision);
    return reportDecision;
  };

  const Empty = () => {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchStashes();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const hideModal = () => {
    console.log(comment);
    setTimeout(handleFocus, 100)
    setShow(!show); 
  };

  const showModal = () => {
    offset.value = { x: 0, y: 0 };
    setShow(!show);  
    isModalVisible.value = 1;
  };

  useEffect(() => {
    fetchStashes();
  },[]);


  const offset = useSharedValue({ x: 0, y: screenHeight / 2 }); // Start at y = 700
  const start = useSharedValue({ x: 0, y: screenHeight / 2 });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: offset.value.y },
      { translateX: offset.value.x },
    ],
    opacity: 1, 
  }));

  const panGesture = Gesture.Pan()
  .onBegin(() => {
    // Set offset to the last position when gesture begins
    offset.value = { ...start.value };
  })
  .onStart((e) => {
    // Update offset during the gesture start
    offset.value = {
      x: start.value.x,
      y: start.value.y + e.translationY, // Start from the last y position
    };
  })
  .onUpdate((e) => {
    // Clamp the movement and update offset
    offset.value = {
      x: start.value.x,
      y: clamp(start.value.y + (e.translationY > 0 ? 0 : 0), 0, 500), // Restrict to 200–700 px
    };
  })
  .onEnd((e) => {
    // Save the current position as the new start point
    start.value = { ...offset.value };
  });

  const handleFocus = () => {
    inputRef.current?.focus();
  };
  

  return (
    <KeyboardAvoiding>
       <GestureHandlerRootView style={{ flex: 1 }}>
      <>
        <ReportChoice type={reportType} />
        <Spacer />
        <View style={styles.divider}></View>

        { !reportDecision ? 
          (
            <>
              <ReportComp bottomPad={bottomPadding} />
              <View style={{ backgroundColor: 'orange', height: padding, marginTop: 20 }}></View>
            </>
          ) 
          : 
          (
            <GestureHandlerRootView style={{ flex: 1 }}>
              <FlatList 
                data={ stashes }
                renderItem={({ item }) => <LostView item={item} openModal={hideModal}/>}
                keyExtractor={ item =>  item.uri }
                ItemSeparatorComponent={() => (
                  <View 
                    style={{ 
                      height: 1, 
                      // backgroundColor: 'grey',
                      // marginBottom: 3
                    }} 
                  />
                )}
                ListEmptyComponent={<Empty />}
                refreshControl={ <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } /> }
                showsVerticalScrollIndicator
                  />
            </GestureHandlerRootView> 
          )
        }
      </>

      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={hideModal}
        // opacity={0.5}
        statusBarTranslucent={true}
        >
          <TouchableWithoutFeedback >
            <View style={{ flex: 1, alignContent: "flex-end", backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <GestureDetector gesture={panGesture}>
                <Animated.View style={[animatedStyle, { backgroundColor: 'white', padding: 20 }]}>
                  <View style={styles.commentContainer}>
                    <View  style={styles.inputContainer}>
                      <TextInput
                        style={styles.inputStyle}
                        ref={inputRef} // Attach ref
                        placeholder="Write a comment..." 
                        placeholderTextColor={"grey"} 
                        multiline={true}
                        keyboardAppearance="light"
                        returnKeyLabel="Done"
                        scrollEnabled
                        value={comment}
                        onChangeText={(e) => setComment(e)}
                        showsVerticalScrollIndicator
                        
                      />
                    </View>
        
                    <Pressable style={{ flex: 1, padding: 5}} onPress={hideModal}>
                      <Text style={{fontSize: 15,  color: "green", fontWeight: 500}}>Done</Text>
                    </Pressable>
                  </View>
              
                </Animated.View>
              </GestureDetector>
            </View>
          </TouchableWithoutFeedback>
      </Modal>

      {/* <StatusBar backgroundColor="red"/> */}
      </GestureHandlerRootView>
    </KeyboardAvoiding>
  );
};


const styles = StyleSheet.create({
  divider: {
    borderColor: '#1B6B93',
    marginBottom: 5,
    borderWidth: 1,
    marginHorizontal: 15,
  },
  commentContainer: {
    flex:1, 
    flexDirection: "row", 
    flexBasis:55, 
    justifyContent: "center", 
    alignItems : "center", 
    paddingBottom: 6
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputStyle: {
    fontSize: 15
  },
  inputContainer: {
    flex: 7,
    backgroundColor: 'rgba(241, 233, 233, 0.51)',
    height: 40,
    borderRadius: 15,
    paddingHorizontal: 10,
    textAlign: "auto",
    justifyContent: 'center',
  }
});

export default ReportScreen;
