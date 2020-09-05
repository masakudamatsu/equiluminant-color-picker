import PropTypes from 'prop-types';

function InputColorCode(props) {
  return (
    <label htmlFor="inputColorCode">
      CSS color code
      <input type="text" id="inputColorCode" value={props.inputColorCode} />
    </label>
  );
}

InputColorCode.propTypes = {};

export default InputColorCode;
