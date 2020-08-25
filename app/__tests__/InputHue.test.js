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
          Red
          <input
            id="red"
            name="hue"
            type="radio"
            value="red"
          />
        </label>
        <label
          for="orange"
        >
          Orange
          <input
            id="orange"
            name="hue"
            type="radio"
            value="orange"
          />
        </label>
        <label
          for="yellow"
        >
          Yellow
          <input
            id="yellow"
            name="hue"
            type="radio"
            value="yellow"
          />
        </label>
        <label
          for="chartreuse"
        >
          Chartreuse
          <input
            id="chartreuse"
            name="hue"
            type="radio"
            value="chartreuse"
          />
        </label>
        <label
          for="green"
        >
          Green
          <input
            id="green"
            name="hue"
            type="radio"
            value="green"
          />
        </label>
        <label
          for="springGreen"
        >
          Spring Green
          <input
            id="springGreen"
            name="hue"
            type="radio"
            value="springGreen"
          />
        </label>
        <label
          for="cyan"
        >
          Cyan
          <input
            id="cyan"
            name="hue"
            type="radio"
            value="cyan"
          />
        </label>
        <label
          for="azure"
        >
          Azure
          <input
            id="azure"
            name="hue"
            type="radio"
            value="azure"
          />
        </label>
        <label
          for="blue"
        >
          Blue
          <input
            id="blue"
            name="hue"
            type="radio"
            value="blue"
          />
        </label>
        <label
          for="violet"
        >
          Violet
          <input
            id="violet"
            name="hue"
            type="radio"
            value="violet"
          />
        </label>
        <label
          for="magenta"
        >
          Magenta
          <input
            id="magenta"
            name="hue"
            type="radio"
            value="magenta"
          />
        </label>
        <label
          for="rose"
        >
          Rose
          <input
            id="rose"
            name="hue"
            type="radio"
            value="rose"
          />
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
