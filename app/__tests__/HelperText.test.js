import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import HelperText from '../components/HelperText';

// afterEach(() => {
//   jest.clearAllMocks();
// });

let container;

beforeEach(() => {
  return ({container} = render(<HelperText />));
});

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="style__InputExamplesWrapper-o0wbpp-10 ezytdZ"
      >
        <p
          class="style__Paragraph-o0wbpp-5 gvhEzQ"
        >
          Examples:
        </p>
        <div
          class="style__SpacerHorizontal-o0wbpp-13 dqtwdM"
        />
        <ul
          class="style__UnorderedListInputValueExamples-o0wbpp-7 sVxlm"
        >
          <li
            class="style__ListItemInputValueExample-o0wbpp-4 hJEoUz"
          >
            rgb(66, 135, 245)
          </li>
          <li
            class="style__ListItemInputValueExample-o0wbpp-4 hJEoUz"
          >
            hsl(217, 90%, 61%)
          </li>
          <li
            class="style__ListItemInputValueExample-o0wbpp-4 hJEoUz"
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
