import {useState} from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';

import {
  Abbr,
  ChromaTextFieldWrapper,
  ChromaTextField,
  H2,
  HueSwatchWrapper,
  InputRange,
  SpacerVertical,
} from '../theme/style';

import ChromaPreview from '../components/ChromaPreview';
import InputColorCode from '../components/InputColorCode';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';
import TextField from '../components/TextField';

import InputRGB from '../components/InputRGB';
import HueSwatch from '../components/HueSwatch';

import {handleArrowKeys} from '../utils/eventHandlers';
import {getRgbFromHex, getRgbFromHsl} from '../utils/helpers';
import {regexHexText, regexRgbText, regexHslText} from '../utils/regex';
import color from '../theme/color';

function HomePage(props) {
  const [userColorCode, setUserColorCode] = useState('');

  const handleChange = event => {
    setUserColorCode(event.target.value);
    if (props.alertMissing) {
      props.setAlertMissing(false);
    }
    if (props.inputInvalid) {
      if (!event.target.validity.patternMismatch) {
        props.setInputInvalid(false);
      }
    }
  };

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

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the submission
      // When nothing is entered
      if (!event.target.value) {
        props.setAlertMissing(true);
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
      } else {
        props.setAlertEnterKey(true);
        document.getElementById('inputColorCode').blur();
      }
    }
  };

  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    if (props.inputMissing) {
      props.setAlertMissing(true);
      document.getElementById('inputColorCode').focus();
      return;
    }
    if (props.inputInvalid) {
      document.getElementById('inputColorCode').focus();
      return;
    }
    router.push('/results');
  };

  const colorCodeFieldLabel = (
    <span>
      Enter <Abbr>css</Abbr> color code
    </span>
  );

  const pattern = `${regexHexText}|${regexRgbText}|${regexHslText}`;

  const handleChangeChroma = event => {
    props.setChroma(event.target.value);
  };

  const handleKeyDownChroma = event => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the submission
    }
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      return;
    }
    let newChromaValue;
    if (event.shiftKey) {
      // Increase the value by 10
      newChromaValue = handleArrowKeys(event, 10);
    } else {
      // Increase the value by 1
      newChromaValue = handleArrowKeys(event, 1);
    }
    props.setChroma(newChromaValue);
  };

  return (
    <>
      <h1>Luminance Picker</h1>
      <noscript>
        For full functionality of this site, it is necessary to enable
        JavaScript. Here are the{' '}
        <a href="https://www.enable-javascript.com/">
          instructions how to enable JavaScript in your web browser
        </a>
        .
      </noscript>
      <SpacerVertical scale="3" />
      <form>
        <H2>#1 Set Luminance</H2>
        <SpacerVertical scale="2" />
        <InputColorCode
          textField={
            <TextField
              darkMode={props.darkMode}
              id="inputColorCode"
              inputInvalid={props.inputInvalid}
              label={colorCodeFieldLabel}
              alertMissing={props.alertMissing}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
              pattern={pattern}
              value={userColorCode}
            />
          }
          helperText={<HelperText />}
          errorText={
            <ErrorText
              darkMode={props.darkMode}
              inputInvalid={props.inputInvalid}
              alertMissing={props.alertMissing}
              alertEnterKey={props.alertEnterKey}
            />
          }
        />{' '}
        <SpacerVertical scale="3" />
        <H2>#2 Choose chroma</H2>
        <SpacerVertical scale="2" />
        <ChromaTextFieldWrapper>
          <ChromaPreview chroma={props.chroma} />
          <ChromaTextField
            darkMode={props.darkMode}
            data-testid="chroma-field"
            id="chroma-field"
            onChange={handleChangeChroma}
            onKeyDown={handleKeyDownChroma}
            pattern="1?\d?\d|2[0-4]\d|25[0-5]"
            value={props.chroma}
          />
        </ChromaTextFieldWrapper>
        <SpacerVertical scale="2" />
        <InputRange
          darkMode={props.darkMode}
          data-testid="chroma-setter"
          id="chroma-setter"
          max="255"
          min="0"
          onChange={handleChangeChroma}
          step="1"
          value={props.chroma}
        />
        <SpacerVertical scale="1" />
        <p>0 for grayscale; 255 for fully-saturated color</p>
        <button type="submit" onClick={handleSubmit}>
          Get equiluminant color!
        </button>
      </form>
    </>
  );
}

HomePage.propTypes = {
  red: PropTypes.string.isRequired,
  green: PropTypes.string.isRequired,
  blue: PropTypes.string.isRequired,
  handleChangeRed: PropTypes.func.isRequired,
  handleChangeGreen: PropTypes.func.isRequired,
  handleChangeBlue: PropTypes.func.isRequired,
  contrastRatio: PropTypes.string.isRequired,
  updateContrastRatio: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  inputMissing: PropTypes.bool.isRequired,
  setInputMissing: PropTypes.func.isRequired,
  alertMissing: PropTypes.bool.isRequired,
  setAlertMissing: PropTypes.func.isRequired,
  inputInvalid: PropTypes.bool.isRequired,
  setInputInvalid: PropTypes.func.isRequired,
  alertEnterKey: PropTypes.bool.isRequired,
  setAlertEnterKey: PropTypes.func.isRequired,
  getHue: PropTypes.func.isRequired,
  backgroundOverlay: PropTypes.bool.isRequired,
  setBackgroundOverlay: PropTypes.func.isRequired,
  setBackgroundColor: PropTypes.func.isRequired,
  setBackgroundOverlayColor: PropTypes.func.isRequired,
  chroma: PropTypes.string.isRequired,
};

export default HomePage;
