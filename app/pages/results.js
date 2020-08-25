import PropTypes from 'prop-types';

function Results(props) {
  return (
    <>
      <h1>Luminance Picker: Results</h1>
      <p>{`Selected hue range: ${props.hueRange.min}–${props.hueRange.max}`}</p>
    </>
  );
}

Results.propTypes = {
  hueRange: PropTypes.object.isRequired,
};

export default Results;
