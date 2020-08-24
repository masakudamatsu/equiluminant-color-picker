import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import InputRGB from '../components/InputRGB';

const exampleColor = {
  red: '123',
  green: '222',
  blue: '20',
};

const mockHandleChangeRed = jest.fn();
const mockHandleChangeGreen = jest.fn();
const mockHandleChangeBlue = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('onChange events', () => {
  test('calls handleChangeRed when the user enters a R value', async () => {
    // set up
    const {container, getByLabelText} = render(
      <InputRGB
        red=""
        green={exampleColor.green}
        blue={exampleColor.blue}
        handleChangeRed={mockHandleChangeRed}
        handleChangeGreen={mockHandleChangeGreen}
        handleChangeBlue={mockHandleChangeBlue}
      />,
    );
    const redInputField = getByLabelText(/r/i);
    const userInput = '21';
    // execute
    await userEvent.type(redInputField, userInput);

    // verify
    expect(mockHandleChangeRed).toHaveBeenCalledTimes(userInput.length);
  });

  test('calls handleChangeGreen when the user enters a G value', async () => {
    // set up
    const {container, getByLabelText} = render(
      <InputRGB
        red={exampleColor.red}
        green=""
        blue={exampleColor.blue}
        handleChangeRed={mockHandleChangeRed}
        handleChangeGreen={mockHandleChangeGreen}
        handleChangeBlue={mockHandleChangeBlue}
      />,
    );
    const greenInputField = getByLabelText(/g/i);
    const userInput = '9';
    // execute
    await userEvent.type(greenInputField, userInput);

    // verify
    expect(mockHandleChangeGreen).toHaveBeenCalledTimes(userInput.length);
  });

  test('calls handleChangeBlue when the user enters a B value', () => {
    // set up
    const {container, getByLabelText} = render(
      <InputRGB
        red={exampleColor.red}
        green={exampleColor.green}
        blue=""
        handleChangeRed={mockHandleChangeRed}
        handleChangeGreen={mockHandleChangeGreen}
        handleChangeBlue={mockHandleChangeBlue}
      />,
    );
    const blueInputField = getByLabelText(/b/i);
    const userInput = '121';
    // execute
    userEvent.type(blueInputField, userInput);

    // verify
    expect(mockHandleChangeBlue).toHaveBeenCalledTimes(userInput.length);
  });
});

test('renders correctly', () => {
  const {container} = render(
    <InputRGB
      red={exampleColor.red}
      green={exampleColor.green}
      blue={exampleColor.blue}
      handleChangeRed={mockHandleChangeRed}
      handleChangeGreen={mockHandleChangeGreen}
      handleChangeBlue={mockHandleChangeBlue}
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
      handleChangeRed={mockHandleChangeRed}
      handleChangeGreen={mockHandleChangeGreen}
      handleChangeBlue={mockHandleChangeBlue}
    />,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
