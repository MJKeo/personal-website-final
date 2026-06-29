import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

test('home renders the name heading and resume link', () => {
  renderAt('/');

  expect(
    screen.getByRole('heading', { level: 1, name: /michael keohane/i })
  ).toBeInTheDocument();

  const resume = screen.getAllByRole('link', { name: /resume/i })[0];
  expect(resume).toHaveAttribute('href', '/resume_summer_2026.pdf');
});

test('home leads with the three flagship evidence pieces', () => {
  renderAt('/');

  expect(screen.getByRole('heading', { name: /^CineMind$/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /^Meta$/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /^Home Depot$/ })).toBeInTheDocument();
});

test('footer renders the social links', () => {
  renderAt('/');

  expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/etsy/i)).toBeInTheDocument();
});

test('unknown routes render the 404 screen', () => {
  renderAt('/does-not-exist');
  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
});

test('non-home pages show only the in-progress notice', () => {
  for (const path of ['/projects', '/experience', '/games', '/projects/cinemind']) {
    const { unmount } = renderAt(path);
    expect(screen.getByText(/this page is in progress/i)).toBeInTheDocument();
    unmount();
  }
});
