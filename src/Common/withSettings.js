/* @flow */

import React from 'react';
import { Consumer } from '../Context';

const withSettings = (Component: React$ComponentType) => (props: any) => (
  <Consumer>
    {({ settings, addItem, removeItem, eraseAll }) => (
      <Component
        {...props}
        actions={{
          addItem,
          removeItem,
          eraseAll,
        }}
        settings={settings}
      />
    )}
  </Consumer>
);

export default withSettings;
