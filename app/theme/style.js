import styled from 'styled-components';
import color from './color';
import font from './font';

// HTML elements
export const Input = styled.input.attrs(props => ({
  autoComplete: 'off', // to remove Webkit browser's default style that cannot be overriden. See https://stackoverflow.com/questions/2338102/override-browser-form-filling-and-input-highlighting-with-html-css
}))`
  background-color: inherit;
  border: 2px solid white;
  border-color: ${props => (props.error ? 'red' : 'white')};
  border-radius: 4px;
  color: inherit;
  font-size: 80px; /* x-height x 2^3 */
  height: 100%;
  line-height: 1;
  padding: 16px;
  text-align: center;
  width: 100%;

  &:active,
  &:hover,
  &:focus {
    border-width: 3px;
    outline: none;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: 8px;
  left: 16px;
`;

export const ParagraphErrorMessage = styled.p`
  visibility: ${props => (props.error ? 'visible' : 'hidden')};
`;

// Div elements for styling
export const ColorCodeField = styled.div`
  background-color: ${props => props.backgroundColor};
  color: ${props => (props.darkMode ? color.font : color.darkMode.font)};
  padding: ${font.sideMarginPx.mobile}px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  background-color: inherit;
  color: white;
  font-family: system-ui;
  line-height: 1;
  position: relative;
  width: 80%;
`;

export const SideMarginSetter = styled.div`
  margin: ${font.sideMarginPx.mobile}px;
`;
