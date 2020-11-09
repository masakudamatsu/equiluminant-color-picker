import PropTypes from 'prop-types';

function Sector({color, index, angle, endPointX, endPointY}) {
  const rgbCode = `rgb(${color.red}, ${color.green}, ${color.blue})`;
  const rotation = index * angle;
  return (
    <path
      d={`M250,250 l250,0 A250,250 0,0,0 ${endPointX},${endPointY} z`}
      data-testid={'sector'}
      fill={rgbCode}
      transform={`rotate(-${rotation}, 250, 250)`}
    />
  );
}

Sector.propTypes = {
  angle: PropTypes.number,
  color: PropTypes.object,
  endPointX: PropTypes.number,
  endPointY: PropTypes.number,
  index: PropTypes.number,
};

export default Sector;
