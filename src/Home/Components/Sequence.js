/* @flow */

import React from 'react';
import { View, FlatList, Alert, SwipeableFlatList } from 'react-native';
import { IconButton, Button, TextInput } from 'react-native-paper';
import SafeView from '../../Common/Components/SafeView';
import Colors from '../../Common/Colors';
import Card from '../../Common/Components/Card';
import EmptyListComponent from '../../Common/Components/EmptyListComponent';

type Props = {
  onClose: () => void,
};
type State = {
  items: Array<string>,
  text: string,
};

class Sequence extends React.PureComponent<Props, State> {
  state = {
    items: [],
    text: '',
  };

  _onChange = (text: string) => {
    this.setState({ text });
  };

  _onAdd = () => {
    this.textInput.clear();
    this.setState(prev => ({
      items: [...prev.items, prev.text],
    }));
  };

  _getKeyExtractor = (item: string, idx: number) => `card-${idx}`;

  _renderItem = (item: { item: string, idx: number }) => null;

  render() {
    return (
      <>
        <SafeView>
          <View style={{ height: 56 }}>
            <IconButton
              icon="close"
              color={Colors.White}
              onPress={this.props.onClose}
              style={{
                position: 'absolute',
                right: 0,
              }}
            />
          </View>
          <TextInput
            ref={(ref: any) => {
              this.textInput = ref;
            }}
            style={{
              margin: 20,
            }}
            value={this.state.text}
            onChangeText={this._onChange}
            mode="outlined"
            underlineColor="white"
            maxLength={3}
            placeholder="Type a symbol..."
          />
          <Button
            style={{
              marginHorizontal: 40, // TODO: Change?
            }}
            mode="contained"
            dark
            color={Colors.Yellow600}
            onPress={this._onAdd}
            icon="add">
            Add
          </Button>
          <SwipeableFlatList
            maxSwipeDistance={1}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={this.state.items}
            keyExtractor={this._getKeyExtractor}
            renderItem={item => (
              <Card
                key={`i-${item.item}`}
                title={item.item}
                onPress={() => {
                  Alert.alert(
                    'Do you want to remove the card?',
                    'This action cannot be undone',
                    [
                      {
                        text: 'Cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          this.setState(prev => ({
                            items: [], // TODO: Remove item
                          }));
                        },
                        style: 'destructive',
                      },
                    ],
                  );
                }}
              />
            )}
            ListEmptyComponent={<EmptyListComponent />}
          />
        </SafeView>
      </>
    );
  }
}

export default Sequence;
