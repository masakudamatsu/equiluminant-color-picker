// Set x-height and modular scale
const xHeightPx = {
  mobile: 18 * (10 / 21), // Medium.com
  desktop: 10, // Medium.com and Dev.to
};

// # of pixels for 1rem
const oneRemPx = 16;

// Font metrics
const sfProText = {
  unitsPerEm: 2048,
  xHeight: 1078,
  capHeight: 1443,
  ascender: 1950,
  descender: 494,
}; // obtained from opentype.js

const font = {
  body: {
    family:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    size: {
      mobile: (
        (xHeightPx.mobile * (sfProText.unitsPerEm / sfProText.xHeight)) /
        oneRemPx
      ).toFixed(4),
      desktop: (
        (xHeightPx.desktop * (sfProText.unitsPerEm / sfProText.xHeight)) /
        oneRemPx
      ).toFixed(4),
    },
  },
};

export default font;
