import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';
import 'jest-styled-components';

import HelperText from '../../components/HelperText';

let container;

beforeEach(() => {
  return ({container} = render(<HelperText />));
});

// afterEach(() => {
//   jest.clearAllMocks();
// });

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="style__InputExamplesWrapper-o0wbpp-11 bomJcg"
      >
        <p
          class="style__Paragraph-o0wbpp-6 dhmbeD"
        >
          Examples:
        </p>
        <div
          class="style__SpacerHorizontal-o0wbpp-14 gkEYjx"
        />
        <ul
          class="style__UnorderedListInputValueExamples-o0wbpp-8 joOchR"
        >
          <li
            class="style__ListItemInputValueExample-o0wbpp-5 jOQzzS"
          >
            rgb(66, 135, 245)
          </li>
          <li
            class="style__ListItemInputValueExample-o0wbpp-5 jOQzzS"
          >
            hsl(217, 90%, 61%)
          </li>
          <li
            class="style__ListItemInputValueExample-o0wbpp-5 jOQzzS"
          >
            #4287f5
          </li>
        </ul>
      </div>
    </div>
  `);
});

test('is accessible', async () => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
