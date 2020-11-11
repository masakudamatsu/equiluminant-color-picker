import PropTypes from 'prop-types';

import Sector from './Sector';
import color from '../theme/color';

function Sectors({
  colors,
  darkMode,
  handleClick,
  handleKeyDown,
  hueName,
  startAngle,
}) {
  const wholeAngle = 30;
  const angle = wholeAngle / colors.length;

  return (
    <g transform={`rotate(-${startAngle}, 250, 250)`}>
      {colors ? (
      <g>
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
      ) : null}
      <g
        aria-disabled={!colors}
        aria-label={`Show color code of equiluminant colors in ${hueName} hue`}
        disabled={!colors}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex="0"
      >
        <Sector
          angle={wholeAngle}
          degToRotate={0}
          fillColorCode={`transparent`}
          strokeColor={
            darkMode ? color.body.font.darkMode : color.body.font.lightMode
          }
        />
      </g>
    </g>
  );
}

Sectors.propTypes = {
  colors: PropTypes.array,
  darkMode: PropTypes.bool,
  handleClick: PropTypes.func,
  handleKeyDown: PropTypes.func,
  hueName: PropTypes.string,
  startAngle: PropTypes.number,
};

export default Sectors;
