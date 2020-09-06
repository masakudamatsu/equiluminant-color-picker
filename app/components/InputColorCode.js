import {useState} from 'react';
import PropTypes from 'prop-types';
import {ParagraphErrorMessage} from '../theme/style';

function InputColorCode(props) {
  const regexHexText = '#([A-Fa-f\\d]{3}){1,2}';
  const regexRgbText =
    'rgb\\((1?\\d?\\d|2[0-4]\\d|25[0-5])(,\\s*(1?\\d?\\d|2[0-4]\\d|25[0-5])){2}\\)';
  const regexHslText =
    'hsl\\((360|3[0-5]\\d|[1-2]?\\d?\\d)(,\\s*(100|[1-9]?\\d)%){2}\\)';
  const [invalid, setInvalid] = useState(false);
  const handleBlur = event => {
    const newInputIsInvalid = event.target.validity.patternMismatch;
    if (!invalid && newInputIsInvalid) {
      setInvalid(true);
    }
    if (invalid && !newInputIsInvalid) {
      setInvalid(false);
    }
  };
  return (
    <>
      <label htmlFor="inputColorCode">
        CSS color code
        <input
          type="text"
          id="inputColorCode"
          onBlur={handleBlur}
          pattern={`${regexHexText}|${regexRgbText}|${regexHslText}`}
          value={props.inputColorCode}
        />
        <p> e.g. #4287f5, rgb(66, 135, 245), or hsl(217, 90%, 61%)</p>
      </label>
      <ParagraphErrorMessage data-testid="colorCodeError" error={invalid}>
        Please enter a valid CSS color code
      </ParagraphErrorMessage>
    </>
  );
}

InputColorCode.propTypes = {};

export default InputColorCode;
