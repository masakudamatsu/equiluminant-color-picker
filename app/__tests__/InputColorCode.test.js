import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import InputColorCode from '../components/InputColorCode';

const mockSetRed = jest.fn();
const mockSetGreen = jest.fn();
const mockSetBlue = jest.fn();
const mockUpdateContrastRatio = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

test('Blurring without entering any text does not show the error message or call any functions', () => {
  const {container, getByLabelText, getByTestId} = render(
    <>
      <InputColorCode
        setRed={mockSetRed}
        setGreen={mockSetGreen}
        setBlue={mockSetBlue}
        updateContrastRatio={mockUpdateContrastRatio}
      />
      <label htmlFor="dummyInput">
        Dummy input
        <input type="text" id="dummyInput" />
      </label>
    </>,
  );
  const colorCodeField = getByLabelText(/css color code/i);
  colorCodeField.focus();
  getByLabelText(/dummy input/i).focus(); // To blur the colorCodeField element
  // verify
  expect(getByTestId('colorCodeError')).not.toBeVisible();
  expect(mockSetRed).not.toHaveBeenCalled();
  expect(mockSetGreen).not.toHaveBeenCalled();
  expect(mockSetBlue).not.toHaveBeenCalled();
  expect(mockUpdateContrastRatio).not.toHaveBeenCalled();
});

test('accepts HEX color codes and calls functions', () => {
  const {container, getByLabelText, getByTestId} = render(
    <>
      <InputColorCode
        setRed={mockSetRed}
        setGreen={mockSetGreen}
        setBlue={mockSetBlue}
        updateContrastRatio={mockUpdateContrastRatio}
      />
      <label htmlFor="dummyInput">
        Dummy input
        <input type="text" id="dummyInput" />
      </label>
    </>,
  );
  const colorCodeField = getByLabelText(/css color code/i);
  ['#3a5', '#A3C', '#4e2ba5'].forEach(colorCode => {
    colorCodeField.focus();
    userEvent.clear(colorCodeField);
    userEvent.type(colorCodeField, colorCode);
    expect(colorCodeField).toBeValid();
    expect(getByTestId('colorCodeError')).not.toBeVisible();
    // blur
    getByLabelText(/dummy input/i).focus(); // To blur the colorCodeField element
    // verify
    expect(mockSetRed).toHaveBeenCalledTimes(1);
    expect(mockSetGreen).toHaveBeenCalledTimes(1);
    expect(mockSetBlue).toHaveBeenCalledTimes(1);
    expect(mockUpdateContrastRatio).toHaveBeenCalledTimes(1);
    // isolate
    jest.clearAllMocks();
  });
});

test('accepts RGB color codes and calls setRed, setGreen, and setBlue functions', () => {
  const {container, getByLabelText, getByTestId} = render(
    <>
      <InputColorCode
        setRed={mockSetRed}
        setGreen={mockSetGreen}
        setBlue={mockSetBlue}
        updateContrastRatio={mockUpdateContrastRatio}
      />
      <label htmlFor="dummyInput">
        Dummy input
        <input type="text" id="dummyInput" />
      </label>
    </>,
  );
  const colorCodeField = getByLabelText(/css color code/i);
  [
    'rgb(1, 2, 3)',
    'rgb(12, 34, 33)',
    'rgb(133, 144, 122)',
    'rgb(233, 213, 202)',
    'rgb(255, 255, 255)',
  ].forEach(colorCode => {
    // enter color code
    colorCodeField.focus();
    userEvent.clear(colorCodeField);
    userEvent.type(colorCodeField, colorCode);
    // verify
    expect(colorCodeField).toBeValid();
    expect(getByTestId('colorCodeError')).not.toBeVisible();
    // blur
    getByLabelText(/dummy input/i).focus(); // To blur the colorCodeField element
    // verify
    expect(mockSetRed).toHaveBeenCalledTimes(1);
    expect(mockSetGreen).toHaveBeenCalledTimes(1);
    expect(mockSetBlue).toHaveBeenCalledTimes(1);
    expect(mockUpdateContrastRatio).toHaveBeenCalledTimes(1);
    // isolate
    jest.clearAllMocks();
  });
});

