import PropTypes from 'prop-types';

import Sector from './Sector';

function Sectors({colors, handleClick, handleKeyDown, hueName, startAngle}) {
  const angle = 30 / colors.length;

  return (
    <g
      aria-label={`equiluminant colors in ${hueName} hue`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
      transform={`rotate(-${startAngle}, 250, 250)`}
    >
      {colors.map((color, i) => {
        const degToRotate = angle * i;
        const rgbCode = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        return (
          <Sector
            angle={angle}
            degToRotate={degToRotate}
            fillColorCode={rgbCode}
            key={`${hueName}${i}`}
          />
        );
      })}
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
