import PropTypes from 'prop-types';

import Sector from './Sector';

function Sectors({colors, handleClick, handleKeyDown, hueName, startAngle}) {
  const angle = 30 / colors.length;

  const centerX = 250;
  const centerY = 250;
  const radius = 250;
  const angleInRadians = -(angle / 180) * Math.PI;
  const endPointX = centerX + radius * Math.cos(angleInRadians);
  const endPointY = centerY + radius * Math.sin(angleInRadians);
  return (
    <g
      aria-label={`equiluminant colors in ${hueName} hue`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
      transform={`rotate(-${startAngle}, 250, 250)`}
    >
      {colors.map((color, i) => (
        <Sector
          angle={angle}
          color={color}
          endPointX={endPointX}
          endPointY={endPointY}
          index={i}
          key={`${hueName}${i}`}
        />
      ))}
    </g>
  );
}

Sectors.propTypes = {
  colors: PropTypes.array,
  handleClick: PropTypes.func,
  handleKeyDown: PropTypes.func,
  hueName: PropTypes.string,
  startAngle: PropTypes.number,
};

export default Sectors;
