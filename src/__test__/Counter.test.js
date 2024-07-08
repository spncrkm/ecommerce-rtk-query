// Counter.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from '../components/Counter';

test('increments counter when button is clicked', () => {
  const { getByText } = render(<Counter />);

 
  expect(getByText('Counter: 0')).toBeInTheDocument();


  fireEvent.click(getByText('Increment'));


  expect(getByText('Counter: 1')).toBeInTheDocument();
});
