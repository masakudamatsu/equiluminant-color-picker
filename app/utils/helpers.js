export const getContrastRatio = (r, g, b) => {
  const normalize = eightBitNumber =>
    Math.pow((eightBitNumber / 255 + 0.055) / 1.055, 2.4);
  const relativeLuminance = (r, g, b) =>
    0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
  return ((relativeLuminance(r, g, b) + 0.05) / 0.05).toFixed(2);
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
