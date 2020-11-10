import PropTypes from 'prop-types';

function Sector({angle, degToRotate, fillColorCode, strokeColor = 'none'}) {
  const centerX = 250;
  const centerY = 250;
  const radius = 250;

  const angleInRadians = -(angle / 180) * Math.PI;
  const endPointX = centerX + radius * Math.cos(angleInRadians);
  const endPointY = centerY + radius * Math.sin(angleInRadians);

  return (
    <path
      d={`M${centerX},${centerY} l${radius},0 A${centerX},${centerY} 0,0,0 ${endPointX},${endPointY} z`}
      data-testid={'sector'}
      fill={fillColorCode}
      stroke={strokeColor}
      transform={`rotate(-${degToRotate}, ${centerX}, ${centerY})`}
    />
  );
}

Sector.propTypes = {
  angle: PropTypes.number,
  degToRotate: PropTypes.number,
  fillColorCode: PropTypes.string,
  strokeColor: PropTypes.string,
};

export default Sector;
