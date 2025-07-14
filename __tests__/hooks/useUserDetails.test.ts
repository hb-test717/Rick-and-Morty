import { renderHook, act } from '@testing-library/react';
import useUserDetails from '../../app/hooks/useUserDetails';

describe('useUserDetails', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Initial state', () => {
    describe("When locastorage is empty", () => {
      it('should initialize with empty object', () => {
        const { result } = renderHook(() => useUserDetails());

        expect(result.current.userInfo).toEqual({});
      });

      it("should mark hasRequiredData as false", () => {
        const { result } = renderHook(() => useUserDetails());

        expect(result.current.hasRequiredData).toBe(false);
      })
    })

    describe("When locastorage has data", () => {
      beforeEach(() => {
        const mockUserInfo = { username: 'Rick Sanchez', jobTitle: 'Scientist' };
        (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(mockUserInfo));
      })

      it('loads userInfo from localStorage when data is available', () => {
        const { result } = renderHook(() => useUserDetails());

        expect(localStorage.getItem).toHaveBeenCalledWith('userInfo');
        expect(result.current.userInfo).toEqual({ username: 'Rick Sanchez', jobTitle: 'Scientist' });
      });

      it('should mark hasRequiredData as true when data is available', () => {
        const { result } = renderHook(() => useUserDetails());

        expect(result.current.hasRequiredData).toBe(true);
      })
    })

    it('handles malformed JSON in localStorage', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue('invalid json');
      const { result } = renderHook(() => useUserDetails());

      expect(result.current.userInfo).toEqual({});
      expect(result.current.hasRequiredData).toBe(false);
    });
  });

  describe('updateUserInfo', () => {
    it('updates userInfo state and localStorage with FormData', async () => {
      const { result } = renderHook(() => useUserDetails());

      const updatedData = { username: 'Morty Smith', jobTitle: 'Student' };
      await act(async () => {
        result.current.updateUserInfo(updatedData);
      });

      const expectedUserInfo = { username: 'Morty Smith', jobTitle: 'Student' };
      expect(result.current.userInfo).toEqual(expectedUserInfo);
      expect(result.current.hasRequiredData).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'userInfo',
        JSON.stringify(expectedUserInfo)
      );
    });

    it('saves the form data with partial user info', async () => {
      const { result } = renderHook(() => useUserDetails());

      const updatedData = { username: 'Birdperson' };

      await act(async () => {
        result.current.updateUserInfo(updatedData);
      });

      const expectedUserInfo = { username: 'Birdperson' };
      expect(result.current.userInfo).toEqual(expectedUserInfo);
      expect(result.current.hasRequiredData).toBe(false);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'userInfo',
        JSON.stringify(expectedUserInfo)
      );
    });
  });
});
