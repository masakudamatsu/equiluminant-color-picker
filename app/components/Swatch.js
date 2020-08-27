import PropTypes from 'prop-types';

function Swatch(props) {
  const colorCode = `rgb(${props.r}, ${props.g}, ${props.b})`;
  const swatchStyle = {
    backgroundColor: colorCode,
    marginTop: `1px`,
    paddingTop: '30%',
    width: '30%',
  };
  return <li style={swatchStyle}>{colorCode}</li>;
}

Swatch.propTypes = {
  r: PropTypes.number.isRequired,
  g: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
};

export default Swatch;
