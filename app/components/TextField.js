import PropTypes from 'prop-types';
import {Abbr, Input, InputWrapper, Label} from '../theme/style';

function TextField(props) {
  return (
    <InputWrapper>
      <Label htmlFor="inputColorCode">
        Enter <Abbr>css</Abbr> color code
      </Label>
      <Input
        type="text"
        darkMode={props.darkMode}
        error={props.inputInvalid || props.alertMissing}
        id="inputColorCode"
        onBlur={props.handleBlur}
        onChange={props.handleChange}
        pattern={props.pattern}
        value={props.userColorCode}
      />
    </InputWrapper>
  );
}

TextField.propTypes = {
  alertMissing: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputInvalid: PropTypes.bool.isRequired,
  pattern: PropTypes.string.isRequired,
  userColorCode: PropTypes.string,
};

export default TextField;
