/* @flow */

import React from 'react';
import {
  View,
  ScrollView,
  Switch,
  PixelRatio,
  StyleSheet,
  Modal,
  AsyncStorage,
} from 'react-native';
import { List, Text } from 'react-native-paper';
import KeepAwake from 'react-native-keep-awake';
import VersionNumber from 'react-native-version-number';
import withSettings from '../../Common/withSettings';
import About from './About';
import Sequence from './Sequence';
import Colors from '../../Common/Colors';

import type { SettingsType, ActionsType } from '../../Context';

type Props = {
  settings: SettingsType,
  actions: ActionsType,
};
type State = {
  screen: 'sequence' | 'about' | 'none',
  isKeepScreenOn: boolean,
  vibrate: boolean,
};

class Settings extends React.PureComponent<Props, State> {
  state = {
    screen: 'none',
    isKeepScreenOn: false,
    vibrate: false,
  };

  componentDidMount() {
    // TODO: Refactor?
    AsyncStorage.multiGet(['screenState', 'vibrate']).then(
      (v: Array<Array<string>>) => {
        this.setState({
          isKeepScreenOn: v[0][1] === 'on',
          vibrate: v[1][1] === 'on',
        });
      },
    );
  }

  onClose = () => {
    this.setState({
      screen: 'none',
    });
  };

  _addItem = (item: string) => {
    this.props.actions.addItem(item);
  };

  _removeItem = (item: string) => {
    this.props.actions.removeItem(item);
  };

  _onChangeScreenState = () => {
    const { isKeepScreenOn } = this.state;
    this.setState(
      (prev: State) => ({
        isKeepScreenOn: !prev.isKeepScreenOn,
      }),
      () => {
        AsyncStorage.setItem('screenState', isKeepScreenOn === true ? 'off' : 'on');
        if (this.state.isKeepScreenOn) {
          return KeepAwake.activate();
        }
        return KeepAwake.deactivate();
      },
    );
  };

  _onChange = () => {
    const { vibrate } = this.state;
    this.setState(
      (prev: State) => ({
        vibrate: !prev.vibrate,
      }),
      () => {
        AsyncStorage.setItem('vibrate', vibrate === true ? 'off' : 'on');
      },
    );
  };

  render() {
    return (
      <>
        <ScrollView
          style={{
            flex: 1,
          }}>
          <List.Section title="DECK SETTINGS">
            <List.Item
              title="Custom sequence"
              description="Use a custom sequence instead Standard"
              left={props => <List.Icon {...props} icon="dashboard" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                this.setState({
                  screen: 'sequence',
                });
              }}
              style={styles.item}
            />
            <Modal
              visible={this.state.screen === 'sequence'}
              animated
              animationType="slide">
              <Sequence
                items={this.props.settings.deck}
                onClose={this.onClose}
                addItem={this._addItem}
                removeItem={this._removeItem}
              />
            </Modal>
          </List.Section>
          <List.Section title="GENERAL SETTINGS">
            <List.Item
              title="Vibration"
              description="Use vibration when rotating a card"
              left={props => <List.Icon {...props} icon="vibration" />}
              onPress={this._onChange}
              right={() => (
                <Switch
                  onValueChange={this._onChange}
                  value={this.state.vibrate}
                  style={{
                    top: 18,
                  }}
                  trackColor={{
                    false: Colors.White,
                    true: Colors.Yellow600,
                  }}
                />
              )}
              style={styles.item}
            />
            <List.Item
              title="Keep screen on"
              description="Prevents automatic display shutdown"
              onPress={this._onChangeScreenState}
              left={props => <List.Icon {...props} icon="phone-android" />}
              right={() => (
                <Switch
                  value={this.state.isKeepScreenOn}
                  onValueChange={this._onChangeScreenState}
                  style={{
                    top: 18,
                  }}
                  trackColor={{
                    false: Colors.White,
                    true: Colors.Yellow600,
                  }}
                />
              )}
            />
            <List.Item
              title="About"
              onPress={() => {
                this.setState({
                  screen: 'about',
                });
              }}
              left={props => <List.Icon {...props} icon="info" />}
            />
            <Modal
              visible={this.state.screen === 'about'}
              animated
              animationType="slide">
              <About onClose={this.onClose} />
            </Modal>
          </List.Section>
        </ScrollView>
        <View style={styles.bottom}>
          <Text style={styles.version}>
            {`${VersionNumber.appVersion} (${VersionNumber.buildVersion})`}
          </Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: Colors.Grey500,
  },
  version: {
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
  },
  bottom: {
    alignItems: 'center',
    padding: 10,
  },
});

export default withSettings(Settings);
