/* @flow */

import React from 'react';
import { Consumer } from '../App';

const withSettings = (Component: JSX.Element) => (props: *) => (
  <Consumer>
    {({ settings, addItem, removeItem }) => (
      <Component
        {...props}
        actions={{
          addItem,
          removeItem,
        }}
        settings={settings}
      />
    )}
  </Consumer>
);

export default withSettings;
