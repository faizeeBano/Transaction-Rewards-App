import { render, screen } from '@testing-library/react';
import Header from './components/layout/Header';

test('renders header title correctly', () => {
  render(<Header />);

  // Check the heading text
  const title = screen.getByText(/Retailer Rewards - Points by Customer/i);
  expect(title).toBeInTheDocument();

  // Check the header tag exists
  const headerElement = screen.getByRole('banner');
  expect(headerElement).toHaveClass('header');
});
