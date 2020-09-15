import styled, {css} from 'styled-components';
import color from './color';
import layout from './layout';

// Text box cropping
const textCrop = {
  bodyText: {
    capHeight: css`
      &::before,
      &::after {
        content: '';
        display: block;
        height: 0;
        width: 0;
      }
      &::before {
        margin-bottom: -${layout.textCrop.bodyText.topCap}em;
      }
      &::after {
        margin-top: -${layout.textCrop.bodyText.bottom}em;
      }
    `,
    xHeight: css`
      &::before,
      &::after {
        content: '';
        display: block;
        height: 0;
        width: 0;
      }
      &::before {
        margin-bottom: -${layout.textCrop.bodyText.topX}em;
      }
      &::after {
        margin-top: -${layout.textCrop.bodyText.bottom}em;
      }
    `,
  },
};

// HTML elements
export const Abbr = styled.abbr`
  font-feature-settings: 'smcp';
  letter-spacing: 0.01em; /* following Flexible Typesetting */
  @supports (font-variant-caps: small-caps) {
    font-variant-caps: small-caps;
    font-feature-settings: normal;
  }
`;

export const Input = styled.input.attrs(props => ({
  autoComplete: 'off', // to remove Webkit browser's default style that cannot be overriden. See https://stackoverflow.com/questions/2338102/override-browser-form-filling-and-input-highlighting-with-html-css
}))`
  background-color: inherit;
  border: ${layout.input.borderWidthPx.toFixed()}px solid white;
  border-color: ${props => (props.error ? 'red' : 'grey')};
  border-radius: 4px;
  font-size: ${layout.input.fontSize.mobile}rem;
  height: 100%;
  padding: ${layout.input.paddingTopPx.mobile.toFixed(4)}px
    ${layout.label.horizontalSpacePx.mobile.toFixed(4)}px
    ${layout.input.paddingBottomPx.mobile.toFixed(4)}px;
  text-align: center;
  width: 100%;

  &:active,
  &:hover,
  &:focus {
    border-color: white;
    outline: none;
  }
`;

export const Label = styled.label`
  font-size: ${layout.label.fontSize.mobile}rem;
  position: absolute;
  top: ${(
    layout.label.verticalSpacePx.mobile +
    layout.input.borderWidthPx +
    2
  ).toFixed(
    4,
  )}px; /* For some reason, the label element will be placed 2px above the edge of its wrapper div. We fix this by adding 2px. */
  left: ${(
    layout.label.horizontalSpacePx.mobile + layout.input.borderWidthPx
  ).toFixed(4)}px;
  ${textCrop.bodyText.capHeight}
`;

export const ParagraphErrorMessage = styled.p`
  visibility: ${props => (props.error ? 'visible' : 'hidden')};
`;

// Div elements for styling
export const ColorCodeField = styled.div`
  background-color: ${props => props.backgroundColor};
  color: ${props => (props.darkMode ? color.font : color.darkMode.font)};
  padding: ${layout.colorCodeField.paddingPx.mobile}px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  background-color: inherit;
  position: relative;
  width: 100%;
`;

export const SideMarginSetter = styled.div`
  margin: ${layout.sideMarginPx.mobile}px;
`;
