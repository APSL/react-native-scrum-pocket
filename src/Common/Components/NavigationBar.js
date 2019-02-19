/* @flow */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Colors from '../Colors';

type Props = {
  onPress: () => void,
};

const NavigationBar = (props: Props) => (
  <View style={styles.container}>
    <IconButton
      icon="close"
      onPress={props.onPress}
      color={Colors.White}
      style={styles.button}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 56,
  },
  button: {
    position: 'absolute',
    right: 0,
  },
});

export default NavigationBar;
