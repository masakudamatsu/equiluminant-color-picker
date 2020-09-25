import PropTypes from 'prop-types';
import {useRouter} from 'next/router';

import {HueSwatchWrapper, SideMarginSetter} from '../theme/style';
import InputColorCode from '../components/InputColorCode';
import InputRGB from '../components/InputRGB';
import HueSwatch from '../components/HueSwatch';

function HomePage(props) {
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
      <form>
        <h2>#1 Set Luminance</h2>
        <InputColorCode
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
        />
        <h2>#2 Choose hue</h2>
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
