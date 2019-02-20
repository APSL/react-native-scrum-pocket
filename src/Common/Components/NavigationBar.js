/* @flow */

import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Colors from '../Colors';
import SafeView from './SafeView';

type Props = {
  onPress: () => void,
};

const NavigationBar = (props: Props) => (
  <SafeView style={styles.container}>
    <IconButton
      color={Colors.White}
      icon="close"
      onPress={props.onPress}
      style={styles.button}
    />
  </SafeView>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    zIndex: 1,
  },
  button: {
    position: 'absolute',
    right: 0,
  },
});

export default NavigationBar;
