/* @flow */

import React from 'react';
import { Consumer } from '../Context';

const withSettings = (Component: React$ComponentType) => (props: any) => (
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
