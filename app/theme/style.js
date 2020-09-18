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
  border-color: ${props => {
    if (props.darkMode) {
      return props.error ? color.alert : color.font;
    } else {
      return props.error ? color.darkMode.alert : color.darkMode.font;
    }
  }};
  border-style: solid;
  border-width: ${layout.input.borderWidthPx.normal.toFixed()}px;
  border-radius: ${layout.input.borderRadiusPx.toFixed()}px;
  font-size: ${layout.input.fontSize.mobile.toFixed(4)}rem;
  height: 100%; /* Without this, 10px will be added up for some reason */
  padding: ${(
      layout.input.paddingTopPx.mobile +
      layout.label.capHeightPx.mobile +
      layout.label.paddingPx.mobile
    ).toFixed(4)}px
    ${layout.label.paddingPx.mobile.toFixed(4)}px
    ${layout.input.paddingBottomPx.mobile.toFixed(4)}px;
  text-align: left;
  width: auto; /* To fix the layout when thickening the border upon active state */

  &:active,
  &:hover,
  &:focus {
    border-width: ${layout.input.borderWidthPx.active.toFixed()}px;
    margin: -${(layout.input.borderWidthPx.active - layout.input.borderWidthPx.normal).toFixed()}px;
    outline: none;
  }
`;

export const Label = styled.label`
  font-size: ${layout.label.fontSize.mobile.toFixed(4)}rem;
  position: absolute;
  top: ${(
    layout.label.paddingPx.mobile +
    layout.input.borderWidthPx.normal +
    2
  ).toFixed(
    4,
  )}px; /* For some reason, the label element will be placed 2px above the edge of its wrapper div. We fix this by adding 2px. */
  left: ${(
    layout.label.paddingPx.mobile + layout.input.borderWidthPx.normal
  ).toFixed(4)}px;
  ${textCrop.bodyText.capHeight}
`;

export const ListItemInputValueExample = styled.li`
  ${textCrop.bodyText.capHeight}

  &:not(:first-child) {
    padding-top: ${layout.label.paddingPx.mobile}px;
  }
`;

export const Paragraph = styled.p`
  ${textCrop.bodyText.capHeight}
`;

export const ParagraphErrorMessage = styled(Paragraph)`
  color: ${props => (props.darkMode ? color.alert : color.darkMode.alert)};
  font-size: ${layout.label.fontSize.mobile}rem;
  visibility: ${props => (props.error ? 'visible' : 'hidden')};
`;

export const UnorderedListInputValueExamples = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

// Div elements for styling
export const ColorCodeField = styled.div`
  background-color: ${props => props.backgroundColor};
  color: ${props => (props.darkMode ? color.font : color.darkMode.font)};
  padding: ${layout.label.paddingPx.mobile.toFixed(4)}px;
  width: 100%;
`;

export const InputDescriptionWrapper = styled.div`
  padding-left: ${(
    layout.label.paddingPx.mobile + layout.input.borderWidthPx.normal
  ).toFixed(4)}px;
`;

export const InputExamplesWrapper = styled.div`
  display: flex;
  font-size: ${layout.label.fontSize.mobile}rem;
  justify-content: flex-start;
  padding-top: ${layout.label.paddingPx.mobile}px;
`;

export const InputWrapper = styled.div`
  background-color: inherit;
  position: relative;
  width: 100%;
`;

export const SideMarginSetter = styled.div`
  margin: ${layout.sideMarginPx.mobile}px;
`;

// div elements for spacing
export const SpacerHorizontal = styled.div`
  width: ${layout.label.paddingPx.mobile}px;
`;

export const SpacerVertical = styled.div`
  height: ${layout.label.paddingPx.mobile}px;
`;
