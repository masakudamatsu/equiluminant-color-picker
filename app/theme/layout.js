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

// const Roboto = {
//   unitsPerEm: 1000, // 2048,
//   xHeight: 530, // 1082,
//   capHeight: 715, // 1456,
//   ascender: 930, // 1900,
//   descender: 240, // 500,
// }; // Measured by myself, by setting font-size: 100px

const Roboto = {
  unitsPerEm: 2048,
  xHeight: 1082,
  capHeight: 1456,
  ascender: 1900,
  descender: 500,
}; // Measured by myself, by setting font-size: 100px

// Convert x-height into font-size
const getFontSizeFromXheight = (baseXheight, scale, fontMetrics) => {
  const xHeight = baseXheight * Math.pow(modularScale, scale);
  const xHeightToFontSizeRatio = fontMetrics.xHeight / fontMetrics.unitsPerEm;
  return xHeight / xHeightToFontSizeRatio;
};

// Convert cap-height into font-size
const getFontSizeFromCapHeight = (baseCapHeight, scale, fontMetrics) => {
  const capHeight = baseCapHeight * Math.pow(modularScale, scale);
  const capHeightToFontSizeRatio =
    fontMetrics.capHeight / fontMetrics.unitsPerEm;
  return capHeight / capHeightToFontSizeRatio;
};

// Font size
const fontSize = {
  bodyText: {
    mobile: getFontSizeFromXheight(baseXheight.mobile, 0, Roboto),
  },
  input: {
    mobile: getFontSizeFromCapHeight(baseXheight.mobile, 1, Roboto),
  },
  label: {
    mobile: getFontSizeFromCapHeight(baseXheight.mobile, 0, Roboto),
  },
};

const lineHeight = {
  // in rem
  bodyText: {
    mobile: baseXheight.mobile * (1 + modularScale),
    desktop: baseXheight.desktop * (1 + modularScale),
  },
};

const lineHeightEm = {
  bodyText:
    lineHeight.bodyText.desktop /
    getFontSizeFromXheight(baseXheight.desktop, 0, Roboto),
};

const getTextCropBottom = (fontMetrics, lineHeightEm) => {
  return (
    fontMetrics.descender / fontMetrics.unitsPerEm + (lineHeightEm - 1) / 2
  );
};

const getTextCropTopX = (fontMetrics, lineHeightEm) => {
  return (
    (fontMetrics.ascender - fontMetrics.xHeight) / fontMetrics.unitsPerEm +
    (lineHeightEm - 1) / 2
  );
};

const getTextCropTopCap = (fontMetrics, lineHeightEm) => {
  return (
    (fontMetrics.ascender - fontMetrics.capHeight) / fontMetrics.unitsPerEm +
    (lineHeightEm - 1) / 2
  );
};

const layout = {
  body: {
    fontSize: {
      mobile: fontSize.bodyText.mobile.toFixed(4),
    },
    lineHeight: lineHeightEm.bodyText,
  },
  colorCodeField: {
    paddingPx: {
      mobile: baseXheight.mobile * oneRemPx,
    },
  },
  input: {
    borderRadiusPx: 4,
    borderWidthPx: {normal: 1, active: 2},
    fontSize: {
      mobile: fontSize.input.mobile.toFixed(4),
    },
    paddingBottomPx: {
      mobile:
        (baseXheight.mobile * Math.pow(modularScale, 1) -
          getTextCropBottom(Roboto, 1) * fontSize.input.mobile) *
        oneRemPx,
    },
    paddingTopPx: {
      // Input field's text box does not include line-height, it seems.
      mobile:
        (baseXheight.mobile * (2 + Math.pow(modularScale, 1)) -
          getTextCropTopCap(Roboto, 1) * fontSize.input.mobile) *
        oneRemPx,
    },
  },
  label: {
    fontSize: {
      mobile: fontSize.label.mobile.toFixed(4),
    },
    verticalSpacePx: {
      // in pixel, because we do not want it to be enlarged when the user increases the font size.
      mobile: baseXheight.mobile * oneRemPx,
    },
    horizontalSpacePx: {
      // in pixel, because we do not want it to be enlarged when the user increases the font size.
      mobile: baseXheight.mobile * oneRemPx,
    },
  },
  sideMarginPx: {
    // in pixel, because we do not want it to be enlarged when the user increases the font size.
    mobile: baseXheight.mobile * Math.pow(modularScale, 1) * oneRemPx,
  },
  textCrop: {
    bodyText: {
      bottom: getTextCropBottom(Roboto, lineHeightEm.bodyText).toFixed(4),
      topCap: getTextCropTopCap(Roboto, lineHeightEm.bodyText).toFixed(4),
      topX: getTextCropTopX(Roboto, lineHeightEm.bodyText).toFixed(4),
    },
  },
};

export default layout;
