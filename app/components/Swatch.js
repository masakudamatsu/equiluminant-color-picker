import PropTypes from 'prop-types';

function Swatch(props) {
  const colorCode = `rgb(${props.r}, ${props.g}, ${props.b})`;
  const swatchStyle = {
    backgroundColor: colorCode,
    marginTop: `1px`,
    paddingTop: '100%',
    width: '100%',
  };
  const handleClick = event => {
    props.setClickedColorCode(colorCode);
  };
  return (
    <li>
      <div
        style={swatchStyle}
        data-testid={`rgb-${props.r}-${props.g}-${props.b}`}
        onClick={handleClick}
      ></div>
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
