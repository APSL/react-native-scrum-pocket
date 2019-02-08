/* @flow */

import React from 'react';
import {
  View,
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

import type { DeckType } from '../../Utils/DeckTypes';

type Props = {
  deck: DeckType,
};
type State = {
  isHidden: boolean,
  zIndex: number,
  card: string,
};

class CardStack extends React.PureComponent<Props, State> {
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
      <View style={{ alignItems: 'center' }}>
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
              height: 340,
              margin: 0,
              borderWidth: 5,
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
          contentContainerStyle={styles.contentContainerStyle}
          numColumns={3}
          scrollEnabled={false}
          data={this.props.deck}
          keyExtractor={this._getKeyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  items: {
    backfaceVisibility: 'hidden',
  },
  contentContainerStyle: {
    justifyContent: 'center',
  },
});

export default CardStack;
