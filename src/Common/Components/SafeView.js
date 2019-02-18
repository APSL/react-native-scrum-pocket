/* @flow */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Colors from '../Colors';

type Props = {
  children: *,
  style?: Object,
};

const SafeView = (props: Props) => (
  <SafeAreaView style={[styles.container, props.style]}>
    {props.children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Black100,
  },
});

export default SafeView;
