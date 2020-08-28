import PropTypes from 'prop-types';

function Swatch(props) {
  const colorCode = `rgb(${props.r}, ${props.g}, ${props.b})`;
  const swatchStyle = {
    backgroundColor: colorCode,
    marginTop: `1px`,
    paddingTop: '100%',
    width: '100%',
  };
  return (
    <li>
      <div style={swatchStyle}></div>
    </li>
  );
}

Swatch.propTypes = {
  r: PropTypes.number.isRequired,
  g: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
};

export default Swatch;
