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
  } else if (props.chromaInvalid) {
    errorMessage = (
      <span>Chroma value needs to be an integer between 0 and 255</span>
    );
  } else if (props.chromaMissing) {
    errorMessage = (
      <span>
        You cannot leave the chroma value field box empty; we reset chroma to
        255
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
      data-testid={props.testId}
      darkMode={props.darkMode}
      error={
        props.inputInvalid ||
        props.alertMissing ||
        props.alertEnterKey ||
        props.chromaInvalid ||
        props.chromaMissing
      }
    >
      {errorMessage}
    </ParagraphErrorMessage>
  );
}

ErrorText.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  alertEnterKey: PropTypes.bool,
  alertMissing: PropTypes.bool,
  inputInvalid: PropTypes.bool,
  chromaInvalid: PropTypes.bool,
  chromaMising: PropTypes.bool,
};

export default ErrorText;
