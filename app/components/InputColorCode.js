import PropTypes from 'prop-types';

function InputColorCode(props) {
  return (
    <label htmlFor="inputColorCode">
      CSS color code
      <input
        type="text"
        id="inputColorCode"
        pattern="#([A-Fa-f\d]{3}){1,2}"
        value={props.inputColorCode}
      />
    </label>
  );
}

InputColorCode.propTypes = {};

export default InputColorCode;
