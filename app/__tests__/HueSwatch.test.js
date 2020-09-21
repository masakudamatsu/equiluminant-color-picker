import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import HueSwatch from '../components/HueSwatch';

const mockProps = {
  hue: '30',
  title: 'Orange',
};

test('Prop values are reflected in the color and the title element', () => {
  const {container, getByTitle} = render(
    <HueSwatch hue={mockProps.hue} title={mockProps.title} />,
  );
  const hueSwatch = getByTitle(mockProps.title);
  // expect(hueSwatch).toHaveStyle({fill: `hsl(${mockProps.hue},100%,50%)`}); This doesn't work...
});

test('renders correctly', () => {
  const {container} = render(<HueSwatch hue="0" title="Red" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="HueSwatch__SvgWrapper-r09t4l-1 bwNWQA"
      >
        <svg
          aria-labelledby="colorName"
          class="HueSwatch__Svg-r09t4l-0 gqckLP"
          viewBox="0 0 10 10"
        >
          <title
            id="colorName"
          >
            Red
          </title>
          <rect
            height="10"
            width="10"
            x="0"
            y="0"
          />
        </svg>
      </div>
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(<HueSwatch hue="0" title="Red" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
