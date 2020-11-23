import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

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
    .c0 {
      color: rgb(255,0,0);
      font-size: 1.0139952468972802rem;
      visibility: hidden;
    }

    .c0::before,
    .c0::after {
      content: '';
      display: block;
      height: 0;
      width: 0;
    }

    .c0::before {
      margin-bottom: -0.3772em;
    }

    .c0::after {
      margin-top: -0.4045em;
    }

    <div>
      <p
        class="style__Paragraph-o0wbpp-9 c0"
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
