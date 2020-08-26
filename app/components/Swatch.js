import PropTypes from 'prop-types';

function Swatch(props) {
  const colorCode = `rgb(${props.r}, ${props.g}, ${props.b})`;
  const swatchStyle = {
    backgroundColor: colorCode,
    paddingTop: '30%',
    width: '30%',
  };
  return <div style={swatchStyle}>{colorCode}</div>;
}

Swatch.propTypes = {
  r: PropTypes.string.isRequired,
  g: PropTypes.string.isRequired,
  b: PropTypes.string.isRequired,
};

export default Swatch;
