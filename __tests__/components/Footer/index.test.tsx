import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import Provider from '@/components/shared/providers';

import '@testing-library/jest-dom';

describe('Footer', () => {
  describe("When version number is set", () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
      originalEnv = process.env;
      process.env = { ...originalEnv, NEXT_PUBLIC_CHALLENGE_VERSION: '1.2.3' };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('displays the version number in the footer', () => {
      render(<Footer />, { wrapper: Provider });

      expect(screen.queryByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('Rick and Morty. Version 1.2.3')).toBeInTheDocument();
    });
  })

  describe("When version number is not set", () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
      originalEnv = process.env;
      process.env = { ...originalEnv, NEXT_PUBLIC_CHALLENGE_VERSION: undefined };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it("does not display footer", () => {
      render(<Footer />, { wrapper: Provider });

      expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    })
  });
});
