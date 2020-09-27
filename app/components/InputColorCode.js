import PropTypes from 'prop-types';
import ErrorText from './ErrorText';
import HelperText from './HelperText';
import TextField from './TextField';

import {
  Abbr,
  Input,
  InputDescriptionWrapper,
  InputWrapper,
  Label,
  SpacerVertical,
} from '../theme/style';

function InputColorCode(props) {
  return (
    <>
      {/* prettier-ignore */}
      <TextField
          darkMode={props.darkMode}
          inputInvalid={props.inputInvalid}
          alertMissing={props.alertMissing}
          handleBlur={props.handleBlur}
          handleChange={props.handleChange}
          pattern={props.pattern}
          value={props.userColorCode}
        />
      <SpacerVertical scale="2" />
      <InputDescriptionWrapper>
        <HelperText />
        <SpacerVertical scale="2" />
        <ErrorText
          darkMode={props.darkMode}
          inputInvalid={props.inputInvalid}
          alertMissing={props.alertMissing}
        />
      </InputDescriptionWrapper>
    </>
  );
}

InputColorCode.propTypes = {
  red: PropTypes.string.isRequired,
  green: PropTypes.string.isRequired,
  blue: PropTypes.string.isRequired,
  setRed: PropTypes.func.isRequired,
  setGreen: PropTypes.func.isRequired,
  setBlue: PropTypes.func.isRequired,
  updateContrastRatio: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  inputMissing: PropTypes.bool.isRequired,
  setInputMissing: PropTypes.func.isRequired,
  alertMissing: PropTypes.bool.isRequired,
  setAlertMissing: PropTypes.func.isRequired,
  inputInvalid: PropTypes.bool.isRequired,
  setInputInvalid: PropTypes.func.isRequired,
  backgroundOverlay: PropTypes.bool.isRequired,
  setBackgroundOverlay: PropTypes.func.isRequired,
  setBackgroundColor: PropTypes.func.isRequired,
  setBackgroundOverlayColor: PropTypes.func.isRequired,
};

export default InputColorCode;
