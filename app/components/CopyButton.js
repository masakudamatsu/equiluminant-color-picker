import PropTypes from 'prop-types';

function CopyButton(props) {
  const handleClick = () => {
    props.copyColorCode();
  };
  return (
    <button type="button" onClick={handleClick}>
      Copy the color code
    </button>
  );
}

CopyButton.propTypes = {
  copyColorCode: PropTypes.func.isRequired,
};

export default CopyButton;
