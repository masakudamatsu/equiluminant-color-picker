import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import Sector from '../../components/Sector';

const mockColorCode = 'rgb(124, 234, 12)';

let container, getByLabelText;
beforeEach(() => {
  return ({container, getByLabelText} = render(
    <svg>
      <Sector fillColorCode={mockColorCode} index={9} angle={10} />
    </svg>,
  ));
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    <div>
      <svg>
        <path
          d="M250,250 l250,0 A250,250 0,0,0 496.201938253052,206.58795558326742 z"
          data-testid="sector"
          fill="rgb(124, 234, 12)"
          transform="rotate(-90, 250, 250)"
        />
      </svg>
    </div>
  `);
});

test('is accessible', async () => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
