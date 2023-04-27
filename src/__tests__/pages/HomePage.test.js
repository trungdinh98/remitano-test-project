import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../../app/pages/home-page/HomePage';

test('renders video cards', async () => {
  const { findAllByTestId } = render(<HomePage />);
  const videoCards = await findAllByTestId('video-card');
  expect(videoCards.length).toBeGreaterThan(0);
});

test('renders video title', async () => {
  const { findByText } = render(<HomePage />);
  const videoTitle = await findByText('Video Title');
  expect(videoTitle).toBeInTheDocument();
});

test('renders video author', async () => {
  const { findByText } = render(<HomePage />);
  const videoAuthor = await findByText('Share by: Channel Name');
  expect(videoAuthor).toBeInTheDocument();
});
