import PropTypes from 'prop-types';
import {withUrqlClient} from 'next-urql';
import gql from 'graphql-tag';

function Results(props) {
  const FEED_QUERY = gql`
    {
      feed(hue: 270, contrastRatio: 5.21) {
        red
        green
        blue
        contrast_ratio
        hue
      }
    }
  `;
  return (
    <>
      <h1>Luminance Picker: Results</h1>
      <p>{`Contrast ratio with pure black: ${props.contrastRatio}`}</p>
      <p>{`Selected hue range: ${props.hueRange.min}–${props.hueRange.max}`}</p>
    </>
  );
}

Results.propTypes = {
  contrastRatio: PropTypes.string.isRequired,
  hueRange: PropTypes.object.isRequired,
};

export default withUrqlClient(
  (_ssrExchange, ctx) => ({
    url: 'http://localhost:4000',
  }),
  {ssr: true},
)(Results);
