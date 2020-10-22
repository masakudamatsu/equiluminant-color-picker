import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import Swatch from '../../components/Swatch';

const colorList = [
  {red: 123, green: 133, blue: 23},
  {red: 53, green: 2, blue: 223},
];

const mockSetClickedColorCode = jest.fn().mockName('setClickedColorCode');

afterEach(() => {
  jest.clearAllMocks();
});

test('shows the color as specified in props', () => {
  colorList.forEach(color => {
    const {container, getByTestId} = render(
      <Swatch
        r={color.red}
        g={color.green}
        b={color.blue}
        setClickedColorCode={mockSetClickedColorCode}
      />,
    );
    expect(
      getByTestId(`rgb-${color.red}-${color.green}-${color.blue}`),
    ).toHaveStyle(
      `background-color: rgb(${color.red}, ${color.green}, ${color.blue})`,
    );
  });
});

test('calls the setClickedColorCode function when the user clicks', () => {
  const {container, getByTestId} = render(
    <Swatch
      r={colorList[0].red}
      g={colorList[0].green}
      b={colorList[0].blue}
      setClickedColorCode={mockSetClickedColorCode}
    />,
  );
  userEvent.click(
    getByTestId(
      `rgb-${colorList[0].red}-${colorList[0].green}-${colorList[0].blue}`,
    ),
  );
  expect(mockSetClickedColorCode).toHaveBeenCalledTimes(1);
});

test('renders correctly', () => {
  const {container} = render(
    <Swatch
      r={colorList[0].red}
      g={colorList[0].green}
      b={colorList[0].blue}
      setClickedColorCode={mockSetClickedColorCode}
    />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        aria-label="rgb(123, 133, 23)"
        class="style__ButtonSwatch-o0wbpp-19 PzvEA"
        data-testid="rgb-123-133-23"
      />
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(
    <Swatch
      r={colorList[0].red}
      g={colorList[0].green}
      b={colorList[0].blue}
      setClickedColorCode={mockSetClickedColorCode}
    />,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
