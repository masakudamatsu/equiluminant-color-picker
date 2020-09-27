import PropTypes from 'prop-types';

import {InputDescriptionWrapper, SpacerVertical} from '../theme/style';

function InputColorCode({textField, helperText, errorText}) {
  return (
    <>
      {textField}
      <SpacerVertical scale="2" />
      <InputDescriptionWrapper>
        {helperText}
        <SpacerVertical scale="2" />
        {errorText}
      </InputDescriptionWrapper>
    </>
  );
}

InputColorCode.propTypes = {
  textField: PropTypes.element,
  helperText: PropTypes.element,
  errorText: PropTypes.element,
};

export default InputColorCode;
