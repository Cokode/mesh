import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Pressable, StyleSheet, View, Text } from 'react-native';

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

export default function ImageLoading( {display}) {
  const sv = useSharedValue(0);

  React.useEffect(() => {
    // highlight-next-line
    sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  return (
    <View style={styles.container}>
      <Pressable onPress={display}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Text style ={{marginTop: 30, }}>Loading ...</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: "rgb(40, 40, 138)"
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
  },
});