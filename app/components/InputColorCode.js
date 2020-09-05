import PropTypes from 'prop-types';

function InputColorCode(props) {
  return (
    <label htmlFor="inputColorCode">
      CSS color code
      <input
        type="text"
        id="inputColorCode"
        pattern="#([A-Fa-f\d]{3}){1,2}|rgb\((1?\d?\d|2[0-4]\d|25[0-5])(,\s*(1?\d?\d|2[0-4]\d|25[0-5])){2}\)"
        value={props.inputColorCode}
      />
    </label>
  );
}

InputColorCode.propTypes = {};

export default InputColorCode;
