import {useState} from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';

import {
  H2,
  HueSwatchWrapper,
  SideMarginSetter,
  SpacerVertical,
} from '../theme/style';
import InputColorCode from '../components/InputColorCode';
import InputRGB from '../components/InputRGB';
import HueSwatch from '../components/HueSwatch';

import {getRgbFromHex, getRgbFromHsl} from '../utils/helpers';
import color from '../theme/color';

function HomePage(props) {
  const router = useRouter();

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

  const regexHexText = '#([A-Fa-f\\d]{3}){1,2}';
  const regexRgbText =
    'rgb\\((1?\\d?\\d|2[0-4]\\d|25[0-5])(,\\s*(1?\\d?\\d|2[0-4]\\d|25[0-5])){2}\\)';
  const regexHslText =
    'hsl\\((360|3[0-5]\\d|[1-2]?\\d?\\d)(,\\s*(100|[1-9]?\\d)%){2}\\)';
  const pattern = `${regexHexText}|${regexRgbText}|${regexHslText}`;

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
  return (
    <SideMarginSetter>
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
          handleChange={handleChange}
          userColorCode={userColorCode}
          handleBlur={handleBlur}
          pattern={pattern}
          red={props.red}
          green={props.green}
          blue={props.blue}
          setRed={props.setRed}
          setGreen={props.setGreen}
          setBlue={props.setBlue}
          updateContrastRatio={props.updateContrastRatio}
          darkMode={props.darkMode}
          inputMissing={props.inputMissing}
          setInputMissing={props.setInputMissing}
          alertMissing={props.alertMissing}
          setAlertMissing={props.setAlertMissing}
          inputInvalid={props.inputInvalid}
          setInputInvalid={props.setInputInvalid}
          backgroundOverlay={props.backgroundOverlay}
          setBackgroundOverlay={props.setBackgroundOverlay}
          setBackgroundColor={props.setBackgroundColor}
          setBackgroundOverlayColor={props.setBackgroundOverlayColor}
        />{' '}
        <SpacerVertical scale="3" />
        <H2>#2 Choose hue</H2>
        <SpacerVertical scale="2" />
        <HueSwatchWrapper darkMode={props.darkMode}>
          <HueSwatch
            getHue={props.getHue}
            handleSubmit={handleSubmit}
            hue="0"
            left="4.8"
            title="Red"
            top="11.2"
            zIndex="1"
          />
          <HueSwatch
            getHue={props.getHue}
            handleSubmit={handleSubmit}
            hue="30"
            left="15.5"
            title="Orange"
            top="21.7"
            zIndex="2"
          />
          <HueSwatch
            getHue={props.getHue}
            handleSubmit={handleSubmit}
            hue="60"
            left="52"
            title="Yellow"
            top="28.8"
            zIndex="3"
          />
          <HueSwatch
            getHue={props.getHue}
            handleSubmit={handleSubmit}
            hue="90"
            left="8.2"
            title="Chartreuse"
            top="39.1"
            zIndex="3"
          />
          <HueSwatch
            getHue={props.getHue}
            handleSubmit={handleSubmit}
            hue="120"
            left="41.7"
            title="Green"
            top="36.5"
            zIndex="4"
          />
          <HueSwatch
            getHue={props.getHue}
            handleSubmit={handleSubmit}
            hue="150"
            left="57.6"
            title="SpringGreen"
            top="10.3"
            zIndex="1"
          />
          <HueSwatch
            getHue={props.getHue}
            handleSubmit={handleSubmit}
            hue="180"
            left="13.4"
            title="Cyan"
            top="55"
            zIndex="4"
          />
          <HueSwatch
            getHue={props.getHue}
            handleSubmit={handleSubmit}
            hue="210"
            left="74.8"
            title="Azure"
            top="39.3"
            zIndex="3"
          />
          <HueSwatch
            getHue={props.getHue}
            handleSubmit={handleSubmit}
            hue="240"
            left="67.9"
            title="Blue"
            top="23.4"
            zIndex="2"
          />
          <HueSwatch
            getHue={props.getHue}
            handleSubmit={handleSubmit}
            hue="270"
            left="49.6"
            title="Violet"
            top="60.3"
            zIndex="3"
          />
          <HueSwatch
            getHue={props.getHue}
            handleSubmit={handleSubmit}
            hue="300"
            left="35.8"
            title="Magenta"
            top="64"
            zIndex="4"
          />
          <HueSwatch
            getHue={props.getHue}
            handleSubmit={handleSubmit}
            hue="330"
            left="18.6"
            title="Rose"
            top="72"
            zIndex="5"
          />
        </HueSwatchWrapper>
        <InputRGB
          red={props.red}
          green={props.green}
          blue={props.blue}
          handleChangeRed={props.handleChangeRed}
          handleChangeGreen={props.handleChangeGreen}
          handleChangeBlue={props.handleChangeBlue}
        />
        <p>{`Contrast ratio with pure black: ${props.contrastRatio}`}</p>
      </form>
    </SideMarginSetter>
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
  getHue: PropTypes.func.isRequired,
  backgroundOverlay: PropTypes.bool.isRequired,
  setBackgroundOverlay: PropTypes.func.isRequired,
  setBackgroundColor: PropTypes.func.isRequired,
  setBackgroundOverlayColor: PropTypes.func.isRequired,
};

export default HomePage;
