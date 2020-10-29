import styled from 'styled-components';
import PropTypes from 'prop-types';

const Svg = styled.svg``;

function Sector(props) {
  const centerX = 250;
  const centerY = 250;
  const radius = 250;
  const angleInRadians = (props.angle / 180) * Math.PI;
  const endPointX = centerX + radius * Math.cos(angleInRadians);
  const endPointY = centerY + radius * Math.sin(angleInRadians);

  const colorCode = `rgb(${props.r}, ${props.g}, ${props.b})`;
  const handleClick = event => {
    props.setClickedColorCode(colorCode);
  };

  return (
    <button
      aria-label={colorCode}
      data-testid={`rgb-${props.r}-${props.g}-${props.b}`}
      onClick={handleClick}
      type="button"
    >
      <Svg
        viewBox={`0 0 ${centerX + radius} ${centerY + radius}`}
        aria-labelledby="Sector"
      >
        <title id="Sector">{colorCode}</title>
        <path
          fill={colorCode}
          d={`M250,250 l250,0 A250,250 0,0,0 ${endPointX},${endPointY} z`}
        />
      </Svg>
    </button>
  );
}

Sector.propTypes = {
  r: PropTypes.string,
  g: PropTypes.string,
  b: PropTypes.string,
  angle: PropTypes.number.isRequired,
  setClickedColorCode: PropTypes.func.isRequired,
};

export default Sector;
