/* @flow */

import * as React from 'react';
import { Animated, Dimensions, NativeEventEmitter, Easing } from 'react-native';
import Header from './Header';

type Props = {
  items: (page: number, animated: Animated.Value) => React.Element<any>,
  pages: Array<string>,
  initialPage: number,
  hidden: boolean,
};
type State = {
  page: number,
  width: number,
};

class Slider extends React.PureComponent<Props, State> {
  _scrollView: Animated.ScrollView;

  _xOffset: number;

  _animated = new Animated.Value(0);

  _rotateY = new Animated.Value(0);

  _color = new Animated.Value(0);

  state = {
    page: this.props.initialPage,
    width: 0,
  };

  constructor(props: Props) {
    super(props);
    this._scrollView = React.createRef();
    this._xOffset = 0;
  }

  getValue(): number {
    if (this.props.hidden) {
      return 180;
    }
    return 0;
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    Animated.sequence([
      Animated.timing(this._rotateY, {
        duration: 500,
        delay: 200,
        toValue: this.getValue(),
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(this._color, {
        duration: 250,
        toValue: 1,
      }),
      Animated.timing(this._color, {
        duration: 200,
        toValue: 0,
      }),
    ]).start();
  }

  _onScroll = (e: NativeEventEmitter) => {
    this._xOffset = e.nativeEvent.contentOffset.x;
    this.setState({
      page: Math.round(e.nativeEvent.contentOffset.x / this.state.width),
    });
  };

  /**
   * Set the page dimensions
   * @param e
   */
  setDimensions = (e: NativeEventEmitter) => {
    this.setState({
      width: e.nativeEvent.layout.width,
    });
  };

  _onPressPage = (idx: number) => {
    this._scrollView.current.getNode().scrollTo({
      x: idx * this.state.width,
      animated: true,
    });
  };

  render() {
    const start = this.state.page * this.state.width;
    return (
      <>
        <Header
          disabled={this.props.hidden}
          pages={this.props.pages}
          animated={this._rotateY}
          page={this.state.page}
          onPress={this._onPressPage}
          color={this._color}
        />
        <Animated.ScrollView
          ref={this._scrollView}
          onLayout={this.setDimensions}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          scrollEnabled={!this.props.hidden}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this._animated,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
              listener: this._onScroll,
            },
          )}
          contentOffset={{
            x: this.state.width * this.props.initialPage,
            y: 0,
          }}>
          {this.props.items(this.state.page, this._animated)}
        </Animated.ScrollView>
      </>
    );
  }
}

export default Slider;
