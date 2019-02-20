/* @flow */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Headline, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmptyListComponent = () => (
  <View style={styles.container}>
    <Icon color={Colors.grey300} name="mood-bad" size={110} />
    <Headline style={styles.headline}>
      Oops! The list is empty! You can <Text style={styles.text}>+</Text> a new card
      at the top of the list
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
