import React from 'react';
import SharePage from '../../app/pages/share-page/SharePage';
import { render, screen, fireEvent } from '@testing-library/react';

describe('SharePage', () => {
  it('renders correctly', () => {
    render(<SharePage />);
    const label = screen.getByText('Share a Youtube movie');
    const input = screen.getByLabelText('Youtube URL');
    const button = screen.getByRole('button', { name: 'Share' });
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('submits form when Share button is clicked', () => {
    const handleSubmit = jest.fn();
    render(<SharePage onSubmit={handleSubmit} />);
    const input = screen.getByLabelText('Youtube URL');
    const button = screen.getByRole('button', { name: 'Share' });
    fireEvent.change(input, {
      target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    });
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    );
  });
});
