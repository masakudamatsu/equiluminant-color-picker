import PropTypes from 'prop-types';
import {LiSwatchWrapper, ResultsWrapper} from '../theme/style';
import Swatch from '../components/Swatch';
import useSWR from 'swr';
import {request} from 'graphql-request';

const fetcher = query => request('http://localhost:4000/graphql', query);

function SearchResults(props) {
  if (!props.submitted) {
    return <div></div>;
  }
  const query = `
    {
      feed(contrastRatio: ${props.contrastRatio}, chroma: ${props.chroma}, orderBy: [{ hue: asc }]) {
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
  return (
    <ResultsWrapper darkMode={props.darkMode}>
      {colorsToRender.map((color, i) => (
        <LiSwatchWrapper key={`color${i}`}>
          <Swatch
            r={color.red}
            g={color.green}
            b={color.blue}
            setClickedColorCode={null}
          />
        </LiSwatchWrapper>
      ))}
    </ResultsWrapper>
  );
}

SearchResults.propTypes = {};

export default SearchResults;
