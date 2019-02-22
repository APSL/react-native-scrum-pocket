/* @flow */

import React from 'react';
import { Animated, StatusBar, AsyncStorage, Vibration, Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from './src/Context';
import SafeView from './src/Common/Components/SafeView';
import CardStack from './src/Home/Components/CardStack';
import Deck from './src/Utils/DeckTypes';
import Slider from './src/Common/Components/Slider';
import SliderItem from './src/Common/Components/SliderItem';
import Settings from './src/Home/Components/Settings';
import Theme from './src/Common/Theme';

type State = {
  hidden: boolean,
  deck: Array<string>,
};

class App extends React.PureComponent<*, State> {
  state = {
    hidden: false,
    deck: [],
  };

  async componentDidMount() {
    const items = JSON.parse(await AsyncStorage.getItem('deck'));
    if (items && items.length) {
      this.setState({
        deck: items,
      });
    }
  }

  _onPressCard = async () => {
    const vibrate = await AsyncStorage.getItem('vibrate');
    this.setState(
      (prev: State) => ({
        hidden: !prev.hidden,
      }),
      () => {
        if (vibrate === 'on') {
          Vibration.vibrate(200, false);
        }
      },
    );
  };

  /**
   * Function to get deck type at first render
   */
  getDeck(): Array<string> {
    if (this.state.deck === Deck.Standard) {
      return [];
    }
    return this.state.deck;
  }

  _onAddItem = (item: string) => {
    if (this.state.deck.includes(item)) {
      return Alert.alert(
        'The symbol you are trying to enter is already in the list',
      );
    }
    return this.setState(
      (prev: State) => ({
        // Add the new item to the previous array
        deck: [...prev.deck, item],
      }),
      async () => {
        await AsyncStorage.setItem('deck', JSON.stringify(this.state.deck));
      },
    );
  };

  _onRemoveItem = (item: string) => {
    const newItems = this.state.deck.filter((v: string) => v !== item);
    this.setState(
      () => {
        if (newItems.length === 0) {
          return {
            deck: Deck.Standard,
          };
        }
        return {
          deck: newItems,
        };
      },
      async () => {
        await AsyncStorage.setItem('deck', JSON.stringify(newItems));
      },
    );
  };

  _onRemoveAll = () => {
    this.setState(
      {
        deck: [],
      },
      async () => {
        // Erase all content and set Standard Deck by default
        await AsyncStorage.setItem('deck', JSON.stringify([]));
      },
    );
  };

  render() {
    return (
      <Provider
        value={{
          settings: {
            deck: this.getDeck(),
          },
          addItem: this._onAddItem,
          removeItem: this._onRemoveItem,
          eraseAll: this._onRemoveAll,
        }}>
        <PaperProvider theme={Theme}>
          <SafeView>
            <StatusBar barStyle="light-content" />
            <Slider
              hidden={this.state.hidden}
              initialPage={0}
              items={(page: number, animated: Animated.Value) => (
                <>
                  <SliderItem animated={animated} itemPage={0} page={page}>
                    <CardStack
                      deck={
                        !this.state.deck.length ? Deck.Standard : this.state.deck
                      }
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
              pages={[
                'Standard',
                'T-Shirt',
                'Fibonacci',
                'Risk Planning',
                'Settings',
              ]}
            />
          </SafeView>
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
