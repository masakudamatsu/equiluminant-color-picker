import PropTypes from 'prop-types';

import {ButtonSwatch} from '../theme/style';

function Swatch(props) {
  const colorCode = `rgb(${props.r}, ${props.g}, ${props.b})`;
  const handleClick = event => {
    props.setClickedColorCode(colorCode);
  };
  return (
    <ButtonSwatch
      aria-label={colorCode}
      backgroundColor={colorCode}
      data-testid={`rgb-${props.r}-${props.g}-${props.b}`}
      onClick={handleClick}
    />
  );
}

Swatch.propTypes = {
  r: PropTypes.number.isRequired,
  g: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
  setClickedColorCode: PropTypes.func.isRequired,
};

export default Swatch;
