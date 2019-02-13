/* @flow */

import React from 'react';
import { Animated, StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SafeView from './src/Common/Components/SafeView';
import CardStack from './src/Home/Components/CardStack';
import Deck from './src/Utils/DeckTypes';
import Slider from './src/Common/Components/Slider';
import SliderItem from './src/Common/Components/SliderItem';
import About from './src/Home/Components/About';

type State = {
  hidden: boolean,
};

class HomeScreen extends React.PureComponent<*, State> {
  state = {
    hidden: false,
  };

  _onPressCard = () => {
    this.setState((prev: State) => ({
      hidden: !prev.hidden,
    }));
  };

  render() {
    return (
      <SafeView>
        <StatusBar barStyle="light-content" />
        <Slider
          pages={['About', 'Standard', 'T-Shirt', 'Fibonacci', 'Risk Planning']}
          hidden={this.state.hidden}
          initialPage={1}
          items={(page: number, animated: Animated.Value) => (
            <>
              <SliderItem animated={animated} itemPage={0} page={page}>
                <About />
              </SliderItem>
              <SliderItem animated={animated} itemPage={1} page={page}>
                <CardStack deck={Deck.Standard} onPressCard={this._onPressCard} />
              </SliderItem>
              <SliderItem animated={animated} itemPage={2} page={page}>
                <CardStack deck={Deck.TShirt} onPressCard={this._onPressCard} />
              </SliderItem>
              <SliderItem animated={animated} itemPage={3} page={page}>
                <CardStack deck={Deck.Fibonacci} onPressCard={this._onPressCard} />
              </SliderItem>
              <SliderItem animated={animated} itemPage={4} page={page}>
                <CardStack
                  deck={Deck.RiskPlanning}
                  onPressCard={this._onPressCard}
                />
              </SliderItem>
            </>
          )}
        />
      </SafeView>
    );
  }
}

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
