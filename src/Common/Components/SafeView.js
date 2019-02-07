/* @flow */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

type Props = {
  children: *,
  style?: Object | number,
};

const SafeView = (props: Props) => (
  <SafeAreaView style={[styles.container, props.style]}>
    {props.children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default SafeView;
