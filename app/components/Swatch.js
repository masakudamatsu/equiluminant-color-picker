import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useState} from 'react';

import copyToClipboard from '../utils/copyToClipboard';
import layout from '../theme/layout';

const Button = styled.button`
  background-color: ${props => props.backgroundColor};
  border: 1px solid black;
  border-radius: ${layout.inputText.borderRadiusPx}px;
  color: white; /* TODO: Change according to the overall color palette */
  height: 48px; /* For clickability with a thumb */
  text-align: center;
  width: 100%;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

function Swatch(props) {
  const rgbCode = `rgb(${props.r}, ${props.g}, ${props.b})`;

  const [clicked, setClicked] = useState(false);
  const handleClick = event => {
    copyToClipboard(rgbCode);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1500);
  };
  return (
    <Button
      backgroundColor={rgbCode}
      data-testid="swatch"
      disabled={props.disabled}
      id={rgbCode}
      onClick={handleClick}
      type="button"
    >
      {clicked ? 'Copied!' : rgbCode}
    </Button>
  );
}

Swatch.propTypes = {
  disabled: PropTypes.bool,
  r: PropTypes.number.isRequired,
  g: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
};

export default Swatch;
