import PropTypes from 'prop-types';

function Sector({fillColorCode, index, angle}) {
  const rotation = index * angle;

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
      transform={`rotate(-${rotation}, ${centerX}, ${centerY})`}
    />
  );
}

Sector.propTypes = {
  angle: PropTypes.number,
  fillColorCode: PropTypes.string,
  index: PropTypes.number,
};

export default Sector;
