import PropTypes from 'prop-types';
import {request} from 'graphql-request';
import styled from 'styled-components';
import useSWR from 'swr';

import Sectors from './Sectors';

const fetcher = query => request('http://localhost:4000/graphql', query);

function SearchResults({chroma, contrastRatio, submitted}) {
  if (!submitted) {
    return <div></div>;
  }
  const query = `
    {
      feed(contrastRatio: ${contrastRatio}, chroma: ${chroma}, orderBy: [{ hue: asc }]) {
        red
        green
        blue
        contrast_ratio
        hue
        chroma
      }
    }
  `;

  const {data, error} = useSWR(query, fetcher);

  if (!data) {
    return <div>Fetching</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  const colorsToRender = data.feed;
  const redHues = colorsToRender.filter(
    color => color.hue >= 0 && color.hue < 30,
  );
  const orangeHues = colorsToRender.filter(
    color => color.hue >= 30 && color.hue < 60,
  );
  const yellowHues = colorsToRender.filter(
    color => color.hue >= 60 && color.hue < 90,
  );
  const limeHues = colorsToRender.filter(
    color => color.hue >= 90 && color.hue < 120,
  );
  const greenHues = colorsToRender.filter(
    color => color.hue >= 120 && color.hue < 150,
  );
  const greenCyanHues = colorsToRender.filter(
    color => color.hue >= 150 && color.hue < 180,
  );
  const cyanHues = colorsToRender.filter(
    color => color.hue >= 180 && color.hue < 210,
  );
  const blueCyanHues = colorsToRender.filter(
    color => color.hue >= 210 && color.hue < 240,
  );
  const blueHues = colorsToRender.filter(
    color => color.hue >= 240 && color.hue < 270,
  );
  const purpleHues = colorsToRender.filter(
    color => color.hue >= 270 && color.hue < 300,
  );
  const magentaHues = colorsToRender.filter(
    color => color.hue >= 300 && color.hue < 330,
  );
  const pinkHues = colorsToRender.filter(
    color => color.hue >= 330 && color.hue < 360,
  );
  return (
    <svg viewBox="0 0 500 500" aria-labelledby="SearchResults">
      <title id="SearchResults">Wheel of equiluminant colors</title>
      {redHues.length ? (
        <Sectors colors={redHues} hueName={'red'} startAngle={0} />
      ) : null}
      {orangeHues.length ? (
        <Sectors colors={orangeHues} hueName={'orange'} startAngle={30} />
      ) : null}
      {yellowHues.length ? (
        <Sectors colors={yellowHues} hueName={'yellow'} startAngle={60} />
      ) : null}
      {limeHues.length ? (
        <Sectors colors={limeHues} hueName={'lime'} startAngle={90} />
      ) : null}
      {greenHues.length ? (
        <Sectors colors={greenHues} hueName={'green'} startAngle={120} />
      ) : null}
      {greenCyanHues.length ? (
        <Sectors
          colors={greenCyanHues}
          hueName={'greenCyan'}
          startAngle={150}
        />
      ) : null}
      {cyanHues.length ? (
        <Sectors colors={cyanHues} hueName={'cyan'} startAngle={180} />
      ) : null}
      {blueCyanHues.length ? (
        <Sectors colors={blueCyanHues} hueName={'blueCyan'} startAngle={210} />
      ) : null}
      {blueHues.length ? (
        <Sectors colors={blueHues} hueName={'blue'} startAngle={240} />
      ) : null}
      {purpleHues.length ? (
        <Sectors colors={purpleHues} hueName={'purple'} startAngle={270} />
      ) : null}
      {magentaHues.length ? (
        <Sectors colors={magentaHues} hueName={'magenta'} startAngle={300} />
      ) : null}
      {pinkHues.length ? (
        <Sectors colors={pinkHues} hueName={'pink'} startAngle={330} />
      ) : null}
    </svg>
  );
}

SearchResults.propTypes = {
  chroma: PropTypes.string,
  contrastRatio: PropTypes.string,
  submitted: PropTypes.bool,
};

export default SearchResults;
