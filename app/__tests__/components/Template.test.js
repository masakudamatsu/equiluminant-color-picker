// import React from 'react';
// import {cleanup, fireEvent, render} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom/extend-expect';
// import {axe} from 'jest-axe';
// import 'jest-axe/extend-expect';
//
// import Template from '../../components/Template';
//
// afterEach(() => {
//   jest.clearAllMocks();
// });
//
// let container, getByLabelText;
// beforeEach(() => {
//   return ({container, getByLabelText} = render(<Template />));
// });
//
// test('renders correctly', () => {
//   expect(container).toMatchInlineSnapshot();
// });
//
// test('is accessible', async () => {
//   const results = await axe(container);
//   expect(results).toHaveNoViolations();
//   cleanup();
// });
