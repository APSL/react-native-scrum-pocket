/* @flow */

import React from 'react';
import { View, Animated, StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Colors from '../Colors';

type Props = {
  animated: Animated.Value,
  color: Animated.Value,
  pages: Array<string>,
  page: number,
  disabled: boolean,
  onPress: Function,
};

const Header = (props: Props) => {
  const { width } = Dimensions.get('window');
  const start = props.page * width;
  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: props.animated.interpolate({
              inputRange: [0, 180],
              outputRange: [0, -80],
            }),
          },
        ],
      }}>
      <View style={styles.container}>
        {props.pages.map((page: string, idx: number) => (
          <TouchableRipple key={`Page: ${page}`} onPress={() => props.onPress(idx)}>
            <Animated.Text
              style={[
                styles.title,
                {
                  color:
                    idx === props.page
                      ? props.color.interpolate({
                          inputRange: [0, 1],
                          outputRange: [Colors.White, Colors.Grey500],
                          extrapolate: 'clamp',
                        })
                      : Colors.Grey500,
                  fontWeight: idx === props.page ? '900' : 'normal',
                },
              ]}>
              {page}
            </Animated.Text>
          </TouchableRipple>
        ))}
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
  },
});

export default Header;
