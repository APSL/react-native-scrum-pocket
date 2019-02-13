/* @flow */

import React from 'react';
import {
  ScrollView,
  View,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  Easing,
  Linking,
} from 'react-native';
import { Button } from 'react-native-paper';
import Colors from '../../Common/Colors';

const apslLogo = require('./img/logo.png');

class About extends React.PureComponent {
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={12}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: this._scroll } } },
        ])}>
        <Animated.Image
          source={apslLogo}
          style={[
            styles.logo,
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
          <Text style={styles.text}>
            Made with ❤️ by the Mobile Team at APSL.net with <Text style={styles.mono}>React Native</Text>,{' '}
            <Text style={styles.mono}>react-native-paper</Text> and <Text style={styles.mono}>react-native-vector-icons</Text>.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Button
            mode="contained"
            dark
            color={Colors.Yellow600}
            onPress={this._openSite}>
            Get in touch
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
  logo: {
    padding: 20,
  },
  textContainer: {
    paddingVertical: 20,
  },
  text: {
    color: Colors.White,
    textAlign: 'center',
  },
  mono: {
    fontWeight: '700'
  }
});

export default About;
