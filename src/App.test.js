import React from 'react';
import { render, screen } from '@testing-library/react';
import Weather from './components/Weather';

test('renders Weather component', () => {
  render(<Weather />);
  const todayElement = screen.getByText(/Today's/i);
  const next5DaysElement = screen.getByText(/Next 5 Days/i);
  expect(todayElement).toBeInTheDocument();
  expect(next5DaysElement).toBeInTheDocument();
});
