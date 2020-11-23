import cases from 'jest-in-case';

import rgbCode from './rgbCode';

cases(
  'converts chroma 0 into CSS RGB code for:',
  options => {
    expect(rgbCode(0)[options.hue]).toStrictEqual(options.rgbValues);
  },
  {
    red: 'rgb(127, 127, 127)',
    yellow: 'rgb(247, 247, 247)',
    green: 'rgb(220, 220, 220)',
    cyan: 'rgb(230, 230, 230)',
    blue: 'rgb(76, 76, 76)',
    purple: 'rgb(145, 145, 145)',
  },
);

cases(
  'converts chroma 255 into CSS RGB code for:',
  options => {
    expect(rgbCode(255)[options.hue]).toStrictEqual(options.rgbValues);
  },
  {
    red: 'rgb(255, 0, 0)',
    yellow: 'rgb(255, 255, 0)',
    green: 'rgb(0, 255, 0)',
    cyan: 'rgb(0, 255, 255)',
    blue: 'rgb(0, 0, 255)',
    purple: 'rgb(255, 0, 255)',
  },
);

cases(
  'converts chroma 51 into CSS RGB code for:',
  options => {
    expect(rgbCode(51)[options.hue]).toStrictEqual(options.rgbValues);
  },
  {
    red: 'rgb(152, 101, 101)',
    yellow: 'rgb(248, 248, 197)',
    green: 'rgb(176, 227, 176)',
    cyan: 'rgb(184, 235, 235)',
    blue: 'rgb(60, 60, 111)',
    purple: 'rgb(167, 116, 167)',
  },
);
