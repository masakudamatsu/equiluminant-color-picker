const rgbCode = chroma => {
  // Validate argument
  if (chroma < 0 || chroma > 255 || typeof chroma !== 'number') {
    console.error(
      'The first argument for rgbCode() must be a number between 0 and 255',
    );
    return;
  }

  // Function to return max and min RGB values given chroma and Luminance
  const rgbValues = (chroma, luminance) => {
    const maximum = Math.floor(luminance + ((255 - luminance) / 255) * chroma);
    return {
      max: maximum,
      min: maximum - chroma,
    };
  };

  return {
    red: {
      r: rgbValues(chroma, 127).max.toString(),
      g: rgbValues(chroma, 127).min.toString(),
      b: rgbValues(chroma, 127).min.toString(),
    },
    yellow: {
      r: rgbValues(chroma, 247).max.toString(),
      g: rgbValues(chroma, 247).max.toString(),
      b: rgbValues(chroma, 247).min.toString(),
    },
    green: {
      r: rgbValues(chroma, 220).min.toString(),
      g: rgbValues(chroma, 220).max.toString(),
      b: rgbValues(chroma, 220).min.toString(),
    },
    cyan: {
      r: rgbValues(chroma, 230).min.toString(),
      g: rgbValues(chroma, 230).max.toString(),
      b: rgbValues(chroma, 230).max.toString(),
    },
    blue: {
      r: rgbValues(chroma, 76).min.toString(),
      g: rgbValues(chroma, 76).min.toString(),
      b: rgbValues(chroma, 76).max.toString(),
    },
    purple: {
      r: rgbValues(chroma, 145).max.toString(),
      g: rgbValues(chroma, 145).min.toString(),
      b: rgbValues(chroma, 145).max.toString(),
    },
  };
};

export default rgbCode;
