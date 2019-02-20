/* @flow */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';

const EmptyListComponent = () => (
  <View style={styles.container}>
    <Headline style={styles.headline}>Oops! The list is empty!</Headline>
    <Headline style={styles.headline}>
      You can <Text style={styles.text}>+</Text> a new card at the top of the list
    </Headline>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  headline: {
    textAlign: 'center',
  },
});

export default EmptyListComponent;
