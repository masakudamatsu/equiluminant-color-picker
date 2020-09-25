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

export const H2 = styled.h2`
  ${textCrop.bodyText.capHeight}
`;

export const Input = styled.input.attrs(props => ({
  autoComplete: 'off', // to remove Webkit browser's default style that cannot be overriden. See https://stackoverflow.com/questions/2338102/override-browser-form-filling-and-input-highlighting-with-html-css
}))`
  background-color: inherit;
  border-color: ${props => {
    if (props.darkMode) {
      return props.error
        ? color.paragraphErrorMessage.font.forDarkColor
        : color.body.background.lightMode;
    } else {
      return props.error
        ? color.paragraphErrorMessage.font.forLightColor
        : color.body.background.darkMode;
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
      layout.label.paddingPx.mobile -
      layout.textCrop.input.topCap * layout.input.fontSize.mobile * 16
    ).toFixed(4)}px
    ${(layout.label.paddingPx.mobile - 1).toFixed(4)}px /* Visual alignment */
    ${(
      layout.input.paddingBottomPx.mobile -
      layout.textCrop.input.bottom * layout.input.fontSize.mobile * 16
    ).toFixed(4)}px;
  text-align: left;
  width: 100%;

  &:active,
  &:hover,
  &:focus {
    border-width: ${layout.input.borderWidthPx.active.toFixed()}px;
    outline: none;
  }
`;

export const Label = styled.label`
  font-size: ${layout.label.fontSize.mobile.toFixed(4)}rem;
  position: absolute;
  top: ${(
    layout.label.paddingPx.mobile +
    layout.input.borderWidthPx.normal +
    3
  ).toFixed(
    4,
  )}px; /* 3px is added so the vertical space between the border and the top of the label text is 11.5px, the same as the cap height of the label text. */
  left: ${(
    layout.label.paddingPx.mobile + layout.input.borderWidthPx.normal
  ).toFixed(4)}px;
  ${textCrop.bodyText.capHeight}
`;

export const ListItemInputValueExample = styled.li`
  ${textCrop.bodyText.capHeight}

  &:not(:first-child) {
    padding-top: ${layout.body.xHeight.mobile * layout.modularScale(1)}rem;
  }
`;

export const Paragraph = styled.p`
  ${textCrop.bodyText.capHeight}
`;

export const ParagraphErrorMessage = styled(Paragraph)`
  color: ${props =>
    props.darkMode
      ? color.paragraphErrorMessage.font.forDarkColor
      : color.paragraphErrorMessage.font.forLightColor};
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
`;

export const InputWrapper = styled.div`
  background-color: inherit;
  height: ${(
    layout.input.borderWidthPx.normal +
    layout.label.paddingPx.mobile +
    layout.label.capHeightPx.mobile +
    layout.input.paddingTopPx.mobile +
    layout.input.capHeightPx.mobile +
    layout.input.paddingBottomPx.mobile +
    layout.input.borderWidthPx.normal +
    4
  ).toFixed(
    4,
  )}px; /* 4px is added so the vertical space between the label text's baseline and the top of the input text is 18px, the same as the cap height of the input text. */
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
  height: ${props =>
    layout.body.xHeight.mobile * layout.modularScale(props.scale)}rem;
`;

export const HueSwatchWrapper = styled.div`
  background-color: ${props =>
    props.darkMode ? color.body.font.darkMode : color.body.font.lightMode};
  opacity: 0.8;
  padding-bottom: 200%;
  position: relative;
  width: 100%;
`;
