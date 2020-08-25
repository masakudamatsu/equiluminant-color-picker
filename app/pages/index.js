import PropTypes from 'prop-types';
import InputRGB from '../components/InputRGB';
import InputHue from '../components/InputHue';

function HomePage(props) {
  return (
    <>
      <h1>Luminance Picker</h1>
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
};

export default HomePage;
