import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('should display loading indicator when the form is submitted', async () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(/enter a url/i);
    const button = screen.getByRole('button', { name: /analyze/i });

    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(button);

    expect(screen.getByText(/analyzing/i)).toBeInTheDocument();
  });

  it('should display results after form submission', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          htmlVersion: 'HTML 5',
          pageTitle: 'Test Page',
          internalLinks: 10,
          externalLinks: 5,
          loginFormDetected: true,
          headings: [2, 4, 1, 0, 0, 0],
          validationResults: [
            { href: 'https://example.com', status: 'Valid', type: 'External' },
          ],
        }),
      })
    );

    render(<Home />);

    const input = screen.getByPlaceholderText(/enter a url/i);
    const button = screen.getByRole('button', { name: /analyze/i });

    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(button);

    await waitFor(() => screen.getByText(/analysis results/i));

    expect(screen.getByText(/html version/i)).toBeInTheDocument();
    expect(screen.getByText('HTML 5')).toBeInTheDocument();
  });
});
