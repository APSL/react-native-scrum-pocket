/* @flow */

export type SettingsType = {
  deck: Array<string>,
};

export type ActionsType = {
  addItem: (item: string) => void,
  removeItem: (item: string) => void,
};

export type ContextType = {
  settings: SettingsType,
  actions: ActionsType,
};
