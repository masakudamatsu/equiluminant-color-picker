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

export const InputText = styled.input.attrs(props => ({
  autoComplete: 'off', // to remove Webkit browser's default style that cannot be overriden. See https://stackoverflow.com/questions/2338102/overrideq-browser-form-filling-and-input-highlighting-with-html-css
  type: 'text',
}))`
  background-color: transparent;
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
  border-width: ${layout.inputText.borderWidthPx.normal.toFixed()}px;
  border-radius: ${layout.inputText.borderRadiusPx.toFixed()}px;
  font-size: ${layout.inputText.fontSize.mobile.toFixed(4)}rem;
  height: 100%; /* Without this, 10px will be added up for some reason */
  padding: ${(
      layout.inputText.paddingTopPx.mobile +
      layout.label.capHeightPx.mobile +
      layout.label.paddingPx.mobile -
      layout.textCrop.input.topCap * layout.inputText.fontSize.mobile * 16
    ).toFixed(4)}px
    ${(layout.label.paddingPx.mobile - 1).toFixed(4)}px /* Visual alignment */
    ${(
      layout.inputText.paddingBottomPx.mobile -
      layout.textCrop.input.bottom * layout.inputText.fontSize.mobile * 16
    ).toFixed(4)}px;
  text-align: left;
  width: 100%;

  &:active,
  &:hover,
  &:focus {
    border-width: ${layout.inputText.borderWidthPx.active.toFixed()}px;
    outline: none;
  }
`;

const inputRangeThumbStyle = css`
  background: rgb(
    ${props => 255 - (255 - props.value) / 2},
    128,
    ${props => (255 - props.value) / 2}
  );
  border-radius: 50%;
  cursor: pointer; /* fallback for IE and legacy browsers */
  cursor: grab;
  height: ${layout.slider.thumb.diameterPx.toFixed()}px;
  width: ${layout.slider.thumb.diameterPx.toFixed()}px;
  &:hover,
  &:focus /* does not work*/ {
  }
  &:active {
    cursor: grabbing;
  }
`;

const inputRangeTrackStyle = css`
  background: ${props =>
    props.darkMode
      ? color.slider.track.darkMode.default
      : color.slider.track.lightMode.default};
  background-image: linear-gradient(
    to right,
    #808080 ${layout.slider.thumb.diameterPx / 2}px,
    #ff8000 calc(100% - ${layout.slider.thumb.diameterPx / 2}px)
  );
  border-radius: ${(layout.slider.track.heightPx / 2).toFixed()}px;
  cursor: pointer;
  height: ${layout.slider.track.heightPx.toFixed()}px;
  width: 100%;
  &:hover,
  &:focus /* does not work*/ {
  }
`;

export const InputRange = styled.input.attrs(props => ({
  type: 'range',
}))`
  margin: ${
    (layout.slider.thumb.diameterPx - layout.slider.track.heightPx) / 2
  }px 0; /* Otherwise the thumb overlaps the previous/subsequent elements */
  width: 100%;
  /* Thumb */
  &::-webkit-slider-thumb {
    ${inputRangeThumbStyle}
    margin-top: ${
      -(layout.slider.thumb.diameterPx - layout.slider.track.heightPx) / 2
    }px; /* Webkit browsers top-align thumb and track by default.  */
  }
  &::-moz-range-thumb {
    ${inputRangeThumbStyle}
  }
  &::-ms-thumb {
    ${inputRangeThumbStyle}
  }
  /* Track */
  &::-webkit-slider-runnable-track {
    ${inputRangeTrackStyle}
  }
  &::-moz-range-track {
    ${inputRangeTrackStyle}
  }
  &::-ms-track {
    ${inputRangeTrackStyle}
  }
`;

export const Label = styled.label`
  font-size: ${layout.label.fontSize.mobile.toFixed(4)}rem;
  position: absolute;
  top: ${(
    layout.label.paddingPx.mobile +
    layout.inputText.borderWidthPx.normal +
    3
  ).toFixed(
    4,
  )}px; /* 3px is added so the vertical space between the border and the top of the label text is 11.5px, the same as the cap height of the label text. */
  left: ${(
    layout.label.paddingPx.mobile + layout.inputText.borderWidthPx.normal
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
    layout.label.paddingPx.mobile + layout.inputText.borderWidthPx.normal
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
    layout.inputText.borderWidthPx.normal +
    layout.label.paddingPx.mobile +
    layout.label.capHeightPx.mobile +
    layout.inputText.paddingTopPx.mobile +
    layout.inputText.capHeightPx.mobile +
    layout.inputText.paddingBottomPx.mobile +
    layout.inputText.borderWidthPx.normal +
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
  flex-shrink: 0;
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

export const ResultsWrapper = styled.ul`
  background-color: ${props =>
    props.darkMode ? color.body.font.darkMode : color.body.font.lightMode};
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-bottom: ${layout.resultSwatch.marginPx}px;
  padding-right: ${layout.resultSwatch.marginPx}px;
  width: 100%;
`;

export const LiSwatchWrapper = styled.li`
  flex-grow: 1;
  margin-left: ${layout.resultSwatch.marginPx}px;
  margin-top: ${layout.resultSwatch.marginPx}px;
  width: ${layout.resultSwatch.minWidthPx}px;
`;

export const ButtonSwatch = styled.button`
  background-color: ${props => props.backgroundColor};
  border: none;
  line-height: 1; /* to remove the extra height at the bottom by 4px (still 3px left)*/
  padding-top: 100%; /* To keep aspect ratio */
  transition: transform 100ms;
  width: 100%;
  &:focus,
  &:hover {
    outline: 0;
    transform: rotate(30deg);
  }
  &:active {
    outline: 0;
    transform: rotate(60deg);
  }
`;

export const ChromaTextFieldWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 200px;
  justify-content: center;
  position: relative;
  width: 100%;
`;

export const ChromaTextField = styled(InputText)`
  background-color: ${props =>
    props.darkMode
      ? color.chromaTextField.background.darkMode
      : color.chromaTextField.background.lightMode};
  border-color: ${props =>
    props.darkMode
      ? color.chromaTextField.background.darkMode
      : color.chromaTextField.background.lightMode};
  color: ${props =>
    props.darkMode ? color.body.font.darkMode : color.body.font.lightMode};
  font-size: ${layout.chromaTextField.fontSize.mobile}rem;
  height: 50%;
  padding-bottom: ${(
    layout.chromaTextField.paddingBottomPx.mobile -
    layout.textCrop.input.bottom * layout.chromaTextField.fontSize.mobile * 16
  ).toFixed(4)}px;
  padding-top: ${(
    layout.chromaTextField.paddingTopPx.mobile -
    layout.textCrop.input.topCap * layout.chromaTextField.fontSize.mobile * 16
  ).toFixed(4)}px;
  position: absolute;
  text-align: center;
  width: 66%;

  &:active,
  &:hover,
  &:focus {
    background-color: ${props =>
      props.darkMode
        ? color.body.background.darkMode
        : color.body.background.lightMode};
    border-color: ${props =>
      props.darkMode
        ? color.body.background.darkMode
        : color.body.background.lightMode};
  }
`;
