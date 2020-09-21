import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  fill: ${props => `hsl(${props.hue},100%,50%)`};
`;

const SvgWrapper = styled.div`
  height: ${((32 / 134) * 100).toFixed(4)}%;
  width: 100%;
`;

function HueSwatch(props) {
  return (
    <SvgWrapper>
      <Svg hue={props.hue} viewBox="0 0 10 10" aria-labelledby="colorName">
        <title id="colorName">{props.title}</title>
        <rect x="0" y="0" width="10" height="10" />
      </Svg>
    </SvgWrapper>
  );
}

HueSwatch.propTypes = {
  hue: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default HueSwatch;
