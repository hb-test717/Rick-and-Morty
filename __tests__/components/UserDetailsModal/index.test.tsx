import { render, screen, fireEvent, act } from '@testing-library/react';
import UserDetailsModal from '@/components/UserDetailsModal';
import Provider from '@/components/shared/providers';

import '@testing-library/jest-dom';

describe('UserDetailsModal', () => {
  const mockUserInfo = {
    username: 'Bob',
    jobTitle: 'Builder'
  };

  const mockUpdateUserInfo = jest.fn() as jest.Mock;

  const renderComponent = (props = {}) => {
    const defaultProps = {
      userInfo: mockUserInfo,
      updateUserInfo: mockUpdateUserInfo,
      open: true
    };

    return render(<UserDetailsModal {...defaultProps} {...props} />, { wrapper: Provider });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when open is true', () => {
    renderComponent();

    expect(screen.getByText('Please enter your details')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Job Title')).toBeInTheDocument();
  });

  it('does not render content when open is false', () => {
    renderComponent({ open: false });

    expect(screen.queryByText('Please enter your details')).not.toBeInTheDocument();
  });

  describe("when userInfo contain values", () => {
    it('displays the correct default values', () => {
      renderComponent();

      const usernameInput = screen.getByLabelText('Username') as HTMLInputElement;
      const jobTitleInput = screen.getByLabelText('Job Title') as HTMLInputElement;

      expect(usernameInput.value).toBe('Bob');
      expect(jobTitleInput.value).toBe('Builder');
    });
  })

  describe("when userInfo is blank", () => {
    it('displays empty input fields', () => {
      renderComponent({ userInfo: {} });

      const usernameInput = screen.getByLabelText('Username') as HTMLInputElement;
      const jobTitleInput = screen.getByLabelText('Job Title') as HTMLInputElement;

      expect(usernameInput.value).toBe('');
      expect(jobTitleInput.value).toBe('');
    });
  })

  describe("onClose", () => {
    describe("when onClose is not provided", () => {
      it('does not render close and cancel buttons', () => {
        renderComponent();

        expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
      });
    })

    describe("when onClose is provided", () => {
      it('renders close and cancel buttons', async () => {
        const onCloseMock = jest.fn();
        renderComponent({ onClose: onCloseMock });

        const closeButton = screen.getByLabelText('Close');
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });

        expect(closeButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();

        await act(async () => {
          fireEvent.click(closeButton);
          fireEvent.click(cancelButton);
        });

        expect(onCloseMock).toHaveBeenCalledTimes(2);
      });
    })
  })

  it('calls updateUserInfo when form is submitted', () => {
    renderComponent();

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockUpdateUserInfo).toHaveBeenCalled();
  });

  it('passes updated values to updateUserInfo when form is submitted', () => {
    renderComponent();

    const usernameInput = screen.getByLabelText('Username') as HTMLInputElement;
    const jobTitleInput = screen.getByLabelText('Job Title') as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'Bobby' } });
    fireEvent.change(jobTitleInput, { target: { value: 'Student' } });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockUpdateUserInfo).toHaveBeenCalled();

    // Checking the arguments passed to the mocked function
    const updatedData = mockUpdateUserInfo.mock.calls[0][0];
    expect(updatedData).toEqual({
      username: 'Bobby',
      jobTitle: 'Student',
    });
  });
});
