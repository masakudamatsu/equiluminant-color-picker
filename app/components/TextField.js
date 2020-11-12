import PropTypes from 'prop-types';
import {Abbr, InputText, InputWrapper, Label} from '../theme/style';

function TextField(props) {
  return (
    <InputWrapper>
      <Label darkMode={props.darkMode} htmlFor={props.id}>
        {props.label}
      </Label>
      <InputText
        backgroundColor={props.backgroundColor}
        data-testid={props.testId}
        darkMode={props.darkMode}
        error={props.inputInvalid || props.alertMissing}
        id={props.id}
        onBlur={props.handleBlur}
        onChange={props.handleChange}
        onKeyDown={props.handleKeyDown}
        pattern={props.pattern}
        value={props.value}
      />
    </InputWrapper>
  );
}

TextField.propTypes = {
  alertMissing: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string,
  darkMode: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func,
  id: PropTypes.string.isRequired,
  inputInvalid: PropTypes.bool.isRequired,
  label: PropTypes.element.isRequired,
  pattern: PropTypes.string.isRequired,
  testId: PropTypes.string,
  value: PropTypes.string,
};

export default TextField;
