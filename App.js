/* @flow */

import React from 'react';
import { FlatList, StyleSheet, StatusBar } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SafeView from './src/Common/Components/SafeView';
import Card from './src/Common/Components/Card';

const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
  add,
  sub,
  multiply,
  inteporlate,
} = Animated;

class HomeScreen extends React.PureComponent<*> {
  _rotateY = new Animated.Value(0);

  static navigationOptions = {
    title: 'Standard',
    headerTitleStyle: {
      color: 'white',
    },
    headerStyle: {
      backgroundColor: 'black',
    },
  };

  componentDidMount() {
    // TODO: Animate
    this.rotateY = Animated.timing(this._rotateY, {
      duration: 1500,
      toValue: 3,
      easing: Easing.linear(Easing.sin),
    });
  }

  _onPressCard = () => {
    this.rotateY.start();
  };

  _renderItem = (item: { item: string, index: number }) => (
    <Animated.View
      style={[
        {
          transform: [
            {
              // rotateY: this._rotateYCard,
            },
          ],
        },
      ]}>
      <Card title={item.item} onPress={this._onPressCard} idx={item.index} />
    </Animated.View>
  );

  _getKeyExtractor = (item: string, index: number) => `card-${index}`;

  render() {
    const data: Array<string> = [
      '0',
      '1/2',
      '1',
      '2',
      '3',
      '5',
      '8',
      '13',
      '20',
      '40',
      '100',
      '∞',
      '?',
      '☕',
    ];
    return (
      <SafeView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                {
                  rotateY: this._rotateY,
                },
              ],
            },
          ]}>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            numColumns={3}
            scrollEnabled={false}
            data={data}
            keyExtractor={this._getKeyExtractor}
            renderItem={this._renderItem}
          />
        </Animated.View>
      </SafeView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center',
  },
  contentContainerStyle: {
    flexDirection: 'column',
  },
});

const AppNavigator = createStackNavigator({
  Standard: HomeScreen,
});

export default createAppContainer(AppNavigator);
