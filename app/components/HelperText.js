import PropTypes from 'prop-types';
import {
  InputExamplesWrapper,
  ListItemInputValueExample,
  Paragraph,
  SpacerHorizontal,
  UnorderedListInputValueExamples,
} from '../theme/style';

function HelperText() {
  return (
    <InputExamplesWrapper>
      <Paragraph>Examples:</Paragraph>
      <SpacerHorizontal />
      <UnorderedListInputValueExamples>
        <ListItemInputValueExample>rgb(66, 135, 245)</ListItemInputValueExample>
        <ListItemInputValueExample>
          hsl(217, 90%, 61%)
        </ListItemInputValueExample>
        <ListItemInputValueExample>#4287f5</ListItemInputValueExample>
      </UnorderedListInputValueExamples>
    </InputExamplesWrapper>
  );
}

HelperText.propTypes = {};

export default HelperText;
