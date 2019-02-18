/* @flow */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Headline, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmptyListComponent = () => (
  <View style={styles.container}>
    <Icon name="mood-bad" size={110} color={Colors.grey300} />
    <Headline style={styles.headline}>
      Oops! The list is empty! You can{' '}
      <Text style={{ fontWeight: 'bold', fontSize: 40 }}>+</Text> a new symbol
    </Headline>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    textAlign: 'center',
  },
});

export default EmptyListComponent;
