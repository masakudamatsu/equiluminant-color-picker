import cases from 'jest-in-case';

import {getContrastRatio, getRgbFromHex} from '../../utils/helpers';

cases(
  'getContrastRatio returns the correct contrast ratio for:',
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
  'getRgbFromHex returns the correct RGB code for:',
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
