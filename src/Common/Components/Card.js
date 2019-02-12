/* @flow */

import React from 'react';
import { View, Text, StyleSheet, Animated, Platform, Easing } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Colors from '../Colors';

const AnimatedTouchableRipple = Animated.createAnimatedComponent(TouchableRipple);

type Props = {
  title: string,
  onPress: Function,
  style?: Object,
  titleStyle?: Object,
};

class Card extends React.PureComponent<Props> {
  _rotateY = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(this._rotateY, {
      duration: Math.round(Math.random() * 700),
      toValue: 180,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  _onPress = () => {
    this.props.onPress(this.props.title);
  };

  render() {
    const { style, titleStyle, title } = this.props;
    return (
      <AnimatedTouchableRipple
        onPress={this._onPress}
        borderless
        underlayColor={Colors.SemiYellow600}
        style={[
          styles.card,
          style,
          title.startsWith('#') && {
            backgroundColor: title,
          },
          {
            transform: [
              {
                rotateY: this._rotateY.interpolate({
                  inputRange: [0, 180],
                  outputRange: ['180deg', '0deg'],
                }),
              },
            ],
          },
        ]}>
        <>
          {!title.startsWith('#') && (
            <Text style={[styles.number, titleStyle]}>{title}</Text>
          )}
        </>
      </AnimatedTouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: 85,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Yellow600,
    borderWidth: 2,
    borderColor: Colors.White,
  },
  number: {
    fontSize: 30,
    fontFamily: Platform.select({
      ios: 'Avenir-Heavy',
      android: 'Roboto',
    }),
    color: Colors.White,
    textShadowColor: Colors.Black75,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 5,
  },
});

export default Card;
