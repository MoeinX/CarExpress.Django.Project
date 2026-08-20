import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the CarExpress home page', () => {
  render(<App />);
  expect(screen.getAllByText(/CarExpress/i).length).toBeGreaterThan(0);
});
