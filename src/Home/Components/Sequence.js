/* @flow */

import React from 'react';
import { Alert, FlatList, StyleSheet, Platform } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import SafeView from '../../Common/Components/SafeView';
import Colors from '../../Common/Colors';
import Card from '../../Common/Components/Card';
import EmptyListComponent from '../../Common/Components/EmptyListComponent';
import NavigationBar from '../../Common/Components/NavigationBar';

type Props = {
  items: Array<string>,
  onClose: () => void,
  addItem: (item: string) => void,
  removeItem: (item: string) => void,
  onPressRemove: () => void,
};
type State = {
  text: string,
};

class Sequence extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: '',
    };
    this.textInputRef = React.createRef();
  }

  _onChange = (text: string) => {
    this.setState({
      text,
    });
  };

  _onAdd = () => {
    const { text } = this.state;
    this.setState(
      {
        text: '',
      },
      () => {
        this.textInputRef.current.clear();
        this.props.addItem(text);
      },
    );
  };

  _getKeyExtractor = (item: string, idx: number) => `card-${idx}`;

  _renderItem = (item: { item: string }) => (
    <Card
      key={`i-${item.item}`}
      onPress={() => {
        Alert.alert('Do you want to remove the card?', '', [
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
        ]);
      }}
      title={item.item}
    />
  );

  render() {
    const { text } = this.state;
    return (
      <SafeView>
        <NavigationBar onPress={this.props.onClose} />
        <TextInput
          ref={this.textInputRef}
          maxLength={3}
          mode="outlined"
          onChangeText={this._onChange}
          placeholder="Type a symbol..."
          style={styles.input}
          underlineColor={Colors.White}
          value={text}
        />
        <Button
          color={Colors.Yellow600}
          dark
          disabled={!text.length}
          icon="add"
          mode="contained"
          onPress={this._onAdd}
          style={styles.button}>
          Add
        </Button>
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={this.props.items}
          keyExtractor={this._getKeyExtractor}
          ListEmptyComponent={<EmptyListComponent />}
          numColumns={3}
          renderItem={this._renderItem}
        />
        {this.props.items.length ? (
          <IconButton
            icon="delete-forever"
            onPress={this.props.onPressRemove}
            size={28}
            style={styles.trash}
          />
        ) : null}
      </SafeView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  input: {
    ...Platform.select({
      ios: {
        marginTop: 50,
      },
      android: {
        marginTop: 0,
      },
    }),
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  trash: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
});

export default Sequence;
