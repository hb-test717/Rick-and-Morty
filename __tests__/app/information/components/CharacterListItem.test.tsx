import { render, screen, fireEvent, act, within } from '@testing-library/react';
import CharacterListItem, { Character } from '@/app/information/components/CharacterListItem';
import Provider from '@/components/shared/providers';

import '@testing-library/jest-dom';

describe('CharacterListItem', () => {
  const mockCharacter: Character = {
    id: '1',
    image: 'https://example.com/image.jpg',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: 'Super Genius',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://example.com/earth-c137'
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://example.com/citadel'
    },
    episode: [
      {
        id: 'ep1',
        name: 'Pilot',
        air_date: 'December 2, 2013'
      },
      {
        id: 'ep2',
        name: 'Lawnmower Dog',
        air_date: 'December 9, 2013'
      }
    ]
  };

  const renderComponent = (props = {}) => {
    return render(<CharacterListItem character={mockCharacter} {...props} />, { wrapper: Provider });
  };

  it('renders character basic information', () => {
    renderComponent();

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human • Male • Alive')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View details' })).toBeInTheDocument();
  });

  it('initially does not display the modal', () => {
    renderComponent();

    expect(screen.queryByText('Details for Rick Sanchez')).not.toBeInTheDocument();
  });

  it('displays the modal when View details button is clicked', async () => {
    renderComponent();

    const viewButton = screen.getByRole('button', { name: 'View details' });

    await act(async () => {
      fireEvent.click(viewButton);
    });

    expect(screen.getByText('Details for Rick Sanchez')).toBeInTheDocument();
  });

  describe('Modal content', () => {
    beforeEach(async () => {
      renderComponent();

      const viewButton = screen.getByRole('button', { name: 'View details' });

      await act(async () => {
        fireEvent.click(viewButton);
      });
    })

    it('displays character details', () => {
      const modal = screen.getByRole('dialog');
      const modalContent = within(modal);

      expect(modalContent.getByText('Status:')).toBeInTheDocument();
      expect(modalContent.getByText('Alive', { exact: false })).toBeInTheDocument();

      expect(modalContent.getByText('Species:')).toBeInTheDocument();
      expect(modalContent.getByText('Human', { exact: false })).toBeInTheDocument();

      expect(modalContent.getByText('Type:')).toBeInTheDocument();
      expect(modalContent.getByText('Super Genius', { exact: false })).toBeInTheDocument();

      expect(modalContent.getByText('Gender:')).toBeInTheDocument();
      expect(modalContent.getByText('Male', { exact: false })).toBeInTheDocument();

      expect(modalContent.getByText('Origin:')).toBeInTheDocument();
      expect(modalContent.getByText('Earth (C-137)', { exact: false })).toBeInTheDocument();

      expect(modalContent.getByText('Location:')).toBeInTheDocument();
      expect(modalContent.getByText('Citadel of Ricks', { exact: false })).toBeInTheDocument();
    });

    it('displays episode information', () => {
      const modal = screen.getByRole('dialog');
      const modalContent = within(modal);

      expect(modalContent.getByText('Episodes')).toBeInTheDocument();
      expect(modalContent.getByText('Pilot')).toBeInTheDocument();
      expect(modalContent.getByText('December 2, 2013')).toBeInTheDocument();
      expect(modalContent.getByText('Lawnmower Dog')).toBeInTheDocument();
      expect(modalContent.getByText('December 9, 2013')).toBeInTheDocument();
    });

    it('closes the modal when close button is clicked', async () => {
      const modal = screen.getByRole('dialog');
      const modalContent = within(modal);

      const closeButton = modalContent.getByLabelText('Close');

      await act(async () => {
        fireEvent.click(closeButton);
      });

      expect(screen.queryByText('Details for Rick Sanchez')).not.toBeInTheDocument();
    });
  });
});
