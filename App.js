/* @flow */

import React from 'react';
import { Animated, StatusBar, AsyncStorage, Vibration } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from './src/Context';
import SafeView from './src/Common/Components/SafeView';
import CardStack from './src/Home/Components/CardStack';
import Deck from './src/Utils/DeckTypes';
import Slider from './src/Common/Components/Slider';
import SliderItem from './src/Common/Components/SliderItem';
import Settings from './src/Home/Components/Settings';
import Colors from './src/Common/Colors';

type State = {
  hidden: boolean,
  deck: Array<string>,
};

class App extends React.PureComponent<*, State> {
  state = {
    hidden: false,
    deck: [],
  };

  componentDidMount() {
    AsyncStorage.getItem('deck').then((deck: string) => {
      const items = JSON.parse(deck);
      if (items && items.length) {
        this.setState({ deck: [] });
      }
    });
  }

  _onPressCard = () => {
    AsyncStorage.getItem('vibrate').then((v: string) => {
      if (v === 'on') {
        Vibration.vibrate(400, false);
      }
    });
    this.setState((prev: State) => ({
      hidden: !prev.hidden,
    }));
  };

  /**
   * Function to get deck type
   */
  getDeck(): Array<string> {
    if (this.state.deck === Deck.Standard) {
      return [];
    }
    return this.state.deck;
  }

  render() {
    return (
      <Provider
        value={{
          settings: {
            deck: this.getDeck(),
          },
          addItem: (item: string) => {
            const newItems = [...this.state.deck, item];
            AsyncStorage.setItem('deck', JSON.stringify(newItems)).then(() => {
              this.setState({
                deck: newItems,
              });
            });
          },
          removeItem: (item: string) => {
            const newItems = this.state.deck.filter((v: string) => v !== item);
            AsyncStorage.setItem('deck', JSON.stringify(newItems)).then(() => {
              this.setState({
                deck: newItems,
              });
            });
          },
        }}>
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
              initialPage={0}
              items={(page: number, animated: Animated.Value) => (
                <>
                  <SliderItem animated={animated} itemPage={0} page={page}>
                    <CardStack
                      deck={this.state.deck}
                      onPressCard={this._onPressCard}
                    />
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
      </Provider>
    );
  }
}

export default App;
