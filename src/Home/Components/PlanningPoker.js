/* @flow */

import React from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationBar from '../../Common/Components/NavigationBar';
import SafeView from '../../Common/Components/SafeView';
import Colors from '../../Common/Colors';

type Props = {
  onClose: () => void,
};

class PlanningPoker extends React.PureComponent<Props> {
  _scroll = new Animated.Value(0);

  render() {
    return (
      <SafeView>
        <NavigationBar onPress={this.props.onClose} />
        <ScrollView
          contentContainerStyle={styles.content}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this._scroll,
                },
              },
            },
          ])}
          scrollEventThrottle={16}>
          <Animated.View
            style={{
              transform: [
                {
                  rotateY: this._scroll.interpolate({
                    inputRange: [-100, 0, 100],
                    outputRange: ['360deg', '0deg', '180deg'],
                    extrapolate: 'clamp',
                    easing: Easing.ease,
                  }),
                },
              ],
            }}>
            <MaterialCommunity color={Colors.Yellow600} name="cards" size={110} />
          </Animated.View>
          <Text style={styles.text}>
            Planning poker, also called{' '}
            <Text style={styles.italic}>Scrum poker,</Text> is a consensus-based,
            gamified technique for estimating, mostly used to estimate effort or
            relative size of development goals in software development. In planning
            poker, members of the group make estimates by playing numbered cards
            face-down to the table, instead of speaking them aloud. The cards are
            revealed, and the estimates are then discussed. By hiding the figures in
            this way, the group can avoid the cognitive bias of anchoring, where the
            first number spoken aloud sets a precedent for subsequent estimates. The
            reason to use planning poker is to avoid the influence of the other
            participants. If a number is spoken, it can sound like a suggestion and
            influence the other participants sizing. Planning poker should force
            people to think independently and propose their numbers simultaneously.
            This is accomplished by requiring that all participants show their card
            at the same time.
          </Text>
        </ScrollView>
      </SafeView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  text: {
    lineHeight: 28,
    fontSize: Platform.select({
      ios: 16,
      android: 18,
    }),
  },
  italic: {
    fontStyle: 'italic',
  },
});

export default PlanningPoker;
