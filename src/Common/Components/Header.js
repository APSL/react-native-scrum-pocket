/* @flow */

import React from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { TouchableRipple, Colors } from 'react-native-paper';

type Props = {
  animated: Animated.Value,
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
        backfaceVisibility: 'hidden',
        transform: [
          {
            rotateX: props.animated.interpolate({
              inputRange: [0, 180],
              outputRange: ['0deg', '180deg'],
            }),
          },
        ],
      }}>
      <View style={styles.container}>
        {props.pages.map((page: string, idx: number) => (
          <TouchableRipple
            key={`Page: ${page}`}
            disabled={props.disabled}
            onPress={() => props.onPress(idx)}>
            <Animated.Text
              style={[
                styles.title,
                {
                  color:
                    idx === props.page
                      ? props.color.interpolate({
                          inputRange: [0, 1],
                          outputRange: [Colors.white, Colors.grey500],
                          extrapolate: 'clamp',
                        })
                      : Colors.grey500,
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
    height: 64,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  title: {
    fontFamily: 'AvenirNextCondensed-Regular',
    padding: 10,
  },
});

export default Header;
