// If no unit is mentioned in the variable name, the unit is rem.
// Otherwise the unit is explicitly mentioned in the variable name (e.g. xHeightPx).

// # of px for 1rem
const oneRemPx = 16;

// Set x-height and modular scale
const baseXheight = {
  mobile: (18 * (10 / 21)) / oneRemPx, // Medium.com
  desktop: 10 / oneRemPx, // Medium.com and Dev.to
};

const modularScale = 2;

// Font metrics
const sfProText = {
  unitsPerEm: 2048,
  xHeight: 1078,
  capHeight: 1443,
  ascender: 1950,
  descender: 494,
}; // obtained from opentype.js

// Convert x-height into font-size
const getFontSizeFromXheight = (baseXheight, scale, fontMetrics) => {
  const xHeight = baseXheight * Math.pow(modularScale, scale);
  const xHeightToFontSizeRatio = fontMetrics.xHeight / fontMetrics.unitsPerEm;
  return xHeight / xHeightToFontSizeRatio;
};

const font = {
  body: {
    family:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    size: {
      mobile: getFontSizeFromXheight(baseXheight.mobile, 0, sfProText).toFixed(
        4,
      ),
      desktop: getFontSizeFromXheight(
        baseXheight.desktop,
        0,
        sfProText,
      ).toFixed(4),
    },
  },
  sideMarginPx: {
    // in pixel, because we do not want it to be enlarged when the user increases the font size.
    mobile: baseXheight.mobile * Math.pow(modularScale, 1) * oneRemPx,
  },
};

export default font;
