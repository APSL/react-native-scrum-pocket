/* @flow */

import React from 'react';
import {
  ScrollView,
  PixelRatio,
  StyleSheet,
  Modal,
  AsyncStorage,
  View,
} from 'react-native';
import { List, Switch } from 'react-native-paper';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import KeepAwake from 'react-native-keep-awake';
import VersionNumber from 'react-native-version-number';
import withSettings from '../../Common/withSettings';
import About from './About';
import Sequence from './Sequence';
import Colors from '../../Common/Colors';

import type { SettingsType, ActionsType } from '../../Context';
import PlanningPoker from './PlanningPoker';

type Props = {
  settings: SettingsType,
  actions: ActionsType,
};
type State = {
  screen: 'sequence' | 'about' | 'planning' | 'none',
  isKeepScreenOn: boolean,
  vibrate: boolean,
};

class Settings extends React.PureComponent<Props, State> {
  state = {
    screen: 'none',
    isKeepScreenOn: false,
    vibrate: false,
  };

  async componentDidMount() {
    const storage = await AsyncStorage.multiGet(['screenState', 'vibrate']);
    this.setState(
      {
        isKeepScreenOn: storage[0][1] === 'on',
        vibrate: storage[1][1] === 'on',
      },
      () => {
        this.handleScreenChange(this.state.isKeepScreenOn);
      },
    );
  }

  handleScreenChange(isScreenOn: boolean) {
    if (isScreenOn) {
      return KeepAwake.activate();
    }
    return KeepAwake.deactivate();
  }

  _onRequestClose = () => {
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
    this.setState(
      (prev: State) => ({
        isKeepScreenOn: !prev.isKeepScreenOn,
      }),
      () => {
        const { isKeepScreenOn } = this.state;
        AsyncStorage.setItem(
          'screenState',
          isKeepScreenOn === false ? 'off' : 'on',
        );
        this.handleScreenChange(this.state.isKeepScreenOn);
      },
    );
  };

  _onChange = () => {
    this.setState(
      (prev: State) => ({
        vibrate: !prev.vibrate,
      }),
      () => {
        const { vibrate } = this.state;
        AsyncStorage.setItem('vibrate', vibrate === true ? 'on' : 'off');
      },
    );
  };

  _onRemove = () => {
    this.props.actions.eraseAll();
  };

  render() {
    return (
      <ScrollView style={styles.content}>
        <List.Section title="DECK SETTINGS">
          <List.Item
            description="Use a custom sequence instead of Standard"
            left={props => <List.Icon {...props} icon="dashboard" />}
            onPress={() => {
              this.setState({
                screen: 'sequence',
              });
            }}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            style={styles.item}
            title="Custom sequence"
          />
          <Modal
            animated
            animationType="slide"
            onRequestClose={this._onRequestClose}
            visible={this.state.screen === 'sequence'}>
            <Sequence
              addItem={this._addItem}
              items={this.props.settings.deck}
              onClose={this._onRequestClose}
              onPressRemove={this._onRemove}
              removeItem={this._removeItem}
            />
          </Modal>
        </List.Section>
        <List.Section title="GENERAL SETTINGS">
          <List.Item
            description="Use vibration when rotating a card"
            left={props => <List.Icon {...props} icon="vibration" />}
            onPress={this._onChange}
            right={() => (
              <Switch
                color={Colors.Yellow600}
                onValueChange={this._onChange}
                style={styles.switch}
                value={this.state.vibrate}
              />
            )}
            style={styles.item}
            title="Vibration"
          />
          <List.Item
            description="Prevents automatic display shutdown"
            left={props => <List.Icon {...props} icon="phone-android" />}
            onPress={this._onChangeScreenState}
            right={() => (
              <Switch
                color={Colors.Yellow600}
                onValueChange={this._onChangeScreenState}
                style={styles.switch}
                value={this.state.isKeepScreenOn}
              />
            )}
            title="Keep screen on"
          />
          <List.Item
            description="Read more"
            left={props => (
              <View style={styles.icon}>
                <MaterialCommunity {...props} name="cards" size={24} />
              </View>
            )}
            onPress={() => {
              this.setState({
                screen: 'planning',
              });
            }}
            title="What is Scrum Poker?"
          />
          <Modal
            animated
            animationType="slide"
            onRequestClose={this._onRequestClose}
            visible={this.state.screen === 'planning'}>
            <PlanningPoker onClose={this._onRequestClose} />
          </Modal>
          <List.Item
            description={`Version ${VersionNumber.appVersion} (${
              VersionNumber.buildVersion
            })`}
            left={props => <List.Icon {...props} icon="info" />}
            onPress={() => {
              this.setState({
                screen: 'about',
              });
            }}
            title="About"
          />
          <Modal
            animated
            animationType="slide"
            onRequestClose={this._onRequestClose}
            visible={this.state.screen === 'about'}>
            <About onClose={this._onRequestClose} />
          </Modal>
        </List.Section>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
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
  switch: {
    alignSelf: 'center',
  },
  icon: {
    margin: 8,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withSettings(Settings);
