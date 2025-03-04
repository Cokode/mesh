import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, Image, FlatList } from 'react-native';
import { GestureDetector, Gesture, RefreshControl } from 'react-native-gesture-handler';
import StashTemplate from './stashTemplate';
import Spacer from './spacer';
import useFetchStashes from '../hooks/useFetchData';
import { clamp, withBouncing } from 'react-native-redash';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  withClamp,
  withDecay,
  Easing
} from 'react-native-reanimated';

let screenHeight = Dimensions.get("screen").height;

const StashList = () => {
  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { fetchStashes, errorMessage, stashes } = useFetchStashes();
  const [screenH, SetScreenH] = useState(screenHeight * 0.9)

  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: offset.value.y },
      { translateX: offset.value.x },
    ],
    opacity: 1, 
  }));

  const panGesture = Gesture.Pan()
  .onBegin(() => {
    console.log("Screen Height" + screenHeight)
    console.log("Start Y: ", + start.value.y)
    offset.value = { ...start.value };
  })
  .onStart((e) => {

    console.log(`onStart E: ${e.translationY} ___  Start: ${start.value.y}`)
    offset.value = {
      x: start.value.x,
      y: start.value.y + e.translationY}
     
  })
  .onUpdate((e) => {
    // Clamp the movement and update offset
    // Math.max(e.translationY+ start.value.y, 0 )}
    console.log(`Start-Y: ${start.value.y} +  e.Y: ${e.translationY}  =>  Total: ${e.translationY + start.value.y}`)
    console.log("\n")
    let valueY = e.translationY+ start.value.y;

    offset.value = withTiming({
      x: 0,
      y: Math.max(e.translationY+ start.value.y, 0)}, {duration: 5}
    ) 
  })
  .onEnd(() => {
    const threshold = (screenHeight / 2) * .7; // Halfway point for bounce back
    const shouldSettleAtBottom = start.value.y >= threshold;

    offset.value = withSpring({x: 0, y: 0}, {stiffness: 250, damping: 150 })
    start.value = {x: 0, y: 0 }; 
  }).
  runOnJS(true);

  const handleFocus = () => {
    inputRef.current?.focus();
  };
    

  
  const hideModal = () => {
    console.log("pressed Hide Modal.")
    setShow(!show); 
   start.value = withTiming({x: 0, y: 0})
   offset.value = withTiming({x: 0, y: 0})
  };

  const showModal = () => {
    offset.value = { x: 0, y: 0 };
    setShow(!show);  
  };

  const onRefresh = () => {
    setRefreshing(true);

    fetchStashes();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <>
      <FlatList
        data={stashes}
        keyExtractor={item => item.uri}
        renderItem={({ item }) => <StashTemplate value={item} onpress={showModal} />}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={<Text>No data available. Pull down to refresh.</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => setShow(!show)}
      >
        <GestureDetector gesture={panGesture}>
          <View style={styles.gestureContainer}>
            <Animated.View style={animatedStyle}>
              <View style={styles.animatedView}>
                <View style={styles.dragIndicator} />
                <Spacer />
                <Text onPress={hideModal} >Hello everyone here</Text>
                <Image style={styles.image} source={require("../../assets/myIMGs/image2.png")} />
              </View>
            </Animated.View>
          </View>
        </GestureDetector>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  animatedView: {
    height: screenHeight * 0.95,
    // backgroundColor: '#f9f9f9',
    // backgroundColor: "orange",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
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
  image: {
    height: 400,
    width: 250,
    borderRadius: 10
  }
});

export default StashList;