/* @flow */

import * as React from 'react';
import { Animated, NativeEventEmitter, Easing } from 'react-native';
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

  _toggleHeader = new Animated.Value(0);

  state = {
    page: this.props.initialPage,
    width: 0,
  };

  constructor(props: Props) {
    super(props);
    this._scrollView = React.createRef();
    this._xOffset = 0;
  }

  componentDidUpdate() {
    Animated.spring(this._toggleHeader, {
      duration: 500,
      delay: 200,
      toValue: this.getValue(),
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }

  getValue(): number {
    if (this.props.hidden) {
      return 180;
    }
    return 0;
  }

  _onScroll = (e: NativeEventEmitter) => {
    this._xOffset = e.nativeEvent.contentOffset.x;
    this.setState(state => ({
      page: Math.round(this._xOffset / state.width),
    }));
  };

  /**
   * Set the page dimensions
   * @param e
   */
  _setDimensions = (e: NativeEventEmitter) => {
    this.setState({
      width: e.nativeEvent.layout.width,
    });
  };

  _onPressPage = (idx: number) => {
    this._scrollView.current.getNode().scrollTo({
      x: idx * this.state.width,
      animated: false,
    });
  };

  render() {
    return (
      <>
        <Header
          hiddenAnimation={this._toggleHeader}
          onPress={this._onPressPage}
          pages={this.props.pages}
          scroll={this._animated}
        />
        <Animated.ScrollView
          ref={this._scrollView}
          contentOffset={{
            x: this.state.width * this.props.initialPage,
            y: 0,
          }}
          horizontal
          onLayout={this._setDimensions}
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
              listener: this._onScroll,
            },
          )}
          pagingEnabled
          scrollEnabled={!this.props.hidden}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          {this.props.items(this.state.page, this._animated)}
        </Animated.ScrollView>
      </>
    );
  }
}

export default Slider;
