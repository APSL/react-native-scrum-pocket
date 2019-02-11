/* @flow */

import React from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';

type Props = {
  children: any,
  animated: Animated.Value,
  itemPage: number,
};

const SliderItem = (props: Props) => {
  const { width } = Dimensions.get('window');
  const start = props.itemPage * width;
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: props.animated.interpolate({
            inputRange: [start - width, start, start + width],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          }),
        },
      ]}
      horizontal={false}>
      {props.children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },
});

export default SliderItem;
