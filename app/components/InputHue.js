import PropTypes from 'prop-types';
import Hue from './Hue';

function InputHue(props) {
  return (
    <fieldset>
      <legend>Hue</legend>
      <Hue id="red">Red</Hue>
      <Hue id="orange">Orange</Hue>
      <Hue id="yellow">Yellow</Hue>
      <Hue id="chartreuse">Chartreuse</Hue>
      <Hue id="green">Green</Hue>
      <Hue id="springGreen">Spring Green</Hue>
      <Hue id="cyan">Cyan</Hue>
      <Hue id="azure">Azure</Hue>
      <Hue id="blue">Blue</Hue>
      <Hue id="violet">Violet</Hue>
      <Hue id="magenta">Magenta</Hue>
      <Hue id="rose">Rose</Hue>
    </fieldset>
  );
}

InputHue.propTypes = {};

export default InputHue;
