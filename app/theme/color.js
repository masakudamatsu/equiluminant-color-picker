// Color palette

// 1:4.5 contrast ratio to threshold rgb(117 ,117. 117)
const blackAAA = 'rgb(2, 2, 2)';
// 1:3 contrast ratio to threshold rgb(117 ,117. 117)
const blackAA = 'rgb(44, 44, 44)';
const blackAAopaque = 'rgba(44, 44, 44, 0.8)';
// 3:1 contrast ratio to threshold rgb(117 ,117. 117)
const whiteAA = 'rgb(209, 209, 209)';
const whiteAAopaque = 'rgba(209, 209, 209, 0.8)';
// 4.5:1 contrast ratio to threshold rgb(117 ,117. 117)
const whiteAAA = 'rgb(253, 253, 253)';

// Alert text
const alertColor = {
  forLightColor: 'rgb(255, 0, 0)',
  forDarkColor: 'yellow',
};

// Assign color to each element
const color = {
  html: {
    background: {
      initial: whiteAA,
    },
  },
  body: {
    background: {
      lightMode: whiteAA,
      darkMode: blackAA,
    },
    font: {
      lightMode: blackAA,
      darkMode: whiteAA,
    },
  },
  card: {
    background: whiteAA,
    font: blackAA,
  },
  chromaTextField: {
    background: {
      lightMode: whiteAAopaque,
      darkMode: blackAAopaque,
    },
  },
  paragraphErrorMessage: {
    font: {
      forDarkColor: alertColor.forDarkColor,
      forLightColor: alertColor.forLightColor,
    },
  },
  slider: {
    thumb: {
      lightMode: {
        default: blackAA,
        focus: blackAAA,
      },
      darkMode: {
        default: whiteAA,
        focus: whiteAAA,
      },
    },
    track: {
      lightMode: {
        default: blackAA,
        focus: blackAAA,
      },
      darkMode: {
        default: whiteAA,
        focus: whiteAAA,
      },
    },
  },
};

export default color;
