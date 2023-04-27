import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '../App';

jest.mock('./../app/hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    logout: jest.fn(),
  })),
}));

describe('App', () => {
  test('renders homepage', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for Suspense fallback to disappear
    setTimeout(() => {
      expect(screen.getByText(/homepage/i)).toBeInTheDocument();
    }, 1000);
  });

  test('renders share page when authenticated', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={['/share']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for Suspense fallback to disappear
    setTimeout(() => {
      expect(screen.getByText(/share page/i)).toBeInTheDocument();
    }, 1000);
  });
});
