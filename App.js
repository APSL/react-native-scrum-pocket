/* @flow */

import React from 'react';
import { View, StyleSheet, StatusBar, SegmentedControlIOS } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SafeView from './src/Common/Components/SafeView';
import Card from './src/Common/Components/Card';
import CardStack from './src/Home/Components/CardStack';
import { Deck } from './src/Utils/DeckTypes';

import type { DeckType } from './src/Utils/DeckTypes';

type State = {
  deckType: DeckType,
  selectedIndex: number,
  navigation: Object,
};

class HomeScreen extends React.PureComponent<*, State> {
  static navigationOptions = {
    title: 'Standard',
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerStyle: {
      backgroundColor: 'black',
    },
  };

  state = {
    deckType: Deck.Standard,
    selectedIndex: 0,
  };

  _onChange = (event: Object) => {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  };

  render() {
    const types = ['Standard', 'T-Shirt', 'Fibonacci', 'Risk Planning'];
    return (
      <SafeView>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <CardStack deck={Object.values(Deck)[this.state.selectedIndex]} />
        </View>
        <SegmentedControlIOS
          style={styles.segmented}
          values={types}
          tintColor="#FFFFFF"
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}
        />
      </SafeView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmented: {
    margin: 20,
  },
});

export default createAppContainer(
  createStackNavigator(
    {
      Standard: HomeScreen,
    },
    {
      headerMode: 'none',
    },
  ),
);
