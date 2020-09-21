import PropTypes from 'prop-types';
import {useRouter} from 'next/router';

import {
  FlexboxHorizontal,
  FlexboxVertical,
  SideMarginSetter,
} from '../theme/style';
import InputColorCode from '../components/InputColorCode';
import InputRGB from '../components/InputRGB';
import InputHue from '../components/InputHue';
import HueSwatch from '../components/HueSwatch';

function HomePage(props) {
  const router = useRouter();
  const handleClick = e => {
    e.preventDefault();
    const hue = document.querySelector('input[name="hue"]:checked').value;
    props.getHue(hue);
    router.push('/results');
  };
  const handleSubmit = e => {
    e.preventDefault();
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
        <InputColorCode
          red={props.red}
          green={props.green}
          blue={props.blue}
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
        <FlexboxHorizontal>
          <FlexboxVertical>
            <HueSwatch
              getHue={props.getHue}
              handleSubmit={handleSubmit}
              hue="0"
              title="Red"
            />
            <HueSwatch
              getHue={props.getHue}
              handleSubmit={handleSubmit}
              hue="30"
              title="Orange"
            />
            <HueSwatch
              getHue={props.getHue}
              handleSubmit={handleSubmit}
              hue="60"
              title="Yellow"
            />
            <HueSwatch
              getHue={props.getHue}
              handleSubmit={handleSubmit}
              hue="90"
              title="Chartreuse"
            />
          </FlexboxVertical>
          <FlexboxVertical>
            <HueSwatch
              getHue={props.getHue}
              handleSubmit={handleSubmit}
              hue="120"
              title="Green"
            />
            <HueSwatch
              getHue={props.getHue}
              handleSubmit={handleSubmit}
              hue="150"
              title="SpringGreen"
            />
            <HueSwatch
              getHue={props.getHue}
              handleSubmit={handleSubmit}
              hue="180"
              title="Cyan"
            />
            <HueSwatch
              getHue={props.getHue}
              handleSubmit={handleSubmit}
              hue="210"
              title="Azure"
            />
          </FlexboxVertical>
          <FlexboxVertical>
            <HueSwatch
              getHue={props.getHue}
              handleSubmit={handleSubmit}
              hue="240"
              title="Blue"
            />
            <HueSwatch
              getHue={props.getHue}
              handleSubmit={handleSubmit}
              hue="270"
              title="Violet"
            />
            <HueSwatch
              getHue={props.getHue}
              handleSubmit={handleSubmit}
              hue="300"
              title="Magenta"
            />
            <HueSwatch
              getHue={props.getHue}
              handleSubmit={handleSubmit}
              hue="330"
              title="Rose"
            />
          </FlexboxVertical>
        </FlexboxHorizontal>
        <InputHue />
        <button type="submit" onClick={handleClick}>
          Get equiluminant colors!
        </button>
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
  getHue: PropTypes.func.isRequired,
};

export default HomePage;
