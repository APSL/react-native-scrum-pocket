/* @flow */

import { DefaultTheme } from 'react-native-paper';
import Colors from './Colors';

const Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.Yellow600,
    text: Colors.White,
    placeholder: Colors.Grey500,
  },
};

export default Theme;
