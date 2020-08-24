import PropTypes from 'prop-types';
import InputRGB from '../components/InputRGB';

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
      <p>Contrast ratio with pure black: 5.21</p>
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
};

export default HomePage;
