import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, Image, FlatList } from 'react-native';
import { GestureDetector, Gesture, RefreshControl } from 'react-native-gesture-handler';
import StashTemplate from './stashTemplate';
import Spacer from './spacer';
import useFetchStashes from '../hooks/useFetchData';
import { clamp } from 'react-native-redash';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withClamp,
} from 'react-native-reanimated';

const screenHeight = Dimensions.get("screen").height;

const StashList = () => {
  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { fetchStashes, errorMessage, stashes } = useFetchStashes();

  const offset = useSharedValue({ x: 0, y: screenHeight}); // Start at y = 700
  const start = useSharedValue({ x: 0, y: screenHeight * -1 });

  const prevState = useSharedValue({ x: 0, y: 0 });
  const isModalVisible = useSharedValue(1);
  const last = screenHeight * 0.3;

  const hideModal = () => {
    console.log("pressed Hide Modal.")
    setShow(!show); 
  };

  const showModal = () => {
    offset.value = { x: 0, y: 0 };
    setShow(!show);  
    isModalVisible.value = 1;
  };

  const onRefresh = () => {
    setRefreshing(true);

    fetchStashes();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: offset.value.y },
      { translateX: offset.value.x },
    ],
    opacity: 1, 
  }));

  const panGesture = Gesture.Pan()
  .onUpdate((e) => {
    // Clamp the movement and update offset
    offset.value = {
      x: 0,
      y: Math.max(e.translationY + start.value.y, 0),
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
              <View onPress={hideModal} style={styles.animatedView}>
                <View style={styles.dragIndicator} />
                <Spacer />
                <Text onPress={hideModal} >Hello everyone here</Text>
                <Image style={styles.image} source={{ uri: "https://i.ibb.co/y4FY2cF/download.jpg" }} />
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