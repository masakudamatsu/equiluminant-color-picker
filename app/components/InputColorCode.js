import PropTypes from 'prop-types';
import ErrorText from './ErrorText';
import HelperText from './HelperText';
import {
  Abbr,
  Input,
  InputDescriptionWrapper,
  InputWrapper,
  Label,
  SpacerVertical,
} from '../theme/style';
import {getRgbFromHex, getRgbFromHsl} from '../utils/helpers';
import color from '../theme/color';

function InputColorCode(props) {
  const regexHexText = '#([A-Fa-f\\d]{3}){1,2}';
  const regexRgbText =
    'rgb\\((1?\\d?\\d|2[0-4]\\d|25[0-5])(,\\s*(1?\\d?\\d|2[0-4]\\d|25[0-5])){2}\\)';
  const regexHslText =
    'hsl\\((360|3[0-5]\\d|[1-2]?\\d?\\d)(,\\s*(100|[1-9]?\\d)%){2}\\)';

  // Generate the RGB color code
  let backgroundColor = color.body.font.lightMode;
  if (props.red && props.green && props.blue) {
    backgroundColor = `rgb(${props.red}, ${props.green}, ${props.blue})`;
  }

  const handleBlur = event => {
    // When nothing is entered
    if (!event.target.value) {
      if (!props.inputMissing) {
        props.setInputMissing(true);
      }
      return;
    }
    // When something is entered
    props.setInputMissing(false);
    // Validation
    const newInputIsInvalid = event.target.validity.patternMismatch;
    if (newInputIsInvalid) {
      if (!props.inputInvalid) {
        props.setInputInvalid(true);
      }
    }
    if (!newInputIsInvalid) {
      if (props.inputInvalid) {
        props.setInputInvalid(false);
      }
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

      // Change the background
      if (!props.backgroundOverlay) {
        props.setBackgroundOverlayColor(
          `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`,
        );
        props.setBackgroundOverlay(true);
        props.setBackgroundColor(
          `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`,
        ); // To prevent the overshoot scrolling from revealing the previous background color.
      } else {
        props.setBackgroundColor(
          `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`,
        );
        props.setBackgroundOverlay(false);
      }
    }
  };

  return (
    <>
      {/* prettier-ignore */}
      <InputWrapper>
        <Label htmlFor="inputColorCode">
          Enter{' '}<Abbr>css</Abbr> color code
        </Label>
        <Input
          type="text"
          darkMode={props.darkMode}
          error={props.inputInvalid || props.alertMissing}
          id="inputColorCode"
          onBlur={handleBlur}
          onChange={props.handleChange}
          pattern={`${regexHexText}|${regexRgbText}|${regexHslText}`}
          value={props.userColorCode}
        />
      </InputWrapper>
      <SpacerVertical scale="2" />
      <InputDescriptionWrapper>
        <HelperText />
        <SpacerVertical scale="2" />
        <ErrorText
          darkMode={props.darkMode}
          inputInvalid={props.inputInvalid}
          alertMissing={props.alertMissing}
        />
      </InputDescriptionWrapper>
    </>
  );
}

InputColorCode.propTypes = {
  red: PropTypes.string.isRequired,
  green: PropTypes.string.isRequired,
  blue: PropTypes.string.isRequired,
  setRed: PropTypes.func.isRequired,
  setGreen: PropTypes.func.isRequired,
  setBlue: PropTypes.func.isRequired,
  updateContrastRatio: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  inputMissing: PropTypes.bool.isRequired,
  setInputMissing: PropTypes.func.isRequired,
  alertMissing: PropTypes.bool.isRequired,
  setAlertMissing: PropTypes.func.isRequired,
  inputInvalid: PropTypes.bool.isRequired,
  setInputInvalid: PropTypes.func.isRequired,
  backgroundOverlay: PropTypes.bool.isRequired,
  setBackgroundOverlay: PropTypes.func.isRequired,
  setBackgroundColor: PropTypes.func.isRequired,
  setBackgroundOverlayColor: PropTypes.func.isRequired,
};

export default InputColorCode;
