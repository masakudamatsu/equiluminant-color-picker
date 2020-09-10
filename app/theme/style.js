import styled from 'styled-components';
import font from './font';

// HTML elements
export const ParagraphErrorMessage = styled.p`
  visibility: ${props => (props.error ? 'visible' : 'hidden')};
`;

// Div elements for styling
export const ColorCodeField = styled.div`
  padding: ${font.sideMarginPx.mobile}px;
  width: 100%;
`;

export const SideMarginSetter = styled.div`
  margin: ${font.sideMarginPx.mobile}px;
`;
