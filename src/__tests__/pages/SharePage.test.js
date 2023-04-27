import React from 'react';
import SharePage from '../../app/pages/share-page/SharePage';
import { render, screen, fireEvent } from '@testing-library/react';

describe('SharePage', () => {
  it('renders correctly', () => {
    render(<SharePage />);
    const label = screen.getByText('Share a Youtube movie');
    const input = screen.getByLabelText('Youtube URL');
    const button = screen.getByRole('button', { name: 'Share' });
  });
});
