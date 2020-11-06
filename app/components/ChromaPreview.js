import styled from 'styled-components';
import PropTypes from 'prop-types';

import rgbCode from '../utils/rgbCode';

const Svg = styled.svg`
  position: absolute;
  width: 100%; /* Without this, being wrapped with a div makes the svg image disappear */
`;

function ChromaPreview(props) {
  const chroma = Number(props.chroma);

  const purple = `rgb(${rgbCode(chroma).purple.r},  ${
    rgbCode(chroma).purple.g
  },  ${rgbCode(chroma).purple.b})`;
  const red = `rgb(${rgbCode(chroma).red.r},  ${rgbCode(chroma).red.g},  ${
    rgbCode(chroma).red.b
  })`;
  const yellow = `rgb(${rgbCode(chroma).yellow.r}, ${
    rgbCode(chroma).yellow.g
  }, ${rgbCode(chroma).yellow.b})`;
  const green = `rgb(${rgbCode(chroma).green.r}, ${rgbCode(chroma).green.g}, ${
    rgbCode(chroma).green.b
  })`;
  const cyan = `rgb(${rgbCode(chroma).cyan.r}, ${rgbCode(chroma).cyan.g}, ${
    rgbCode(chroma).cyan.b
  })`;
  const blue = `rgb(${rgbCode(chroma).blue.r}, ${rgbCode(chroma).blue.g}, ${
    rgbCode(chroma).blue.b
  })`;
  return (
    <Svg viewBox="0 0 281 187" aria-labelledby="ChromaPreview">
      <title id="ChromaPreview">
        The preview of how the chroma value you have set affects the apperance
        of six pure hues: purple, red, yellow, green, cyan, and blue
      </title>
      <g id="Top-row-of-swatches">
        <rect
          data-testid="Purple"
          fill={purple}
          x="0"
          y="0"
          width="93"
          height="93"
        />
        <rect
          data-testid="Red"
          fill={red}
          x="94"
          y="0"
          width="93"
          height="93"
        />
        <rect
          data-testid="Yellow"
          fill={yellow}
          x="188"
          y="0"
          width="93"
          height="93"
        />
      </g>
      <g id="Bottom-row-of-swatches" transform="translate(0 94)">
        <rect
          data-testid="Green"
          fill={green}
          x="0"
          y="0"
          width="93"
          height="93"
        />
        <rect
          data-testid="Cyan"
          fill={cyan}
          x="94"
          y="0"
          width="93"
          height="93"
        />
        <rect
          data-testid="Blue"
          fill={blue}
          x="188"
          y="0"
          width="93"
          height="93"
        />
      </g>
    </Svg>
  );
}

ChromaPreview.propTypes = {
  chroma: PropTypes.string.isRequired,
};

export default ChromaPreview;
