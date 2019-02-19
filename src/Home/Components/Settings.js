/* @flow */

import React from 'react';
import { ScrollView, Switch, PixelRatio, StyleSheet, Modal } from 'react-native';
import { List } from 'react-native-paper';
import withSettings from '../../withSettings';
import About from './About';
import Sequence from './Sequence';
import Colors from '../../Common/Colors';

import type { SettingsType, ActionsType } from '../../Common/Types/ContextType';

type Props = {
  settings: SettingsType,
  actions: ActionsType,
};
type State = {
  screen: 'sequence' | 'about' | 'none',
};

class Settings extends React.PureComponent<Props, State> {
  state = {
    screen: 'none',
  };

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

  render() {
    return (
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
            onPress={() => {}} // TODO: Event
            right={() => (
              <Switch
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
            onPress={() => {}} // TODO: Event
            left={props => <List.Icon {...props} icon="phone-android" />}
            right={() => (
              <Switch
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
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: Colors.Grey500,
  },
});

export default withSettings(Settings);
