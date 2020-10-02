import PropTypes from 'prop-types';
import {Abbr, Input, InputWrapper, Label} from '../theme/style';

function TextField(props) {
  return (
    <InputWrapper>
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input
        type="text"
        darkMode={props.darkMode}
        error={props.inputInvalid || props.alertMissing}
        id={props.id}
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
  id: PropTypes.string.isRequired,
  inputInvalid: PropTypes.bool.isRequired,
  label: PropTypes.element.isRequired,
  pattern: PropTypes.string.isRequired,
  userColorCode: PropTypes.string,
};

export default TextField;
