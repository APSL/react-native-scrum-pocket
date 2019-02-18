/* @flow */

import React from 'react';
import { View, Alert, FlatList, StyleSheet } from 'react-native';
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
  textInput: TextInput;

  state = {
    items: [], // TODO: Change to global state (context)
    text: '',
  };

  _onChange = (text: string) => {
    this.setState({ text });
  };

  _onAdd = () => {
    const { items, text } = this.state;
    if (items.includes(text)) {
      return Alert.alert(`Symbol ${text} already exists`);
    }
    this.setState(prev => ({
      items: [...prev.items, prev.text],
      text: '',
    }));
    this.textInput.clear();
  };

  _getKeyExtractor = (item: string, idx: number) => `card-${idx}`;

  _renderItem = (item: { item: string }) => (
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
                this.setState((prev: State) => ({
                  items: prev.items.filter((v: string) => v !== item.item),
                }));
              },
              style: 'destructive',
            },
          ],
        );
      }}
    />
  );

  render() {
    const { text, items } = this.state;
    return (
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
          value={text}
          onChangeText={this._onChange}
          mode="outlined"
          underlineColor="white"
          maxLength={3}
          placeholder="Type a symbol..."
        />
        <Button
          style={{
            marginHorizontal: 20, // TODO: Change?
          }}
          mode="contained"
          dark
          disabled={!text.length}
          color={Colors.Yellow600}
          onPress={this._onAdd}
          icon="add">
          Add
        </Button>
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          numColumns={3}
          data={items}
          keyExtractor={this._getKeyExtractor}
          renderItem={this._renderItem}
          ListEmptyComponent={<EmptyListComponent />}
        />
      </SafeView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 20,
    alignSelf: 'center',
  },
});

export default Sequence;
