// Color palette

// 1:4.5 contrast ratio to threshold rgb(117 ,117. 117)
const blackAAA = 'rgb(2, 2, 2)';
// 1:3 contrast ratio to threshold rgb(117 ,117. 117)
const blackAA = 'rgb(44, 44, 44)';
// 3:1 contrast ratio to threshold rgb(117 ,117. 117)
const whiteAA = 'rgb(209, 209, 209)';
// 4.5:1 contrast ratio to threshold rgb(117 ,117. 117)
const whiteAAA = 'rgb(253, 253, 253)';

// Alert text
const alertColor = {
  forLightColor: 'red',
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
  paragraphErrorMessage: {
    font: {
      forDarkColor: alertColor.forDarkColor,
      forLightColor: alertColor.forLightColor,
    },
  },
};

export default color;
