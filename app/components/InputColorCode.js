import {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Abbr,
  SpacerHorizontal,
  Input,
  InputDescriptionWrapper,
  InputExamplesWrapper,
  InputWrapper,
  Label,
  ListItemInputValueExample,
  ParagraphErrorMessage,
  Paragraph,
  UnorderedListInputValueExamples,
  SpacerVertical,
} from '../theme/style';
import {getRgbFromHex, getRgbFromHsl} from '../utils/helpers';
import color from '../theme/color';

function InputColorCode(props) {
  const [userColorCode, setUserColorCode] = useState('');

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

  const handleChange = event => {
    setUserColorCode(event.target.value);
    if (props.alertMissing) {
      props.setAlertMissing(false);
    }
  };

  const handleBlur = event => {
    // When nothing is entered
    if (!event.target.value) {
      if (!props.inputMissing) {
        props.setInputMissing(true);
      }
      return;
    }
    props.setInputMissing(false);
    // Validation
    const newInputIsInvalid = event.target.validity.patternMismatch;
    if (!props.inputInvalid && newInputIsInvalid) {
      props.setInputInvalid(true);
    }
    if (props.inputInvalid && !newInputIsInvalid) {
      props.setInputInvalid(false);
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
          onChange={handleChange}
          pattern={`${regexHexText}|${regexRgbText}|${regexHslText}`}
          value={userColorCode}
        />
      </InputWrapper>
      <InputDescriptionWrapper>
        <InputExamplesWrapper>
          <Paragraph>Examples:</Paragraph>
          <SpacerHorizontal />
          <UnorderedListInputValueExamples>
            <ListItemInputValueExample>
              rgb(66, 135, 245)
            </ListItemInputValueExample>
            <ListItemInputValueExample>
              hsl(217, 90%, 61%)
            </ListItemInputValueExample>
            <ListItemInputValueExample>#4287f5</ListItemInputValueExample>
          </UnorderedListInputValueExamples>
        </InputExamplesWrapper>
        <SpacerVertical />
        <ParagraphErrorMessage
          data-testid="colorCodeError"
          darkMode={props.darkMode}
          error={props.inputInvalid || props.alertMissing}
        >
          Please enter a valid <Abbr>css</Abbr> color code
        </ParagraphErrorMessage>
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
