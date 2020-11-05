import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import ErrorText from '../../components/ErrorText';

let container, getByText, rerender;

beforeEach(() => {
  return ({container, getByText, rerender} = render(
    <ErrorText
      alertEnterKey={false}
      alertMissing={false}
      darkMode={false}
      inputInvalid={false}
    />,
  ));
});

// afterEach(() => {
//   jest.clearAllMocks();
// });

test('shows invisible dummy text if there is no error', () => {
  expect(
    getByText(
      /This text prevents the layout shift due to the error message appearance/i,
    ),
  ).not.toBeVisible();
});

test('shows the relevant alert if the alertMissing prop is true', () => {
  rerender(
    <ErrorText
      alertEnterKey={false}
      alertMissing={true}
      darkMode={false}
      inputInvalid={false}
    />,
  );
  expect(getByText(/before/i)).toBeVisible();
});

test('shows the relevant alert if the inputInvalid prop is true', () => {
  rerender(
    <ErrorText
      alertEnterKey={false}
      alertMissing={false}
      darkMode={false}
      inputInvalid={true}
    />,
  );
  expect(getByText(/as shown in the above/i)).toBeVisible();
});

test('shows the relevant alert if the alertEnterKey is true', () => {
  rerender(
    <ErrorText
      alertEnterKey={true}
      alertMissing={false}
      darkMode={false}
      inputInvalid={false}
    />,
  );
  expect(getByText(/choose chroma/i)).toBeVisible();
});

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="style__Paragraph-o0wbpp-6 style__ParagraphErrorMessage-o0wbpp-7 gMjrsG"
        role="alert"
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
