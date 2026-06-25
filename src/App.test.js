import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing hero with name and resume link', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { level: 1, name: /michael keohane/i })
  ).toBeInTheDocument();

  const resume = screen.getByRole('link', { name: /resume/i });
  expect(resume).toHaveAttribute('href', '/resume_summer_2026.pdf');

  expect(screen.getByText(/under active development/i)).toBeInTheDocument();
});

test('renders the social links', () => {
  render(<App />);

  expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/etsy/i)).toBeInTheDocument();
});
