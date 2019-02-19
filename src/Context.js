/* @flow */

import React from 'react';

export type SettingsType = {
  deck: Array<string>,
};

export type ActionsType = {
  addItem: (item: string) => void,
  removeItem: (item: string) => void,
};

export const { Provider, Consumer } = React.createContext({
  settings: {
    deck: [],
    isScreenOn: false,
  },
  addItem: () => {},
  removeItem: () => {},
});
