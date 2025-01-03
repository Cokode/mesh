import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, Image } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import StashTemplate from './stashTemplate';
import { items } from '../urls/stashObject';
import Spacer from './spacer';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const screenHeight = Dimensions.get("screen").height;
const item = items[0];

const StashList = () => {
  const [show, setShow] = useState(false);

  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const prevState = useSharedValue({ x: 0, y: 0 });
  const isModalVisible = useSharedValue(1);
  const last = screenHeight * 0.3;

  const hideModal = () => {
    setShow(!show); 
  };

  const showModal = () => {
    offset.value = { x: 0, y: 0 };
    setShow(!show);  
    isModalVisible.value = 1;
  };

  const dragGesture = Gesture.Pan()
    // .onStart(() => {
    //   offset.value = {
    //     x: 0,
    //     y: prevState.value.y,
    //   };
    // })
    .onUpdate((e) => {
      offset.value = withTiming({
        x: start.value.x,
        y: prevState.value.y > 0 ? prevState.value.y + e.translationY : e.translationY,
      }, {duration : 100});
    })
    .onEnd((e) => {
      console.log(" point in time " + e.translationY)
      if (e.velocityY > 800) {
        console.log("too fast" + e.velocityY);

        const maxTranslation = screenHeight * 0.5;
        const minOpacity = 0.3;
        const maxOpacity = 1;
        const opacity = Math.min(Math.max((maxTranslation - offset.value.y) / maxTranslation, minOpacity), maxOpacity);
        isModalVisible.value = opacity;

        offset.value = withTiming({ x: start.value.x, y: screenHeight * 0.9 }, { duration: 420 }, () => {
          runOnJS(hideModal)();
          offset.value = { x: 0, y: 5000 };
        });
      } else if (e.translationY > screenHeight * 0.4) {
        console.log(screenHeight + ": :" + e.translationY + " last: " + last)
        offset.value = withTiming({ x: start.value.x, y: last }, { duration: 400 });
        prevState.value.y = last;
      } else if (e.translationY < (screenHeight / 2) && offset.value.y > 100) {
        console.log(e.translationY + " lesser than s / 2 ") // TODO
        offset.value = withTiming({ x: start.value.x, y: e.translationY * 1.6 }, { duration: 400 });
        prevState.value.y = last * 1.6;
      } else {
        offset.value = withTiming({ x: start.value.x, y: start.value.y }, { duration: 400 });
        prevState.value.y = 0;
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: offset.value.y },
        { translateX: offset.value.x },
      ],
      opacity: isModalVisible.value, 
    };
  });

  return (
    <>
      <StashTemplate value={item} onpress={showModal} />
      <StashTemplate value={item} onpress={showModal} />
      <StashTemplate value={item} onpress={showModal} />
      <StashTemplate value={item} onpress={showModal} />
      <StashTemplate value={item} onpress={showModal} />
      <StashTemplate value={item} onpress={showModal} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => setShow(!show)}
      >
        <GestureDetector gesture={dragGesture}>
          <View style={styles.gestureContainer}>
            <Animated.View style={animatedStyle}>
              <View style={styles.animatedView}>
                <View style={styles.dragIndicator} />
                <Spacer />
                {/*<Button title='close me' onPress={() => setShow(!show)} /> */}
                <Text>Hello everyone</Text>
                 <Image style={styles.image} source={{url:"https://i.ibb.co/y4FY2cF/download.jpg"}} />
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
    backgroundColor: '#f9f9f9',
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