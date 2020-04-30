import React from 'react';
import { ThemeContext } from 'styled-components';

const theme = {
  colors: {
    primary: {
      light3: '#91e9ff',
      light2: '#00C2F3',
      light1: '#0093D5',
      base: '#007DC5',
      dark1: '#005C90',
      dark2: '#00416B',
      dark3: '#002A4E',
    },
    accepted: '#43D36B',
    pending: '#FFC62F',
    rejected: '#E60400',
    done: '#007035',
    text: '#4D4D4D',
    heading: '#4D4D4D',
    black: '#000000',
    white: '#FFFFFF',
    grey: {
      light3: '#F1F1F1',
      light2: '#F4F4F4',
      light1: '#EBEBEB',
      base: '#CCCCCC',
      dark1: '#666666',
      dark2: '#4D4D4D',
      dark3: '#333333',
    },
    warn: {
      light3: '#fff3d4',
      light2: '#ffe399',
      light1: '#ffd669',
      base: '#FFC62F',
      dark1: '#F1A019',
      dark2: '#DB9316',
      dark3: '#915f07',
    },
    error: {
      light3: '#ffb7be',
      light2: '#f56c69',
      light1: '#f23d3a',
      base: '#E60400',
      dark1: '#AB2D17',
      dark2: '#912412',
      dark3: '#590d00',
    },
    success: {
      light3: '#e6ffed',
      light2: '#93edac',
      light1: '#5fe283',
      base: '#43D36B',
      dark1: '#38b75c',
      dark2: '#2F944B',
      dark3: '#007035',
    },
  },
};

export type Theme = typeof theme;

export const useTheme = () => {
  const t: Theme = React.useContext(ThemeContext);
  return t;
};

export default theme;
