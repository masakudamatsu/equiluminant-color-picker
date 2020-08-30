import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import Swatch from '../components/Swatch';

const colorList = [
  {red: 123, green: 133, blue: 23},
  {red: 53, green: 2, blue: 223},
];

test('shows the color as specified in props', () => {
  colorList.forEach(color => {
    const {container, getByTestId} = render(
      <ul>
        <Swatch r={color.red} g={color.green} b={color.blue} />
      </ul>,
    );
    expect(
      getByTestId(`rgb-${color.red}-${color.green}-${color.blue}`),
    ).toHaveStyle(
      `background-color: rgb(${color.red}, ${color.green}, ${color.blue})`,
    );
  });
});

test('renders correctly', () => {
  const {container} = render(
    <ul>
      <Swatch
        r={colorList[0].red}
        g={colorList[0].green}
        b={colorList[0].blue}
      />
    </ul>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <ul>
        <li>
          <div
            data-testid="rgb-123-133-23"
            style="background-color: rgb(123, 133, 23); margin-top: 1px; padding-top: 100%; width: 100%;"
          />
        </li>
      </ul>
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(
    <ul>
      <Swatch
        r={colorList[0].red}
        g={colorList[0].green}
        b={colorList[0].blue}
      />
    </ul>,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
