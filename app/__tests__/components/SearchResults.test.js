import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import SearchResults from '../../components/SearchResults';

afterEach(() => {
  jest.clearAllMocks();
});

let container, getByLabelText;
beforeEach(() => {
  return ({container, getByLabelText} = render(
    <SearchResults chroma="5.67" contrastRatio="11" submitted={true} />,
  ));
});

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div>
        Fetching
      </div>
    </div>
  `);
});

test('is accessible', async () => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
