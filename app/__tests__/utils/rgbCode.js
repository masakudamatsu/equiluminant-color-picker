import cases from 'jest-in-case';

import rgbCode from '../../utils/rgbCode';

cases(
  'rgbCode correctly converts chroma 0 into the RGB values for each hue',
  options => {
    expect(rgbCode(0)[options.hue]).toStrictEqual(options.rgbValues);
  },
  {
    red: {
      hue: 'red',
      rgbValues: {r: '127', g: '127', b: '127'},
    },
    yellow: {
      hue: 'yellow',
      rgbValues: {r: '247', g: '247', b: '247'},
    },
    green: {
      hue: 'green',
      rgbValues: {r: '220', g: '220', b: '220'},
    },
    cyan: {
      hue: 'cyan',
      rgbValues: {r: '230', g: '230', b: '230'},
    },
    blue: {
      hue: 'blue',
      rgbValues: {r: '76', g: '76', b: '76'},
    },
    purple: {
      hue: 'purple',
      rgbValues: {r: '145', g: '145', b: '145'},
    },
  },
);

cases(
  'rgbCode correctly converts chroma 255 into the RGB values for each hue',
  options => {
    expect(rgbCode(255)[options.hue]).toStrictEqual(options.rgbValues);
  },
  {
    red: {
      hue: 'red',
      rgbValues: {r: '255', g: '0', b: '0'},
    },
    yellow: {
      hue: 'yellow',
      rgbValues: {r: '255', g: '255', b: '0'},
    },
    green: {
      hue: 'green',
      rgbValues: {r: '0', g: '255', b: '0'},
    },
    cyan: {
      hue: 'cyan',
      rgbValues: {r: '0', g: '255', b: '255'},
    },
    blue: {
      hue: 'blue',
      rgbValues: {r: '0', g: '0', b: '255'},
    },
    purple: {
      hue: 'purple',
      rgbValues: {r: '255', g: '0', b: '255'},
    },
  },
);

cases(
  'rgbCode correctly converts chroma 51 into the RGB values for each hue',
  options => {
    expect(rgbCode(51)[options.hue]).toStrictEqual(options.rgbValues);
  },
  {
    red: {
      hue: 'red',
      rgbValues: {r: '152', g: '101', b: '101'},
    },
    yellow: {
      hue: 'yellow',
      rgbValues: {r: '248', g: '248', b: '197'},
    },
    green: {
      hue: 'green',
      rgbValues: {r: '176', g: '227', b: '176'},
    },
    cyan: {
      hue: 'cyan',
      rgbValues: {r: '184', g: '235', b: '235'},
    },
    blue: {
      hue: 'blue',
      rgbValues: {r: '60', g: '60', b: '111'},
    },
    purple: {
      hue: 'purple',
      rgbValues: {r: '167', g: '116', b: '167'},
    },
  },
);
