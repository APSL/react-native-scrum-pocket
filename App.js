/* @flow */

import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SafeView from './src/Common/Components/SafeView';
import Card from './src/Common/Components/Card';
import CardStack from './src/Home/Components/CardStack';

class HomeScreen extends React.PureComponent<*> {
  static navigationOptions = {
    title: 'Standard',
    headerTitleStyle: {
      color: 'white',
    },
    headerStyle: {
      backgroundColor: 'black',
    },
  };

  render() {
    return (
      <SafeView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <CardStack />
      </SafeView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

export default createAppContainer(
  createStackNavigator({
    Standard: HomeScreen,
  }),
);
