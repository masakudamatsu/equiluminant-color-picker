import PropTypes from 'prop-types';
import Hue from './Hue';

function InputHue(props) {
  return (
    <fieldset>
      <legend>Hue</legend>
      <Hue id="red" hue="0">
        Red
      </Hue>
      <Hue id="vermilion" hue="15">
        Vermilion
      </Hue>
      <Hue id="orange" hue="30">
        Orange
      </Hue>
      <Hue id="amber" hue="45">
        Amber
      </Hue>
      <Hue id="yellow" hue="60">
        Yellow
      </Hue>
      <Hue id="yellowishGreen" hue="75">
        Yellowish Green
      </Hue>
      <Hue id="chartreuse" hue="90">
        Chartreuse
      </Hue>
      <Hue id="leafGreen" hue="105">
        Leaf Green
      </Hue>
      <Hue id="green" hue="120">
        Green
      </Hue>
      <Hue id="cobaltGreen" hue="135">
        Cobalt Green
      </Hue>
      <Hue id="springGreen" hue="150">
        Spring Green
      </Hue>
      <Hue id="turquoisGreen" hue="165">
        Turquois Green
      </Hue>
      <Hue id="cyan" hue="180">
        Cyan
      </Hue>
      <Hue id="ceruleanBlue" hue="195">
        Cerulean Blue
      </Hue>
      <Hue id="azure" hue="210">
        Azure
      </Hue>
      <Hue id="cobaltBlue" hue="225">
        Cobalt Blue
      </Hue>
      <Hue id="blue" hue="240">
        Blue
      </Hue>
      <Hue id="hyacinth" hue="255">
        Hyacinth
      </Hue>
      <Hue id="violet" hue="270">
        Violet
      </Hue>
      <Hue id="purple" hue="285">
        Purple
      </Hue>
      <Hue id="magenta" hue="300">
        Magenta
      </Hue>
      <Hue id="reddishPurple" hue="315">
        Reddish Purple
      </Hue>
      <Hue id="rose" hue="330">
        Rose
      </Hue>
      <Hue id="carmine" hue="345">
        Carmine
      </Hue>
    </fieldset>
  );
}

InputHue.propTypes = {};

export default InputHue;
