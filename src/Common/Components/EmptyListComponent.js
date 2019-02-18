/* @flow */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Headline } from 'react-native-paper';

const EmptyListComponent = () => (
  <View style={styles.container}>
    <IconButton icon="info-outline" size={30} />
    <Headline>Ooops! The list is empty!</Headline>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmptyListComponent;
