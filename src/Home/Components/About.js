/* @flow */

import React from 'react';
import {
  ScrollView,
  View,
  Animated,
  StyleSheet,
  Dimensions,
  Easing,
  Linking,
  Platform,
} from 'react-native';
import { Button, Headline, Text } from 'react-native-paper';
import Colors from '../../Common/Colors';
import SafeView from '../../Common/Components/SafeView';
import NavigationBar from '../../Common/Components/NavigationBar';

const apslLogo = require('./img/logo.png');

type Props = {
  onClose: () => void,
};

class About extends React.PureComponent<Props> {
  _scroll = new Animated.Value(0);

  _openSite = async () => {
    const apslURL = 'https://www.apsl.net';
    const canOpenURL = await Linking.canOpenURL(apslURL);
    if (canOpenURL) {
      Linking.openURL(apslURL);
    }
  };

  render() {
    return (
      <SafeView>
        <NavigationBar onPress={this.props.onClose} />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 40,
          }}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this._scroll,
                },
              },
            },
          ])}
          scrollEventThrottle={12}
          style={styles.container}>
          <View style={styles.contentContainer}>
            <Animated.Image
              source={apslLogo}
              style={[
                {
                  width: Dimensions.get('window').width * 0.5,
                  height: Dimensions.get('window').width * 0.5,
                  transform: [
                    {
                      rotateZ: this._scroll.interpolate({
                        inputRange: [-100, 0, 100],
                        outputRange: ['-15deg', '0deg', '15deg'],
                        extrapolate: 'clamp',
                        easing: Easing.ease,
                      }),
                    },
                    {
                      scale: this._scroll.interpolate({
                        inputRange: [-100, 0, 100],
                        outputRange: [1.2, 1.0, 1.2],
                        extrapolate: 'clamp',
                        easing: Easing.elastic(1.0),
                      }),
                    },
                  ],
                },
              ]}
            />
            <View style={styles.textContainer}>
              <Headline style={styles.text}>
                Made with ❤️ by the Mobile Team at APSL.net with{' '}
                <Headline style={styles.mono}>
                  React Native, react-native-paper, react-native-vector-icons,
                  react-native-keep-awake & react-native-version-number
                </Headline>
              </Headline>
            </View>
            <View style={styles.textContainer}>
              <Button
                color={Colors.Yellow600}
                dark
                mode="contained"
                onPress={this._openSite}>
                Get in touch
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  textContainer: {
    paddingVertical: 20,
  },
  text: {
    color: Colors.White,
    textAlign: 'center',
    lineHeight: 28,
    fontSize: Platform.select({
      ios: 14,
      android: 16,
    }),
  },
  mono: {
    fontWeight: '700',
    fontSize: 14,
  },
});

export default About;
