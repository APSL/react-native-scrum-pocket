/* @flow */

import React from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import Colors from '../Colors';

type Props = {
  text: string,
  onPress: Function,
};

const SettingsCell = (props: Props) => (
  <TouchableRipple
    onPress={props.onPress}
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'pink',
      height: 42,
    }}>
    <Text>{props.text}</Text>
  </TouchableRipple>
);

export default SettingsCell;
