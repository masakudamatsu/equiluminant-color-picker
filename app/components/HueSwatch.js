import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  fill: ${props => `hsl(${props.hue},80%,50%)`};
`;

const ButtonHueSwatch = styled.button`
  border: none;
  left: ${props => props.left}%;
  line-height: 1; /* to remove the extra height at the bottom by 4px (still 3px left)*/
  position: absolute;
  text-align: center;
  top: ${props => props.top}%;
  width: 20%;
  z-index: ${props => props.zIndex};
  &:focus,
  &:hover {
    opacity: 0.5;
    outline: 0;
  }
  &:active {
    outline: 0;
    width: 95%;
  }
`;

function HueSwatch(props) {
  const handleClick = event => {
    props.getHue(props.hue);
    props.handleSubmit(event);
  };
  return (
    <ButtonHueSwatch
      data-testid={props.title}
      left={props.left}
      onClick={handleClick}
      top={props.top}
      type="submit"
      zIndex={props.zIndex}
    >
      <Svg hue={props.hue} viewBox="0 0 60 120" aria-labelledby="colorName">
        <title id="colorName">{props.title}</title>
        <rect x="0" y="0" width="60" height="120" />
      </Svg>
    </ButtonHueSwatch>
  );
}

HueSwatch.propTypes = {
  getHue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hue: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
  zIndex: PropTypes.string.isRequired,
};

export default HueSwatch;
