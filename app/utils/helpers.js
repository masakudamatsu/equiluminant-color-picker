export const getContrastRatio = (r, g, b) => {
  const normalize = eightBitNumber => {
    if (eightBitNumber / 255 <= 0.03928) {
      return eightBitNumber / 255 / 12.92;
    } else {
      return Math.pow((eightBitNumber / 255 + 0.055) / 1.055, 2.4);
    }
  };
  const relativeLuminance = (r, g, b) =>
    0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
  return ((relativeLuminance(r, g, b) + 0.05) / 0.05).toFixed(2);
  // See https://www.w3.org/TR/WCAG20-TECHS/G17.html
};

export const getRgbFromHex = hexCode => {
  // hexCode should be a string in the form of "#ccc" or "#4bc2d2"
  // See https://css-tricks.com/converting-color-spaces-in-javascript/#hex-to-rgb
  let r, g, b;
  if (hexCode.length == 4) {
    // e.g. #ccc
    r = '0x' + hexCode[1] + hexCode[1];
    g = '0x' + hexCode[2] + hexCode[2];
    b = '0x' + hexCode[3] + hexCode[3];
  } else {
    r = '0x' + hexCode[1] + hexCode[2];
    g = '0x' + hexCode[3] + hexCode[4];
    b = '0x' + hexCode[5] + hexCode[6];
  }
  return 'rgb(' + +r + ',' + +g + ',' + +b + ')'; // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus
};

export const getRgbFromHsl = hslCode => {
  // https://css-tricks.com/converting-color-spaces-in-javascript/#hsl-to-rgb
  const hsl = hslCode.slice(4, -1).split(',');
  let h = hsl[0],
    s = hsl[1].slice(0, -1) / 100,
    l = hsl[2].slice(0, -1) / 100;

  let chroma = (1 - Math.abs(2 * l - 1)) * s,
    middleC = chroma * (1 - Math.abs(((h / 60) % 2) - 1)),
    minC = l - chroma / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = chroma;
    g = middleC;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = middleC;
    g = chroma;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = chroma;
    b = middleC;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = middleC;
    b = chroma;
  } else if (240 <= h && h < 300) {
    r = middleC;
    g = 0;
    b = chroma;
  } else if (300 <= h && h < 360) {
    r = chroma;
    g = 0;
    b = middleC;
  }
  r = Math.round((r + minC) * 255);
  g = Math.round((g + minC) * 255);
  b = Math.round((b + minC) * 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')'; // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus
};
