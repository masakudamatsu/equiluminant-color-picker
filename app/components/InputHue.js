import PropTypes from 'prop-types';
import Hue from './Hue';

function InputHue(props) {
  return (
    <fieldset>
      <legend>Hue</legend>
      <Hue id="red" hue="0">
        Red
      </Hue>
      <Hue id="orange" hue="30">
        Orange
      </Hue>
      <Hue id="yellow" hue="60">
        Yellow
      </Hue>
      <Hue id="chartreuse" hue="90">
        Chartreuse
      </Hue>
      <Hue id="green" hue="120">
        Green
      </Hue>
      <Hue id="springGreen" hue="150">
        Spring Green
      </Hue>
      <Hue id="cyan" hue="180">
        Cyan
      </Hue>
      <Hue id="azure" hue="210">
        Azure
      </Hue>
      <Hue id="blue" hue="240">
        Blue
      </Hue>
      <Hue id="violet" hue="270">
        Violet
      </Hue>
      <Hue id="magenta" hue="300">
        Magenta
      </Hue>
      <Hue id="rose" hue="330">
        Rose
      </Hue>
    </fieldset>
  );
}

InputHue.propTypes = {};

export default InputHue;
