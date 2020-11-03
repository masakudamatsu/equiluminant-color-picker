import PropTypes from 'prop-types';
import styled from 'styled-components';

import Swatch from './Swatch';

const Ul = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Li = styled.li`
  list-style: none;
`;

function Swatches({colors}) {
  return (
    <Ul>
      {colors.map(color => {
        return (
          <Li key={`${color.red}-${color.green}-${color.blue}`}>
            <Swatch r={color.red} g={color.green} b={color.blue} />
          </Li>
        );
      })}
    </Ul>
  );
}

Swatches.propTypes = {
  colors: PropTypes.array,
};

export default Swatches;
