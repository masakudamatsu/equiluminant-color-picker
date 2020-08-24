export const getContrastRatio = (r, g, b) => {
  const normalize = eightBitNumber =>
    Math.pow((eightBitNumber / 255 + 0.055) / 1.055, 2.4);
  const relativeLuminance = (r, g, b) =>
    0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
  return ((relativeLuminance(r, g, b) + 0.05) / 0.05).toFixed(2);
};
