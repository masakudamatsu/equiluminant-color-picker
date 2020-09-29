import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import ErrorText from '../../components/ErrorText';

// afterEach(() => {
//   jest.clearAllMocks();
// });

let container, getByText, rerender;

beforeEach(() => {
  return ({container, getByText, rerender} = render(
    <ErrorText darkMode={false} alertMissing={false} inputInvalid={false} />,
  ));
});

test('shows invisible dummy text if there is no error', () => {
  expect(
    getByText(
      /This text prevents the layout shift due to the error message appearance/i,
    ),
  ).not.toBeVisible();
});

test('shows the relevant alert if the alertMissing prop is true', () => {
  rerender(
    <ErrorText darkMode={false} alertMissing={true} inputInvalid={false} />,
  );
  expect(getByText(/before choosing a hue/i)).toBeVisible();
});

test('shows the relevant alert if the inputInvalid prop is true', () => {
  rerender(
    <ErrorText darkMode={false} alertMissing={false} inputInvalid={true} />,
  );
  expect(getByText(/as shown in the above/i)).toBeVisible();
});

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="style__Paragraph-o0wbpp-5 style__ParagraphErrorMessage-o0wbpp-6 gpMJrv"
        data-testid="colorCodeError"
      >
        <span>
          This text prevents the layout shift due to the error message appearance.
        </span>
      </p>
    </div>
  `);
});

test('is accessible', async () => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
