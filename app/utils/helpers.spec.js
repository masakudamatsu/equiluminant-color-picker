import cases from 'jest-in-case';

import {getContrastRatio, getRgbFromHex, getRgbFromHsl} from './helpers';

cases(
  'getContrastRatio returns contrast ratio for:',
  options => {
    expect(getContrastRatio(options.r, options.g, options.b)).toBe(
      options.contrastRatio,
    );
  },
  {
    'standard RGB code': {
      r: 234,
      g: 130,
      b: 222,
      contrastRatio: '8.75',
    },
    'red value is 10 or less': {
      r: 4,
      g: 130,
      b: 222,
      contrastRatio: '5.25',
    },
    'green value is 10 or less': {
      r: 234,
      g: 10,
      b: 222,
      contrastRatio: '5.60',
    },
    'blue value is 10 or less': {
      r: 234,
      g: 130,
      b: 2,
      contrastRatio: '7.69',
    },
  },
);

cases(
  'getRgbFromHex returns RGB code converted from:',
  options => {
    expect(getRgbFromHex(options.hexCode)).toBe(options.rgbCode);
  },
  {
    '6-digit numeric Hex code': {
      hexCode: '#234398',
      rgbCode: 'rgb(35,67,152)',
    },
    '6-digit lowercase alphanumeric Hex code': {
      hexCode: '#bc23d2',
      rgbCode: 'rgb(188,35,210)',
    },
    '6-digit uppercase alphanumeric Hex code': {
      hexCode: '#FB23A2',
      rgbCode: 'rgb(251,35,162)',
    },
    '3-digit numeric Hex code': {
      hexCode: '#964',
      rgbCode: 'rgb(153,102,68)',
    },
    '3-digit lowercase alphanumeric Hex code': {
      hexCode: '#efa',
      rgbCode: 'rgb(238,255,170)',
    },
    '3-digit uppercase alphanumeric Hex code': {
      hexCode: '#ADC',
      rgbCode: 'rgb(170,221,204)',
    },
  },
);

cases(
  'getRgbFromHsl converts HSL into RGB for:',
  options => {
    expect(getRgbFromHsl(options.hslCode)).toBe(options.rgbCode);
  },
  {
    orange: {
      hslCode: 'hsl(30, 90%, 35%)',
      rgbCode: 'rgb(170,89,9)',
    },
    'yellow-green': {
      hslCode: 'hsl(109, 56%, 67%)',
      rgbCode: 'rgb(141,218,124)',
    },
    'green-cyan': {
      hslCode: 'hsl(156, 87%, 49%)',
      rgbCode: 'rgb(16,234,147)',
    },
    'blue-cyan (saturated)': {
      hslCode: 'hsl(212, 100%, 46%)',
      rgbCode: 'rgb(0,109,235)',
    },
    purple: {
      hslCode: 'hsl(276, 34%, 88%)',
      rgbCode: 'rgb(226,214,235)',
    },
    rose: {
      hslCode: 'hsl(333, 89%, 43%)',
      rgbCode: 'rgb(207,12,100)',
    },
    'pure white': {
      hslCode: 'hsl(0, 0%, 100%)',
      rgbCode: 'rgb(255,255,255)',
    },
    'pure black': {
      hslCode: 'hsl(0, 0%, 0%)',
      rgbCode: 'rgb(0,0,0)',
    },
  },
);
