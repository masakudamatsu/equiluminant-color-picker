import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import InputRGB from '../components/InputRGB';

const exampleColor = {
  red: 123,
  green: 222,
  blue: 20,
};

const mockHandleChangeRed = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

test('calls handleChangeRed when the user enters a R value', async () => {
  // set up
  const {container, getByLabelText} = render(
    <InputRGB
      red=""
      green={exampleColor.green}
      blue={exampleColor.blue}
      handleChangeRed={mockHandleChangeRed}
    />,
  );
  const redInputField = getByLabelText(/r/i);
  const userInput = '21';
  // execute
  await userEvent.type(redInputField, userInput);

  // verify
  expect(mockHandleChangeRed).toHaveBeenCalledTimes(userInput.length);
});

test('renders correctly', () => {
  const {container} = render(
    <InputRGB
      red={exampleColor.red}
      green={exampleColor.green}
      blue={exampleColor.blue}
    />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <form>
        <label
          for="red"
        >
          R:
          <input
            id="red"
            inputmode="decimal"
            pattern="1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]"
            type="text"
            value="123"
          />
        </label>
        <label
          for="green"
        >
          G:
          <input
            id="green"
            inputmode="decimal"
            pattern="1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]"
            type="text"
            value="222"
          />
        </label>
        <label
          for="blue"
        >
          B:
          <input
            id="blue"
            inputmode="decimal"
            pattern="1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]"
            type="text"
            value="20"
          />
        </label>
      </form>
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(
    <InputRGB
      red={exampleColor.red}
      green={exampleColor.green}
      blue={exampleColor.blue}
    />,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
