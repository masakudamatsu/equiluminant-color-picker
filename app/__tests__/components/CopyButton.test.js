import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import CopyButton from '../../components/CopyButton';

const mockCopyColorCode = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

test('Clicking the button calls the copyColorCode function', () => {
  const {container, getByText} = render(
    <CopyButton copyColorCode={mockCopyColorCode} />,
  );
  getByText(/copy/i).click();
  expect(mockCopyColorCode).toHaveBeenCalledTimes(1);
});

test('The button element has the type attribute value of button', () => {
  const {container, getByText} = render(
    <CopyButton copyColorCode={mockCopyColorCode} />,
  );
  const button = getByText(/copy/i);
  expect(button).toHaveAttribute('type', 'button');
});

test('renders correctly', () => {
  const {container} = render(<CopyButton copyColorCode={mockCopyColorCode} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        type="button"
      >
        Copy the color code
      </button>
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(<CopyButton copyColorCode={mockCopyColorCode} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
