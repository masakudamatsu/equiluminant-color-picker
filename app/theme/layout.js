// If no unit is mentioned in the variable name, the unit is rem.
// Otherwise the unit is explicitly mentioned in the variable name (e.g. xHeightPx).

// # of px for 1rem
const oneRemPx = 16;

// Set x-height and modular scale
const baseXheight = {
  mobile: (18 * (10 / 21)) / oneRemPx, // Medium.com
  desktop: 10 / oneRemPx, // Medium.com and Dev.to
};

const scaleRatio = 1.5;
const modularScale = power => {
  return Math.pow(scaleRatio, power);
};

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
const fontSizeForXheightToBe = (xHeight, fontMetrics) => {
  const xHeightToFontSizeRatio = fontMetrics.xHeight / fontMetrics.unitsPerEm;
  return xHeight / xHeightToFontSizeRatio;
};

// Convert cap-height into font-size
const fontSizeForCapHeightToBe = (capHeight, fontMetrics) => {
  const capHeightToFontSizeRatio =
    fontMetrics.capHeight / fontMetrics.unitsPerEm;
  return capHeight / capHeightToFontSizeRatio;
};

// Convert x-height into cap-height
const capHeightForXheightToBe = (xHeight, fontMetrics) => {
  const xHeightToCapHeightRatio = fontMetrics.xHeight / fontMetrics.capHeight;
  return xHeight / xHeightToCapHeightRatio;
};

const lineHeight = {
  // in rem
  bodyText: {
    mobile: baseXheight.mobile * (1 + scaleRatio),
    desktop: baseXheight.desktop * (1 + scaleRatio),
  },
};

const lineHeightEm = {
  bodyText:
    lineHeight.bodyText.desktop /
    fontSizeForXheightToBe(baseXheight.desktop, Roboto),
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
      mobile: fontSizeForXheightToBe(baseXheight.mobile, Roboto),
    },
    lineHeight: {
      mobile: baseXheight.mobile * (1 + scaleRatio),
      desktop: baseXheight.desktop * (1 + scaleRatio),
    }, // in Rem. To be converted in Em in GlobalStyle.js, to make explicit its dependence on font-size
    xHeight: {
      mobile: baseXheight.mobile,
      desktop: baseXheight.desktop,
    },
  },
  input: {
    borderRadiusPx: 4,
    borderWidthPx: {normal: 1, active: 2},
    capHeightPx: {
      mobile:
        capHeightForXheightToBe(baseXheight.mobile * modularScale(1), Roboto) *
        oneRemPx,
    },
    fontSize: {
      mobile: fontSizeForXheightToBe(
        baseXheight.mobile * modularScale(1),
        Roboto,
      ),
    },
    paddingBottomPx: {
      mobile:
        capHeightForXheightToBe(baseXheight.mobile, Roboto) *
        modularScale(1) *
        oneRemPx,
    },
    paddingTopPx: {
      mobile:
        capHeightForXheightToBe(baseXheight.mobile, Roboto) *
        modularScale(1) *
        oneRemPx,
    },
  },
  label: {
    capHeightPx: {
      mobile: capHeightForXheightToBe(baseXheight.mobile, Roboto) * oneRemPx,
    },
    fontSize: {
      mobile: fontSizeForXheightToBe(baseXheight.mobile, Roboto),
    },
    paddingPx: {
      // in pixel, because we do not want it to be enlarged when the user increases the font size.
      mobile: capHeightForXheightToBe(baseXheight.mobile, Roboto) * oneRemPx,
    },
  },
  modularScale: modularScale,
  resultSwatch: {
    // "Targets that are smaller than 48 px by 48 px or closer than 8 px apart fail the (Lighthouse) audit." (https://web.dev/tap-targets/)
    marginPx: '1',
    minWidthPx: '48',
  },
  sideMarginPx: {
    // in pixel, because we do not want it to be enlarged when the user increases the font size.
    mobile: baseXheight.mobile * modularScale(1) * oneRemPx,
  },
  slider: {
    thumb: {
      diameterPx: 48,
    },
    track: {
      heightPx: 255,
      widthPx: 16,
    },
  },
  textCrop: {
    bodyText: {
      bottom: getTextCropBottom(Roboto, lineHeightEm.bodyText).toFixed(4),
      topCap: getTextCropTopCap(Roboto, lineHeightEm.bodyText).toFixed(4),
      topX: getTextCropTopX(Roboto, lineHeightEm.bodyText).toFixed(4),
    },
    input: {
      bottom: getTextCropBottom(Roboto, 1).toFixed(4),
      topCap: getTextCropTopCap(Roboto, 1).toFixed(4),
    },
  },
};

export default layout;
