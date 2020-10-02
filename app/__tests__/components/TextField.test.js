import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import TextField from '../../components/TextField';
import {regexHexText, regexRgbText, regexHslText} from '../../utils/regex';

const mockLabel = <span>mock label</span>;

const mockHandleBlur = jest.fn();
const mockHandleChange = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

let container, getByLabelText;

beforeEach(() => {
  return ({container, getByLabelText} = render(
    <>
      <TextField
        alertMissing={false}
        darkMode={false}
        handleBlur={mockHandleBlur}
        handleChange={mockHandleChange}
        inputInvalid={false}
        id="mockId"
        label={mockLabel}
        pattern={`${regexHexText}|${regexRgbText}|${regexHslText}`}
      />
      <label htmlFor="dummyInput">
        Dummy input to simulate the onBlur event
        <input type="text" id="dummyInput" />
      </label>
    </>,
  ));
});

test('calls handleBlur() when the user blurs the input element', () => {
  // Simulate the onBlur event
  getByLabelText(/mock label/i).focus();
  getByLabelText(/dummy/i).focus();
  // Verify
  expect(mockHandleBlur).toHaveBeenCalledTimes(1);
});

test('calls handleChange() each time the user enters a character in the input element', () => {
  // Simulate the onChange event
  const text = 'abc';
  userEvent.type(getByLabelText(/mock label/i), text);
  // Verify
  expect(mockHandleChange).toHaveBeenCalledTimes(text.length);
});

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="style__InputWrapper-o0wbpp-11 htJgBy"
      >
        <label
          class="style__Label-o0wbpp-3 hZPqHY"
          for="mockId"
        >
          <span>
            mock label
          </span>
        </label>
        <input
          autocomplete="off"
          class="style__Input-o0wbpp-2 cODAWN"
          id="mockId"
          pattern="#([A-Fa-f\\\\d]{3}){1,2}|rgb\\\\((1?\\\\d?\\\\d|2[0-4]\\\\d|25[0-5])(,\\\\s*(1?\\\\d?\\\\d|2[0-4]\\\\d|25[0-5])){2}\\\\)|hsl\\\\((360|3[0-5]\\\\d|[1-2]?\\\\d?\\\\d)(,\\\\s*(100|[1-9]?\\\\d)%){2}\\\\)"
          type="text"
          value=""
        />
      </div>
      <label
        for="dummyInput"
      >
        Dummy input to simulate the onBlur event
        <input
          id="dummyInput"
          type="text"
        />
      </label>
    </div>
  `);
});

test('is accessible', async () => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
