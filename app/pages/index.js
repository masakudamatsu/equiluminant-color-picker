import PropTypes from 'prop-types';
import {useRouter} from 'next/router';

import {SideMarginSetter} from '../theme/style';
import InputColorCode from '../components/InputColorCode';
import InputRGB from '../components/InputRGB';
import InputHue from '../components/InputHue';

function HomePage(props) {
  const router = useRouter();
  const handleClick = e => {
    e.preventDefault();
    const hue = document.querySelector('input[name="hue"]:checked').value;
    props.getHue(hue);
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
      <InputColorCode
        setRed={props.setRed}
        setGreen={props.setGreen}
        setBlue={props.setBlue}
        updateContrastRatio={props.updateContrastRatio}
        darkMode={props.darkMode}
      />
      <InputRGB
        red={props.red}
        green={props.green}
        blue={props.blue}
        handleChangeRed={props.handleChangeRed}
        handleChangeGreen={props.handleChangeGreen}
        handleChangeBlue={props.handleChangeBlue}
      />
      <p>{`Contrast ratio with pure black: ${props.contrastRatio}`}</p>
      <InputHue />
      <button type="submit" onClick={handleClick}>
        Get equiluminant colors!
      </button>
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
};

export default HomePage;
