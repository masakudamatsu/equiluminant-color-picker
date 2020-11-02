import {useState} from 'react';
import PropTypes from 'prop-types';

import {
  Abbr,
  ChromaTextField,
  ChromaTextFieldWrapper,
  H2,
  InputRange,
  SpacerVertical,
} from '../theme/style';

import ChromaPreview from '../components/ChromaPreview';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';
import InputColorCode from '../components/InputColorCode';
import SearchResults from '../components/SearchResults';
import Swatches from '../components/Swatches';
import TextField from '../components/TextField';

import color from '../theme/color';
import {getRgbFromHex, getRgbFromHsl} from '../utils/helpers';
import {handleArrowKeys} from '../utils/eventHandlers';
import {regexHexText, regexRgbText, regexHslText} from '../utils/regex';

function HomePage(props) {
  const [userColorCode, setUserColorCode] = useState('');

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

  const handleBlurChroma = event => {
    // When nothing is entered
    if (!event.target.value) {
      if (!props.chromaMissing) {
        props.setChromaMissing(true);
      }
      props.setChroma('255');
      return;
    }
    // Validation
    const newInputIsInvalid = event.target.validity.patternMismatch;
    if (newInputIsInvalid) {
      if (!props.chromaInvalid) {
        props.setChromaInvalid(true);
      }
    }
  };

  const handleChangeChroma = event => {
    if (props.chromaMissing) {
      props.setChromaMissing(false);
    }
    props.setChroma(event.target.value);
    if (props.chromaInvalid) {
      if (!event.target.validity.patternMismatch) {
        props.setChromaInvalid(false);
      }
    }
  };

  const handleFocusChroma = event => {
    if (props.chromaMissing) {
      props.setChromaMissing(false);
    }
  };

  const handleKeyDownChroma = event => {
    // Deal with enter keys
    if (event.key === 'Enter') {
      if (!event.target.value) {
        event.preventDefault(); // Prevent the submission
        props.setChromaMissing(true);
        return;
      }
      if (event.target.validity.patternMismatch) {
        event.preventDefault(); // Prevent the submission
        if (!props.chromaInvalid) {
          props.setChromaInvalid(true);
        }
      }
    }
    // Deal with non-arrow keys
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      return;
    }
    // Invalid arrow key events
    if (event.key === 'ArrowUp' && event.target.value === '255') {
      event.preventDefault();
      props.setChromaInvalid(true);
      return;
    }
    if (event.key === 'ArrowDown' && event.target.value === '0') {
      props.setChromaInvalid(true);
      return;
    }
    // When everything is valid
    if (props.chromaInvalid) {
      props.setChromaInvalid(false);
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
    if (props.chromaInvalid) {
      document.getElementById('chroma-field').focus();
      return;
    }
    props.setSubmitted(true);
  };

  const colorCodeFieldLabel = (
    <span>
      Enter <Abbr>css</Abbr> color code
    </span>
  );
  const pattern = `${regexHexText}|${regexRgbText}|${regexHslText}`;
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
              testId="colorCodeError"
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
            error={props.chromaInvalid}
            id="chroma-field"
            onBlur={handleBlurChroma}
            onChange={handleChangeChroma}
            onFocus={handleFocusChroma}
            onKeyDown={handleKeyDownChroma}
            pattern="1?\d?\d|2[0-4]\d|25[0-5]"
            value={props.chroma}
          />
        </ChromaTextFieldWrapper>
        <SpacerVertical scale="1" />
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
        <ErrorText
          chromaInvalid={props.chromaInvalid}
          chromaMissing={props.chromaMissing}
          darkMode={props.darkMode}
          testId="chromaError"
        />
        <SpacerVertical scale="3" />
        <H2>#3 Search the color database</H2>
        <SpacerVertical scale="2" />
        <button type="submit" onClick={handleSubmit}>
          Get equiluminant color!
        </button>
      </form>
      <SpacerVertical scale="3" />
      <H2>#4 Choose a hue</H2>
      <SpacerVertical scale="2" />
      <SearchResults
        chroma={props.chroma}
        contrastRatio={props.contrastRatio}
        darkMode={props.darkMode}
        setClickedColorCode={props.setClickedColorCode}
        submitted={props.submitted}
      />
      <SpacerVertical scale="3" />
      <H2>#5 Copy the color code</H2>
      <SpacerVertical scale="2" />
      <Swatches colors={[]} />
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
  submitted: PropTypes.bool.isRequired,
  setSubmitted: PropTypes.func.isRequired,
  clickedColorCode: PropTypes.string,
  setClickedColorCode: PropTypes.func.isRequired,
};

export default HomePage;
