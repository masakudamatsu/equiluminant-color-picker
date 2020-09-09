import {useState} from 'react';
import PropTypes from 'prop-types';
import {ParagraphErrorMessage} from '../theme/style';
import {getRgbFromHex, getRgbFromHsl} from '../utils/helpers';

function InputColorCode(props) {
  const [invalid, setInvalid] = useState(false);

  const regexHexText = '#([A-Fa-f\\d]{3}){1,2}';
  const regexRgbText =
    'rgb\\((1?\\d?\\d|2[0-4]\\d|25[0-5])(,\\s*(1?\\d?\\d|2[0-4]\\d|25[0-5])){2}\\)';
  const regexHslText =
    'hsl\\((360|3[0-5]\\d|[1-2]?\\d?\\d)(,\\s*(100|[1-9]?\\d)%){2}\\)';

  const handleBlur = event => {
    // When nothing is entered
    if (!event.target.value) {
      return;
    }
    // Validation
    const newInputIsInvalid = event.target.validity.patternMismatch;
    if (!invalid && newInputIsInvalid) {
      setInvalid(true);
    }
    if (invalid && !newInputIsInvalid) {
      setInvalid(false);
    }
    if (!newInputIsInvalid) {
      // Remove all the whitespaces from the user's input value
      const newInputValue = event.target.value.trim().replace(/\s/g, '');
      // Convert into RGB code
      let newInputValueRGB;
      // HEX
      const regexHex = new RegExp(regexHexText);
      if (regexHex.test(newInputValue)) {
        newInputValueRGB = getRgbFromHex(newInputValue);
      }
      // RGB
      const regexRgb = new RegExp(regexRgbText);
      if (regexRgb.test(newInputValue)) {
        newInputValueRGB = newInputValue;
      }
      // HSL
      const regexHsl = new RegExp(regexHslText);
      if (regexHsl.test(newInputValue)) {
        newInputValueRGB = getRgbFromHsl(newInputValue);
      }
      // Extract RGB values
      const rgbValues = newInputValueRGB.slice(4, -1).split(',');
      props.setRed(rgbValues[0]);
      props.setGreen(rgbValues[1]);
      props.setBlue(rgbValues[2]);
      props.updateContrastRatio(rgbValues[0], rgbValues[1], rgbValues[2]);
    }
  };
  return (
    <>
      <label htmlFor="inputColorCode">
        CSS color code
        <input
          type="text"
          id="inputColorCode"
          onBlur={handleBlur}
          pattern={`${regexHexText}|${regexRgbText}|${regexHslText}`}
          value={props.inputColorCode}
        />
        <p> e.g. #4287f5, rgb(66, 135, 245), or hsl(217, 90%, 61%)</p>
      </label>
      <ParagraphErrorMessage data-testid="colorCodeError" error={invalid}>
        Please enter a valid CSS color code
      </ParagraphErrorMessage>
    </>
  );
}

InputColorCode.propTypes = {
  setRed: PropTypes.func.isRequired,
  setGreen: PropTypes.func.isRequired,
  setBlue: PropTypes.func.isRequired,
  updateContrastRatio: PropTypes.func.isRequired,
};

export default InputColorCode;
