import PropTypes from 'prop-types';
import styled from 'styled-components';

import useData from '../utils/useData';
import Sectors from './Sectors';

const Wrapper = styled.div`
  position: relative;
`;
const SvgWrapper = styled.figure`
  width: 100%;
`;
const MessageBox = styled.p`
  height: 20px;
  margin-top: -10px;
  position: absolute;
  text-align: center;
  top: 50%;
  width: 100%;
`;

function SearchResults({
  chroma,
  contrastRatio,
  darkMode,
  setHueToDisplay,
  submitted,
}) {
  const initialData = [
    {
      red: darkMode ? 44 : 209,
      green: darkMode ? 44 : 209,
      blue: darkMode ? 44 : 209,
    },
  ];
  let greyColorWheel = [];
  for (let i = 0; i < 12; i++) {
    greyColorWheel.push(
      <Sectors
        colors={initialData}
        darkMode={darkMode}
        handleClick={null}
        handleKeyDown={null}
        hueName={'grey'}
        key={`grey${i}`}
        startAngle={i * 30}
      />,
    );
  }

  if (!submitted) {
    return (
      <svg viewBox="0 0 500 500" aria-labelledby="SearchResults">
        <title id="SearchResults">SearchResults</title>
        {greyColorWheel}
      </svg>
    );
  }

  const {data, isLoading, isError} = useData(chroma, contrastRatio);

  if (isLoading) {
    return (
      <Wrapper>
        <SvgWrapper>
          <svg viewBox="0 0 500 500" aria-labelledby="SearchResults">
            <title id="SearchResults">SearchResults</title>
            {greyColorWheel}
          </svg>
        </SvgWrapper>
        <MessageBox>Fetching...</MessageBox>
      </Wrapper>
    );
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
  const redClickHandler = () => {
    setHueToDisplay(redHues);
  };
  const redKeyDownHandler = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      setHueToDisplay(redHues);
    }
  };
  hues.push({
    hueName: 'red',
    data: redHues,
    handleClick: redClickHandler,
    handleKeyDown: redKeyDownHandler,
  });

  const orangeHues = colorsToRender.filter(
    color => color.hue >= 30 && color.hue < 60,
  );
  const orangeClickHandler = () => {
    setHueToDisplay(orangeHues);
  };
  const orangeKeyDownHandler = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      setHueToDisplay(orangeHues);
    }
  };
  hues.push({
    hueName: 'orange',
    data: orangeHues,
    handleClick: orangeClickHandler,
    handleKeyDown: orangeKeyDownHandler,
  });

  const yellowHues = colorsToRender.filter(
    color => color.hue >= 60 && color.hue < 90,
  );
  const yellowClickHandler = () => {
    setHueToDisplay(yellowHues);
  };
  const yellowKeyDownHandler = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      setHueToDisplay(yellowHues);
    }
  };
  hues.push({
    hueName: 'yellow',
    data: yellowHues,
    handleClick: yellowClickHandler,
    handleKeyDown: yellowKeyDownHandler,
  });

  const limeHues = colorsToRender.filter(
    color => color.hue >= 90 && color.hue < 120,
  );
  const limeClickHandler = () => {
    setHueToDisplay(limeHues);
  };
  const limeKeyDownHandler = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      setHueToDisplay(limeHues);
    }
  };
  hues.push({
    hueName: 'lime',
    data: limeHues,
    handleClick: limeClickHandler,
    handleKeyDown: limeKeyDownHandler,
  });

  const greenHues = colorsToRender.filter(
    color => color.hue >= 120 && color.hue < 150,
  );
  const greenClickHandler = () => {
    setHueToDisplay(greenHues);
  };
  const greenKeyDownHandler = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      setHueToDisplay(greenHues);
    }
  };
  hues.push({
    hueName: 'green',
    data: greenHues,
    handleClick: greenClickHandler,
    handleKeyDown: greenKeyDownHandler,
  });

  const greenCyanHues = colorsToRender.filter(
    color => color.hue >= 150 && color.hue < 180,
  );
  const greenCyanClickHandler = () => {
    setHueToDisplay(greenCyanHues);
  };
  const greenCyanKeyDownHandler = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      setHueToDisplay(greenCyanHues);
    }
  };
  hues.push({
    hueName: 'greenCyan',
    data: greenCyanHues,
    handleClick: greenCyanClickHandler,
    handleKeyDown: greenCyanKeyDownHandler,
  });

  const cyanHues = colorsToRender.filter(
    color => color.hue >= 180 && color.hue < 210,
  );
  const cyanClickHandler = () => {
    setHueToDisplay(cyanHues);
  };
  const cyanKeyDownHandler = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      setHueToDisplay(cyanHues);
    }
  };
  hues.push({
    hueName: 'cyan',
    data: cyanHues,
    handleClick: cyanClickHandler,
    handleKeyDown: cyanKeyDownHandler,
  });

  const blueCyanHues = colorsToRender.filter(
    color => color.hue >= 210 && color.hue < 240,
  );
  const blueCyanClickHandler = () => {
    setHueToDisplay(blueCyanHues);
  };
  const blueCyanKeyDownHandler = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      setHueToDisplay(blueCyanHues);
    }
  };
  hues.push({
    hueName: 'blueCyan',
    data: blueCyanHues,
    handleClick: blueCyanClickHandler,
    handleKeyDown: blueCyanKeyDownHandler,
  });

  const blueHues = colorsToRender.filter(
    color => color.hue >= 240 && color.hue < 270,
  );
  const blueClickHandler = () => {
    setHueToDisplay(blueHues);
  };
  const blueKeyDownHandler = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      setHueToDisplay(blueHues);
    }
  };
  hues.push({
    hueName: 'blue',
    data: blueHues,
    handleClick: blueClickHandler,
    handleKeyDown: blueKeyDownHandler,
  });

  const purpleHues = colorsToRender.filter(
    color => color.hue >= 270 && color.hue < 300,
  );
  const purpleClickHandler = () => {
    setHueToDisplay(purpleHues);
  };
  const purpleKeyDownHandler = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      setHueToDisplay(purpleHues);
    }
  };
  hues.push({
    hueName: 'purple',
    data: purpleHues,
    handleClick: purpleClickHandler,
    handleKeyDown: purpleKeyDownHandler,
  });

  const magentaHues = colorsToRender.filter(
    color => color.hue >= 300 && color.hue < 330,
  );
  const magentaClickHandler = () => {
    setHueToDisplay(magentaHues);
  };
  const magentaKeyDownHandler = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      setHueToDisplay(magentaHues);
    }
  };
  hues.push({
    hueName: 'magenta',
    data: magentaHues,
    handleClick: magentaClickHandler,
    handleKeyDown: magentaKeyDownHandler,
  });

  const pinkHues = colorsToRender.filter(
    color => color.hue >= 330 && color.hue < 360,
  );
  const pinkClickHandler = () => {
    setHueToDisplay(pinkHues);
  };
  const pinkKeyDownHandler = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      setHueToDisplay(pinkHues);
    }
  };
  hues.push({
    hueName: 'pink',
    data: pinkHues,
    handleClick: pinkClickHandler,
    handleKeyDown: pinkKeyDownHandler,
  });

  return (
    <Wrapper>
      <SvgWrapper>
        <svg viewBox="0 0 500 500" aria-labelledby="SearchResults">
          <title id="SearchResults">Wheel of equiluminant colors</title>
          {hues.map((hue, i) => {
            return hue.data.length ? (
              <Sectors
                colors={hue.data}
                darkMode={darkMode}
                handleClick={hue.handleClick}
                handleKeyDown={hue.handleKeyDown}
                hueName={hue.hueName}
                key={hue.hueName}
                startAngle={i * 30}
              />
            ) : null;
          })}
        </svg>
      </SvgWrapper>
    </Wrapper>
  );
}

SearchResults.propTypes = {
  chroma: PropTypes.string,
  contrastRatio: PropTypes.string,
  darkMode: PropTypes.bool,
  setHueToDisplay: PropTypes.func,
  submitted: PropTypes.bool,
};

export default SearchResults;
