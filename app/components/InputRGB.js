import PropTypes from 'prop-types';

function InputRGB(props) {
  return (
    <form>
      <label htmlFor="red">
        R:
        <input
          type="text"
          id="red"
          inputMode="decimal"
          onChange={props.handleChangeRed}
          pattern="1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]"
          value={props.red}
        />
      </label>
      <label htmlFor="green">
        G:
        <input
          type="text"
          id="green"
          inputMode="decimal"
          pattern="1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]"
          value={props.green}
        />
      </label>
      <label htmlFor="blue">
        B:
        <input
          type="text"
          id="blue"
          inputMode="decimal"
          pattern="1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]"
          value={props.blue}
        />
      </label>
    </form>
  );
}

InputRGB.propTypes = {
  red: PropTypes.string.isRequired,
  green: PropTypes.string.isRequired,
  blue: PropTypes.string.isRequired,
  handleChangeRed: PropTypes.func.isRequired,
};

export default InputRGB;
