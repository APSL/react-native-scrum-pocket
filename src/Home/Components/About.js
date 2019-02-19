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
} from 'react-native';
import { Button, Text, List } from 'react-native-paper';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
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
          style={styles.container}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          scrollEventThrottle={12}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this._scroll,
                },
              },
            },
          ])}>
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
              <Text style={styles.text}>
                Made with ❤️ by the Mobile Team at APSL.net with{' '}
                <Text style={styles.mono}>React Native</Text>,{' '}
                <Text style={styles.mono}>react-native-paper</Text> and{' '}
                <Text style={styles.mono}>react-native-vector-icons</Text>.
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
          </View>
          <List.Accordion
            title="About Scrum Poker"
            left={props => (
              <View style={styles.icon}>
                <MaterialCommunity {...props} size={24} name="cards" />
              </View>
            )}>
            <Text>
              Planning poker, also called Scrum poker, is a consensus-based,
              gamified technique for estimating, mostly used to estimate effort or
              relative size of development goals in software development. In
              planning poker, members of the group make estimates by playing
              numbered cards face-down to the table, instead of speaking them aloud.
              The cards are revealed, and the estimates are then discussed. By
              hiding the figures in this way, the group can avoid the cognitive bias
              of anchoring, where the first number spoken aloud sets a precedent for
              subsequent estimates.
            </Text>
          </List.Accordion>
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
  },
  textContainer: {
    paddingVertical: 20,
  },
  text: {
    color: Colors.White,
    textAlign: 'center',
  },
  mono: {
    fontWeight: '700',
  },
  icon: {
    margin: 8,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default About;
