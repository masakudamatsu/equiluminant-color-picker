import PropTypes from 'prop-types';

function InputColorCode(props) {
  return (
    <label htmlFor="inputColorCode">
      CSS color code
      <input
        type="text"
        id="inputColorCode"
        pattern="#([A-Fa-f\d]{3}){1,2}|rgb\((1?\d?\d|2[0-4]\d|25[0-5])(,\s*(1?\d?\d|2[0-4]\d|25[0-5])){2}\)|hsl\((360|3[0-5]\d|[1-2]?\d?\d)(,\s*(100|[1-9]?\d)%){2}\)"
        value={props.inputColorCode}
      />
      <p> e.g. #4287f5, rgb(66, 135, 245), or hsl(217, 90%, 61%)</p>
    </label>
  );
}

InputColorCode.propTypes = {};

export default InputColorCode;
