import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  fill: ${props => `hsl(${props.hue},100%,50%)`};
`;

const ButtonHueSwatch = styled.button`
  border: none;
  height: ${((32 / 134) * 100).toFixed(4)}%;
  padding: 0;
  text-align: center;
  width: 100%;
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
  return (
    <ButtonHueSwatch data-testid={props.title}>
      <Svg hue={props.hue} viewBox="0 0 10 10" aria-labelledby="colorName">
        <title id="colorName">{props.title}</title>
        <rect x="0" y="0" width="10" height="10" />
      </Svg>
    </ButtonHueSwatch>
  );
}

HueSwatch.propTypes = {
  hue: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default HueSwatch;
