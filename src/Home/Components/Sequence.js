/* @flow */

import React from 'react';
import { View, Alert, FlatList, StyleSheet } from 'react-native';
import { IconButton, Button, TextInput } from 'react-native-paper';
import SafeView from '../../Common/Components/SafeView';
import Colors from '../../Common/Colors';
import Card from '../../Common/Components/Card';
import EmptyListComponent from '../../Common/Components/EmptyListComponent';

type Props = {
  items: Array<string>,
  onClose: () => void,
  addItem: (item: string) => void,
  removeItem: (item: string) => void,
};
type State = {
  text: string,
};

class Sequence extends React.PureComponent<Props, State> {
  textInput: TextInput;

  state = {
    text: '',
  };

  _onChange = (text: string) => {
    this.setState({
      text,
    });
  };

  _onAdd = () => {
    const { text } = this.state;
    this.textInput.clear();
    return this.setState({ text: '' }, () => {
      this.props.addItem(text);
    });
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
                this.props.removeItem(item.item);
              },
              style: 'destructive',
            },
          ],
        );
      }}
    />
  );

  render() {
    const { text } = this.state;
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
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
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
          data={this.props.items}
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
    alignSelf: 'center',
  },
});

export default Sequence;
