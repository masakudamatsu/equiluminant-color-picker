import styled from 'styled-components';

export const ParagraphErrorMessage = styled.p`
  visibility: ${props => (props.error ? 'visible' : 'hidden')};
`;
