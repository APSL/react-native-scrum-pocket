/* @flow */

import React from 'react';
import {
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { Deck } from '../../Utils/DeckTypes';
import Card from '../../Common/Components/Card';

type State = {
  isHidden: boolean,
  zIndex: number,
  card: string,
};

class CardStack extends React.PureComponent<*, State> {
  _rotateY = new Animated.Value(0);

  _opacity = new Animated.Value(1);

  state = {
    isHidden: false,
    zIndex: 1,
    card: '',
  };

  getValue(): number {
    if (this.state.isHidden) {
      return 180;
    }
    return 0;
  }

  rotate() {
    Animated.parallel([
      Animated.timing(this._opacity, {
        duration: 500,
        toValue: this.state.isHidden ? 0 : 1,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(this._rotateY, {
        duration: 500,
        toValue: this.getValue(),
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }

  _onPressCard = (card: string) => {
    this.setState(
      (prev: State) => ({
        isHidden: !prev.isHidden,
        zIndex: prev.isHidden ? 1 : -1,
        card,
      }),
      () => this.rotate(),
    );
  };

  _renderItem = (item: { item: string, idx: number }) => (
    <Card title={item.item} onPress={this._onPressCard} idx={item.idx} />
  );

  _getKeyExtractor = (item: string, idx: number) => `card-${idx}`;

  render() {
    const { width, height } = Dimensions.get('window');
    const { card, zIndex } = this.state;
    const front = this._rotateY.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    const back = this._rotateY.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
    return (
      <>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  rotateY: back,
                },
              ],
            },
          ]}>
          <Card
            title={card}
            onPress={this._onPressCard}
            titleStyle={{
              fontSize: 120,
            }}
            style={{
              width: width - 100,
              height: 300,
              margin: 0,
            }}
          />
        </Animated.View>
        <Animated.FlatList
          style={[
            styles.items,
            {
              zIndex,
              opacity: this._opacity,
              transform: [
                {
                  rotateY: front,
                },
              ],
            },
          ]}
          numColumns={3}
          scrollEnabled={false}
          data={Deck.TShirt}
          keyExtractor={this._getKeyExtractor}
          renderItem={this._renderItem}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  items: {
    backfaceVisibility: 'hidden',
  },
});

export default CardStack;
