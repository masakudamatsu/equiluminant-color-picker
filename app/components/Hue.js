import PropTypes from 'prop-types';

function Hue(props) {
  return (
    <label htmlFor={props.id}>
      <input type="radio" id={props.id} name="hue" value={props.id} />
      {props.children}
    </label>
  );
}

Hue.propTypes = {};

export default Hue;
