/* @flow */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Easing,
} from 'react-native';

type Props = {
  title: string,
  idx: number,
  onPress: Function,
  style: number | Object,
  titleStyle: number | Object,
};

class Card extends React.PureComponent<Props> {
  _rotateY = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(this._rotateY, {
      duration: 500,
      toValue: 180,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const rotateY = this._rotateY.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '0deg'],
    });
    const { onPress, style, titleStyle, title } = this.props;
    return (
      <TouchableOpacity onPress={() => onPress(title)}>
        {title.startsWith('#') ? (
          <Animated.View
            style={[
              styles.card,
              style,
              {
                backgroundColor: title,
                transform: [
                  {
                    rotateY,
                  },
                ],
              },
            ]}
          />
        ) : (
          <Animated.View
            style={[
              styles.card,
              style,
              {
                transform: [
                  {
                    rotateY,
                  },
                ],
              },
            ]}>
            <Text style={[styles.number, titleStyle]}>{title}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
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
    backgroundColor: '#00BFFF',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  number: {
    fontSize: 30,
    fontFamily: Platform.select({
      ios: 'Avenir-Heavy',
      android: 'Roboto',
    }),
    color: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Card;
