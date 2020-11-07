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

  const red = {
    r: rgbValues(chroma, 127).max,
    g: rgbValues(chroma, 127).min,
    b: rgbValues(chroma, 127).min,
  };
  const yellow = {
    r: rgbValues(chroma, 247).max,
    g: rgbValues(chroma, 247).max,
    b: rgbValues(chroma, 247).min,
  };
  const green = {
    r: rgbValues(chroma, 220).min,
    g: rgbValues(chroma, 220).max,
    b: rgbValues(chroma, 220).min,
  };
  const cyan = {
    r: rgbValues(chroma, 230).min,
    g: rgbValues(chroma, 230).max,
    b: rgbValues(chroma, 230).max,
  };
  const blue = {
    r: rgbValues(chroma, 76).min,
    g: rgbValues(chroma, 76).min,
    b: rgbValues(chroma, 76).max,
  };
  const purple = {
    r: rgbValues(chroma, 145).max,
    g: rgbValues(chroma, 145).min,
    b: rgbValues(chroma, 145).max,
  };

  return {
    red: `rgb(${red.r}, ${red.g}, ${red.b})`,
    yellow: `rgb(${yellow.r}, ${yellow.g}, ${yellow.b})`,
    green: `rgb(${green.r}, ${green.g}, ${green.b})`,
    cyan: `rgb(${cyan.r}, ${cyan.g}, ${cyan.b})`,
    blue: `rgb(${blue.r}, ${blue.g}, ${blue.b})`,
    purple: `rgb(${purple.r}, ${purple.g}, ${purple.b})`,
  };
};

export default rgbCode;
