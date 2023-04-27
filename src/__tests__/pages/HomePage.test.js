import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../../app/pages/home-page/HomePage';

describe('HomePage', () => {
  describe('handleLike', () => {
    it('should toggle isLiked state when called', () => {
      const { result } = renderHook(() => useState(false));
      const [, setIsLiked] = result.current;
      const handleLike = () => {
        setIsLiked(!isLiked);
      };

      // call handleLike twice
      act(() => {
        handleLike();
      });
      act(() => {
        handleLike();
      });

      // verify that isLiked state is toggled
      expect(result.current[0]).toBe(true);
    });
  });
});
