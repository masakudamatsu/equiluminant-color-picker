import PropTypes from 'prop-types';

import {ResultSwatch} from '../theme/style';
import layout from '../theme/layout';

function Swatch(props) {
  const colorCode = `rgb(${props.r}, ${props.g}, ${props.b})`;
  const swatchStyle = {
    flexGrow: 1,
    marginLeft: `${layout.resultSwatch.marginPx}px`,
    marginTop: `${layout.resultSwatch.marginPx}px`,
    width: `${layout.resultSwatch.minWidthPx}px`,
  };
  const handleClick = event => {
    props.setClickedColorCode(colorCode);
  };
  return (
    <li style={swatchStyle}>
      <ResultSwatch
        backgroundColor={colorCode}
        data-testid={`rgb-${props.r}-${props.g}-${props.b}`}
        onClick={handleClick}
      ></ResultSwatch>
    </li>
  );
}

Swatch.propTypes = {
  r: PropTypes.number.isRequired,
  g: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
  setClickedColorCode: PropTypes.func.isRequired,
};

export default Swatch;
