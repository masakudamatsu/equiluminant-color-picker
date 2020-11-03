import PropTypes from 'prop-types';
import styled from 'styled-components';

import useData from '../utils/useData';
import Sectors from './Sectors';

function SearchResults({chroma, contrastRatio, submitted}) {
  if (!submitted) {
    return <div></div>;
  }

  const {data, isLoading, isError} = useData(chroma, contrastRatio);

  if (isLoading) {
    return <div>Fetching</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  // Assemble data into an array of 12 hues
  const colorsToRender = data.feed;
  const hues = [];

  const redHues = colorsToRender.filter(
    color => color.hue >= 0 && color.hue < 30,
  );
  hues.push({hueName: 'red', data: redHues});

  const orangeHues = colorsToRender.filter(
    color => color.hue >= 30 && color.hue < 60,
  );
  hues.push({hueName: 'orange', data: orangeHues});

  const yellowHues = colorsToRender.filter(
    color => color.hue >= 60 && color.hue < 90,
  );
  hues.push({hueName: 'yellow', data: yellowHues});

  const limeHues = colorsToRender.filter(
    color => color.hue >= 90 && color.hue < 120,
  );
  hues.push({hueName: 'lime', data: limeHues});

  const greenHues = colorsToRender.filter(
    color => color.hue >= 120 && color.hue < 150,
  );
  hues.push({hueName: 'green', data: greenHues});

  const greenCyanHues = colorsToRender.filter(
    color => color.hue >= 150 && color.hue < 180,
  );
  hues.push({hueName: 'greenCyan', data: greenCyanHues});

  const cyanHues = colorsToRender.filter(
    color => color.hue >= 180 && color.hue < 210,
  );
  hues.push({hueName: 'cyan', data: cyanHues});

  const blueCyanHues = colorsToRender.filter(
    color => color.hue >= 210 && color.hue < 240,
  );
  hues.push({hueName: 'blueCyan', data: blueCyanHues});

  const blueHues = colorsToRender.filter(
    color => color.hue >= 240 && color.hue < 270,
  );
  hues.push({hueName: 'blue', data: blueHues});

  const purpleHues = colorsToRender.filter(
    color => color.hue >= 270 && color.hue < 300,
  );
  hues.push({hueName: 'purple', data: purpleHues});

  const magentaHues = colorsToRender.filter(
    color => color.hue >= 300 && color.hue < 330,
  );
  hues.push({hueName: 'magenta', data: magentaHues});

  const pinkHues = colorsToRender.filter(
    color => color.hue >= 330 && color.hue < 360,
  );
  hues.push({hueName: 'pink', data: pinkHues});

  const handleClick = event => {
    console.log('clicked');
  };
  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      console.log('key down');
    }
  };
  return (
    <svg viewBox="0 0 500 500" aria-labelledby="SearchResults">
      <title id="SearchResults">Wheel of equiluminant colors</title>
      {hues.map((hue, i) => {
        return hue.data.length ? (
          <Sectors
            colors={hue.data}
            handleClick={handleClick}
            handleKeyDown={handleKeyDown}
            hueName={hue.hueName}
            key={hue.hueName}
            startAngle={i * 30}
          />
        ) : null;
      })}
    </svg>
  );
}

SearchResults.propTypes = {
  chroma: PropTypes.string,
  contrastRatio: PropTypes.string,
  submitted: PropTypes.bool,
};

export default SearchResults;
