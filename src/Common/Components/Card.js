/* @flow */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  title: string,
  idx: number,
  onPress: Function,
};

const Card = (props: Props) => (
  <TouchableOpacity onPress={() => props.onPress(props.idx)}>
    <View style={styles.card}>
      <Text style={styles.number}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    margin: 20,
    width: 73,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
  number: {
    fontSize: 25,
    fontFamily: 'Avenir-Heavy',
    color: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Card;
