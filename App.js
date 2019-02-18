/* @flow */

import React from 'react';
import { Animated, StatusBar } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SafeView from './src/Common/Components/SafeView';
import CardStack from './src/Home/Components/CardStack';
import Deck from './src/Utils/DeckTypes';
import Slider from './src/Common/Components/Slider';
import SliderItem from './src/Common/Components/SliderItem';
import Settings from './src/Home/Components/Settings';
import Colors from './src/Common/Colors';

type State = {
  hidden: boolean,
};

class App extends React.PureComponent<*, State> {
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
      <PaperProvider
        theme={{
          ...DefaultTheme,
          dark: true,
          colors: {
            ...DefaultTheme.colors,
            primary: Colors.Yellow600,
            text: Colors.White,
            placeholder: Colors.Grey500,
          },
        }}>
        <SafeView>
          <StatusBar barStyle="light-content" />
          <Slider
            pages={[
              'Standard',
              'T-Shirt',
              'Fibonacci',
              'Risk Planning',
              'Settings',
            ]}
            hidden={this.state.hidden}
            initialPage={4}
            items={(page: number, animated: Animated.Value) => (
              <>
                <SliderItem animated={animated} itemPage={0} page={page}>
                  <CardStack deck={Deck.Standard} onPressCard={this._onPressCard} />
                </SliderItem>
                <SliderItem animated={animated} itemPage={1} page={page}>
                  <CardStack deck={Deck.TShirt} onPressCard={this._onPressCard} />
                </SliderItem>
                <SliderItem animated={animated} itemPage={2} page={page}>
                  <CardStack
                    deck={Deck.Fibonacci}
                    onPressCard={this._onPressCard}
                  />
                </SliderItem>
                <SliderItem animated={animated} itemPage={3} page={page}>
                  <CardStack
                    deck={Deck.RiskPlanning}
                    onPressCard={this._onPressCard}
                  />
                </SliderItem>
                <SliderItem animated={animated} itemPage={4} page={page}>
                  <Settings />
                </SliderItem>
              </>
            )}
          />
        </SafeView>
      </PaperProvider>
    );
  }
}

export default App;
