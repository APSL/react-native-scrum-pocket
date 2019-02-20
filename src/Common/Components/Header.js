/* @flow */

import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Platform,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Colors from '../Colors';

type Props = {
  hiddenAnimation: Animated.Value,
  scroll: Animated.Value,
  pages: Array<string>,
  onPress: Function,
};

const Header = (props: Props) => {
  const { width } = Dimensions.get('window');
  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: props.hiddenAnimation.interpolate({
              inputRange: [0, 180],
              outputRange: [0, -80],
            }),
          },
        ],
      }}>
      <View style={styles.container}>
        {props.pages.map((page: string, idx: number) => {
          const start = idx * width;
          const color = props.scroll.interpolate({
            inputRange: [start - width, start, start + width],
            outputRange: [Colors.Grey500, Colors.White, Colors.Grey500],
            extrapolate: 'clamp',
          });
          const scale = props.scroll.interpolate({
            inputRange: [start - width, start, start + width],
            outputRange: [1.0, 1.2, 1.0],
            extrapolate: 'clamp',
          });
          const translateY = props.scroll.interpolate({
            inputRange: [start - width, start, start + width],
            outputRange: [0.0, 0.5, 0.0],
            extrapolate: 'clamp',
          });
          return (
            <TouchableRipple
              key={`page-${page}`}
              onPress={() => props.onPress(idx)}>
              <Animated.Text
                style={[
                  styles.title,
                  {
                    color,
                    transform: [{ scale }, { translateY }],
                    fontWeight: '600',
                  },
                ]}>
                {page}
              </Animated.Text>
            </TouchableRipple>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomColor: Colors.Grey500,
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  title: {
    fontFamily: 'AvenirNextCondensed-Regular',
    padding: 10,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
        fontSize: 13,
      },
    }),
  },
});

export default Header;
