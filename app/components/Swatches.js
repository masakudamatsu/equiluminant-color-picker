import PropTypes from 'prop-types';
import styled from 'styled-components';

import Swatch from './Swatch';

const Ul = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Li = styled.li`
  list-style: none;
  width: 50%;
`;

function Swatches({colors, darkMode}) {
  const userNotClickedHueYet = colors.length === 0;
  console.log(colors.length);
  console.log(userNotClickedHueYet);
  if (userNotClickedHueYet) {
    for (let i = 0; i < 30; i++) {
      colors.push({
        red: darkMode ? 44 : 209,
        green: darkMode ? 44 : 209,
        blue: darkMode ? 44 : 209,
      });
    }
  }
  return (
    <Ul>
      {colors.map((color, index) => {
        return (
          <Li key={`${color.red}-${color.green}-${color.blue}-${index}`}>
            <Swatch
              disabled={userNotClickedHueYet}
              r={color.red}
              g={color.green}
              b={color.blue}
            />
          </Li>
        );
      })}
    </Ul>
  );
}

Swatches.propTypes = {
  colors: PropTypes.array,
  darkMode: PropTypes.bool,
};

export default Swatches;
