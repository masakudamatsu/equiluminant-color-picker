import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

// How to use this template
//
// Step 1
// Replace Template with the name of a component
//
// Step 2
// Delete lines 19 and 38 (the describe() function), which makes Jest skip to run this test file
//

import Template from '../../components/Template';

describe.skip('Delete this line', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  let container, getByLabelText;
  beforeEach(() => {
    return ({container, getByLabelText} = render(<Template />));
  });

  test('renders correctly', () => {
    expect(container).toMatchInlineSnapshot();
  });

  test('is accessible', async () => {
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
});
