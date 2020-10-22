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
        Please enter a <Abbr>css</Abbr> color code before pressing the search
        button
      </span>
    );
  } else if (props.alertEnterKey) {
    errorMessage = <span>Please click one of the hue swatches below</span>;
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
      error={props.inputInvalid || props.alertMissing || props.alertEnterKey}
    >
      {errorMessage}
    </ParagraphErrorMessage>
  );
}

ErrorText.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  alertEnterKey: PropTypes.bool.isRequired,
  alertMissing: PropTypes.bool.isRequired,
  inputInvalid: PropTypes.bool.isRequired,
};

export default ErrorText;