test('accepts HSL color codes', () => {
  const {container, getByLabelText, getByTestId} = render(
    <>
      <InputColorCode
        setRed={mockSetRed}
        setGreen={mockSetGreen}
        setBlue={mockSetBlue}
        updateContrastRatio={mockUpdateContrastRatio}
      />
      <label htmlFor="dummyInput">
        Dummy input
        <input type="text" id="dummyInput" />
      </label>
    </>,
  );
  const colorCodeField = getByLabelText(/css color code/i);
  [
    'hsl(360, 100%, 100%)',
    'hsl(302, 96%, 87%)',
    'hsl(234, 76%, 55%)',
    'hsl(122, 34%, 22%)',
    'hsl(25, 4%, 2%)',
    'hsl(8, 0%, 0%)',
  ].forEach(colorCode => {
    colorCodeField.focus();
    userEvent.clear(colorCodeField);
    userEvent.type(colorCodeField, colorCode);
    expect(colorCodeField).toBeValid();
    expect(getByTestId('colorCodeError')).not.toBeVisible();
    // blur
    getByLabelText(/dummy input/i).focus(); // To blur the colorCodeField element
    // verify
    expect(mockSetRed).toHaveBeenCalledTimes(1);
    expect(mockSetGreen).toHaveBeenCalledTimes(1);
    expect(mockSetBlue).toHaveBeenCalledTimes(1);
    expect(mockUpdateContrastRatio).toHaveBeenCalledTimes(1);
    // isolate
    jest.clearAllMocks();
  });
});

test('shows the error message if the user enters an invalid color code and hides it when the user corrects it', () => {
  const {container, getByLabelText, getByTestId} = render(
    <>
      <InputColorCode
        setRed={mockSetRed}
        setGreen={mockSetGreen}
        setBlue={mockSetBlue}
        updateContrastRatio={mockUpdateContrastRatio}
      />
      <label htmlFor="dummyInput">
        Dummy input
        <input type="text" id="dummyInput" />
      </label>
    </>,
  );
  const colorCodeField = getByLabelText(/css color code/i);
  ['#sss', 'rgb(300, 300, 300)', 'hsl(371, 300, 125%)'].forEach(
    invalidColorCode => {
      // Enter an invalid color code
      colorCodeField.focus();
      userEvent.clear(colorCodeField);
      userEvent.type(colorCodeField, invalidColorCode);
      getByLabelText(/dummy input/i).focus(); // To blur the colorCodeField element
      expect(getByTestId('colorCodeError')).toBeVisible();
      // Correct the color code
      colorCodeField.focus();
      userEvent.clear(colorCodeField);
      userEvent.type(colorCodeField, 'rgb(234, 222, 21)');
      getByLabelText(/dummy input/i).focus(); // To blur the colorCodeField element
      expect(getByTestId('colorCodeError')).not.toBeVisible();
    },
  );
});

test('renders correctly', () => {
  const {container} = render(
    <InputColorCode
      setRed={mockSetRed}
      setGreen={mockSetGreen}
      setBlue={mockSetBlue}
      updateContrastRatio={mockUpdateContrastRatio}
    />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="style__ColorCodeField-o0wbpp-1 hHfKSq"
      >
        <label
          for="inputColorCode"
        >
          CSS color code
          <input
            id="inputColorCode"
            pattern="#([A-Fa-f\\\\d]{3}){1,2}|rgb\\\\((1?\\\\d?\\\\d|2[0-4]\\\\d|25[0-5])(,\\\\s*(1?\\\\d?\\\\d|2[0-4]\\\\d|25[0-5])){2}\\\\)|hsl\\\\((360|3[0-5]\\\\d|[1-2]?\\\\d?\\\\d)(,\\\\s*(100|[1-9]?\\\\d)%){2}\\\\)"
            type="text"
            value=""
          />
          <p>
             e.g. #4287f5, rgb(66, 135, 245), or hsl(217, 90%, 61%)
          </p>
        </label>
        <p
          class="style__ParagraphErrorMessage-o0wbpp-0 emkDPN"
          data-testid="colorCodeError"
        >
          Please enter a valid CSS color code
        </p>
      </div>
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(
    <InputColorCode
      setRed={mockSetRed}
      setGreen={mockSetGreen}
      setBlue={mockSetBlue}
      updateContrastRatio={mockUpdateContrastRatio}
    />,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
