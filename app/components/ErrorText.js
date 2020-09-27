import PropTypes from 'prop-types';
import {Abbr, ParagraphErrorMessage} from '../theme/style';

function ErrorText(props) {
  let errorMessage;
  if (props.inputInvalid) {
    errorMessage = (
      <span>
        Please enter a valid <Abbr>css</Abbr> color code as shown in the above
        examples
      </span>
    );
  } else if (props.alertMissing) {
    errorMessage = (
      <span>
        Please enter a <Abbr>css</Abbr> color code before choosing a hue
      </span>
    );
  } else {
    errorMessage = (
      <span>
        This text prevents the layout shift due to the error message appearance.
      </span>
    );
  }
  return (
    <ParagraphErrorMessage
      data-testid="colorCodeError"
      darkMode={props.darkMode}
      error={props.inputInvalid || props.alertMissing}
    >
      {errorMessage}
    </ParagraphErrorMessage>
  );
}

ErrorText.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  alertMissing: PropTypes.bool.isRequired,
  inputInvalid: PropTypes.bool.isRequired,
};

export default ErrorText;
