import React, { Children, useEffect, useState } from "react";
import { Modal, Dimensions, StyleSheet, View } from "react-native";
import { GestureDetector, Gesture, RefreshControl } from 'react-native-gesture-handler';
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

export default function ModalView ({ children, visible, valid, item, onClose }) {

  const [show, setShow] = useState(visible);

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
      if (onClose) onClose();
     start.value = withTiming({x: 0, y: 0})
     offset.value = withTiming({x: 0, y: 0})
    };
  
    const showModal = () => {
      offset.value = { x: 0, y: 0 };
      setShow(!show);  
    };

  return (

    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => setShow(!show)}
    >
      <GestureDetector gesture={panGesture}>
        <View style={styles.gestureContainer}>
          <Animated.View style={animatedStyle}>
            <View>
            {React.cloneElement(children, { closeModal: hideModal, data: valid, item: item })}
            </View>
          </Animated.View>
        </View>
      </GestureDetector>
    </Modal>
  )
};

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  animatedView: {
    height: screenHeight * 0.95,
    // backgroundColor: '#f9f9f9',
    backgroundColor: "orange",
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