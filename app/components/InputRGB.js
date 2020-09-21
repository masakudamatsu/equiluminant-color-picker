import PropTypes from 'prop-types';

function InputRGB(props) {
  return (
    <>
      <label htmlFor="R">
        R:
        <input
          type="text"
          id="R"
          inputMode="decimal"
          onChange={props.handleChangeRed}
          pattern="1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]"
          value={props.red}
        />
      </label>
      <label htmlFor="G">
        G:
        <input
          type="text"
          id="G"
          inputMode="decimal"
          onChange={props.handleChangeGreen}
          pattern="1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]"
          value={props.green}
        />
      </label>
      <label htmlFor="B">
        B:
        <input
          type="text"
          id="B"
          inputMode="decimal"
          onChange={props.handleChangeBlue}
          pattern="1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]"
          value={props.blue}
        />
      </label>
    </>
  );
}

InputRGB.propTypes = {
  red: PropTypes.string.isRequired,
  green: PropTypes.string.isRequired,
  blue: PropTypes.string.isRequired,
  handleChangeRed: PropTypes.func.isRequired,
  handleChangeGreen: PropTypes.func.isRequired,
  handleChangeBlue: PropTypes.func.isRequired,
};

export default InputRGB;
