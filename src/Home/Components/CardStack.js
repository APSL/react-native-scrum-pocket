/* @flow */

import React from 'react';
import { StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import Card from '../../Common/Components/Card';

type Props = {
  deck: Array<string>,
  onPressCard: (card: string) => void,
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

  _getValue = (): number => {
    if (this.state.isHidden) {
      return 180;
    }
    return 0;
  };

  _rotate = () => {
    Animated.parallel([
      Animated.timing(this._opacity, {
        duration: 350,
        toValue: this.state.isHidden ? 0 : 1,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(this._rotateY, {
        duration: 350,
        toValue: this._getValue(),
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  _onPressCard = (card: string) => {
    this.setState(
      (prev: State) => ({
        isHidden: !prev.isHidden,
        zIndex: prev.isHidden ? 1 : -1,
        card,
      }),
      () => {
        this._rotate();
        this.props.onPressCard(this.state.card);
      },
    );
  };

  _renderItem = (item: { item: string, idx: number }) => (
    <Card title={item.item} onPress={this._onPressCard} />
  );

  _getKeyExtractor = (item: string, idx: number) => `card-${idx}`;

  render() {
    const { width } = Dimensions.get('window');
    const { card, zIndex } = this.state;
    return (
      <>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  rotateY: this._rotateY.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['180deg', '360deg'],
                  }),
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
              width: width - 80,
              height: 340,
              margin: 0,
              borderWidth: 4,
            }}
          />
        </Animated.View>
        <Animated.FlatList
          style={[
            {
              zIndex,
              opacity: this._opacity,
            },
          ]}
          contentContainerStyle={styles.contentContainerStyle}
          numColumns={3}
          data={this.props.deck}
          keyExtractor={this._getKeyExtractor}
          renderItem={this._renderItem}
        />
      </>
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
  contentContainerStyle: {
    alignSelf: 'center',
  },
});

export default CardStack;
