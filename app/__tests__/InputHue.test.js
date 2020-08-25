import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import InputHue from '../components/InputHue';

test('renders correctly', () => {
  const {container} = render(<InputHue />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <fieldset>
        <legend>
          Hue
        </legend>
        <label
          for="red"
        >
          <input
            id="red"
            name="hue"
            type="radio"
            value="0"
          />
          Red
        </label>
        <label
          for="orange"
        >
          <input
            id="orange"
            name="hue"
            type="radio"
            value="30"
          />
          Orange
        </label>
        <label
          for="yellow"
        >
          <input
            id="yellow"
            name="hue"
            type="radio"
            value="60"
          />
          Yellow
        </label>
        <label
          for="chartreuse"
        >
          <input
            id="chartreuse"
            name="hue"
            type="radio"
            value="90"
          />
          Chartreuse
        </label>
        <label
          for="green"
        >
          <input
            id="green"
            name="hue"
            type="radio"
            value="120"
          />
          Green
        </label>
        <label
          for="springGreen"
        >
          <input
            id="springGreen"
            name="hue"
            type="radio"
            value="150"
          />
          Spring Green
        </label>
        <label
          for="cyan"
        >
          <input
            id="cyan"
            name="hue"
            type="radio"
            value="180"
          />
          Cyan
        </label>
        <label
          for="azure"
        >
          <input
            id="azure"
            name="hue"
            type="radio"
            value="210"
          />
          Azure
        </label>
        <label
          for="blue"
        >
          <input
            id="blue"
            name="hue"
            type="radio"
            value="240"
          />
          Blue
        </label>
        <label
          for="violet"
        >
          <input
            id="violet"
            name="hue"
            type="radio"
            value="270"
          />
          Violet
        </label>
        <label
          for="magenta"
        >
          <input
            id="magenta"
            name="hue"
            type="radio"
            value="300"
          />
          Magenta
        </label>
        <label
          for="rose"
        >
          <input
            id="rose"
            name="hue"
            type="radio"
            value="330"
          />
          Rose
        </label>
      </fieldset>
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(<InputHue />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
